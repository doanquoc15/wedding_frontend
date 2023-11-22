"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SettingIcon from "@/statics/svg/ic-setting.svg";
import { getQueryParam } from "@/utils/route";
import { CookiesStorage } from "@/shared/config/cookie";
import { LocalStorage } from "@/shared/config/localStorage";
import { LogoutAPI } from "@/services/auth";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { defReducer } from "@/stores/reducers/dependence";
import MyInformation from "@/components/Account/MyInformation";
import ChangePassword from "@/components/Account/ChangePassword";

const LIST_TABS = [
  {
    id: 1,
    label: "Thông tin"
  },
  {
    id: 2,
    label: "Cài đặt"
  },
  {
    id: 3,
    label: "Đổi mật khẩu"
  },
  {
    id: 4,
    label: "Lịch sử"
  },
];

const SettingPage = () => {
  //useState
  const [indexTab, setIndexTab] = useState<number>(Number(getQueryParam("tab")));
  //const
  const router = useRouter();
  const dispatch = useAppDispatch();

  //function
  const handleClickTab = (index: number) => {
    setIndexTab(index);
    router.push(`/tai-khoan?tab=${index}`);
  };

  //Logout
  const handleLogout = async () => {
    try {
      CookiesStorage.clearCookieData("token");
      CookiesStorage.clearCookieData("role");
      LocalStorage.remove("user");
      await LogoutAPI({});
      dispatch(defReducer.actions.setDependence({}));
      router.push("/");
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const renderTab = () => {
    const TABS = {
      0: <MyInformation/>,
      1: "Tab1",
      2: <ChangePassword/>,
      3: "Tab11",
      4: "Tab11",
      5: "Tab11",
      6: "Tab11",
      7: "Tab11",
      8: "Tab11",
    };
    return TABS[`${indexTab}`];
  };

  //useEffect
  return (
    <div>
      <div className="pl-4">
        <Grid container spacing={2} className="font-primary text-[13px] text-[--clr-gray-500]">
          <Grid item xs={2} lg={2} className="min-h-screen bg-white">
            <div className="flex flex-col">
              <div className="py-3">
                <Image src={SettingIcon} alt="SettingIcon" objectFit="contain" width={24} height={24}/>
              </div>
              <div className="flex flex-col">
                {LIST_TABS.map((tab, index) => (
                  <div
                    onClick={() => handleClickTab(index)}
                    key={index}
                    className={`rounded-tl-[12px] font-bold cursor-pointer hover:bg-[--clr-gray-125] px-2 py-3 
                    ${index === indexTab ? "bg-[--clr-gray-325]" : ""}`}
                  >
                    {tab.label}
                  </div>
                ))}
                <div onClick={handleLogout}
                  className="rounded-tl-[12px] font-bold cursor-pointer text-[--clr-red-400] hover:bg-[--clr-gray-125] px-2 py-3">Đăng
                  xuất
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={10}
            xs={10}
            className="pr-4 overflow-auto pl-10"
          >
            {renderTab()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SettingPage;