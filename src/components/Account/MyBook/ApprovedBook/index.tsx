import React, { useState } from "react";
import Image from "next/legacy/image";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname, useRouter } from "next/navigation";

import { ApprovedIcon } from "@/components/Icons";
import ButtonBtn from "@/components/common/Button";
import CheckNotFound from "@/components/common/CheckNotFound";
import { formatDateReceivedBooking } from "@/utils/convertDate";
import { formatMoney } from "@/utils/formatMoney";
import LoadingButton from "@/components/common/Loading";
import { NEXT_PUBLIC_PK_STRIPE_KEY } from "@/app/constant.env";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { paymentCheckout } from "@/services/payment";
import { updatePaymentBooking } from "@/services/book";
import { useAppDispatch } from "@/stores/hook";

const PendingPage = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();
  const handlePayment = async (item) => {
    const cart = [{ id: 1, name: "Đặt cọc trước", quantity: 1, price: item?.depositMoney / 100 }];
    setIsCheckout(true);
    try {
      if (!NEXT_PUBLIC_PK_STRIPE_KEY) {
        dispatch(statusApiReducer.actions.setMessageError("Stripe key không tồn tại"));
        return;
      }
      const stripe: any = await loadStripe(NEXT_PUBLIC_PK_STRIPE_KEY);

      const response = await paymentCheckout(cart);

      const result = stripe.redirectToCheckout({
        sessionId: response?.id
      });

      await updatePaymentBooking(+item?.id, { statusPayment: "DEPOSIT" });

      if (result.error) {
        dispatch(statusApiReducer.actions.setMessageError(result.error));
      }
      setIsCheckout(false);

    } catch (error: any) {
      setIsCheckout(false);
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };
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
                className="rounded-t-[6px] p-4 bg-[--clr-orange-50] text-[13px] text-[--clr-gray-500] flex flex-col justify-end gap-3 w-full items-end">
                <span
                  className="text-[14px] text-[--clr-red-400] font-[500]">Tiền cọc : {formatMoney(item?.depositMoney) || 0} VND</span>
                <div className="flex gap-3">
                  {
                    item?.statusPayment === "UNPAID" &&
                      <ButtonBtn startIcon={isCheckout && <LoadingButton/>} width={150} bg="var(--clr-blue-400)"
                        onClick={() => handlePayment(item)}>Đặt cọc</ButtonBtn>
                  }
                  <ButtonBtn width={150} bg="var(--clr-green-400)"
                    onClick={() => router.push(`${pathName}/${item?.id}`)}>Chi
                    tiết</ButtonBtn>
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