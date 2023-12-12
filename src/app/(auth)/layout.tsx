import React, { ReactNode } from "react";

const AuthLayout = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div>
      <div className="py-8 px-9">{children}</div>
    </div>
  );
};

export default AuthLayout;