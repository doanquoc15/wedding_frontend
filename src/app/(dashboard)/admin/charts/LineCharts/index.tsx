import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const LineCharts = ({ data }) => {
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
        <Tooltip contentStyle={{ background: "white" }} wrapperStyle={{ zIndex: 997, outline: "none" }}/>
        <Legend/>
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
    </>
  );
};

export default LineCharts;