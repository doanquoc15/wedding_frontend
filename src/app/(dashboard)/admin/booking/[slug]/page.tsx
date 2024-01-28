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
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";

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
import { createBooking, getAllFoodByBooking, getBookingById, updateBooking } from "@/services/book";
import { getAllUsers } from "@/services/user";
import { bookingSchema } from "@/libs/validation/tableSchema";
import { formatMoney } from "@/utils/formatMoney";
import { getAllDish } from "@/services/menu-item";
import SearchInFilter from "@/components/common/SearchInFilter";
import BackToTop from "@/components/BackToTop";
import { MESSAGE_SUCCESS } from "@/constants/errors";

const Detail_New_Booking = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setValue,
    getValues,
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
    mode: "onBlur",
  });

  //useState
  const [serviceOption, setServiceOption] = useState<any[]>([]);
  const [comboOption, setComboOption] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [zoneCurrent, setZoneCurrent] = useState<any>("Khu thường");
  const [zones, setZones] = useState<IZones[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [userOption, setUserOption] = useState<IUser[]>([]);
  const [allFoodBooking, setAllFoodBooking] = useState<any[]>([]);
  const [allFoodBookingCurrent, setAllFoodBookingCurrent] = useState<any[]>([]);
  const [numberTb, setNumberTb] = useState<any>(0);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [checkedDishes, setCheckedDishes] = useState<{
    [key: string]: number
  }>({});
  const [isChange, setIsChange] = useState<boolean>(false);
  const [priceService, setPriceService] = useState<any>(0);
  const [priceAllFood, setPriceAllFood] = useState<any>(0);
  const [priceZone, setPriceZone] = useState<any>(0);
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
        value: item?.id,
        price: item?.price
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
    setIsChange(true);
    try {
      const data = await getMenuComboById(id);
      setAllFoodBookingCurrent(data?.comboItems?.map(item => ({
        menuItemId: item.menuItemId,
        dishName: item.menuItem.dishName,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })));

      setAllFoodBooking(data?.comboItems?.map(item => ({
        menuItemId: item.menuItemId,
        dishName: item.menuItem.dishName,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })));

      setTotalMoney(data?.totalPrice + data?.service?.price);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchBookingById = async (id: number) => {
    try {
      const data = await getBookingById(id);
      setNumberTb(data?.numberTable);
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
      setPriceService(data?.comboMenu?.service?.price);
      setPriceZone(data?.zone?.priceRent);
      setZoneCurrent(data?.zone?.zoneName);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleChangeService = (id: number) => {
    setIsChange(true);
    setPriceService(serviceOption?.filter(item => +item?.value === +id)[0]?.price);
    setPriceAllFood(0);
    setAllFoodBooking([]);
    fetchComboById(+id);
  };

  const handleOnClickRadio = (e) => {
    setZoneCurrent(e.target.value);
  };

  const onSubmit = async (data) => {
    let dataItems;
    const timeZone = moment().format("Z");
    const date = moment(data.date).format(SHORT_DATE);
    const comeIn = moment(new Date(date + " " + data.comeInAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    const comeOut = moment(new Date(date + " " + data.comeOutAt)).utc(true)
      .subtract(timeZone, "hours")
      .toISOString();
    console.log(allFoodBooking, allFoodBookingCurrent);
    if (JSON.stringify(allFoodBooking) !== JSON.stringify(allFoodBookingCurrent)) {
      dataItems = [...allFoodBooking];
    } else {
      dataItems = [];
    }

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
      totalMoney: priceAllFood * Number(data.numberTable) + priceZone + priceService,
      depositMoney: (priceAllFood * Number(data.numberTable) + priceZone + priceService) * 15 / 100,
      comboItems: dataItems
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

  //get all food
  const fetchAllFoodBooking = async (bookingId: number) => {
    try {
      const res = await getAllFoodByBooking(bookingId);
      setAllFoodBooking(res);
      setAllFoodBookingCurrent(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  console.log(allFoodBooking);

  //get all food
  const fetchAllDishes = async () => {
    try {
      const { menus } = await getAllDish({ pageSize: 100, search });
      setMenuItems(menus);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleSearch = (querySearch: string) => {
    setSearch(querySearch);
  };

  const handleToggleDish = (menuId, quantity) => {
    if (quantity > 0) {
      const selectedDish = menuItems.find((menu) => menu.id === menuId);
      if (selectedDish) {
        setCheckedDishes((prevChecked) => ({
          ...prevChecked,
          [menuId]: quantity,
        }));
      }
    } else {
      const { [menuId]: deleted, ...rest } = checkedDishes;
      setCheckedDishes(rest);
    }
  };

  function groupDishesByType(dishes) {
    const groupedDishes = dishes.reduce((acc, dish) => {
      const { typeId, typeDish, ...rest } = dish;
      const { id, typeName } = typeDish;

      const foundType = acc.find((group) => group.typeName === typeName);
      const dishInfo = { id, ...rest };

      if (foundType) {
        foundType.dishes.push(dishInfo);
      } else {
        acc.push({
          typeName: typeName,
          dishes: [dishInfo],
        });
      }

      return acc;
    }, []);

    return groupedDishes;
  }

  const handleChange = (e) => {
    e.preventDefault();
    fetchAllFoodBooking(params?.slug);
    fetchBookingById(params?.slug);
    setIsChange(false);
  };

  const handleAddFood = (e) => {
    setIsChange(true);
    e.preventDefault();
    fetchAllDishes();
  };

  useEffect(() => {
    setPriceAllFood(allFoodBooking?.reduce((acc, item) => acc + item?.totalPrice, 0));
  }, [allFoodBooking]);

  function mergeMenuItems(arr1, arr2) {
    const mergedItems = {};

    [...arr1, ...arr2].forEach(item => {
      const existingItem = mergedItems[item.menuItemId];
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.totalPrice;
      } else {
        mergedItems[item.menuItemId] = item;
      }
    });

    return Object.values(mergedItems);
  }

  const handlePushFood = () => {
    // eslint-disable-next-line no-prototype-builtins
    const data = menuItems?.filter(dish => checkedDishes.hasOwnProperty(dish.id));
    const dataFood = data?.map(item => ({
      menuItemId: item?.id,
      dishName: item?.dishName,
      quantity: checkedDishes[item?.id],
      totalPrice: item?.price * checkedDishes[item?.id],
    }));
    setAllFoodBooking(mergeMenuItems(allFoodBooking, dataFood));
  };
  console.log({ allFoodBooking });
  console.log({ allFoodBookingCurrent });
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

  useEffect(() => {
    if (params?.slug === "new") return;
    fetchAllFoodBooking(params?.slug);
    //eslint-disable-next-line
  }, [params?.slug]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className={`flex gap-10 ${params?.slug !== "new" ? "flex-col w-1/3" : "flex-wrap"}  justify-center`}>
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
                  onChange={e => setNumberTb(e.target.value)}
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
          <div className="flex flex-col gap-8 max-w-[400px]">
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
                            setPriceZone(zones?.filter(item => item?.zoneName === event.target.value)[0]?.priceRent || 0);
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
                  error={!!errors.date}
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
        </div>
        {
          params?.slug !== "new" && <div className="flex gap-3">
            <div className={"flex gap-5 flex-col"}>
              <ButtonBtn
                width={200}
                type="submit"
                bg="var(--clr-blue-400)"
                onClick={(e) => handleAddFood(e)}
              >
                <span className="font-semibold">Điều chỉnh</span>
              </ButtonBtn>
              <ButtonBtn
                disabled={!isChange}
                width={200}
                type="submit"
                bg="var(--clr-blue-400)"
                onClick={e => handleChange(e)}
              >
                <span className="font-semibold">Hủy thay đổi</span>
              </ButtonBtn>
            </div>
            <div className="flex flex-col gap-10">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>STT</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>Tên món ăn</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>Số lượng</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>Giá (VND)</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>Tổng giá (VND)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      allFoodBooking?.map((item, index) => (
                        <TableRow
                          key={index}
                          hover
                        >
                          <TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {index + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {item?.dishName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {item?.quantity}
                            </Typography>
                          </TableCell><TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {formatMoney(item?.totalPrice / item?.quantity)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {formatMoney(item?.totalPrice)}
                            </Typography>
                          </TableCell>

                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
                <div className={"flex gap-3 items-center font-semibold text-[15px] text-[--clr-gray-500] "}>
                  <span
                    className="minw-w-[240px]">Tiền món ăn</span><span>{formatMoney(priceAllFood)} vnd / 1 bàn</span>
                </div>
                <div className={"flex gap-3 items-center font-semibold text-[15px] text-[--clr-gray-500]"}>
                  <span className="minw-w-[240px]">Tiền dịch vụ</span><span>{formatMoney(priceService)} vnd</span></div>
                <div className={"flex gap-3 items-center font-semibold text-[15px] text-[--clr-gray-500]"}>
                  <span className="minw-w-[240px]">Tiền thuê khu</span><span>{formatMoney(priceZone)} vnd</span></div>
                <div className={"flex gap-3 items-center font-semibold text-[17px] text-[--clr-gray-500]"}>
                  <span
                    className="minw-w-[240px]">Tổng cộng</span><span>{formatMoney((priceAllFood *
                  Number(getValues("numberTable")) + priceZone + priceService))} vnd</span>
                </div>
              </div>
            </div>
          </div>
        }

      </form>
      <hr className="mt-4"/>
      {
        (isChange && params?.slug !== "new" && groupDishesByType(menuItems).length > 0) && (
          <div className="justify-center flex flex-col mt-5">
            <div className="w-3/5 pl-4">
              <div className="flex items-center gap-5 min-w-[600px]">
                <SearchInFilter
                  onSearch={handleSearch}
                  isResetAll={true}
                  width="450px"
                />
                <ButtonBtn onClick={handlePushFood} width={100}>Thêm món</ButtonBtn>
              </div>
              <div className="overflow-auto sticky w-full">
                {groupDishesByType(menuItems).length > 0 &&
                  groupDishesByType(menuItems)?.map((dish: any, index) => (
                    <div key={index} className="w-full">
                      <div className="flex items-center justify-center max-w-full pr-3">
                        <hr className="border-[1px] border-blue-400 w-full"/>
                        <div className="font-bold text-[16px] mx-2 whitespace-nowrap">
                          {dish.typeName}
                        </div>
                        <hr className="border-[1px] border-blue-400 w-full"/>
                      </div>
                      {dish?.dishes?.map((menu) => (
                        <div
                          key={menu.id}
                          className="flex items-center gap-3 py-4 px-4 cursor-pointer hover:bg-gray-100 w-full"
                        >
                          <Avatar
                            alt="Image food"
                            src={
                              menu.image ||
                              "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                            }
                            sx={{ width: 60, height: 60 }}
                          />
                          <div className="flex items-center w-full flex-1">
                            <div className="flex gap-1">
                              <div className="flex flex-col gap-1 max-w-[200px]">
                                <Typography
                                  variant="body1"
                                  className="whitespace-nowrap text-left"
                                >
                                  {menu.dishName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="whitespace-nowrap text-left truncate w-[190px] italic"
                                >
                                  <Tooltip title={menu?.description}>
                                    {menu?.description || (
                                      <div className="italic">Chưa có mô tả</div>
                                    )}
                                  </Tooltip>
                                </Typography>
                              </div>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                className="block"
                                width={150}
                              >
                                Giá: {formatMoney(menu?.price)} VND
                              </Typography>
                              <div className="flex items-center">
                                <input
                                  className="ml-2 w-[20px] px-2 py-1 border border-gray-300 rounded-lg"
                                  style={{ height: "32px" }}
                                  type="checkbox"
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = isChecked ? 1 : 0;
                                    handleToggleDish(menu.id, value);
                                  }}
                                  checked={!!checkedDishes[menu.id]}
                                />
                                <span className="px-4 text-[--clr-gray-500]">Số lượng</span>
                                <input
                                  type="number"
                                  value={checkedDishes[menu.id] || ""}
                                  onChange={(e) => handleToggleDish(menu.id, parseInt(e.target.value))}
                                  min={0}
                                  className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>)
      }

      <BackToTop/>
    </div>
  );
};
export default Detail_New_Booking;