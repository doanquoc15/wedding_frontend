"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/legacy/image";

import TitleHead from "@/components/TitleHead";
import Slider from "@/components/common/SliderBar";
import { useAppDispatch } from "@/stores/hook";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { HOME_BREADCRUMB } from "@/constants/common";
import MySlick from "@/components/MySlick";
import { getTopDish } from "@/services/menu-item";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import CardFood from "@/components/CardFood";
import { getAllService } from "@/services/service";
import CardService from "@/components/CardService";

export default function Home() {
  //useState
  const [topDish, setTopDish] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  //const
  const dispatch = useAppDispatch();

  const fetchTopDish = async () => {
    try {
      const res = await getTopDish(10);
      setTopDish(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.data.message));
    }

  };
  const getServices = async () => {
    try {
      const res = await getAllService({ pageSize: 100 });
      setServices(res.data);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  useEffect(() => {
    fetchTopDish();
    getServices();
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
      <Slider/>
      <TitleHead title="Trang Chủ"/>
      <div className="w-full py-7 px-7 rounded-[5px] mb-[30px]">
        <div className="mt-6">
          <MySlick title="Top 10 món ăn mới nhất">
            {
              topDish.map((item, index) => (
                <div key={index}><CardFood data={item}/></div>
              ))
            }
          </MySlick>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="border-b-[1px] border-gray-400 w-[50%]"/>
      </div>
      <div className="w-full py-7 px-7 rounded-[5px] mb-[30px]">
        <div className="mt-6">
          <MySlick title="Dịch vụ hot">
            {
              services.map((item, index) => (
                <div key={index} className="py-3"><CardService data={item}/></div>
              ))
            }
          </MySlick>
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
          <div className="ml-[100px]">
            {" "}
            <span className="text-[22px]">“</span> Vị ngon đẳng cấp, dịch vụ
            đáng nhớ, phục vụ từ tâm hồn...
          </div>
          <div>
            Chúng tôi xin chân thành cảm ơn sự ủng hộ của bạn. Hãy đến và cùng
            chúng tôi tạo nên những kỷ niệm đáng nhớ
            <span className="text-[22px]"> ”</span>
          </div>
        </div>
        <div className="absolute bottom-5 right-10 italic text-[--clr-gray-500] ">
          Sky View - Restaurant
        </div>
      </Box>
    </main>
  );
}
