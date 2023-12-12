import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment/moment";
import { loadStripe } from "@stripe/stripe-js";

import Clock from "@/statics/svg/ic-clock.svg";
import { CancelIcon, CheckIcon } from "@/components/Icons";
import ButtonBtn from "@/components/common/Button";
import CheckNotFound from "@/components/common/CheckNotFound";
import { formatDateReceivedBooking } from "@/utils/convertDate";
import { formatMoney } from "@/utils/formatMoney";
import ModalPopup from "@/components/common/ModalPopup";
import DatePickerField from "@/components/common/DatePickerField";
import stylesCommon from "@/constants/style";
import TimePickerField from "@/components/common/TimePickerField";
import LoadingButton from "@/components/common/Loading";
import { rejectedSchema } from "@/libs/validation/rejectedSchema";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { SHORT_DATE } from "@/constants/common";
import { updateBooking } from "@/services/book";
import { vndToUsa } from "@/utils/vndToUsa";
import { NEXT_PUBLIC_PK_STRIPE_KEY } from "@/app/constant.env";
import { paymentCheckout } from "@/services/payment";

const RejectedPage = (props) => {
  //useState
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(rejectedSchema),
    defaultValues: {
      date: undefined,
      comeInAt: "",
      comeOutAt: "",
    },
  });
  //useState
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>();
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  //const
  const dispatch = useAppDispatch();
  const { data, reFetchData } = props;

  //function
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const handleReBooking = (booking) => {
    setIsOpenModal(true);
    setBooking(booking);
  };

  const onSubmit = async (data) => {
    const timeZone = moment().format("Z");
    const date = moment(data.date).format(SHORT_DATE);

    const comeIn = moment(new Date(date + " " + data.comeInAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    const comeOut = moment(new Date(date + " " + data.comeOutAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();

    const dataBooking = {
      comeInAt: comeIn,
      comeOutAt: comeOut,
      toTime: date,
      statusBooking: "PENDING",
    };
    try {
      await updateBooking(+booking?.id, dataBooking);
      setIsOpenModal(false);
      reFetchData();
      setIsOpenPayment(true);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const calculatorPrice = (params) => {
    const zonePrice = params?.zone?.zoneName == "Khu thường" ? 1500000 : (params?.zone?.zoneName == "Khu vip" ? 4000000 : 0);
    const price = params?.comboMenu?.totalPrice + params?.comboMenu?.service?.price;
    return price + zonePrice;
  };

  // payment integration
  const makePayment = async () => {
    const price = vndToUsa(calculatorPrice(booking) * 15 / 100).toFixed(2);
    const cart = [{ id: 1, name: "Đặt cọc trước", quantity: 1, price }];
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

      await updateBooking(booking?.id, { statusPayment: "PAID" });

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
                    className="flex gap-2 justify-between items-center"> <CancelIcon/><span>Dịch vụ đang đã hủy</span></span>
                </div>
                <hr/>
                <div className="pt-1 flex gap-3">
                  <span>
                    <Image
                      src={item?.comboMenu?.service?.image}
                      width={100} height={100} priority={true} alt="book pending"/>
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
                  <ButtonBtn width={150} bg="var(--clr-green-600)" onClick={() => handleReBooking(item)}>Đặt
                    lại</ButtonBtn>
                  <ButtonBtn width={150} bg="var(--clr-orange-400)" onClick={() => {
                  }}>Hoàn tiền cọc</ButtonBtn>
                </div>
              </div>
            </div>))
        }
      </CheckNotFound>
      <ModalPopup
        open={isOpenModal}
        title="Đặt lại dịch vụ"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Ngày đặt
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <DatePickerField
                  name="date"
                  label=""
                  openTo="day"
                  views={["year", "month", "day"]}
                  control={control}
                  inputFormat="DD/MM/YYYY"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: stylesCommon.inputHeight,
                      fontSize: stylesCommon.primarySize,
                      width: "326px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      required={true}
                      {...params}
                      inputProps={{
                        className: "border-0 w-full cursor-pointer text-[13px]",
                        ...params.inputProps,
                        readOnly: true,
                      }}
                      sx={{
                        "& .MuiFormLabel-root": {
                          fontSize: stylesCommon.primarySize,
                          fontFamily: stylesCommon.fontFamily,
                        }, "& .MuiInputBase-input": {
                          fontSize: stylesCommon.primarySize,
                          fontFamily: stylesCommon.fontFamily,
                        },
                      }}
                      className="w-full flex-1"
                      error={!!errors.date}
                      helperText={errors?.date && errors?.date.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Khung giờ
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px] flex justify-between">
                <div className="w-full flex items-center">
                  <div className="w-10 h-10 text-center flex items-center leading-10 !border-r-0">
                    <Image src={Clock} alt="Clock icon"/>
                  </div>
                  <TimePickerField name="comeInAt" sx={{ width: 200, borderRight: 0 }}
                    control={control}/>
                  <div
                    className="w-10 h-10 text-center leading-10 !border-l-0 !border-r-0 text-[--clr-gray-500]"> -
                  </div>
                  <TimePickerField name="comeOutAt" sx={{ width: 200 }} control={control}/>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-[-0.25rem] gap-4">
              <ButtonBtn
                width={70}
                bg="var(--clr-orange-400)"
                onClick={handleClickCancel}
              >
                <span className="font-semibold">Thoát</span>
              </ButtonBtn>
              <ButtonBtn
                disabled={!isValid}
                width={100}
                type="submit"
                startIcon={isSubmitting ? <LoadingButton/> : isValid ? <CheckIcon fill="white"/> : <CheckIcon/>}
                bg={`${isValid ? "var(--clr-blue-400)" : "var(--clr-gray-200)"}`}
              >
                <span className="font-semibold">Đặt</span>
              </ButtonBtn>
            </div>
          </form>
        </div>
      </ModalPopup>
      <ModalPopup open={isOpenPayment}
        title="Đặt lại dịch vụ"
        setOpen={setIsOpenPayment}
        closeModal={handleCloseModal}>
        <div className="min-w-[500px] h-auto p-6 relative">
          <div>
            <div className="text-center text-[16px] font-[600] mt-5">Tổng hóa đơn thanh toán</div>
            <div
              className="min-w-[500px] h-auto p-6 relative flex justify-center flex-col text-[--clr-gray-500] text-[14px]">
              <div className="flex"><div className="min-w-[200px]">Tổng tiền món
                ăn</div> {formatMoney(booking?.comboMenu?.totalPrice)} VND
              </div>
              <div className="flex"><div className="min-w-[200px]">Tổng tiền dịch
                vụ</div> {formatMoney(booking?.comboMenu?.service?.price)} VND
              </div>
              <div className="flex"><div className="min-w-[200px]">Tổng tiền khu vực</div>
                {booking?.zone?.zoneName == "Khu thường" ? formatMoney(1500000) : (booking?.zone?.zoneName == "Khu vip" ? formatMoney(4000000) : 0)} VND
              </div>
              <div className="flex"><div className="min-w-[200px]">Tổng
                tiền:</div> {formatMoney(calculatorPrice(booking))} VND
              </div>
              <div className="flex mt-5"><div className="min-w-[200px]">Tiền
                cọc:</div> {formatMoney(calculatorPrice(booking) * 15 / 100)} VND
              </div>
              <div className="text-[--clr-red-400] text-[12px]"><span>*</span> Tiền cọc bằng 15% tổng tiền</div>
              <ButtonBtn startIcon={isCheckout && <LoadingButton/>} onClick={makePayment} sx={{ marginTop: "20px" }}>Thanh
                toán</ButtonBtn>
            </div>
          </div>
        </div>
      </ModalPopup>
    </div>
  );
};

export default RejectedPage;