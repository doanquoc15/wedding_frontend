"use client";
import React, { ReactNode } from "react";

import Header from "@/components/pages/Header";
import Footer from "@/components/pages/Footer";
import NavBar from "@/components/pages/NavBar";
import { getUserLocal } from "@/services/getUserLocal";
import CustomChatMessage from "@/components/MesssageChat";

const ClientLayout = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div>
      <Header/>
      <NavBar/>
      <div className="py-8 px-9">{children}</div>
      {
        getUserLocal()?.role?.roleName === "CUSTOMER" && <CustomChatMessage/>
      }
      <Footer/>
    </div>
  );
};

export default ClientLayout;