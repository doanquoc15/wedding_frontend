import React from "react";
import Image from "next/legacy/image";

import LoadingIcon from "@/statics/svg/ic-loading.svg";

const Loading = () => {
  return (
    <div className="min-h-full w-full">
      <div className="flex justify-center items-center">
        <Image alt="LoadingIcon" src={LoadingIcon}/>
      </div>
    </div>
  );
};

export default Loading;
