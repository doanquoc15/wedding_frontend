import React from "react";
import Image from "next/image";

import LoadingIcon from "@/statics/svg/ic-loading.svg";

const Loading = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <Image alt="LoadingIcon" src={LoadingIcon} />
      </div>
    </div>
  );
};

export default Loading;
