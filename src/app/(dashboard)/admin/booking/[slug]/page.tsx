"use client";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/order
import { Controller, useForm } from "react-hook-form";
// import/no-unresolved
import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Image from "next/legacy/image";
import moment from "moment/moment";
import { yupResolver } from "@hookform/resolvers/yup";

import ButtonBtn from "@/components/common/Button";
import Clock from "@/statics/svg/ic-clock.svg";
import stylesCommon from "@/constants/style";
import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import { useAppDispatch } from "@/stores/hook";
import { getAllService } from "@/services/service";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import SelectField from "@/components/common/SelectField";
import { getAllComboMenu, getMenuComboById } from "@/services/combo";
import BpRadio from "@/components/common/BpRadio";
import { getAllZones } from "@/services/zone";
import { IUser, IZones } from "@/types/common";
import DatePickerField from "@/components/common/DatePickerField";
import TimePickerField from "@/components/common/TimePickerField";
import LoadingButton from "@/components/common/Loading";
import { CheckIcon } from "@/components/Icons";
import { PATH, SHORT_DATE } from "@/constants/common";
import { createBooking, getBookingById, updateBooking } from "@/services/book";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { getAllUsers } from "@/services/user";
import { bookingSchema } from "@/libs/validation/tableSchema";
import { formatMoney } from "@/utils/formatMoney";

