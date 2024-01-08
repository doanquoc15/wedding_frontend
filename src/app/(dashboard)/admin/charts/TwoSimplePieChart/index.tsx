import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const TwoSimplePieChart = ({ data }) => {
  return (
    <div className="relative">
      <PieChart width={200} height={200}>
        <Pie paddingAngle={3} minAngle={3} data={data} cx={90} cy={100} innerRadius={70} outerRadius={90}
          dataKey="value">
          {data?.map((item, index) => (
            <>
              <Cell key={index} fill={data[index % data.length].color}/>
            </>))}
        </Pie>
        <Tooltip/>
      </PieChart>
      <div
        className="flex flex-col items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[16px] w-full font-normal">
        <span className="leading-[28px] text-[16px] font-bold">{data[0]?.percent}%</span>
        <span className="leading-[24px] text-[14px] font-semibold">{capitalizeFirstLetter(data[0]?.name)}</span>
      </div>
      <div className="text-center mt-2">{data[0]?.value || 0} đơn hàng</div>
    </div>
  )
  ;
};
export default TwoSimplePieChart;
