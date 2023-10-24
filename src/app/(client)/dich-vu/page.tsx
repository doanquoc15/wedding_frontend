"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import TitleHead from "@/components/TitleHead";
import { TypeService } from "@/types/common";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getAllService } from "@/services/service";
import Button from "@/components/common/Button";
import ModalPopup from "@/components/common/ModalPopup";
import { formatDecimal } from "@/utils/formatDecimal";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { SERVICE_BREADCRUMB } from "@/constants/common";

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

export const CheckIcon = ({ fill = "#c4c3c2" }) => {
  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.71233 0.711629C8.88842 0.54399 9.12274 0.451312 9.36585 0.453152C9.60897 0.454991 9.84186 0.551204 10.0154
        0.721488C10.1889 0.891773 10.2895 1.12281 10.2959 1.36585C10.3024 1.60888 10.2141 1.84491 10.0498 2.02413L5.06233 
        8.26163C4.97657 8.354 4.87306 8.42813 4.758 8.47959C4.64293 8.53104 4.51867 8.55877 4.39264 8.5611C4.26662 8.56343 
        4.14142 8.54033 4.02453 8.49317C3.90763 8.44601 3.80145 8.37576 3.71233 8.28663L0.404831 4.97913C0.312722 4.8933 0.238845 
        4.7898 0.187605 4.6748C0.136365 4.5598 0.108812 4.43566 0.106591 4.30978C0.10437 4.1839 0.127526 4.05887 0.174678 
        3.94213C0.221829 3.8254 0.29201 3.71935 0.381033 3.63033C0.470057 3.54131 0.576099 3.47113 0.692834 3.42398C0.809569 
        3.37682 0.934606 3.35367 1.06048 3.35589C1.18636 3.35811 1.3105 3.38566 1.4255 3.4369C1.5405 3.48814 1.644 3.56202
        1.72983 3.65413L4.34733 6.27038L8.68858 0.739129C8.6964 0.729505 8.70474 0.720324 8.71358 0.711629H8.71233Z"
        fill={fill}
      />
    </svg>
  );
};

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

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickDetail = (service: TypeService) => {
    setService(service);
    setIsOpenModal(true);
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
      <TitleHead title="Dịch vụ" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 12, md: 12 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {services?.map((service) => (
            <Grid item xs={2} sm={4} md={4} key={service.id}>
              <Item>
                <div className="rounded-[50%] w-[100px] h-[100px] overflow-hidden border-[4px] border-[--clr-orange-300]">
                  <Image
                    src={service?.image || ""}
                    alt="image service"
                    width={100}
                    height={100}
                    priority={true}
                    objectFit="cover"
                  />
                </div>
                <p className="text-[20px] font-bold">{service?.serviceName}</p>
                <div className="w-full flex justify-evenly">
                  <span>
                    <Button
                      onClick={() => handleClickDetail(service)}
                      width={100}
                    >
                      Chi tiết
                    </Button>
                  </span>
                  <span>
                    <Button
                      onClick={() => handleClickBooking(service)}
                      width={100}
                    >
                      Đặt lịch
                    </Button>
                  </span>
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
              <span>{formatDecimal(service?.price)} VND</span>
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
              startIcon={<CheckIcon fill="white" />}
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
