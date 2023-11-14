import { Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

import { CalendarIcon } from "@/components/Icons";

export default function DatePickerField(props:any) {
  const { name, control, defaultValue, ...desktopDatePickerProps } = props;
  const defaultValueInput = defaultValue !== undefined ? defaultValue : null;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueInput}
      render={({ field }) => {
        const { onChange, ...rest } = field;
        return (
          <DesktopDatePicker
            mask="__/__/____"
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            onChange={(e : any) => {
              const utcDate = moment(e).utc(true);
              onChange(utcDate);
            }}
            InputProps={{
              id: `${name}`,
            }}
            {...desktopDatePickerProps}
            {...rest}
          />
        );
      }}
    />
  );
}
