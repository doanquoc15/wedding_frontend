import React from "react";
import Image from "next/legacy/image";

interface IManagementChartProps {
  icon: any;
  total: number;
  title?: string;
  subTitle?: string;
}

const ManagementChart = (props: IManagementChartProps) => {
  const { icon, total, title, subTitle } = props;
  return (
    <div
      className="flex gap-3 items-center border-[1px] w-[200px] h-[100px] rounded-[5px] shadow-zinc-700 p-4 text-[--clr-gray-500] font-semibold">
      <Image src={icon} width={50} height={50} priority={true} objectFit="cover" alt=""/>
      <div>{`${total}`} <span className="italic">{subTitle}</span></div>
    </div>
  );
};

export default ManagementChart;