import React from "react";
import Image from "next/legacy/image";

import LoadingIcon from "@/statics/svg/ic-loading.svg";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex justify-center items-center w-full min-h-full m-auto">
        <Image alt="LoadingIcon" src={LoadingIcon}/>
      </div>
    </div>
  );
};

export default Loading;
