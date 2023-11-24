import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const TimePicker = (props: any) => {
  const { name, control, handleChange, sx, defaultValue, ...timePickerProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...rest } }) => {
        return (
          <TextField
            {...rest}
            type="time"
            defaultValue={defaultValue}
            onChange={(event: any) => {
              onChange(event.target.value);
              handleChange && handleChange(event.target.value);
            }}
            sx={{
              width: 230,
              input: {
                cursor: "pointer",
                height: 40,
                paddingY: 0,
                paddingX: 2,
                color: "var(--clr-gray-500)",
                fontSize: 13,
              },
              "& .MuiInputBase-root": {
                borderRadius: 0,
              },
              "&.MuiInputBase-root::-webkit-calendar-picker-indicator": {
                display: "none",
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "rgba(200, 200, 200, 0.5)",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "rgba(200, 200, 200, 0.5)",
                },
              },
              ...sx,
            }}
            {...timePickerProps}
          />
        );
      }}
    />
  );
};

export default TimePicker;
