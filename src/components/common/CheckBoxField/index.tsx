import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import { CheckboxPropsType } from "@/types/common";

const stylesCommon = {
  primarySize: "13px!important",
  fontFamily: "Nunito Sans!important",
  inputHeight: "48px",
  lineHeightLabelCheckBox: 20,
};

export default function CheckboxField(props: CheckboxPropsType) {
  const { name, control, label, defaultValue, className, sx } = props;
  const defaultValueInput = defaultValue !== undefined ? defaultValue : true;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueInput}
      render={({ field }) => {
        return (
          <FormControlLabel
            {...field}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: stylesCommon.fontFamily,
                color: "var(--clr-gray-500)",
                fontSize: `${stylesCommon.primarySize}px`,
                lineHeight: `${stylesCommon.lineHeightLabelCheckBox}px`,
              },
              ...sx,
            }}
            control={<Checkbox
              sx={{
                color: "var(--clr-gray-350)"
              }}
              checked={field.value} defaultChecked={defaultValueInput} className={className} {...field} />}
            label={<Typography className="!text-clr-gray-500 !text-[13px] pt-[2px]">{label}</Typography>}
          />
        );
      }
      }
    />
  );
}
