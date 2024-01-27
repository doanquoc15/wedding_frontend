import React, { useState } from "react";
import Image from "next/legacy/image";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname, useRouter } from "next/navigation";

import { CheckIcon, PendingIcon } from "@/components/Icons";
import ButtonBtn from "@/components/common/Button";
import CheckNotFound from "@/components/common/CheckNotFound";
import { formatDateReceivedBooking } from "@/utils/convertDate";
import { beforeOneDay } from "@/utils/beforeOneDay";
import { DATE_CALENDAR_SHORT, SHORT_DATE } from "@/constants/common";
import { formatMoney } from "@/utils/formatMoney";
import ModalPopup from "@/components/common/ModalPopup";
import LoadingButton from "@/components/common/Loading";
import { updateBooking, updatePaymentBooking } from "@/services/book";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { ERROR_MESSAGES } from "@/constants/errors";
import { NEXT_PUBLIC_PK_STRIPE_KEY } from "@/app/constant.env";
import { paymentCheckout } from "@/services/payment";
import { getUserLocal } from "@/services/getUserLocal";

interface PendingPageProps {
  data: any;
  reFetchData: any
}

const PendingPage = (props: PendingPageProps) => {
  const { data, reFetchData } = props;

  //useState
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>();
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  //function
  const handleRejectedBooking = async () => {
    setIsLoading(true);
    try {
      await updateBooking(booking?.id, { userId: getUserLocal()?.id, statusPayment: "UNPAID", statusBooking: "REJECTED" });
      dispatch(statusApiReducer.actions.setMessageSuccess(ERROR_MESSAGES.REJECTED_SUCCESS));
      reFetchData();
      setIsOpenModal(false);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenModalRejected = (data: any) => {
    setIsOpenModal(true);
    setBooking(data);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const checkDateRejected = (date: any) => {
    const dateNow = new Date(moment().format(SHORT_DATE));
    const dateRejected = new Date(moment(date).format(SHORT_DATE));
    if (!dateNow || !dateRejected) return;
    if (dateNow.getTime() < dateRejected.getTime()) {
      return true;
    }
    return false;
  };

  //handle payment
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
      dispatch(statusApiReducer.actions.setMessageError(error.data.message));
    }
  };

  //useEffect
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
                    className="flex gap-2 justify-between items-center"> <PendingIcon/><span>Chờ xác nhận</span></span>
                </div>
                <hr/>
                <div className="pt-1 flex gap-3">
                  <span>
                    {
                      item?.comboMenu?.service?.image && <Image
                        src={item?.comboMenu?.service?.image}
                        width={100} height={100} priority={true} alt="book pending"/>
                    }
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
                className="rounded-t-[6px] p-4 bg-[--clr-orange-50] text-[13px] text-[--clr-gray-500] flex flex-col justify-end gap-3 w-full ">
                <span
                  className="text-[14px] text-[--clr-red-400] font-[500] flex justify-end">Tiền cọc : {formatMoney(item?.depositMoney) || 0} VND</span>
                <div className="flex justify-between items-center w-full">
                  <span className="italic">Chỉ được hủy lịch trước ngày <span
                    className="text-[--clr-red-300]">{moment(beforeOneDay(item?.comeInAt)).format(DATE_CALENDAR_SHORT)}</span>
                  </span>
                  <div className="flex gap-3">
                    {
                      item?.statusPayment === "UNPAID" &&
                      <ButtonBtn startIcon={isCheckout && <LoadingButton/>} width={150} bg="var(--clr-blue-400)"
                        onClick={() => handlePayment(item)}>Đặt cọc</ButtonBtn>
                    }
                    <ButtonBtn width={150} bg="var(--clr-red-400)" onClick={() => handleOpenModalRejected(item)}>Hủy đơn
                      hàng</ButtonBtn>
                    <ButtonBtn width={150} bg="var(--clr-green-400)"
                      onClick={() => router.push(`${pathName}/${item?.id}`)}>Chi
                      tiết</ButtonBtn>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </CheckNotFound>
      <ModalPopup
        open={isOpenModal}
        title="Hủy dịch vụ"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          {checkDateRejected(beforeOneDay(booking?.comeInAt)) ? <>
            <div className="flex flex-col gap-4 w-full actual-receipt">
              <div className="py-3 text-[14px] text-[--clr-gray-500]">Bạn có chắc muốn hủy dịch vụ
                {" "}<span className="italic font-semibold">{booking?.comboMenu?.comboName}</span> không ?
              </div>
            </div>
            <div className="flex justify-end mt-[0.25rem] gap-4">
              <ButtonBtn
                width={100}
                bg="var(--clr-orange-400)"
                onClick={handleClickCancel}
                startIcon={<CheckIcon fill="white"/>}
              >
                <span className="font-semibold">Thoát</span>
              </ButtonBtn>
              <ButtonBtn
                width={100}
                bg="var(--clr-blue-400)"
                onClick={handleRejectedBooking}
                startIcon={isLoading && <LoadingButton/>}
              >
                <span className="font-semibold">Hủy</span>
              </ButtonBtn>
            </div>
          </> : <>
            <div className="flex flex-col gap-4 w-full actual-receipt">
              <div className="py-3 text-[14px] text-[--clr-gray-500]">Chỉ có thể hủy trước
                ngày {moment(beforeOneDay(booking?.comeInAt)).format(DATE_CALENDAR_SHORT)}</div>
            </div>
            <div className="flex justify-end mt-[0.25rem] gap-4">
              <ButtonBtn
                width={100}
                bg="var(--clr-orange-400)"
                onClick={handleClickCancel}
                startIcon={<CheckIcon fill="white"/>}
              >
                <span className="font-semibold">Thoát</span>
              </ButtonBtn>
            </div>
          </>}

        </div>
      </ModalPopup>
    </div>

  );
};

export default PendingPage;