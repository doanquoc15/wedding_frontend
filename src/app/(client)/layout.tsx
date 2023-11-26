import React, { ReactNode } from "react";

import Header from "@/pages/Header";
import NavBar from "@/pages/NavBar";
import Footer from "@/pages/Footer";

export const metadata = {
  title: "Sky View",
  description: "Welcome to Next.js",
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header/>
      <NavBar/>
      <div className="py-8 px-9">{children}</div>
      <Footer/>
    </div>
  );
};

export default ClientLayout;