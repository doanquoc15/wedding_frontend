import React from "react";

import { formatMoney } from "@/utils/formatMoney";

const Card = ({ data }) => {

  return (
    <div className="w-full h-full text-[15px] shadow-inner">
      <div className="flex h-full flex-col">
        <div className="relative">
          <img src={data?.image} className="h-[320px] w-full object-cover" alt=""/>
          <div
            className={`absolute bottom-0 left-[50%] -translate-x-[50%] h-[30px] w-full uppercase text-[11px] 
            text-white font-semibold flex justify-center items-center bg-gradient-to-l from-blue-500 to-red-200`}>{data?.typeDish?.typeName}</div>
        </div>
        <div className="flex gap-2 flex-col pl-4 h-full justify-between">
          <p className="text-[16px] font-semibold">{data?.dishName}</p>
          <p className="italic text-amber-700">{formatMoney(data?.price)} VND</p>
          <div className="flex gap-1 text-[13px] text-red-400 items-end mb-1">
            {data?.description || "Không có mô tả"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
