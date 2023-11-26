import React from "react";
import Image from "next/image";
import StarsIcon from "@mui/icons-material/Stars";

import { ReceivedIcon } from "@/components/Icons";
import { formatMoney } from "@/utils/formatMoney";
import ButtonBtn from "@/components/common/Button";

const PendingPage = () => {
  return (
    <div className="flex flex-col gap-[3px] shadow-[1px_3px-5px_red]">
      <div className="rounded-b-[6px] p-4 bg-[--clr-white-75] w-full text-[13px] text-[--clr-gray-500]">
        <div className="flex justify-between pb-1 text-[16px] text-[--clr-blue-400]">
          <span>Sky View - Restaurant</span>
          <span
            className="flex gap-2 justify-between items-center"> <ReceivedIcon/><span>Dịch vụ đã trãi nghiệm</span></span>
        </div>
        <hr/>
        <div className="pt-1 flex gap-3">
          <span>
            <Image
              src="https://img.freepik.com/free-vector/young-waitress-waiter-object-element-professional-service-restaurant_24797-2133.jpg"
              width={100} height={100} priority={true} alt="book pending"/>
          </span>
          <div className="flex flex-col w-full justify-around">
            <span className="text-[16px] font-semibold">Tiệc cuối năm</span>
            <span
              className={"text-[14px] text-[--clr-gray-400]"}>Bao gồm các món ăn phục vụ cho các buổi tiệc cuối năm.</span>
            <div className="flex justify-between items-end w-full text-[14px] font-[500] text-[--clr-red-400]">
              <span>Tổng tiền : {formatMoney(12000000)} VND</span>
              <span>Đã cọc : {formatMoney(12000000)} VND</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="rrounded-t-[6px] p-4 bg-[--clr-orange-50] text-[13px] text-[--clr-gray-500] flex justify-end gap-3 w-full items-center">
        <ButtonBtn startIcon={<StarsIcon/>} width={150} bg="var(--clr-orange-350)" onClick={() => {
        }}>Đánh giá</ButtonBtn>
        <ButtonBtn width={150} bg="var(--clr-blue-400)" onClick={() => {
        }}>Đặt lại</ButtonBtn>
      </div>
    </div>
  );
};

export default PendingPage;