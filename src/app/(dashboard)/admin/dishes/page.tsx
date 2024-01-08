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
  useTheme,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

import PageHeader from "@/components/AdminComponents/PageHeader";
import { IDish } from "@/types/common";
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
import { deleteDish, getAllDish } from "@/services/menu-item";
import { getAllTypeDish } from "@/services/type-dish";
import SelectFilter from "@/components/common/SelectFilter";

const DishListPage = ({ searchParams }) => {
  //useState
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [allDish, setAllDish] = useState<IDish[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [dish, setDish] = useState<IDish>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const [search, setSearch] = useState<string>(getQueryParam("search") as string);
  const [typeDish, setTypeDish] = useState<any[]>([]);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //function
  const fetchAllDish = async () => {
    setLoading(true);
    try {
      const { menus, total } = await getAllDish({
        pageSize,
        pageIndex: pageIndex + 1,
        ...searchParams,
        typeId: getQueryParam("typeId") || undefined,
      });
      setAllDish(menus);
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
  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const handleClickDelete = async () => {
    setIsOpenModal(false);
    setLoading(true);
    try {
      await deleteDish(Number(dish?.id));
      dispatch(
        statusApiReducer.actions.setMessageSuccess(
          MESSAGE_SUCCESS.DELETE_DISH_SUCCESS
        )
      );
      fetchAllDish();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchTypeDishes = async () => {
    try {
      const { typeDishes } = await getAllTypeDish({ pageSize: 1000 });
      setTypeDish(
        typeDishes?.map((item) => ({
          id: item?.id,
          value: item?.id,
          label: item?.typeName,
        }))
      );
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const resetPageIndex = () => {
    setPageIndex(0);
  };

  useEffect(() => {
    fetchTypeDishes();
  }, []);

  //useEffect
  useEffect(() => {
    fetchAllDish();
  }, [pageIndex, pageSize, searchParams]);

  return (
    <div className="text-[--clr-gray-500]">
      <PageHeader title="Quản lý món ăn"/>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[14px] text-[--clr-gray-500] italic">
            Tên món ăn
          </span>
          <SearchInFilter onSearch={handleSearch} isResetAll={true}/>
          <span className="text-[14px] text-[--clr-gray-500] italic ml-10">
            Loại món ăn
          </span>
          <SelectFilter
            resetPageIndex={resetPageIndex}
            query={...searchParams}
            options={[{ id: 0, label: "Tất cả" }, ...typeDish]}
            value={searchParams?.typeId || 0}
            typeQuery="typeId"
            sx={{
              fontSize: "13px",
              fontWeight: " 400",
              height: "34px",
              minWidth: 168,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)",
            }}
          />
        </div>

        <Button
          sx={{ mt: { xs: 2, md: 0, marginBottom: "10px" } }}
          variant="contained"
          onClick={() => router.push(`${PATH.MANAGEMENT_DISH}/new`)}
          startIcon={<AddTwoToneIcon fontSize="small"/>}
        >
          Thêm món ăn
        </Button>
      </div>

      {isLoading && <Loading/>}
      <CheckNotFound data={allDish} isLoading={isLoading}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên món ăn</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Loại món ăn</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allDish?.map((dish: any, index) => (
                <TableRow hover key={dish?.id}>
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
                      {dish?.dishName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dish?.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dish?.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {
                        typeDish.filter(
                          (item) => +item?.id === +dish?.typeId
                        )[0]?.label
                      }
                    </Typography>
                  </TableCell>

                  <TableCell align="center" className="flex gap-3">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() =>
                          router.push(`${PATH.MANAGEMENT_DISH}/${dish?.id}`)
                        }
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
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
                          setDish(dish);
                          setIsOpenModal(true);
                        }}
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
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
        title="Xóa món ăn"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4 w-full actual-receipt">
            <div className="py-3 text-[14px] text-[--clr-gray-500]">
              Bạn có muốn <b>xoá</b> món ăn <b>{dish?.dishName}</b> vĩnh viễn
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
    </div>
  );
};

export default DishListPage;
