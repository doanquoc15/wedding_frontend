"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import moment from "moment";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import PageHeader from "@/components/AdminComponents/PageHeader";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { PATH } from "@/constants/common";
import CheckNotFound from "@/components/common/CheckNotFound";
import Loading from "@/components/Loading";
import ModalPopup from "@/components/common/ModalPopup";
import ButtonBtn from "@/components/common/Button";
import { CheckIcon } from "@/components/Icons";
import LoadingButton from "@/components/common/Loading";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import SearchInFilter from "@/components/common/SearchInFilter";
import { getQueryParam } from "@/utils/route";
import { deleteBooking, getAllBooking, updateStatusBooking } from "@/services/book";
import { formatMoney } from "@/utils/formatMoney";
import SelectFilter from "@/components/common/SelectFilter";
import DatePickerFilter from "@/components/common/DatePickerFilter";
import { SocketContext } from "@/context/sockets";
import BpRadio from "@/components/common/BpRadio";

const optionsSelect = [
  {
    value: "NEW",
    label: "Chờ xác nhận"
  },
  {
    value: "PENDING",
    label: "Tạm dừng & Xác nhận thêm"
  },
  {
    value: "APPROVED",
    label: "Xác nhận"
  },
  {
    value: "FINISHED",
    label: "Hoàn thành"
  },
  {
    value: "REJECTED",
    label: "Hủy"
  }
];

const optionsNew = [
  {
    value: "APPROVED",
    label: "Xác nhận"
  },
  {
    value: "REJECTED",
    label: "Hủy"
  }
];

const optionsApproved = [
  {
    value: "PENDING",
    label: "Tạm dừng & Xác nhận thêm"
  },
  {
    value: "FINISHED",
    label: "Hoàn thành"
  },
  {
    value: "REJECTED",
    label: "Hủy"
  }
];

const options = {
  NEW: optionsNew,
  PENDING: optionsNew,
  APPROVED: optionsApproved
};

