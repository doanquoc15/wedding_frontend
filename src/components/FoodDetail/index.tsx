//import { p } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import { Tooltip } from "@mui/material";

import { formatMoney } from "@/utils/formatMoney";

const FoodDetail = ({ food }) => {
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="max-w-[400px] max-h-[150px] overflow-hidden object-cover">
          <Image
            src={
              food?.image ||
              "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
            }
            alt="Image Food"
            width={400}
            height={150}
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
        <section className="flex flex-col">
          <div className="text-[15px] font-semibold">{food?.dishName}</div>
          <Tooltip title={food.description}>
            <div className="text-[13px] flex-1 truncate w-[200px]">
              {food.description}
            </div>
          </Tooltip>
          <div>{formatMoney(food?.price)} VND</div>
        </section>
      </div>
    </div>
  );
};

export default FoodDetail;
