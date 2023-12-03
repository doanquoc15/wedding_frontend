/* eslint-disable max-len */
import { Controller } from "react-hook-form";

import { TextAreaFieldPropsType } from "@/types/common";

export default function TextAreaField(props: TextAreaFieldPropsType) {
  const { name, control, defaultValue, placeholder, rows, cols } = props;
  const defaultValueInput = defaultValue !== undefined ? defaultValue : "";
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueInput}
      render={({ field }) => (
        <textarea
          id={name}
          rows={rows || 5}
          cols={cols}
          {...field}
          placeholder={placeholder}
          className="border border-clr-gray-225 focus:shadow-none resize-none h-full w-full text-[13px] rounded-[3px] p-3"
        />
      )}
    />
  );
}
