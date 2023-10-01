"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { WITHOUT_CONTENT } from "@/constants/common";

const WithoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathNameCurrent = usePathname();
  const pathname = pathNameCurrent?.split("/")[1];
  return (
    <div>
      {!WITHOUT_CONTENT.some(path => path === pathname) ? children : null}
    </div>
  );
};

export default WithoutContent;