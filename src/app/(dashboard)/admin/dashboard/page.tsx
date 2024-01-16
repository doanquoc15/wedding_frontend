"use client";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Skeleton } from "@mui/lab";
import Image from "next/legacy/image";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import icon_bag from "@/statics/images/ic_glass_bag.png";
import icon_user from "@/statics/images/ic_glass_users.png";
import icon_service from "@/statics/images/ic_glass_message.png";
import icon_dish from "@/statics/images/ic_glass_dish.png";
import icon_combo from "@/statics/images/ic_glass_buy.png";
import payment from "@/statics/images/payment.png";
import deposit from "@/statics/images/deposit.png";
import { getAllUsers } from "@/services/user";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { getAllBooking, getCountBookingMonth, getPercentBooking } from "@/services/book";
import { getAllService } from "@/services/service";
import { getAllDish } from "@/services/menu-item";
import { getAllComboMenu } from "@/services/combo";
import ManagementChart from "@/app/(dashboard)/admin/charts/ManagementChart";
import TwoSimplePieChart from "@/app/(dashboard)/admin/charts/TwoSimplePieChart";
import { formatMoney } from "@/utils/formatMoney";
import LineCharts from "@/app/(dashboard)/admin/charts/LineCharts";

const currentYear = new Date().getFullYear();

