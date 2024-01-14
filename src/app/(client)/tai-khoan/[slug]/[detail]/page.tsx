"use client";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import moment from "moment";

import { getAllFoodByBooking, getBookingById } from "@/services/book";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { getServiceById } from "@/services/service";
import { getUserById } from "@/services/user";
import { IService, IUser, IZones } from "@/types/common";
import { formatMoney } from "@/utils/formatMoney";
import { getAllZones } from "@/services/zone";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--clr-gray-100)",
    color: "var(--clr-gray-500)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const DetailBookingPage = ({ params: { detail } }) => {
  //useState
  const [detailBooking, setDetailBooking] = useState<any>({});
  const [service, setService] = useState<IService>();
  const [user, setUser] = useState<IUser>();
  const [allFoodBooking, setAllFoodBooking] = useState<any[]>([]);
  const [zones, setZones] = useState<IZones[]>([]);
  //const
  const dispatch = useAppDispatch();
  //function
  const fetchBookingById = async (id: number) => {
    try {
      const data = await getBookingById(id);
      setDetailBooking(data);
      fetchServiceById(data?.serviceId);
      fetchUserId(data?.userId);
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

  const fetchUserId = async (userId: number) => {
    try {
      const res = await getUserById(userId);
      setUser(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const statusPay = {
    UNPAID: "Chưa đặt cọc",
    DEPOSIT: "Đã cọc",
    PAID: "Đã thanh toán"
  };

  const bookingStatus = {
    NEW: "Chờ xác nhận",
    PENDING: "Tạm hủy & xác nhận thêm",
    APPROVED: "Đã xác nhận",
    FINISHED: "Hoàn thành",
    REJECTED: "Hủy"
  };

  const colorStatusBooking = {
    NEW: "bg-[--clr-green-400]",
    PENDING: "bg-[--clr-orange-400]",
    FINISHED: "bg-[--clr-gray-500]",
    APPROVED: "bg-[--clr-blue-400]",
    REJECTED: "bg-[--clr-red-400]",
  };

  const fetchAllFoodBooking = async (bookingId: number) => {
    try {
      const res = await getAllFoodByBooking(bookingId);
      setAllFoodBooking(res);
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

  const needPayment = (status, total, deposit) => {
    if (status === "UNPAID") return total;
    if (status === "DEPOSIT") return total - deposit;
    return 0;
  };

  //useEffect
  useEffect(() => {
    if (!detail) return;
    fetchBookingById(+detail);
    fetchAllFoodBooking(+detail);
    fetchZones();
  }, [+detail]);

  return (
    <div className="w-full text-[14px] text-[--clr-gray-500]">
      <p className="text-[23px] font-bold text-center uppercase py-3">Chi tiết đơn hàng</p>
      <div className="w-full flex gap-7 px-10">
        <div className="w-2/3 flex flex-col gap-7">
          <div className="w-full flex justify-between items-center bg-gray-100 rounded-[5px] px-4 py-3">
            <div>
              <div className="flex gap-2">
                <span className="font-semibold">Đơn hàng : </span>
                <span>Tiệc cưới truyền thống</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Ngày nhận: </span>
                <span>5/1/2024</span>
                <span className="pr-5"><span
                  className="italic text-gray-500">Nhà hàng : </span>SkyView Restaurant - skyview@gmail.com</span>
              </div>
            </div>
            <div
              className={`px-3 py-1 text-white rounded-md ${colorStatusBooking[detailBooking?.statusBooking]}`}>
              {bookingStatus[detailBooking?.statusBooking]}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/3">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ textTransform: "upperCase", fontWeight: 600 }}>Khách
                        hàng</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row"
                        sx={{ flexDirection: "column", display: "flex", gap: "10px" }}>
                        <div>{user?.name}</div>
                        <div>{user?.email}</div>
                        <div>{user?.phone}</div>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="w-2/3">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ textTransform: "upperCase", fontWeight: 600 }}>Dich vụ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row"
                        sx={{ flexDirection: "column", display: "flex", gap: "10px" }}>
                        <div><span
                          className="font-[600] inline-block min-w-[100px]">Dịch vụ</span>: {service?.serviceName}
                        </div>
                        <div><span
                          className="font-[600] inline-block min-w-[100px]">Menu</span>: {service?.comboMenus[0]?.comboName}
                        </div>
                        <div><span
                          className="font-[600] inline-block min-w-[100px]">Tổng tiền</span>: {formatMoney(detailBooking?.totalMoney)} vnd
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">STT</StyledTableCell>
                    <StyledTableCell align="center">Tên món ăn</StyledTableCell>
                    <StyledTableCell align="center">Số luợng</StyledTableCell>
                    <StyledTableCell align="center">Giá món ăn</StyledTableCell>
                    <StyledTableCell align="center">Tổng giá</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFoodBooking.map((food, index) => (
                    <StyledTableRow key={food.name}>
                      <StyledTableCell align="center">{index + 1}</StyledTableCell>
                      <StyledTableCell component="th" scope="food">
                        {food.dishName}
                      </StyledTableCell>
                      <StyledTableCell align="center">{food.quantity}</StyledTableCell>
                      <StyledTableCell
                        align="center">{formatMoney(food.totalPrice / food.quantity)} vnd</StyledTableCell>
                      <StyledTableCell align="center">{formatMoney(food.totalPrice)} vnd</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-8">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: "upperCase", fontWeight: 600 }}>Chi tiết</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row"
                    sx={{ flexDirection: "column", display: "flex", gap: "10px" }}>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Lượng khách</span>: {detailBooking?.numberOfGuest}
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Số lượng bàn</span>: {detailBooking?.numberTable}
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Khu vực</span>: {detailBooking?.zone?.zoneName}
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Ngày đặt</span>: {moment(detailBooking?.createdAt).format("DD-MM-YYYY")}
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Ngày nhận</span>: {moment(detailBooking?.toTime).format("DD-MM-YYYY")}
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[100px]">Thời gian</span>: {moment(detailBooking?.comeInAt).format("HH:mm")} -
                    {moment(detailBooking?.comeOutAt).format("HH:mm")}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: "upperCase", fontWeight: 600 }}>Thanh toán</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row"
                    sx={{ flexDirection: "column", display: "flex", gap: "10px" }}>

                    <div><span
                      className="font-[600] inline-block min-w-[130px]">Phí phục vụ</span>: {formatMoney(service?.price)} vnd
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[130px]">Món ăn</span>: {formatMoney(detailBooking?.comboMenu?.totalPrice)} vnd
                      / bàn
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[130px]">Phí thuê khu</span>:
                    {formatMoney(zones.filter(item => item?.zoneName === detailBooking?.zone?.zoneName)[0]?.priceRent) || 0} vnd
                    </div>
                    <div><span
                      className="font-[600] inline-block min-w-[130px]">Đặt cọc</span>: {formatMoney(detailBooking?.depositMoney)} vnd <span
                      className="border-[1px] rounded-[3px] ml-4 text-[--clr-red-400] border-[--clr-red-400] px-3 py-1">
                      {statusPay[detailBooking?.statusPayment]}</span>
                    </div>
                    <div
                      className="text-center my-2">--------------------------------------------------------------------
                    </div>
                    <div className="text-[17px]"><span
                      className="font-[600] inline-block min-w-[130px]">Tổng</span>: {
                      formatMoney(detailBooking?.totalMoney)} vnd
                    </div>
                    <div
                      className="text-center my-2">--------------------------------------------------------------------
                    </div>
                    <div className="text-[17px]"><span
                      className="font-[600] inline-block min-w-[130px]">Cần thanh toán</span>: {
                      formatMoney(needPayment(detailBooking?.statusPayment, detailBooking?.totalMoney, detailBooking?.depositMoney))} vnd
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingPage;