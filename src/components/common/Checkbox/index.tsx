import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = (props) => {
  const { defaultValueInput, className, label, ...rest } = props;

  return (
    <FormControlLabel
      sx={{
        margin: 0,
      }}
      {...rest}
      control={
        <Checkbox
          sx={{
            color: "var(--clr-gray-500)",
            boxShadow: "0",
            "& .MuiSvgIcon-root": {
              fontSize: 25,
              borderColor: "var(--clr-gray-500)",
            },
          }}
          defaultChecked={defaultValueInput}
          className={className}
          checked={rest.value}
          disabled={rest.disabled}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
