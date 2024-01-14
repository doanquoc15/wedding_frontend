"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { ComboMenu, TypeService } from "@/types/common";
import { getComboByServiceId } from "@/services/combo";
import ComboMenuDetail from "@/components/ComboDetail";
import TitleHead from "@/components/TitleHead";
import { useAppDispatch } from "@/stores/hook";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { SERVICE_BREADCRUMB } from "@/constants/common";
import { getServiceById } from "@/services/service";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import CheckNotFound from "@/components/common/CheckNotFound";
import Loading from "@/components/Loading";

const BookingPage = ({ params }: { params: { id: string } }) => {
  //useState
  const [comboMenus, setComboMenus] = useState<ComboMenu[]>([]);
  const [service, setService] = useState<TypeService>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //const
  const dispatch = useAppDispatch();

  //function
  const fetchAllComboByService = async () => {
    setIsLoading(true);
    try {
      const res = await getComboByServiceId(+params.id);
      setComboMenus(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServiceById = async (serviceId: number) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      <TitleHead title="Danh sách Combo menu"/>
      {isLoading && <Loading/>}
      <Grid
        container
        spacing={{ xs: 12, md: 12 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <CheckNotFound data={comboMenus}>
          {comboMenus?.map((combo, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ComboMenuDetail menuCombo={combo}/>
            </Grid>
          ))}
        </CheckNotFound>
      </Grid>
    </Box>
  );
};

export default BookingPage;
