import { MenuItem } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import moment from "moment/moment";

import BlueBell from "@/statics/svg/ic-bell.svg";
import RedBell from "@/statics/svg/ic-bellRed.svg";

const Notification = ({ handleClickNotification, isUnRead, item }) => {
  return (
    <>
      <MenuItem onClick={() => handleClickNotification(item)}>
        <Image height={30} width={30} src={isUnRead ? BlueBell : RedBell} alt="Bell"/>
        <div className="flex h-[32px] pt-[2px] flex-col ml-2 w-full text-clr-gray-500 justify-center">
          <div
            className="h-4 text-[13px] max-w-[256px] w-[256px] truncate leading-[12px] text-clr-blue-700 text-normal">
            {item?.title}
          </div>
          <span
            className="text-[#A29F99] text-[10px]">{moment(item?.createdAt).format("DD-MM-YYYY")}</span>
        </div>
      </MenuItem>
      <hr/>
    </>
  );
};

export default Notification;
