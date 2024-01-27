import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const LineCharts = ({ data }) => {
  const CustomTooltip = ({ payload }: any) => {
    if (payload) {
      return (
        <div
          className="whitespace-nowrap h-fit z-[998] rounded-[5px] p-[2px] bg-white px-2 flex items-center focus:!outline-none focus:border-0 focus:ring-0">
          {"Số lượng"}:{payload[0]?.value || 0}
        </div>
      );
    }
    return null;
  };
  const legendPayload = [
    { value: "quantity", color: "var(--clr-green-400)" },
  ];

  const legendFormatter = (value) => {
    // Add your Vietnamese translations here
    const translations = {
      quantity: "Số lượng",
    };

    return translations[value] || value;
  };

  return (
    <>
      <LineChart
        width={1200}
        height={400}
        data={data}
        margin={{
          top: 40,
          right: 10,
          left: 24,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="0 1"/>
        <XAxis dataKey="month"/>
        <YAxis/>
        <Tooltip content={<CustomTooltip/>} contentStyle={{ background: "white" }}
          wrapperStyle={{ zIndex: 997, outline: "none" }}/>
        <Legend payload={legendPayload} formatter={legendFormatter}/>
        <Line type="monotone" dataKey="quantity" stroke="var(--clr-green-400)" activeDot={{ r: 8 }}/>
      </LineChart>
    </>
  );
}
;

export default LineCharts;