const STATUS_BOOKING_REVERT = {
  NEW: "Chờ duyệt",
  PENDING: "Tạm dừng & Xác nhận thêm",
  APPROVED: "Đã xác nhận",
  FINISHED: "Hoàn thành",
  REJECTED: "Hủy"
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const vertical = "bottom";
const horizontal = "center";
const BookingPage = ({ searchParams }) => {
  //useForm
  const {
    control,
    setValue,
  } = useForm({
    // resolver: yupResolver(bookingSchema),
    defaultValues: {
      statusBooking: undefined,
    },
    mode: "all",
  });
  //useState
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [allBooking, setAllBooking] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [booking, setBooking] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalStatus, setIsOpenModalStatus] = useState<boolean>(false);
  const [totalBookingCount, setTotalBookingCount] = useState<number>(0);
  const [search, setSearch] = useState<string | undefined>(getQueryParam("search"));
  const [statusBooking, setStatusBooking] = useState<string | undefined>();
  const [selectDate, setSelectDate] = useState<string | undefined>(getQueryParam("toTime"));
  const [open, setOpen] = useState<boolean>(true);
  const [countNew, setCounNew] = useState<number>(0);
  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  const socketIo = useContext(SocketContext);

  //function
  const fetchAllBooking = async () => {
    setLoading(true);
    try {
      const { booking, total } = await getAllBooking({
        pageSize,
        pageIndex: pageIndex + 1,
        search,
        statusBooking: searchParams?.status,
        toTime: selectDate
      });
      setAllBooking(booking);
      setTotalBookingCount(total);

    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (querySearch: string) => {
    setSearch(querySearch);
    setPageIndex(0);
  };

  const handleChangeDate = (dateChange) => {
    setSelectDate(dateChange);
  };

  const handleLimitChange = (event) => {
    setPageSize(+event.target.value);
  };
  const handlePageChange = (event, value) => {
    setPageIndex(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleCloseModalStatus = () => {
    setIsOpenModal(false);
    setStatusBooking(undefined);
  };

  const handleClickCancel = () => {
    setStatusBooking(undefined);
    setIsOpenModal(false);
  };

  const handleOnClickRadio = (e) => {
    setStatusBooking(e.target.value);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickDelete = async () => {
    setIsOpenModal(false);
    setLoading(true);
    try {
      await deleteBooking(Number(booking?.id));
      dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.DELETE_BOOKING_SUCCESS));
      fetchAllBooking();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setLoading(false);
    }
  };
  const handleClickChangeStatus = async () => {
    setLoading(true);
    try {
      const status = optionsSelect?.filter(item => item?.label === statusBooking)[0]?.value;
      await updateStatusBooking(Number(booking?.id), { statusBooking: status });
      dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      setIsOpenModalStatus(false);
      fetchAllBooking();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setStatusBooking(undefined);
      setLoading(false);
    }
  };

  const resetPageIndex = () => {
    setPageIndex(0);
  };

  const colorStatusBooking = {
    NEW: "bg-[--clr-green-400]",
    PENDING: "bg-[--clr-orange-400]",
    FINISHED: "bg-[--clr-gray-500]",
    APPROVED: "bg-[--clr-blue-400]",
    REJECTED: "bg-[--clr-red-400]",
  };

  useEffect(() => {
    fetchAllBooking();
  }, [pageIndex, pageSize, search, searchParams, selectDate]);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const { booking } = await getAllBooking({ pageSize: 1000 });
        setCounNew(booking?.filter(item => item?.statusBooking === "NEW")?.length);

      } catch (error: any) {
        dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
    setOpen(true);
  }, []);

  // @ts-ignore
  return (
    <div className="text-[--clr-gray-500]">
      <PageHeader title="Quản lý đơn hàng"/>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[14px] text-[--clr-gray-500] italic">Tên người đặt</span>
          <SearchInFilter onSearch={handleSearch} isResetAll={true}/>
          <span className="text-[14px] text-[--clr-gray-500] italic">Trạng thái</span>
          <SelectFilter
            resetPageIndex={resetPageIndex}
            query={...searchParams}
            options={[{ id: 0, label: "Tất cả" }, ...optionsSelect]}
            value={searchParams?.status || 0}
            typeQuery="status"
            sx={{
              fontSize: "13px",
              fontWeight: " 400",
              height: "34px",
              minWidth: 168,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)",
            }}
          />
          <span className="text-[14px] text-[--clr-gray-500] italic">Ngày nhận</span>
          <DatePickerFilter onChangeDate={handleChangeDate} typeQuery="toTime"/>
        </div>
        <Button
          sx={{ mt: { xs: 2, md: 0, marginBottom: "10px" } }}
          variant="contained"
          onClick={() => router.push(`${PATH.MANAGEMENT_BOOKING}/new`)}
          startIcon={<AddTwoToneIcon fontSize="small"/>}
        >
          Thêm đơn hàng
        </Button>
      </div>

      {isLoading && <Loading/>}
      <CheckNotFound data={allBooking} isLoading={isLoading}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap" }}>STT</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Người đặt</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Loại dịch vụ</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Tên menu</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Khu vực</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Lương khách</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Số lượng bàn</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Tổng tiền</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Tiền cọc trước</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Ngày nhận</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Giờ bắt đầu</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Giờ kết thúc</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Trạng thái</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBooking?.map((booking: any, index) => (
                <TableRow
                  hover
                  key={booking?.id}
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
                      {booking?.user?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking.comboMenu?.service?.serviceName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.comboMenu?.comboName}

                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.zone?.zoneName}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.numberOfGuest}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.numberTable}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatMoney(booking?.totalMoney)} vnd

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatMoney(booking?.depositMoney)} vnd

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.toTime && moment(booking?.toTime).format("DD/MM/YYYY")}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.comeInAt && moment(booking?.comeInAt).format("HH:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {booking?.comeOutAt && moment(booking?.comeOutAt).format("HH:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      className="flex gap-3 items-center"
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <span
                        className={`px-4 text-white text-center rounded-[5px] min-w-[200px] py-1 text-[14px] ${colorStatusBooking[booking?.statusBooking]}`}>
                        {STATUS_BOOKING_REVERT[booking?.statusBooking]}</span>
                      {
                        (booking?.statusBooking === "REJECTED" || booking?.statusBooking === "FINISHED") ? null :
                          <IconButton
                            onClick={() => {
                              setBooking(booking);
                              setIsOpenModalStatus(true);
                            }}
                            sx={{
                              "&:hover": { background: theme.colors.error.lighter },
                              color: "var(--clr-orange-400)"
                            }}
                            color="inherit"
                            size="small"
                          >
                            <DriveFileRenameOutlineIcon className="cursor-pointer" fontSize="small"/>
                          </IconButton>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="flex gap-3">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() => router.push(`${PATH.MANAGEMENT_BOOKING}/${booking.id}`)}
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa" arrow>
                      <IconButton
                        onClick={() => {
                          setBooking(booking);
                          setIsOpenModal(true);
                        }}
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={totalBookingCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={pageIndex}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </CheckNotFound>
      <ModalPopup
        open={isOpenModal}
        title="Xóa tài khoản"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4 w-full actual-receipt">
            <div className="py-3 text-[14px] text-[--clr-gray-500]">Bạn có muốn <b>xoá</b> đơn hàng
              <b>{booking?.name}</b> vĩnh viễn
              không ?
            </div>
          </div>
          <div className="flex justify-end mt-[0.25rem] gap-4">
            <ButtonBtn
              width={100}
              bg="var(--clr-orange-400)"
              onClick={handleClickCancel}
              startIcon={<CheckIcon fill="white"/>}
            >
              <span className="font-semibold">Thoát</span>
            </ButtonBtn>
            <ButtonBtn
              width={100}
              bg="var(--clr-blue-400)"
              onClick={handleClickDelete}
              startIcon={isLoading && <LoadingButton/>}
            >
              <span className="font-semibold">Xóa</span>
            </ButtonBtn>
          </div>
        </div>
      </ModalPopup>
      <ModalPopup
        open={isOpenModalStatus}
        title="Trạng thái"
        setOpen={setIsOpenModalStatus}
        closeModal={handleCloseModalStatus}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          {
            options[booking?.statusBooking] ?
              <div className="flex flex-col gap-2 w-full actual-receipt">
                <div className="font-semibold">Trạng thái đơn hàng</div>
                <FormControl>
                  <Controller
                    control={control}
                    name="statusBooking"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        row
                        className="flex flex-col col-span-1"
                        value={statusBooking}
                      >
                        {options[booking?.statusBooking]?.map((item, index) => (
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
                              setStatusBooking(event.target.value);
                              setValue("statusBooking", event.target.value);
                            }}
                            value={item?.label}
                            control={
                              <BpRadio
                                onClick={(e) => handleOnClickRadio(e)}
                                value={item?.label}
                              />
                            }
                            label={item?.label}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </div> :
              <div className="flex flex-col gap-4 w-full min-h-[100px] actual-receipt">
                <p>Không thể thay đổi trạng thái đơn hàng này</p>
              </div>
          }
          <div className="flex justify-end mt-[0.25rem] gap-4">
            {
              options[booking?.statusBooking] ? <>
                <ButtonBtn
                  width={100}
                  bg="var(--clr-orange-400)"
                  onClick={handleClickCancel}
                  startIcon={<CheckIcon fill="white"/>}
                >
                  <span className="font-semibold">Thoát</span>
                </ButtonBtn>
                <ButtonBtn
                  width={150}
                  bg="var(--clr-blue-400)"
                  onClick={handleClickChangeStatus}
                  startIcon={isLoading && <LoadingButton/>}
                >
                  <span className="font-semibold whitespace-nowrap">Cập nhật</span>
                </ButtonBtn>
              </> : <ButtonBtn
                width={100}
                bg="var(--clr-orange-400)"
                onClick={handleClickCancel}
                startIcon={<CheckIcon fill="white"/>}
              >
                <span className="font-semibold">Thoát</span>
              </ButtonBtn>
            }
          </div>
        </div>
      </ModalPopup>
      {
        countNew > 0 &&
        <Stack spacing={2} sx={{ width: "100%", height: "150%" }}>
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={10000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              {`Có ${countNew} đơn hàng chờ xác nhận`}
            </Alert>
          </Snackbar>
        </Stack>
      }
    </div>
  )
  ;
};

export default BookingPage;