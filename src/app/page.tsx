"use client";

import CustomChatMessage from "@/components/MesssageChat";
import Slider from "@/components/common/SliderBar";
import Footer from "@/pages/Footer";
import { GetUserById } from "@/services/user";
import { useEffect } from "react";

export default function Home() {
  const getData = async (id: number) => {
    const data = await GetUserById(id);
    return data;
  };
  useEffect(() => {
    console.log("dd", getData(2));
  }, []);

  return (
    <main>
      <Slider />
      <CustomChatMessage />
      <Footer />
    </main>
  );
}
