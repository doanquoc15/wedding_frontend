import React from "react";
import Image from "next/image";

import { TypeEmployee } from "@/types/common";

import { IconDot } from "../Icons";

const MainChefDetail = ({ chef }) => {
  return (
    <div className="h-[200px] w-[600px] rounded-[120px] bg-[--clr-orange-500] flex gap-5 text-[12px]">
      <div className="h-[200px] w-[200px] rounded-[50%] overflow-hidden bg-white border-[10px] border-white">
        <Image
          src="https://nguoinoitieng.tv/images/nnt/102/0/bgb5.jpg"
          width={200}
          height={200}
          alt="image of chef"
          priority={true}
        />
      </div>
      {/* Information of chef */}
      <div className="text-white flex flex-col justify-center gap-2 flex-1">
        <div className="flex items-start gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[80px]">Họ và tên</span>
          <span>{chef?.employeeName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[80px]">Tuổi</span>
          <span>{chef?.age}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[80px]">Địa chỉ</span>
          <span> {chef?.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[80px]">Kinh nghiệm</span>
          <span>{chef?.experience} năm kinh nghiệm</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[80px]">Chức vụ</span>
          <span>{chef?.regency}</span>
        </div>
      </div>
    </div>
  );
};

export default MainChefDetail;
