import React from "react";
import Image from "next/image";

import { IconDot } from "../Icons";

const MainChefDetail = ({ chef }: any) => {
  return (
    <div className="h-[200px] w-[900px] rounded-[120px] bg-[--clr-orange-500] flex gap-10">

      <div className="h-[200px] w-[200px] rounded-[50%] overflow-hidden bg-white border-[10px] border-white">
        <Image
          src={chef?.img}
          width={500}
          height={300}
          alt="image of chef"
          priority={true}
          objectFit="cover"
        />
      </div>
      {/* Information of chef */}
      <div className="text-white flex flex-col justify-center gap-2">
        <p className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[100px]">Họ và tên</span>
          <span>{chef?.name}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[100px]">Tuổi</span>
          <span>{chef?.age}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[100px]">Địa chỉ</span>
          <span> {chef?.address}</span>
        </p>

        <p className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[100px]">Kinh nghiệm</span>
          <span>{chef?.experience} năm kinh nghiệm</span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <IconDot />
          </span>
          <span className="w-[100px]">Chức vụ</span>
          <span>{chef?.position}</span>
        </p>
      </div>
    </div>
  );
};

export default MainChefDetail;
