import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import stylesCommon from "@/constants/style";
import { TextFieldPropsType } from "@/types/common";

export default function TextInputField(props: TextFieldPropsType) {
  const { name, control, defaultValue, minHeight, sx, inputProps, ...textFieldProps } = props;
  const defaultValueInput = defaultValue !== undefined ? defaultValue : "";
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueInput}
      render={({ field }) => {
        return (
          <TextField
            autoComplete="off"
            {...textFieldProps}
            {...field}
            id={name}
            sx={{
              "& .MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
                height: minHeight || stylesCommon.inputHeight,
                minHeight: minHeight || stylesCommon.inputHeight,
                fontSize: stylesCommon.primarySize,
                fontFamily: stylesCommon.fontFamily,
              },
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                fontSize: stylesCommon.primarySize,
                fontFamily: stylesCommon.fontFamily,
                height: "fit-content",
              },
              "& .MuiFormLabel-root": {
                fontSize: stylesCommon.primarySize,
                fontFamily: stylesCommon.fontFamily,
              },
              "& .Mui-disabled": {
                background: "#F3F3F4",
                paddingY: "0px!important",
              },
              ...sx,
            }}
            inputProps={{
              className: "border-0 px-[12px] py-0 text-[13px] h-full",
              ...inputProps,
            }}
          />
        );
      }}
    />
  );
}
