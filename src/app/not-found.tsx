"use client";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import NotFound from "@/statics/svg/ic-404.svg";

const NotFoundPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (pathName?.startsWith("/admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [router]);

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-full text-center">
        <h1 className="text-[#515557] text-[80px] font-bold">404</h1>
        <h2 className="text-[30px] mb-6 font-semibold">Not Found</h2>
        <h3 className="text-[16px] mb-6 font-semibold">
          Access to this resource on the server is denied!
        </h3>
        <div className="flex justify-center">
          <Image alt="NotFound" src={NotFound} />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
