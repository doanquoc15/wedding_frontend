import React from "react";

import { TitleHeadType } from "@/types/common";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const TitleHead = (props: TitleHeadType) => {
  return (
    <header className="bg-[#F5F5F5] sticky min-h-[140px] flex flex-col justify-center items-center mb-5">
      <div className="text-[36px] leading-[48px]">{capitalizeFirstLetter(props?.title)}</div>
      <div className="text-[24px] leading-9">{props?.content || "Sky View -  Restaurant"}</div>
    </header>
  );
};

export default TitleHead;