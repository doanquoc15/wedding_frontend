"use client";

import { Box } from "@mui/material";
import Image from "next/image";

import MainChefDetail from "@/components/MainChefDetail";
import { chefsData } from "@/data";
import TitleHead from "@/components/TitleHead";
import Slider from "@/components/common/SliderBar";

export default function Home() {
  return (
    <main>
      <Slider />
      <TitleHead title="Trang Chủ" />
      <div className="flex flex-col gap-8 items-center bg-[#f8ece0] py-7 rounded-[5px] mb-[30px]">
        <p className="text-[25px]">ĐẦU BẾP</p>
        {chefsData?.map((chef, index) => (
          <div key={index}>
            <MainChefDetail chef={chef} />
          </div>
        ))}
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
