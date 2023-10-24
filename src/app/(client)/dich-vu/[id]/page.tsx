"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";

import { ComboMenu, TypeService } from "@/types/common";
import { getComboByServiceId } from "@/services/combo";
import ComboMenuDetail from "@/components/ComboDetail";
import TitleHead from "@/components/TitleHead";
import { useAppDispatch } from "@/stores/hook";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { SERVICE_BREADCRUMB } from "@/constants/common";
import { getServiceById } from "@/services/service";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

const BookingPage = ({ params }: { params: { id: string } }) => {
  //useState
  const [comboMenus, setComboMenus] = useState<ComboMenu[]>();
  const [service, setService] = useState<TypeService>();

  //const
  const dispatch = useAppDispatch();

  //function
  const fetchAllComboByService = async () => {
    try {
      const res = await getComboByServiceId(+params.id);
      setComboMenus(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchServiceById = async (serviceId: number) => {
    try {
      const res = await getServiceById(serviceId);
      setService(res);
      dispatch(
        breadCrumbReducer.actions.setBreadCrumbs({
          routes: [
            ...SERVICE_BREADCRUMB,
            {
              href: `/dich-vu/${serviceId}`,
              name: res.serviceName,
            },
          ],
        })
      );
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchAllComboByService();
      fetchServiceById(+params.id);
    }
    // eslint-disable-next-line
  }, [+params.id]);

  useEffect(() => {
    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, [params.id]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TitleHead title="Danh sách Combo menu" />
      <Grid
        container
        spacing={{ xs: 12, md: 12 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {comboMenus?.map((combo, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ComboMenuDetail menuCombo={combo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingPage;
