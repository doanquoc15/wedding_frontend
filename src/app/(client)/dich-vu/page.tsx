"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";

import TitleHead from "@/components/TitleHead";
import { TypeService } from "@/types/common";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getAllService } from "@/services/service";
import Button from "@/components/common/Button";
import ModalPopup from "@/components/common/ModalPopup";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { SERVICE_BREADCRUMB } from "@/constants/common";
import { CheckIcon } from "@/components/Icons";
import { formatMoney } from "@/utils/formatMoney";
import RatingCustom from "@/components/common/RatingCustom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "25px",
  color: theme.palette.text.secondary,
}));

const ServicePage = () => {
  //useState
  const [services, setServices] = useState<TypeService[]>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [service, setService] = useState<TypeService>();

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  //function
  const getServices = async () => {
    try {
      const res = await getAllService({ pageSize: 100 });
      setServices(res.data);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  const calculateStar = (data) => {
    return data?.reduce((total, data) => total + data?.feedback?.rating, 0) / data?.length;
  };

  const calculateFeedBack = (data) => {
    return data?.filter(item => item?.feedback)?.length;
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickDetail = (service: TypeService) => {
    setService(service);
    router.push(`/dich-vu/chi-tiet/${service?.id}`);
  };

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const handleClickBooking = (service: TypeService) => {
    router.push(`${pathname}/${service?.id}`);
  };

  //useEffect
  useEffect(() => {
    getServices();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      breadCrumbReducer.actions.setBreadCrumbs({
        routes: SERVICE_BREADCRUMB,
      })
    );
    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <TitleHead title="Dịch vụ"/>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 12, md: 12 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {services?.map((service) => (
            <Grid item xs={2} sm={4} md={4} key={service.id}>
              <Item>
                <div
                  className="rounded-[50%] w-[100px] h-[100px] overflow-hidden border-[4px] border-[--clr-orange-300]">
                  <Image
                    src={service?.image || ""}
                    alt="image service"
                    width={100}
                    height={100}
                    priority={true}
                    objectFit="cover"
                  />
                </div>
                <div className="text-[16px] font-bold flex"><span
                  className="min-w-[100px] block">Loại dịch vụ</span>: <span
                  className="ml-2">{service?.serviceName}</span>
                </div>
                <div className="text-[16px] font-bold flex"><span
                  className="min-w-[100px] block">Phí dịch vụ</span>: <span
                  className="ml-2">{formatMoney(service?.price)} vnd</span>
                </div>
                <div className="text-[16px] font-bold flex"><span
                  className="min-w-[100px] block">Menu hiện có</span>: <span
                  className="ml-2">{service?.comboMenus?.length || 0}</span>
                </div>
                <div className="text-[16px] font-bold flex"><span
                  className="min-w-[100px] block">Số lần được đặt</span>: <span
                  className="ml-2">{service?.bookings?.length || 0}</span>
                </div>
                <div className="text-[16px] font-bold flex items-center gap-3">
                  <span
                    className="text-yellow-400 ">{calculateStar(service?.bookings).toFixed(1) || 0}</span>
                  <span
                    className="ml-2"><RatingCustom
                      rating={calculateStar(service?.bookings)}/></span>
                  <span
                    className="text-[--clr-gray-500] ">{calculateFeedBack(service?.bookings) || 0} Đánh giá</span>
                </div>
                <div className="w-full flex justify-evenly">
                  <div>
                    <Button
                      onClick={() => handleClickDetail(service)}
                      width={100}
                    >
                      Chi tiết
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleClickBooking(service)}
                      width={100}
                    >
                      Chọn combo
                    </Button>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/*Modal popup*/}
      <ModalPopup
        open={isOpenModal}
        title={`Chi tiết - ${service?.serviceName}`}
        setOpen={setIsOpenModal}
        closeModal={handleCloseModal}
      >
        <div className="w-[500px] h-auto p-6 relative">
          <div className="flex flex-col gap-4">
            <div className="flex gap-10">
              <span className="w-[130px] font-[600]">Tên dịch vụ </span>:
              <span>{service?.serviceName}</span>
            </div>
            <div className="flex gap-10">
              <span className="w-[130px] font-[600]">Phí phục vụ </span>:
              <span>{formatMoney(service?.price)} VND</span>
            </div>
            <div className="flex gap-10">
              <span className="w-[130px] font-[600]">Sức chứa tối đa </span>:
              <span>{service?.capacity} người</span>
            </div>
            <div className="flex gap-10">
              <span className="w-[130px] font-[600]">Đã đặt </span>:
              <span>{service?.bookings?.length || 0}</span>
            </div>
            <div className="flex gap-10">
              <span className="w-[130px] font-[600]">Combo sẵn có </span>:
              <span>{service?.comboMenus?.length}</span>
            </div>
          </div>
          <div className="flex justify-end mt-[-0.25rem]">
            <Button
              bg="var(--clr-orange-400)"
              onClick={handleClickCancel}
              startIcon={<CheckIcon fill="white"/>}
            >
              <span className="font-semibold">Thoát</span>
            </Button>
          </div>
        </div>
      </ModalPopup>
    </div>
  );
};

export default ServicePage;
