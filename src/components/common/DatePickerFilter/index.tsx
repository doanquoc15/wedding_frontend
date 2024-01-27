import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { omit } from "lodash";
import moment from "moment/moment";

import { SHORT_DATE } from "@/constants/common";

export default function DatePickerFilter(props: any) {
  const { name, onChangeDate, typeQuery, minDate, maxDate, ...desktopDatePickerProps } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const path = usePathname();

  const getParams = () => {
    const params = {};

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const queryParams: any = new URLSearchParams(url.search);
      for (const [key, value] of queryParams.entries()) {
        params[key] = value;
      }
    }
    return params;
  };
  const isDateValid = (dateString) => {
    return moment(dateString, true).isValid();
  };
  const handleDateChange = (date) => {
    const params = getParams()
    ;
    const formattedDate = date ? moment(date).utc(true).format(SHORT_DATE) as string : "";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onChangeDate && onChangeDate(formattedDate);
    if (!formattedDate || !isDateValid(formattedDate)) {
      const queryString = new URLSearchParams(
        omit(params, typeQuery)
      ).toString();
      router.push(`${path}?${queryString}`);
    } else if (typeQuery) {
      const queryString = new URLSearchParams({
        ...params,
        [typeQuery]: formattedDate,
      }).toString();
      router.push(`${path}?${queryString}`);
    }
    // @ts-ignore
    setSelectedDate(formattedDate);
  };
  return (
    <DatePicker
      value={selectedDate}
      onChange={(e: any) => {
        const utcDate = moment(e).utc(true);
        handleDateChange(utcDate);
      }}
      format="DD/MM/YYYY"
      required={false}
      minDate={minDate}
      maxDate={maxDate}
      autoFocus={false}
      InputProps={{
        id: `${name}`,
      }}
      {...desktopDatePickerProps}
      renderInput={(props) => <TextField {...props} size='small' helperText={null}/>}
    />
  );
}
