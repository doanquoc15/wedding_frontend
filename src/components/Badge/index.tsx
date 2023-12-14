"use client";

import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import InfiniteScroll from "react-infinite-scroll-component";

import Bell from "@/statics/svg/bell.svg";
import Notification from "@/components/Notification";
import closeIcon from "@/statics/svg/ic-closeBadge.svg";
import { SocketContext } from "@/context/sockets";
import { getUserLocal } from "@/services/getUserLocal";
import { useAppDispatch } from "@/stores/hook";
import { usersReducer } from "@/stores/reducers/user";

const LIST_NOTIFICATION_SIZE = 10;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "var(--clr-red-550)",
  },
}));

const BadgeCustom = ({ notifications }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIST_NOTIFICATION_SIZE);

  const open = Boolean(anchorEl);
  const socketIo = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadMoreData = () => {
    setPageSize((pageSize) => pageSize + LIST_NOTIFICATION_SIZE);
  };

  const needLoadMore = pageSize < 10;
  useEffect(() => {
    socketIo.emit("join", getUserLocal()?.id);
  }, [socketIo, getUserLocal()?.id]);

  const handleClickNotification = (updatedRead) => {
    if (!updatedRead.isRead) {
      dispatch(usersReducer.actions.setReadNotification(updatedRead?.id));
      socketIo.emit("updatedRead", updatedRead?.id);
      socketIo.on("updatedRead", (data) => {
        return;
      });
    }

    if (socketIo) {
      socketIo.off("updatedRead");
    }
    handleClose();
  };

  return (
    <div className="relative">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Thông báo">
          <IconButton
            onClick={handleClick}
            sx={{
              "&.MuiIconButton-root:hover": {
                backgroundColor: "#deede7",
              },
            }}
            aria-label="cart"
          >
            <StyledBadge
              badgeContent={
                notifications?.filter((item) => !item?.isRead).length
              }
              color="secondary"
            >
              <Image src={Bell} alt="Bell icon" />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: 324,
            ul: {
              padding: "0px !important",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <div className=" px-4 py-2 flex justify-between w-full items-center">
          <span className="text-[13px] text-clr-gray-500 font-bold ">
            Thông báo
          </span>
          <div className="flex items-center">
            <span className="mr-4 text-[10px] font-normal text-clr-gray-500 cursor-pointer hover:text-clr-blue-400">
              Đã đọc tất cả
            </span>
            <div onClick={handleClose}>
              <Image
                className="cursor-pointer"
                src={closeIcon}
                alt="Close icon"
              />
            </div>
          </div>
        </div>
        <Divider />
        <InfiniteScroll
          dataLength={pageSize}
          next={loadMoreData}
          hasMore={needLoadMore}
          loader={null}
          height={200}
        >
          {notifications.length > 0 &&
            notifications.map((item, index) => {
              return (
                <Notification
                  isUnRead={item?.isRead}
                  handleClickNotification={handleClickNotification}
                  item={item}
                  key={index}
                />
              );
            })}
        </InfiniteScroll>
      </Menu>
    </div>
  );
};

export default BadgeCustom;
