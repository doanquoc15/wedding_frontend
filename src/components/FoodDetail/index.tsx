//import { p } from "@mui/material";
import Image from "next/image";
import React from "react";

import { MenuItem } from "@/types/common";

const FoodDetail = ({ food }) => {
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div>
          <Image
            src={
              food?.image ||
              "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
            }
            alt="Image Food"
            width={200}
            height={150}
            className="rounded-[10px]"
          />
        </div>
        <section className="flex flex-col">
          <p className="text-[15px] font-semibold">{food?.dishName}</p>
          <p className="text-[13px] flex-1 truncate w-[200px]">
            {food.description}
          </p>
          <p>${food?.price}</p>
        </section>
      </div>
    </div>
  );
};

export default FoodDetail;
