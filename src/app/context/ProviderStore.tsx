"use client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";

import { statusApiM, statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";

const ProviderStore = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const statusApiMessage = useSelector(statusApiM()).statusApi;
  console.log(statusApiMessage);

  useEffect(() => {
    if (statusApiMessage && Object.values(statusApiMessage)[0]) {
      (toast as any)[`${Object.keys(statusApiMessage)[0]}`](
        `${Object.values(statusApiMessage)[0]}`
      );
  
      dispatch(statusApiReducer.actions.resetMessage());
    }
  }, [statusApiMessage]);
  return <div>{children}</div>;
};

export default ProviderStore;
