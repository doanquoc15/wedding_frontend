"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import SettingIcon from "@/statics/svg/ic-setting.svg";
import { CookiesStorage } from "@/shared/config/cookie";
import { LocalStorage } from "@/shared/config/localStorage";
import { LogoutAPI } from "@/services/auth";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import MyInformation from "@/components/Account/MyInformation";
import ChangePassword from "@/components/Account/ChangePassword";
import MyBook from "@/components/Account/MyBook";
import { usersReducer } from "@/stores/reducers/user";
import { getPath } from "@/utils/getPath";

const LIST_TABS = [
  {
    id: 1,
    label: "Thông tin",
    link: "thong-tin"
  },
  {
    id: 2,
    label: "Đổi mật khẩu",
    link: "doi-mat-khau"
  },
  {
    id: 3,
    label: "Lịch sử",
    link: "lich-su"
  }
];

const TAB = [
  {
    id: 1,
    link: "thong-tin",
    page: <MyInformation/>
  },
  {
    id: 2,
    link: "doi-mat-khau",
    page: <ChangePassword/>
  },
  {
    id: 3,
    link: "lich-su",
    page: <MyBook/>
  }
];

const SettingPage = () => {
  //useState
  const [indexTab, setIndexTab] = useState<any>(getPath(usePathname()));
  //const
  const router = useRouter();
  const dispatch = useAppDispatch();

  //function
  const handleClickTab = (tab) => {
    setIndexTab(tab.link);
    console.log(tab);
    router.push(`/tai-khoan/${tab?.link}`);
  };

  //Logout
  const handleLogout = async () => {
    try {
      CookiesStorage.clearCookieData("token");
      CookiesStorage.clearCookieData("role");
      LocalStorage.remove("user");
      await LogoutAPI({});
      dispatch(usersReducer.actions.setStatus());
      router.push("/");
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const renderTab = () => {
    return TAB.filter((tab) => tab.link === indexTab)[0]?.page;
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
                    onClick={() => handleClickTab(tab)}
                    key={index}
                    className={`rounded-tl-[12px] font-bold cursor-pointer hover:bg-[--clr-gray-125] px-2 py-3 
                    ${tab?.link === indexTab ? "bg-[--clr-gray-325]" : ""}`}
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