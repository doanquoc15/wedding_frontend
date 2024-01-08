import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { omit } from "lodash";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";

import { SelectIcon } from "@/components/Icons";
import DeleteIcon from "@/statics/svg/ic-delete-option.svg";

interface valueProps {
  value: string | number;
}

interface SelectFilterType {
  options: {
    value?: any;
    label: string;
    id?: number | string;
  }[];
  defaultValue?: any;
  handleClickFilter?: Function;
  sx?: any;
  typeQuery?: string;
  value?: Object;
  styles?: string;
  resetAll?: boolean;
  resetValue?: string | number;
  query?: any;
  resetPageIndex?: any;
}

export default function SelectFilter(props: SelectFilterType) {
  const {
    options,
    defaultValue,
    handleClickFilter,
    typeQuery,
    styles,
    resetAll,
    query,
    resetPageIndex,
    resetValue = "all",
    ...otherProps
  } = props;

  const [value, setValue] = useState<any>(defaultValue);
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

  const handleChange = (event) => {
    const targetValue = event.target.value;
    const params = getParams();
    if (resetAll && String(targetValue).toLowerCase() === resetValue) {
      const queryString = new URLSearchParams(
        omit(params, typeQuery as string)
      ).toString();
      router.push(`${path}?${queryString}`);
    } else if (typeQuery) {
      const queryString = new URLSearchParams({
        ...params,
        [typeQuery]: targetValue,
      }).toString();
      router.push(`${path}?${queryString}`);
    }
    resetPageIndex && resetPageIndex();
    setValue(0);
    handleClickFilter && handleClickFilter(event.target, typeQuery);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setValue(null);
    const queryString = new URLSearchParams(
      omit(getParams(), typeQuery as string)
    ).toString();
    router.push(`${path}?${queryString}`);
  };

  return (
    <Select
      defaultValue={defaultValue}
      onChange={handleChange}
      value={value}
      IconComponent={(_props) => {
        const rotate = _props.className.toString().includes("iconOpen");
        if (value || query[typeQuery as string]) {
          return (
            <div className="min-w-[20px] pt-1 pl-1">
              <Image
                className="cursor-pointer"
                onClick={handleClick}
                width={12}
                height={12}
                src={DeleteIcon}
                alt="delete option"
              />
            </div>
          );
        }
        return <SelectIcon rotate={rotate}/>;
      }}
      {...otherProps}
    >
      {options.length > 0 ? (
        options.map(({ value, id, label }) => (
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: "var(--clr-white-400)",
              },
            }}
            key={value || id}
            value={value || id}
          >
            <span
              className={`${styles} truncate max-w-[200px] text-[13px] font-normal text-clr-gray-500`}
            >
              {label}
            </span>
          </MenuItem>
        ))
      ) : (
        <div className="text-clr-gray-500 text-[13px] font-normal p-4">
          Không có dữ liệu
        </div>
      )}
    </Select>
  );
}
