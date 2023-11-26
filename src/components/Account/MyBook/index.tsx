import React, { useEffect } from "react";

import { ApprovedIcon, CancelIcon, PendingIcon, ReceivedIcon } from "@/components/Icons";
import TabCustom from "@/components/common/TabCustom";
import PendingPage from "@/components/Account/MyBook/PendingBook";
import ApprovedPage from "@/components/Account/MyBook/ApprovedBook";
import ReceivedPage from "@/components/Account/MyBook/ReceivedBook";
import CancelPage from "@/components/Account/MyBook/CancelBook";
import { getAllBooking } from "@/services/book";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

const MyBookService = () => {
  //useState
  const [allBook, setAllBook] = React.useState([]);

  //const
  const dispatch = useAppDispatch();

  //functions
  const getAllBook = async () => {
    try {
      const res = await getAllBooking({ pageSize: 100 });
      setAllBook(res.booking);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  console.log(allBook);

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
        <PendingPage/>
      ),
    },
    {
      id: 1,
      label: "Đã xác nhận",
      icon: <ApprovedIcon/>,
      componentContent: (
        <ApprovedPage/>
      ),
    },
    {
      id: 2,
      label: "Sử dụng",
      icon: <ReceivedIcon/>,
      componentContent: (
        <ReceivedPage/>
      ),
    },
    {
      id: 3,
      label: "Đã hủy",
      icon: <CancelIcon/>,
      componentContent: (
        <CancelPage/>
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