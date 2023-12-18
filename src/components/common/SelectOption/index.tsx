import React from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { SelectOptionProps } from "@/types/common";

const SelectOption = (props: SelectOptionProps) => {
  const [selectValue, setSelectValue] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    const newChange: any = event.target.value;
    setSelectValue(newChange);
    if (props.onChange) props.onChange(newChange);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150, boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)" }}>
        <Select sx={{
          "& .MuiList-root": {
            color: "var(--clr-gray-500)",
            fontSize: "13px"
          },
        }} value={selectValue} onChange={handleChange}
        displayEmpty
        inputProps={{
          "aria-label": "Without" +
                    " label"
        }}
        className="h-[30px] p-0 m-0">
          {props.options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectOption;

