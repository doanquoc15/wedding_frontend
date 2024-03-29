import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import ButtonBtn from "@/components/common/Button";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { IDetailModalBookProps, IZones } from "@/types/common";
// eslint-disable-next-line import/order
import { getAllZones } from "@/services/zone";

import { getServiceById } from "@/services/service";
import { formatMoney } from "@/utils/formatMoney";
import TimePickerField from "@/components/common/TimePickerField";
import Clock from "@/statics/svg/ic-clock.svg";
import DatePickerField from "@/components/common/DatePickerField";
import stylesCommon from "@/constants/style";
import { SHORT_DATE } from "@/constants/common";
import { createBooking, updatePaymentBooking } from "@/services/book";
import { getUserLocal } from "@/services/getUserLocal";
import { NEXT_PUBLIC_PK_STRIPE_KEY } from "@/app/constant.env";
import { paymentCheckout } from "@/services/payment";
import { getMenuComboById } from "@/services/combo";
import { LocalStorage } from "@/shared/config/localStorage";
import { tableSchema } from "@/libs/validation/tableSchema";

import { CheckIcon } from "../Icons";
import BpRadio from "../common/BpRadio";
import LoadingButton from "../common/Loading";

const DetailModalBook = (props: IDetailModalBookProps) => {
  //useStateIDetailModalBookProps
  const [zones, setZones] = useState<IZones[]>();
  const [zoneCurrent, setZoneCurrent] = useState<string>();
  const [service, setService] = useState<any>();
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>();

  //varible
  const dispatch = useAppDispatch();
  const { handleClickCancel, serviceId, comboMenuId, priceTotalDish, comboMenuItem } = props;

  //useForm
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(tableSchema),
    defaultValues: {
      numberTable: 0,
      numberOfGuest: 0,
      date: undefined,
      fullName: "",
      email: "",
      phone: "",
      zone: "",
      comeInAt: "",
      comeOutAt: "",
    },
    mode: "all",
  });

  //useState
  const [priceDesposit, setPriceDesposit] = useState<any>();
  const [allFoodBooking, setAllFoodBooking] = useState<any[]>([]);

  //functions

  const getAllFoodCurrent = async (id: number) => {
    try {
      const data = await getMenuComboById(id);
      setAllFoodBooking(data?.comboItems?.map(item => ({
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        menuItemId: item.menuItemId,
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };
  const onSubmit = async (data: any) => {
    const timeZone = moment().format("Z");
    const date = moment(new Date(data.date)).format(SHORT_DATE);
    const comeIn = moment(new Date(date + " " + data.comeInAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    const comeOut = moment(new Date(date + " " + data.comeOutAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    try {
      const dataBook = {
        ...data,
        numberTable: Number(data.numberTable),
        numberOfGuest: Number(data.numberOfGuest),
        toTime: moment(data.date).format(SHORT_DATE),
        zoneId: zones?.filter((item) => item.zoneName === zoneCurrent)[0].id,
        comeInAt: comeIn,
        comeOutAt: comeOut,
        serviceId,
        comboMenuId,
        totalMoney: calculatorAllPrice(+data.numberTable),
        depositMoney: calculatorAllPrice(+data.numberTable) * 15 / 100,
        comboItems: JSON.stringify(comboMenuItem) === JSON.stringify(allFoodBooking) ? [] : comboMenuItem,
        userId: getUserLocal()?.id
      };
      const { booking } = await createBooking(dataBook);
      LocalStorage.add("id", booking?.id);
      setPriceDesposit(calculatorAllPrice(data.numberTable) * 15 / 100 / 100);

      setBooking(booking);
      setIsPayment(true);
      dispatch(statusApiReducer.actions.setMessageSuccess("Đặt bàn thành công !"));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchServiceById = async (serviceId: number) => {
    try {
      const res = await getServiceById(serviceId);
      setService(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  //all price
  const calculatorAllPrice = (numberTable ?: number) => {
    const priceZone = zones?.filter(item => item?.zoneName === zoneCurrent)[0]?.priceRent || 0;
    const priceService = service?.price;
    return priceZone + priceService + priceTotalDish * (numberTable || 1);
  };

  // payment integration
  const makePayment = async () => {
    const cart = [{ id: 1, name: "Đặt cọc trước", quantity: 1, price: priceDesposit }];

    const idB = Number(LocalStorage.get("id")) || booking?.id;

    await updatePaymentBooking(idB, { statusPayment: "DEPOSIT" });
    setIsCheckout(true);
    try {
      if (!NEXT_PUBLIC_PK_STRIPE_KEY) {
        dispatch(statusApiReducer.actions.setMessageError("Stripe key không tồn tại! Thử lại sau!"));
        return;
      }

      const stripe: any = await loadStripe(NEXT_PUBLIC_PK_STRIPE_KEY);

      const response = await paymentCheckout(cart);

      const result = stripe.redirectToCheckout({
        sessionId: response?.id
      });

      if (result.error) {
        dispatch(statusApiReducer.actions.setMessageError(result.error));
      }
      setIsCheckout(false);

    } catch (error: any) {
      setIsCheckout(false);
      dispatch(statusApiReducer.actions.setMessageError(error.data.message));
    }
  };

  //get all zones
  const fetchZones = async () => {
    try {
      const res = await getAllZones({ pageSize: 100 });
      setZones(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleOnClickRadio = (e) => {
    setZoneCurrent(e.target.value);
  };

  //useEffect
  useEffect(() => {
    fetchZones();
    reset({
      fullName: getUserLocal()?.name,
      email: getUserLocal()?.email,
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!serviceId) return;
    fetchServiceById(serviceId);
    //eslint-disable-next-line
  }, [serviceId]);

  useEffect(() => {
    if (!comboMenuId) return;
    getAllFoodCurrent(comboMenuId);
    //eslint-disable-next-line
  }, [comboMenuId]);

  return (
    <div>
      {
        !isPayment ? (<div className="min-w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Họ và tên
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <TextInputField
                    name="fullName"
                    label=""
                    control={control}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    error={!!errors?.fullName}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.fullName && (
                        <Error message={errors?.fullName?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Email
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <TextInputField
                    name="email"
                    label=""
                    control={control}
                    error={!!errors?.email}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.email && (
                        <Error message={errors?.email?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Số điện thoại
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <TextInputField
                    name="phone"
                    label=""
                    control={control}
                    error={!!errors?.phone}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.phone && (
                        <Error message={errors?.phone?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Lượng khách
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <TextInputField
                    name="numberOfGuest"
                    label=""
                    control={control}
                    error={!!errors?.numberOfGuest}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.numberOfGuest && (
                        <Error message={errors?.numberOfGuest?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Số lượng bàn
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <TextInputField
                    name="numberTable"
                    label=""
                    control={control}
                    error={!!errors?.numberTable}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.numberTable && (
                        <Error message={errors?.numberTable?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Chọn khu
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <FormControl>
                    <Controller
                      control={control}
                      name="zone"
                      render={({ field: { onChange } }) => (
                        <RadioGroup
                          row
                          className="flex flex-row justify-around col-span-1"
                          value={zoneCurrent}
                        >
                          {zones?.map((item, index) => (
                            <FormControlLabel
                              sx={{
                                "& .MuiTypography-root": {
                                  width: "100%",
                                  fontSize: "13px",
                                  color: "#525253",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontFamily: "Nunito Sans",
                                },
                              }}
                              key={index}
                              onChange={(event: any) => {
                                onChange(event);
                                setZoneCurrent(event.target.value);
                                setValue("zone", event.target.value);
                              }}
                              value={item?.zoneName}
                              control={
                                <BpRadio
                                  onClick={(e) => handleOnClickRadio(e)}
                                  value={item.zoneName}
                                />
                              }
                              label={item?.zoneName}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                  <div>
                    <span className="text-[11px] text-gray-400">Giá thuê
                      : {formatMoney(zones?.filter(item => item?.zoneName === zoneCurrent)[0]?.priceRent || 0)} VND</span>

                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                    Ngày đặt
                  <span className="text-[--clr-red-400] mr-5">*</span>
                </div>
                <div className="w-[326px]">
                  <DatePickerField
                    error={!!errors.date}
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
                          readOnly: false,
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
        </div>) :
          <div>
            <div className="text-center text-[16px] font-[600] mt-5">Tổng hóa đơn thanh toán</div>
            <div
              className="min-w-[500px] h-auto p-6 relative flex justify-center flex-col text-[--clr-gray-500] text-[14px]">
              <div className="flex">
                <div className="min-w-[200px]">Tổng tiền món ăn</div>
                {formatMoney(priceTotalDish)} VND
              </div>
              <div className="flex">
                <div className="min-w-[200px]">Tổng tiền dịch
                  vụ
                </div>
                {formatMoney(service?.price)} VND
              </div>
              <div className="flex">
                <div className="min-w-[200px]">Tổng tiền khu vực</div>
                {formatMoney(zones?.filter(item => item?.zoneName === zoneCurrent)[0]?.priceRent || 0)} VND
              </div>
              <div className="flex">
                <div className="min-w-[200px]">Tổng tiền:</div>
                {formatMoney(calculatorAllPrice())} VND
              </div>
              <div className="flex mt-5">
                <div className="min-w-[200px]">Tiền
                  cọc:
                </div>
                {formatMoney(calculatorAllPrice() * 15 / 100)} VND
              </div>
              <div className="text-[--clr-red-400] text-[12px]"><span>*</span> Tiền cọc bằng 15% tổng tiền</div>
              <ButtonBtn startIcon={isCheckout && <LoadingButton/>} onClick={makePayment} sx={{ marginTop: "20px" }}>Thanh
                toán</ButtonBtn>
            </div>
          </div>
      }
    </div>
  );
};
// @ts-ignore
export default DetailModalBook;
