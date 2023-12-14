import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { omit } from "lodash";

import { SearchProps } from "@/types/common";
import SearchIcon from "@/statics/svg/ic-search.svg";
import { getQueryParam } from "@/utils/route";

const SearchInFilter = ({
  onSearch,
  typeQuery = "search",
  width = "400px",
  isResetAll = false,
  onChange,
}: SearchProps) => {
  const [input, setInput] = useState<any>(getQueryParam(`${typeQuery}`));
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeInput = (value: string) => {
    const valueSearch: any = value.trim();
    onSearch && onSearch(valueSearch);
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const params = {};
    for (const [key, value] of queryParams?.entries() as any) {
      params[key] = value;
    }

    if (isResetAll && !valueSearch) {
      const queryString = new URLSearchParams(
        omit(params, "search")
      ).toString();
      router.push(`/admin/dishes?${queryString}`);
    } else if (typeQuery) {
      const queryString = new URLSearchParams({
        ...params,
        [typeQuery]: valueSearch,
      }).toString();
      router.push(`/admin/dishes?${queryString}`);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChangeInput(input);
    }
  };

  const onChangeInput = (event) => {
    if (isResetAll && event.target.value === "")
      handleChangeInput(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    if (!searchParams?.get(`${typeQuery}`)) {
      setInput("");
      return;
    }
    setInput(String(searchParams?.get(`${typeQuery}`)));
    //eslint-disable-next-line
  }, [searchParams?.get(`${typeQuery}`)]);

  return (
    <div
      style={{
        minWidth: `${width} || 400px`,
      }}
      className={`${
        width ? `max-w-[${width}]` : "w-full"
      } h-[34px] shadow-[0px_4px_4px_rgba(0,0,0,0.08)] 
      border-[1px] border-clr-gray-200 rounded-[3px] flex flex-column items-center justify-around relative`}
    >
      <input
        type="text"
        name="search"
        className="w-full h-[34px] pl-2 pr-9 text-[13px] rounded-[3px]
        text-clr-gray-700 bg-transparent outline-none border-none focus:border-transparent focus:ring-0"
        value={input}
        onChange={(event) => {
          onChangeInput(event);
          onChange && onChange(event);
        }}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      <div
        className={
          "absolute right-2 leading-6 h-6 text-center pl-[14px] pt-[2px] pr-1 cursor-pointer"
        }
        onClick={() => handleChangeInput(input)}
      >
        <Image src={SearchIcon} alt="Search icon" width={20} height={20} />
      </div>
    </div>
  );
};

export default SearchInFilter;
