import { InputAdornment, ListSubheader, MenuItem, Select, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";

import stylesCommon from "@/constants/style";
import { IconSearch, SelectIcon } from "@/components/Icons";
import { checkIsIncludeText } from "@/utils/handleString";
import { SelectFieldPropsType } from "@/types/common";
import { selectLoading } from "@/stores/reducers/loading";

export default function SelectField(props: SelectFieldPropsType) {
  const {
    name,
    control,
    options,
    defaultValue,
    labelDisplay,
    required,
    hasLegend,
    styleLabel,
    width,
    handleChange,
    ...selectProps
  } = props;
  const defaultValueInput = defaultValue !== undefined ? defaultValue : "";
  const defaultStyleLabel = styleLabel !== undefined ? styleLabel : {};
  const defaultWidthLabel = width !== undefined ? width : 400;

  const [valueSearch, setValueSearch] = useState<string>("");

  //loading
  const isLoading: boolean = useSelector(selectLoading());

  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSelectChange = (e) => {
    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  const handleCloseSelect = () => {
    setValueSearch("");
  };

  const handleAutoChooseOfSelectField = (e) => {
    if (e.key !== "Escape") {
      e.stopPropagation();
    }
  };

  return (

    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueInput}
      render={({ field: { onChange, ...rest } }) => (
        <FormControl
          fullWidth
          {...rest}
          error={selectProps.error}
          required={required}
        >
          <InputLabel
            sx={{
              fontSize: stylesCommon.primarySize,
              fontFamily: stylesCommon.fontFamily,
              ...defaultStyleLabel,
            }}
          >
            {labelDisplay}
          </InputLabel>
          <Select
            sx={{
              "&.Mui-disabled": {
                background: "#F3F3F4",
              },
              fontSize: "13px!important",
              height: stylesCommon.inputHeight,
              "& .MuiInputBase-root": {
                border: "1px solid var(--clr-blue-400)",
                height: "fit-content",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            {...selectProps}
            {...rest}
            id={name}
            MenuProps={{ autoFocus: false }}
            onClose={handleCloseSelect}
            onChange={(e) => {
              onChange(e);
              handleSelectChange(e);
            }}
            IconComponent={(_props) => {
              const rotate = _props.className.toString().includes("iconOpen");
              return <SelectIcon rotate={rotate}/>;
            }}
          >
            <ListSubheader
              className={`!top-[-8px] !p-1 ${options?.length < 5 ? "invisible h-0" : " h-11"}`}>
              <TextField
                autoFocus
                placeholder="Tìm kiếm..."
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconSearch/>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "13px",
                    color: "var(--clr-gray-500)",
                    height: "0px"
                  },
                }}
                onChange={handleChangeSearch}
                onKeyDown={handleAutoChooseOfSelectField}
              />
            </ListSubheader>
            {options?.length > 0 ? (
              checkIsIncludeText(options, valueSearch).map(({ id, name, value, label }) => {
                return (
                  <MenuItem
                    key={value || id}
                    value={value || id}
                    sx={{
                      "&.MuiButtonBase-root.MuiMenuItem-root": {
                        fontFamily: stylesCommon.fontFamily,
                      },
                      "&:hover": {
                        backgroundColor: "var(--clr-white-400)",
                      },
                      fontSize: stylesCommon.primarySize,
                    }}
                  >
                    <span
                      className={`!font-primary text-clr-gray-500 font-medium truncate max-w-[${defaultWidthLabel}px]`}>
                      {label || name}
                    </span>
                  </MenuItem>
                );
              })
            ) : (
              <div
                className="text-clr-gray-500 text-[13px] px-4 pb-1">{isLoading ? <>Loading...</> : <>Không
                có dữ liệu</>}</div>
            )}
          </Select>
        </FormControl>
      )}
    />
  );
}

