"use client";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Skeleton } from "@mui/lab";
import Image from "next/legacy/image";

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
import { getAllBooking, getPercentBooking } from "@/services/book";
import { getAllService } from "@/services/service";
import { getAllDish } from "@/services/menu-item";
import { getAllComboMenu } from "@/services/combo";
import ManagementChart from "@/app/(dashboard)/admin/charts/ManagementChart";
import TwoSimplePieChart from "@/app/(dashboard)/admin/charts/TwoSimplePieChart";
import { formatMoney } from "@/utils/formatMoney";

const HomeDashBoard = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  const [totalComboMenu, setTotalComboMenu] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<any>("");
  const [percentBooking, setPercentBooking] = useState<any>([]);
  const [allBooking, setAllBooking] = useState<any>([]);

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
    const utcDate = moment(e).utc(true);
    setFilterDate(utcDate);
  };

  const fetchPercentBooking = async () => {
    setLoading(true);
    try {
      const data = await getPercentBooking();
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
      <div className="w-full bg-white h-[194px] flex items-center justify-evenly mb-6">
        <div className="relative">
          <div className="absolute z-10 top-[34%] left-[10%]">
            <div className="text-clr-gray-125 text-xl">Doanh thu</div>
            <div
              className="text-clr-gray-125 text-2xl">{formatMoney(calculatorPayment(allBooking))} VND
            </div>
          </div>
          <Image alt="Request card" src={payment}/>
        </div>
        <div className="relative">
          <div className="absolute z-10 top-[34%] left-[10%]">
            <div className="text-clr-gray-125 text-xl">Thanh toán</div>
            <div
              className="text-clr-gray-125 text-2xl">1000
            </div>
          </div>
          <Image alt="Request card" src={deposit}/>
        </div>
      </div>
      <span className="text-[20px] font-bold mb-3">Tổng quát</span>
      <div className="flex gap-5 justify-between">
        <ManagementChart icon={icon_user} total={totalUser} title="" subTitle="người dùng"/>
        <ManagementChart icon={icon_bag} total={totalBooking} title="" subTitle="đơn hàng"/>
        <ManagementChart icon={icon_service} total={totalService} title="" subTitle="dịch vụ"/>
        <ManagementChart icon={icon_dish} total={totalDishes} title="" subTitle="món ăn"/>
        <ManagementChart icon={icon_combo} total={totalComboMenu} title="" subTitle="combo"/>
      </div>

      <span className="text-[20px] font-bold mb-3">Đơn hàng</span>
      <div className="flex gap-5 justify-between">
        {
          percentBooking?.length > 0 ? percentBooking?.map((item, index) => (
            <TwoSimplePieChart key={index}
              data={[item, { value: getTotalBooking(percentBooking) - +item.value, color: "#F2F2F2" }]}/>
          )) :
            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} variant="circular" width={150} height={150}/>)
        }
      </div>
    </div>
  );
};
export default HomeDashBoard;