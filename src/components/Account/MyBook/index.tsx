import React, { useEffect, useState } from "react";
import moment from "moment";

import { ApprovedIcon, CancelIcon, PendingIcon, ReceivedIcon } from "@/components/Icons";
import TabCustom from "@/components/common/TabCustom";
import PendingPage from "@/components/Account/MyBook/PendingBook";
import ApprovedPage from "@/components/Account/MyBook/ApprovedBook";
import ReceivedPage from "@/components/Account/MyBook/ReceivedBook";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getAllBookingByUser } from "@/services/book";
import { LONG_DATE } from "@/constants/common";
import RejectedPage from "@/components/Account/MyBook/RejectedBook";

const MyBookService = () => {
  //useState
  const [allBook, setAllBook] = useState([]);
  const [pendingBooking, setPendingBooking] = useState([]);
  const [approvedBooking, setApprovedBooking] = useState([]);
  const [receivedBooking, setReceivedBooking] = useState([]);
  const [rejectedBooking, setRejectedBooking] = useState([]);

  //const
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  //functions

  const getAllBook = async () => {
    try {
      const res = await getAllBookingByUser(user?.id);

      const currentDate = new Date(moment().format(LONG_DATE));

      setPendingBooking(
        res?.filter(
          item =>
            item?.statusBooking === "PENDING" &&
            new Date(moment(item?.comeInAt).format(LONG_DATE)).getTime() > currentDate.getTime()
        )
      );

      setApprovedBooking(
        res?.filter(
          item =>
            item?.statusBooking === "APPROVED" &&
            new Date(moment(item?.comeInAt).format(LONG_DATE)).getTime() > currentDate.getTime()
        )
      );

      setReceivedBooking(
        res?.filter(
          item =>
            item?.statusBooking === "APPROVED" &&
            new Date(moment(item?.comeInAt).format(LONG_DATE)).getTime() <= currentDate.getTime() &&
            item?.statusPayment === "PAID"
        )
      );

      setRejectedBooking(
        res?.filter(
          item =>
            (item?.statusBooking === "REJECTED" && item?.statusPayment === "UNPAID") ||
            (new Date(moment(item?.comeInAt).format(LONG_DATE)).getTime() <= currentDate.getTime() && item?.statusBooking === "PENDING")
        )
      );

      setAllBook(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  //useEffect
  useEffect(() => {
    getAllBook();
  }, []);

  const data = [
    {
      id: 0,
      label: "Chờ xác nhận",
      icon: <PendingIcon/>,
      componentContent: (
        <PendingPage data={pendingBooking} reFetchData={getAllBook}/>
      ),
    },
    {
      id: 1,
      label: "Đã xác nhận",
      icon: <ApprovedIcon/>,
      componentContent: (
        <ApprovedPage data={approvedBooking}/>
      ),
    },
    {
      id: 2,
      label: "Hoàn thành",
      icon: <ReceivedIcon/>,
      componentContent: (
        <ReceivedPage data={receivedBooking}/>
      ),
    },
    {
      id: 3,
      label: "Đã hủy",
      icon: <CancelIcon/>,
      componentContent: (
        <RejectedPage data={rejectedBooking} reFetchData={getAllBook}/>
      ),
    },
  ];
  return (
    <div>
      <TabCustom data={data}/>
    </div>
  );
};

export default MyBookService;