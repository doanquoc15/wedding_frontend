"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

import MainChefDetail from "@/components/MainChefDetail";
import { chefsData } from "@/data";
import TitleHead from "@/components/TitleHead";
import Slider from "@/components/common/SliderBar";
import { TypeEmployee } from "@/types/common";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getAllEmployee } from "@/services/employee";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { HOME_BREADCRUMB } from "@/constants/common";

export default function Home() {
  //useState
  const [employeeChefs, setEmployeeChefs] = useState<TypeEmployee[]>();

  //const
  const dispatch = useAppDispatch();

  //function
  const getEmployee = async () => {
    try {
      const res = await getAllEmployee({});
      setEmployeeChefs(
        res?.employees?.filter(
          (item: TypeEmployee) => item?.position === "CHEF"
        )
      );
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  //useEffect
  useEffect(() => {
    getEmployee();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      breadCrumbReducer.actions.setBreadCrumbs({
        routes: HOME_BREADCRUMB,
      })
    );

    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Slider />
      <TitleHead title="Trang Chủ" />
      <div className="w-full bg-[#f8ece0] py-7 px-7 rounded-[5px] mb-[30px]">
        <p className="text-[25px] text-center">ĐẦU BẾP</p>
        <div className="flex flex-wrap justify-between gap-10">
          {employeeChefs?.map((chef: TypeEmployee) => (
            <div key={chef?.id} className="">
              <MainChefDetail chef={chef} />
            </div>
          ))}
        </div>
      </div>
      <Box
        sx={{
          width: "80vw",
          height: "170px",
          background: "#f0f0f0",
          margin: "auto",
          position: "relative",
          borderRadius: "5px",
        }}
      >
        <Image
          src="https://www.pngkey.com/png/full/386-3865567_hnh-vecter-hoa-mai-hoa-o-dnh-cho.png"
          alt=""
          width={150}
          height={150}
        />
        <div className="text-[20px] text-[--clr-blue-400] italic px-10 absolute top-10">
          <p className="ml-[100px]">
            {" "}
            <span className="text-[22px]">“</span> Vị ngon đẳng cấp, dịch vụ
            đáng nhớ, phục vụ từ tâm hồn...
          </p>
          <p>
            Chúng tôi xin chân thành cảm ơn sự ủng hộ của bạn. Hãy đến và cùng
            chúng tôi tạo nên những kỷ niệm đáng nhớ
            <span className="text-[22px]"> ”</span>
          </p>
        </div>
        <p className="absolute bottom-5 right-10 italic text-[--clr-gray-500] ">
          Sky View - Restaurant
        </p>
      </Box>
    </main>
  );
}
