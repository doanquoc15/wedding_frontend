import React, { ReactNode } from "react";

import Header from "@/pages/Header";
import NavBar from "@/pages/NavBar";
import Footer from "@/pages/Footer";
import CustomChatMessage from "@/components/MesssageChat";

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
      <CustomChatMessage/>
      <Footer/>
    </div>
  );
};

export default ClientLayout;