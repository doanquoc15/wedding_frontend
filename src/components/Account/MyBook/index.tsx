import React, { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { ApprovedIcon, CancelIcon, PendingIcon, ReceivedIcon } from "@/components/Icons";
import TabCustom from "@/components/common/TabCustom";
import PendingPage from "@/components/Account/MyBook/PendingBook";
import ApprovedPage from "@/components/Account/MyBook/ApprovedBook";
import ReceivedPage from "@/components/Account/MyBook/ReceivedBook";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getAllBookingByUser, updateStatusBooking } from "@/services/book";
import RejectedPage from "@/components/Account/MyBook/RejectedBook";
import NewBookingPage from "@/components/Account/MyBook/NewBook";
import { getUserLocal } from "@/services/getUserLocal";

const MyBookService = () => {
  //useState
  const [allBook, setAllBook] = useState([]);
  const [newBooking, setNewBooking] = useState([]);
  const [pendingBooking, setPendingBooking] = useState([]);
  const [approvedBooking, setApprovedBooking] = useState([]);
  const [receivedBooking, setReceivedBooking] = useState([]);
  const [rejectedBooking, setRejectedBooking] = useState([]);

  //const
  const dispatch = useAppDispatch();
  const user = getUserLocal();

  //functions

  const getAllBook = async () => {
    try {
      const res = await getAllBookingByUser(user?.id);
      setNewBooking(
        res?.filter(
          item =>
            item?.statusBooking === "NEW"
        )
      );
      setPendingBooking(
        res?.filter(
          item =>
            item?.statusBooking === "PENDING"
        )
      );

      setApprovedBooking(
        res?.filter(
          item =>
            item?.statusBooking === "APPROVED"
        )
      );

      setReceivedBooking(
        res?.filter(
          item =>
            item?.statusBooking === "FINISHED"
        )
      );

      setRejectedBooking(
        res?.filter(
          item => item?.statusBooking === "REJECTED"
        ));

      setAllBook(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  const updateStatusBookings = async (id, status) => {
    try {
      await updateStatusBooking(id, status);
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
        <PendingPage data={newBooking} reFetchData={getAllBook}/>
      ),
    },
    {
      id: 1,
      label: "Tạm dừng & Xác nhận thêm",
      icon: <AutorenewIcon/>,
      componentContent: (
        <NewBookingPage data={pendingBooking} reFetchData={getAllBook}/>
      ),
    },
    {
      id: 2,
      label: "Đã xác nhận",
      icon: <ApprovedIcon/>,
      componentContent: (
        <ApprovedPage data={approvedBooking}/>
      ),
    },
    {
      id: 3,
      label: "Hoàn thành",
      icon: <ReceivedIcon/>,
      componentContent: (
        <ReceivedPage data={receivedBooking}/>
      ),
    },
    {
      id: 4,
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