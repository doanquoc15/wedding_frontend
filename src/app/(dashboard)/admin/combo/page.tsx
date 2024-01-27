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
import { IComboMenu } from "@/types/common";
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
import { formatMoney } from "@/utils/formatMoney";
import { deleteComboMenu, getAllComboMenu } from "@/services/combo";
import SelectFilter from "@/components/common/SelectFilter";
import { getAllService } from "@/services/service";

const ServicePage = ({ searchParams }) => {
  //useState
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [allCombo, setAllCombo] = useState<IComboMenu[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [combo, setCombo] = useState<IComboMenu>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [totalComboCount, setTotalComboCount] = useState<number>(0);
  const [search, setSearch] = useState<any>(getQueryParam("search"));
  const [serviceOption, setServiceOption] = useState<any>([]);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //function
  const fetchAllComboMenu = async () => {
    setLoading(true);
    try {
      const { data, total } = await getAllComboMenu({
        pageSize,
        pageIndex: pageIndex + 1,
        search,
        serviceId: getQueryParam("serviceId") || undefined,
      });
      setAllCombo(data);
      setTotalComboCount(total);
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

  const fetchAllService = async () => {
    setLoading(true);
    try {
      const { data } = await getAllService({
        pageSize: 1000
      });
      setServiceOption(data?.map(item => ({
        id: item?.id,
        label: item?.serviceName,
        value: item?.id
      })) || []);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const handleClickDelete = async () => {
    setIsOpenModal(false);
    setLoading(true);
    try {
      await deleteComboMenu(Number(combo?.id));
      dispatch(
        statusApiReducer.actions.setMessageSuccess(
          MESSAGE_SUCCESS.DELETE_COMBO_SUCCESS
        )
      );
      fetchAllComboMenu();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const resetPageIndex = () => {
    setPageIndex(0);
  };

  //useEffect
  useEffect(() => {
    fetchAllComboMenu();
  }, [pageIndex, pageSize, search, searchParams]);

  useEffect(() => {
    fetchAllService();
  }, []);

  // @ts-ignore
  return (
    <div className="text-[--clr-gray-500]">
      <PageHeader title="Quản lý menu"/>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[14px] text-[--clr-gray-500] italic">
            Tên menu
          </span>
          <SearchInFilter onSearch={handleSearch} isResetAll={true}/>
          <span className="text-[14px] text-[--clr-gray-500] italic ml-10">
            Loại dịch vụ
          </span>
          <SelectFilter
            resetPageIndex={resetPageIndex}
            query={...searchParams}
            options={[{ id: 0, label: "Tất cả" }, ...serviceOption]}
            value={searchParams?.serviceId || 0}
            typeQuery="serviceId"
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
          onClick={() => router.push(`${PATH.MANAGEMENT_MENU_COMBO}/new`)}
          startIcon={<AddTwoToneIcon fontSize="small"/>}
        >
          Thêm menu
        </Button>
      </div>

      {isLoading && <Loading/>}
      <CheckNotFound data={allCombo} isLoading={isLoading}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên menu</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Số lượng món ăn</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCombo?.map((combo: any, index) => (
                <TableRow hover key={combo?.id}>
                  <TableCell>
                    <Typography
                      sx={{ fontSize: "13px" }}
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {pageIndex * pageSize + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {combo?.comboName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{
                        width: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {combo?.description || "Chưa có mô tả"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatMoney(combo.totalPrice)} vnd
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {combo?.comboItems?.length} món
                    </Typography>
                  </TableCell>

                  <TableCell align="center" className="flex gap-3">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() =>
                          router.push(
                            `${PATH.MANAGEMENT_MENU_COMBO}/${combo.id}`
                          )
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
                          setCombo(combo);
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
            count={totalComboCount}
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
        title="Xóa menu"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4 w-full actual-receipt">
            <div className="py-3 text-[14px] text-[--clr-gray-500]">
              Bạn có muốn <b>xoá</b> menu món ăn <b>{combo?.comboName}</b> vĩnh
              viễn không ?
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

export default ServicePage;
