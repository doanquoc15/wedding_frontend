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
import { deleteService, getAllService } from "@/services/service";
import { IService } from "@/types/common";
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

const ServicePage = () => {
  //useState
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [allService, setAllService] = useState<IService[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [service, setService] = useState<IService>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [totalServiceCount, setTotalServiceCount] = useState<number>(0);
  const [search, setSearch] = useState<string>(getQueryParam("search"));

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //function
  const fetchAllService = async () => {
    setLoading(true);
    try {
      const { data, total } = await getAllService({
        pageSize,
        pageIndex: pageIndex + 1,
        search,
      });
      setAllService(data);
      setTotalServiceCount(total);
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

  const handleClickDelete = async () => {
    setIsOpenModal(false);
    setLoading(true);
    try {
      await deleteService(Number(service?.id));
      dispatch(
        statusApiReducer.actions.setMessageSuccess(
          MESSAGE_SUCCESS.DELETE_SERVICE_SUCCESS
        )
      );
      fetchAllService();
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  //useEffect
  useEffect(() => {
    fetchAllService();
  }, [pageIndex, pageSize, search]);

  // @ts-ignore
  return (
    <div className="text-[--clr-gray-500]">
      <PageHeader title="Quản lý dịch vụ" />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[14px] text-[--clr-gray-500] italic">
            Tên dich vụ
          </span>
          <SearchInFilter onSearch={handleSearch} isResetAll={true} />
        </div>
        <Button
          sx={{ mt: { xs: 2, md: 0, marginBottom: "10px" } }}
          variant="contained"
          onClick={() => router.push(`${PATH.MANAGEMENT_SERVICE}/new`)}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Thêm dich vụ
        </Button>
      </div>

      {isLoading && <Loading />}
      <CheckNotFound data={allService} isLoading={isLoading}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên dịch vụ</TableCell>
                <TableCell>Phí dịch vụ</TableCell>
                <TableCell>Sức chứa tối đa</TableCell>
                <TableCell>Menu có sẵn</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allService?.map((service: any, index) => (
                <TableRow hover key={service?.id}>
                  <TableCell>
                    <Typography
                      sx={{ fontSize: "13px" }}
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
                      {service?.serviceName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatMoney(service.price)} vnd
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {service?.capacity} người
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {service?.comboMenus?.length} menu
                    </Typography>
                  </TableCell>

                  <TableCell align="center" className="flex gap-3">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() =>
                          router.push(
                            `${PATH.MANAGEMENT_SERVICE}/${service.id}`
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
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa" arrow>
                      <IconButton
                        onClick={() => {
                          setService(service);
                          setIsOpenModal(true);
                        }}
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
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
            count={totalServiceCount}
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
        title="Xóa dich vụ"
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="min-w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4 w-full actual-receipt">
            <div className="py-3 text-[14px] text-[--clr-gray-500]">
              Bạn có muốn <b>xoá</b> dịch vụ <b>{service?.serviceName}</b> vĩnh
              viễn không ?
            </div>
          </div>
          <div className="flex justify-end mt-[0.25rem] gap-4">
            <ButtonBtn
              width={100}
              bg="var(--clr-orange-400)"
              onClick={handleClickCancel}
              startIcon={<CheckIcon fill="white" />}
            >
              <span className="font-semibold">Thoát</span>
            </ButtonBtn>
            <ButtonBtn
              width={100}
              bg="var(--clr-blue-400)"
              onClick={handleClickDelete}
              startIcon={isLoading && <LoadingButton />}
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
