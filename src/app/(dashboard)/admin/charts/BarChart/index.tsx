import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const BarCharts = ({ data }) => {
  const nameVN = {
    nEW: "Chờ xác nhận",
    pENDING: "Xác nhận thêm",
    fINISHED: "Hoàn thành",
    aPPROVED: "Đã xác nhận",
    rEJECTED: "Hủy",
  };
  const CustomTooltip = ({ payload }: any) => {
    return payload && payload?.map((item: any, index) => (
      <div key={index}
        className="whitespace-nowrap h-fit z-[998] rounded-[5px] p-[2px] bg-white px-2 flex items-center focus:!outline-none focus:border-0 focus:ring-0">
        {nameVN[item?.name]} : {item?.value || 0}
      </div>
    ));
  };
  const legendPayload = [
    { value: "nEW", color: "var(--clr-green-400)" },
    { value: "pENDING", color: "var(--clr-orange-400)" },
    { value: "aPPROVED", color: "var(--clr-blue-400)" },
    { value: "fINISHED", color: "var(--clr-gray-500)" },
    { value: "rEJECTED", color: "var(--clr-red-400)" },
  ];

  const legendFormatter = (value) => {
    // Add your Vietnamese translations here
    const translations = {
      nEW: "Mới",
      pENDING: "Xác nhận thêm",
      aPPROVED: "Đã duyệt",
      fINISHED: "Hoàn thành",
      rEJECTED: "Hủy",
    };

    return translations[value] || value;
  };

  return (
    <BarChart
      width={1200}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="month"/>
      <YAxis/>
      <Tooltip content={<CustomTooltip/>} contentStyle={{ background: "white", outline: "none" }} cursor={{ fill: "white" }}
        wrapperStyle={{ zIndex: 997, outline: "none" }}/>
      <Legend payload={legendPayload} formatter={legendFormatter}/>
      <Bar dataKey="nEW" fill="var(--clr-green-400)"/>
      <Bar dataKey="pENDING" fill="var(--clr-orange-400)"/>
      <Bar dataKey="aPPROVED" fill="var(--clr-blue-400)"/>
      <Bar dataKey="fINISHED" fill="var(--clr-gray-500)"/>
      <Bar dataKey="rEJECTED" fill="var(--clr-red-400)"/>
    </BarChart>
  );
};

export default BarCharts;