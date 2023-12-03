import React, { ReactNode } from "react";

import NotFound from "@/components/NotFound";

interface NotFoundProps {
  children: ReactNode | undefined;
  data: Array<unknown>;
  isLoading?: boolean;
}

const CheckNotFound: React.FC<NotFoundProps> = ({ children, data, isLoading }) => {
  let isEmptyArray = data.length === 0;

  return !isEmptyArray ? <>{children}</> : <>{!isLoading && <NotFound/>}</>;
};

export default CheckNotFound;
