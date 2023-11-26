import React, { ReactNode } from "react";

export const metadata = {
  title: "Sky View",
  description: "Welcome to Next.js",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="py-8 px-9">{children}</div>
    </div>
  );
};

export default AuthLayout;