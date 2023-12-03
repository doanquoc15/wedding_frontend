"use client";
import React, { useState } from "react";

import { useAppSelector } from "@/stores/hook";
import { selectBreadCrumbs } from "@/stores/reducers/breadCrumb";
import Breadcrumb from "@/components/common/BreadCrumb";

const Header = () => {
  const [breadCrumbs, _] = useState<any>();
  const { routes } = useAppSelector(
    selectBreadCrumbs
  );

  // ``;
  return (
    <div
      className="min-h-[var(--header-height)] border-[1px] bg-white border-b-gray-400 text-[10px] flex justify-between px-10 items-center">
      <span>
        <Breadcrumb
          routes={breadCrumbs || routes}
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
