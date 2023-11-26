"use client";
import React, { useState } from "react";

import Breadcrumb from "@/components/common/BreadCrumb/index";
import { selectBreadCrumbs } from "@/stores/reducers/breadCrumb";
import { useAppSelector } from "@/stores/hook";

const Header = () => {
  const [breadCrumbs, setBreadCrumbs] = useState<any>();
  const { headTitle, tabTitle, params, routes, pageTitle } = useAppSelector(
    selectBreadCrumbs
  );

  return (
    <div
      className="min-h-[var(--header-height)] border-[1px] bg-white border-b-gray-400 text-[10px] flex justify-between px-10 items-center">
      <span>
        <Breadcrumb
          headTitle={headTitle}
          tabTitle={tabTitle}
          paramsReplace={params}
          routes={breadCrumbs || routes}
          pageTitle={pageTitle}
        />{" "}
      </span>
      <div className="flex gap-10">
        <span>(+84) 236 392 86 88</span>
        <span>SKYVIEWRESTAURANT.COM</span>
      </div>
    </div>
  );
};

export default Header;
