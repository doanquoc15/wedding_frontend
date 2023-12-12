"use client";
import React, { ReactNode } from "react";

import Header from "@/pages/Header";
import Footer from "@/pages/Footer";

import NavBar from "../../pages/NavBar";

const ClientLayout = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div>
      <Header/>
      <NavBar/>
      <div className="py-8 px-9">{children}</div>
      {/*<CustomChatMessage/>*/}
      <Footer/>
    </div>
  );
};

export default ClientLayout;