const HomeDashBoard = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  const [totalComboMenu, setTotalComboMenu] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<any>(currentYear);
  const [percentBooking, setPercentBooking] = useState<any>([]);
  const [allBooking, setAllBooking] = useState<any>([]);
  const [allPayment, setAllPayment] = useState<any>(0);
  const [depositPayment, setDepositPayment] = useState<any>(0);
  const [pendingDepositPayment, setPendingDepositPayment] = useState<any>(0);
  const [countBooking, setCountBooking] = useState<any>([]);

  //const
  const dispatch = useAppDispatch();

  //fetch all user
  const fetchAllUsers = async () => {
    try {
      const { total } = await getAllUsers({ pageSize: 100 });
      setTotalUser(total);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };
  const fetchAllBooking = async () => {
    try {
      const { total } = await getAllBooking({ pageSize: 100 });
      setTotalBooking(total);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  console.log(filterDate, currentYear);

  const getPendingDeposit = (data) => {
    const dataApproved = data?.filter(item => item?.status === "APPROVED")[0]?.data;
    const dataFinished = data?.filter(item => item?.status === "RECEIVED")[0]?.data;
    const allData = dataApproved.concat(dataFinished);
    const dataPEndingDeposit = allData?.filter(item => item?.statusPayment === "DEPOSIT");

    return dataPEndingDeposit.reduce((total, item) => total + (item?.totalMoney - item.depositMoney), 0);
  };

  const fetchAllService = async () => {
    setLoading(true);
    try {
      const { total } = await getAllService({ pageSize: 1000 });
      setTotalService(total);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDishes = async () => {
    try {
      const { total } = await getAllDish({ pageSize: 100 });
      setTotalDishes(total);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchAllComboMenu = async () => {
    setLoading(true);
    try {
      const { total } = await getAllComboMenu({ pageSize: 100 });
      setTotalComboMenu(total);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const setColor = {
    NEW: "var(--clr-green-400)",
    PENDING: "var(--clr-orange-400)",
    FINISHED: "var(--clr-gray-500)",
    APPROVED: "var(--clr-blue-400)",
    REJECTED: "var(--clr-red-400)",
  };

  const changeDate = (e) => {
    const utcDate = moment(e).utc(true).format("YYYY");

    setFilterDate(utcDate);
  };

  const calculatorStatusPayment = (data, statusBooking, statusPayment) => {
    const type = statusPayment === "PAID" ? "totalMoney" : "depositMoney";
    const dataStatusBooking = data?.filter(item => item?.status === statusBooking)[0]?.data;
    const dataStatusPayment = dataStatusBooking?.filter(item => item?.statusPayment === statusPayment);
    return dataStatusPayment?.reduce((total, item) => total + item?.[type], 0);
  };

  const fetchPercentBooking = async () => {
    setLoading(true);
    try {
      const data = await getPercentBooking();
      setAllPayment(calculatorStatusPayment(data, "RECEIVED", "PAID"));
      const deposit = calculatorStatusPayment(data, "PENDING", "DEPOSIT") + calculatorStatusPayment(data, "NEW", "DEPOSIT")
        + calculatorStatusPayment(data, "RECEIVED", "DEPOSIT") + calculatorStatusPayment(data, "APPROVED", "DEPOSIT");
      setAllPayment(calculatorStatusPayment(data, "RECEIVED", "PAID"));
      setDepositPayment(deposit);
      setPendingDepositPayment(getPendingDeposit(data));
      setAllBooking(data);
      setPercentBooking(data?.map(item => ({
        name: item?.status,
        value: item?.data?.length,
        color: setColor[item?.status],
        percent: item?.percent,
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchCountBookingMonth = async () => {
    try {
      const data = await getCountBookingMonth(filterDate);
      setCountBooking(data);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  const getTotalBooking = (data) => {
    return data.reduce((total, item) =>
      total + item?.value, 0
    );
  };

  const calculatorPayment = (data) => {
    const receivedAndPaid = data.find(item => item.status === "RECEIVED");
    let receivedAndPaidTotalMoney = 0;

    if (receivedAndPaid) {
      receivedAndPaidTotalMoney = receivedAndPaid.data
        .filter(entry => entry.statusBooking === "APPROVED" && entry.statusPayment === "PAID")
        .reduce((total, entry) => total + entry.totalMoney, 0);
    }

    return receivedAndPaidTotalMoney;
  };

  //useEffect
  useEffect(() => {
    fetchAllUsers();
    fetchAllBooking();
    fetchAllService();
    fetchAllDishes();
    fetchAllComboMenu();
  }, []);

  useEffect(() => {
    fetchPercentBooking();
  }, []);

  useEffect(() => {
    console.log(1);
    fetchCountBookingMonth();
  }, [filterDate]);

  return (
    <div>
      {/*ManagementChart*/}
      {/*<DatePicker*/}
      {/*  views={["month", "year"]}*/}
      {/*  label="month/year"*/}
      {/*  inputFormat="MM/YYYY"*/}
      {/*  value={filterDate}*/}
      {/*  onChange={(e) => changeDate(e)}*/}
      {/*  renderInput={(params) => <TextField {...params} helperText={null}/>}*/}
      {/*/>*/}

      <span className="text-[20px] font-bold my-10 block">Tổng quát</span>
      <div className="flex gap-5 justify-between">
        <ManagementChart icon={icon_user} total={totalUser} title="" subTitle="người dùng"/>
        <ManagementChart icon={icon_bag} total={totalBooking} title="" subTitle="đơn hàng"/>
        <ManagementChart icon={icon_service} total={totalService} title="" subTitle="dịch vụ"/>
        <ManagementChart icon={icon_dish} total={totalDishes} title="" subTitle="món ăn"/>
        <ManagementChart icon={icon_combo} total={totalComboMenu} title="" subTitle="combo"/>
      </div>
      <hr className="border-b-[2px] border-l-amber-600 mt-4 mb-4"/>
      <div className="w-full bg-white h-[194px] flex items-center justify-evenly mb-6">
        <div className="relative">
          <div className="absolute z-10 top-[34%] left-[10%]">
            <div className="text-clr-gray-125 text-xl">Nhận cọc</div>
            <div
              className="text-clr-gray-125 text-2xl">{formatMoney(depositPayment)} VND
            </div>
          </div>
          <Image alt="Request card" src={payment}/>
        </div>
        <div className="relative">
          <div className="absolute z-10 top-[34%] left-[10%]">
            <div className="text-clr-gray-125 text-xl">Thanh toán hết</div>
            <div
              className="text-clr-gray-125 text-2xl">{formatMoney(allPayment)} VND
            </div>
          </div>
          <Image alt="Request card" src={deposit}/>
        </div>
        <div className="relative">
          <div className="absolute z-10 top-[34%] left-[10%]">
            <div className="text-clr-gray-125 text-xl">Chờ thanh toán</div>
            <div
              className="text-clr-gray-125 text-2xl">{formatMoney(pendingDepositPayment)} VND
            </div>
          </div>
          <Image alt="Request card" src={payment}/>
        </div>
      </div>

      <div className="flex gap-5 justify-between">
        {
          percentBooking?.length > 0 ? percentBooking?.map((item, index) => (
            <TwoSimplePieChart key={index}
              data={[item, { value: getTotalBooking(percentBooking) - +item.value, color: "#F2F2F2" }]}/>
          )) :
            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} variant="circular" width={150} height={150}/>)
        }
      </div>
      <span className="text-[20px] font-bold py-10 block">Biểu đồ đơn hàng kết hoàn thành</span>
      <div className=" flex flex-col gap-8">
        {/*ManagementChart*/}
        <DatePicker
          views={["year"]}
          label="year"
          inputFormat="YYYY"
          value={filterDate.toString()}
          onChange={(e) => changeDate(e)}
          renderInput={(params) => <TextField {...params} value={filterDate.toString()} helperText={null}/>}
          className="max-w-[200px]"
        />
        <LineCharts data={countBooking}/>
      </div>
    </div>
  );
};
export default HomeDashBoard;