const Detail_New_Booking = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      numberTable: 0,
      numberOfGuest: 0,
      date: undefined,
      userId: undefined,
      zoneId: "Khu thường",
      comeInAt: "",
      comeOutAt: "",
      serviceId: undefined,
      comboMenuId: undefined,
    },
    mode: "all",
  });

  //useState
  const [serviceOption, setServiceOption] = useState<any[]>([]);
  const [comboOption, setComboOption] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [zoneCurrent, setZoneCurrent] = useState<any>("Khu thường");
  const [zones, setZones] = useState<IZones[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [userOption, setUserOption] = useState<IUser[]>([]);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  //function
  const fetchAllService = async () => {
    setLoading(true);
    try {
      const { data } = await getAllService({
        pageSize: 1000
      });
      setServiceOption(data?.map(item => ({
        label: item?.serviceName,
        value: item?.id
      })) || []);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { users } = await getAllUsers({ pageSize: 100 });
      setUserOption(users?.map(item => ({
        value: item?.id,
        label: item?.name,
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchZones = async () => {
    try {
      const res = await getAllZones({ pageSize: 100 });
      setZones(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchComboById = async (serviceId: number) => {
    setLoading(true);
    try {
      const { data } = await getAllComboMenu({ pageSize: 100, serviceId: +serviceId || undefined });
      setComboOption(data?.map(item => ({
        label: item?.comboName,
        value: item?.id
      })) || []);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCombo = async (id: number) => {
    try {
      const data = await getMenuComboById(id);
      setTotalMoney(data?.totalPrice + data?.service?.price);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchBookingById = async (id: number) => {
    try {
      const data = await getBookingById(id);
      fetchComboById(data?.serviceId);
      reset({
        userId: data?.userId,
        numberTable: data?.numberTable,
        numberOfGuest: data?.numberOfGuest,
        date: data?.toTime,
        comeInAt: moment(data?.comeInAt).format("HH:mm"),
        comeOutAt: moment(data?.comeOutAt).format("HH:mm"),
        serviceId: data?.serviceId,
        comboMenuId: data?.comboMenuId,
        zoneId: data?.zone?.zoneName
      });
      setZoneCurrent(data?.zone?.zoneName);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleChangeService = (id: number) => {
    fetchComboById(+id);
  };

  const handleOnClickRadio = (e) => {
    setZoneCurrent(e.target.value);
  };

  const onSubmit = async (data) => {
    const zonePrice = zones?.filter(item => item?.zoneName === zoneCurrent)[0]?.priceRent || 0;
    const timeZone = moment().format("Z");
    const date = moment(data.date).format(SHORT_DATE);
    const comeIn = moment(new Date(date + " " + data.comeInAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    const comeOut = moment(new Date(date + " " + data.comeOutAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    const dataBook = {
      ...data,
      numberTable: Number(data.numberTable),
      numberOfGuest: Number(data.numberOfGuest),
      toTime: moment(data.date).format(SHORT_DATE),
      zoneId: zones?.filter(item => item?.zoneName === data?.zoneId)[0]?.id,
      comeInAt: comeIn,
      comeOutAt: comeOut,
      serviceId: +data?.serviceId,
      comboMenuId: +data?.comboMenuId,
      totalMoney: totalMoney + zonePrice,
      depositMoney: (totalMoney + zonePrice) * 15 / 100,
      comboItems: []
    };
    try {
      if (params?.slug === "new") {
        await createBooking(dataBook);
        dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.CREATE_BOOKING_SUCCESS));
      } else {
        await updateBooking(Number(params?.slug), dataBook);
        dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      }
      router.push(PATH.MANAGEMENT_BOOKING);

    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  //useEffect
  useEffect(() => {
    fetchAllUsers();
    fetchAllService();
    fetchZones();
  }, []);
  useEffect(() => {
    if (params?.slug === "new") return;
    fetchBookingById(params?.slug);
    //eslint-disable-next-line
  }, [params?.slug]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10 w-full justify-center">
        {/*Thông tin người đặt*/}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Người đặt</label>
            <div className="w-[326px]">
              <SelectField
                handleChange={handleChangeService}
                name="userId"
                label=""
                labelDisplay=""
                control={control}
                options={userOption}
                className="h-[52px] w-[326px]"
                inputProps={{
                  className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                  maxLength: 256,
                }}
              />
            </div>
          </div>
        </div>
        {/*Thông tin đơn hàng*/}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Số lượng khách</label>
            <div className="w-[326px]">
              <TextInputField
                name="numberOfGuest"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                error={!!errors?.numberOfGuest}
                className="w-full max-h-[40px] input-custom"
                helperText={
                  errors?.numberOfGuest && (
                    <Error message={errors?.numberOfGuest?.message as string}/>
                  )
                }
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-7">
            <label className="text-[#333] font-semibold text-[14px]">Số lượng bàn</label>
            <div className="w-[326px]">
              <TextInputField
                name="numberTable"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                error={!!errors?.numberTable}
                className="w-full max-h-[40px] input-custom"
                helperText={
                  errors?.numberTable && (
                    <Error message={errors?.numberTable?.message as string}/>
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Dịch vụ</label>
            <SelectField
              handleChange={handleChangeService}
              name="serviceId"
              label=""
              labelDisplay=""
              control={control}
              options={serviceOption}
              className="h-[52px] w-[326px]"
              inputProps={{
                className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                maxLength: 256,
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Combo món ăn</label>
            <SelectField
              handleChange={handleChangeCombo}
              name="comboMenuId"
              label=""
              labelDisplay=""
              control={control}
              options={comboOption}
              className="h-[52px] w-[326px]"
              inputProps={{
                className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                maxLength: 256,
              }}
            />
          </div>

        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Khu vực</label>
            <FormControl>
              <Controller
                control={control}
                name="zoneId"
                render={({ field: { onChange } }) => (
                  <RadioGroup
                    row
                    className="flex flex-row justify-around col-span-1"
                    value={zoneCurrent || zones[0]?.zoneName}
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
                          setValue("zoneId", event.target.value);
                        }}
                        value={item?.zoneName}
                        control={
                          <BpRadio
                            onClick={(e) => handleOnClickRadio(e)}
                            value={item?.zoneName}
                          />
                        }
                        label={item?.zoneName}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] text-gray-400">Giá thuê
                      : {formatMoney(zones?.filter(item => item?.zoneName === zoneCurrent)[0]?.priceRent || 0)} VND</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Ngày đặt</label>
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
          <div className="flex flex-col gap-2">
            <label className="text-[#333] font-semibold text-[14px]">Khung giờ</label>
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
        </div>
      </div>
      <div className="flex justify-center mt-[3rem]">
        <ButtonBtn
          disabled={!isValid}
          width={200}
          type="submit"
          startIcon={isSubmitting ? <LoadingButton/> : isValid ? <CheckIcon fill="white"/> : <CheckIcon/>}
          bg={`${isValid ? "var(--clr-blue-400)" : "var(--clr-gray-200)"}`}
        >
          <span className="font-semibold">{params?.slug === "new" ? "Tạo mới" : "Cập nhật"}</span>
        </ButtonBtn>
      </div>
    </form>
  );
};
export default Detail_New_Booking;