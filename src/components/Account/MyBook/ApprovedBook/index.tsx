import React from "react";
import Image from "next/image";

import { ApprovedIcon } from "@/components/Icons";
import ButtonBtn from "@/components/common/Button";
import CheckNotFound from "@/components/common/CheckNotFound";
import { formatDateReceivedBooking } from "@/utils/convertDate";
import { formatMoney } from "@/utils/formatMoney";

const PendingPage = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-5">
      <CheckNotFound data={data}>
        {
          data?.map((item, index) => (
            <div key={index} className="flex flex-col gap-[3px] shadow-[1px_3px-5px_red]">
              <div className="rounded-b-[6px] p-4 bg-[--clr-white-75] w-full text-[13px] text-[--clr-gray-500]">
                <div className="flex justify-between pb-1 text-[16px] text-[--clr-blue-400]">
                  <span>Sky View - Restaurant</span>
                  <span
                    className="flex gap-2 justify-between items-center"> <ApprovedIcon/><span>Dịch vụ đã được duyệt</span></span>
                </div>
                <hr/>
                <div className="pt-1 flex gap-3">
                  <span>
                    <Image
                      src={item?.comboMenu?.service?.image}
                      width={100} height={100} priority={true} alt="book approved"/>
                  </span>
                  <div className="flex flex-col w-full justify-around">
                    <span className="text-[16px] font-semibold">{item?.comboMenu?.comboName}</span>
                    <span
                      className={"text-[14px] text-[--clr-gray-400]"}>{item?.comboMenu?.description}</span>
                    <div className="flex justify-between items-end w-full text-[14px] font-[500] text-[--clr-red-400]">
                      <span>Tổng tiền : {formatMoney(item?.totalMoney)} VND</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <span>Ngày nhận : {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.comeInAtDate}</span>
                    <span>Thời gian : {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.hourComeInAt} -
                      {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.hourComeOutAt}</span>
                  </div>
                </div>
              </div>
              <div
                className="rrounded-t-[6px] p-4 bg-[--clr-orange-50] text-[13px] text-[--clr-gray-500] flex flex-col justify-end gap-3 w-full items-end">
                <span
                  className="text-[14px] text-[--clr-red-400] font-[500]">Tiền cọc : {formatMoney(item?.depositMoney) || 0} VND</span>
                <div className="flex gap-3">
                  <ButtonBtn width={150} bg="var(--clr-orange-400)" onClick={() => {
                  }}>Thanh toán</ButtonBtn>
                  <ButtonBtn width={150} className="shadow-[0_5px_40px_rgba(0,0,0,0.05)]"
                    onClick={() => {
                    }}>Chat với nhà hàng</ButtonBtn>
                </div>
              </div>
            </div>
          ))
        }
      </CheckNotFound>
    </div>

  );
};

export default PendingPage;