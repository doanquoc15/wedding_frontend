"use client";
import React, { useEffect, useState } from "react";
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

import PageHeader from "@/components/AdminComponents/PageHeader";
import { deleteUser, getAllUsers, updateUser } from "@/services/user";
import { IUser } from "@/types/common";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { checkEmpty } from "@/utils/checkEmpty";
import { GenderObjectLiteral, PATH } from "@/constants/common";
import CheckNotFound from "@/components/common/CheckNotFound";
import Loading from "@/components/Loading";
import ModalPopup from "@/components/common/ModalPopup";
import ButtonBtn from "@/components/common/Button";
import { CheckIcon } from "@/components/Icons";
import LoadingButton from "@/components/common/Loading";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import SearchInFilter from "@/components/common/SearchInFilter";
import { getQueryParam } from "@/utils/route";

const UsersPage = () => {
  //useState
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalStatus, setIsOpenModalStatus] = useState<boolean>(false);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const [search, setSearch] = useState<any>(getQueryParam("search"));

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //function
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const { users, total } = await getAllUsers({ pageSize, pageIndex: pageIndex + 1, search });
      setAllUsers(users);
      setTotalUsersCount(total);

    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (querySearch: string) => {
    setSearch(querySearch);
    setPageIndex(0);
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
  };

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const handleClickDelete = async () => {
    setIsOpenModal(false);
    setLoading(true);
    try {
      await deleteUser(Number(user?.id));
      dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.DELETE_USER_SUCCESS));
      fetchAllUsers();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setLoading(false);
    }
  };
  const handleClickChangeStatus = async () => {
    setLoading(true);
    try {
      await updateUser(Number(user?.id), { status: user?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" });
      dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      setIsOpenModalStatus(false);
      fetchAllUsers();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setLoading(false);
    }
  };

  //useEffect
  useEffect(() => {
    fetchAllUsers();
  }, [pageIndex, pageSize, search]);

  // @ts-ignore
  return (
    <div className="text-[--clr-gray-500]">
      <PageHeader title="Quản lý người dùng"/>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[14px] text-[--clr-gray-500] italic">Tên tài koản</span>
          <SearchInFilter onSearch={handleSearch} isResetAll={true}/>
        </div>
        <Button
          sx={{ mt: { xs: 2, md: 0, marginBottom: "10px" } }}
          variant="contained"
          onClick={() => router.push(`${PATH.MANAGEMENT_USER}/new`)}
          startIcon={<AddTwoToneIcon fontSize="small"/>}
        >
          Thêm tài khoản
        </Button>
      </div>

      {isLoading && <Loading/>}
      <CheckNotFound data={allUsers} isLoading={isLoading}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.map((user: any, index) => (
                <TableRow
                  hover
                  key={user?.id}
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
                      {user?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user?.dateOfBirth && moment(user?.dateOfBirth).format("DD/MM/YYYY")}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.gender && checkEmpty(GenderObjectLiteral[user.gender])}
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
                        className={`px-4 px-2 text-white rounded-[5px] ${user?.status === "ACTIVE" ?
                          "bg-[--clr-green-400]" : "bg-[--clr-red-400]"}`}>{capitalizeFirstLetter(user?.status)}</span>
                      <IconButton
                        onClick={() => {
                          setUser(user);
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
                    </Typography>
                  </TableCell>

                  <TableCell align="center" className="flex gap-3">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() => router.push(`${PATH.MANAGEMENT_USER}/${user.id}`)}
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
                          setUser(user);
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
            count={totalUsersCount}
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
            <div className="py-3 text-[14px] text-[--clr-gray-500]">Bạn có muốn <b>xoá</b> người
              dùng <b>{user?.name}</b> vĩnh viễn
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
          <div className="flex flex-col gap-4 w-full actual-receipt">
            {
              user?.status === "ACTIVE" ? <div>Bạn có muốn thay đổi trạng thái của tài khoản người
                dùng <b>{user?.name}</b> thành <b>INACTIVE</b> (khóa) ?</div> : (
                <div>
                  Bạn có muốn thay đổi trạng thái của tài khoản người
                  dùng <b>{user?.name}</b> thành <b> ACTIVE</b> ?
                </div>
              )
            }
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
              width={150}
              bg="var(--clr-blue-400)"
              onClick={handleClickChangeStatus}
              startIcon={isLoading && <LoadingButton/>}
            >
              <span className="font-semibold whitespace-nowrap">Cập nhật</span>
            </ButtonBtn>
          </div>
        </div>
      </ModalPopup>
    </div>
  );
};

export default UsersPage;