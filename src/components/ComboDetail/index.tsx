"use client";
import Image from "next/legacy/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { createSlug } from "@/utils/createSlug";
import { paymentCheckout } from "@/services/payment";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { formatMoney } from "@/utils/formatMoney";

import Button from "../common/Button";

interface Combo {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ComboMenuDetail = ({ menuCombo }) => {
  //useState
  //const
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  //functions
  const handleClickDetail = () => {
    const slug = createSlug(menuCombo?.comboName);
    router.push(`${pathname}/${slug}-${menuCombo.id}`);
  };
  const handleBooking = async () => {
    try {
      const res = await paymentCheckout([
        {
          id: menuCombo?.id,
          name: menuCombo?.comboName,
          price: 1000,
          quantity: 1,
        },
      ]);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };
  //useEffect
  return (
    <div className="flex flex-col">
      <div className="w-[250px] h-[300px] border-2 border-gray-300 rounded-4 overflow-hidden relative">
        <Image
          src="https://cdn4.vectorstock.com/i/1000x1000/48/28/tropical-background-with-banana-leaves-vector-33234828.jpg"
          alt="bg combo"
          priority={true}
          width={350}
          height={0}
          objectFit="cover"
        />
        <div className="absolute top-20 w-full">
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="text-[--clr-red-400] text-[18px] font-bold">
              {menuCombo?.comboName}
            </div>
            <div className="text-[--clr-red-400]">
              <span className="font-semibold text-[#126213]">Số món :</span>{" "}
              {menuCombo?.comboItems?.length} món/bàn
            </div>
            <div className="text-[--clr-red-400]">
              <span className="font-semibold text-[#126213]">Chi phí :</span>{" "}
              {formatMoney(menuCombo?.totalPrice)}/bàn
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-[50%] translate-x-[-50%]">
          <div className="flex justify-between gap-5">
            <Button
              width={100}
              sx={{ marginBottom: "10px" }}
              onClick={handleClickDetail}
            >
              Chi tiết
            </Button>
            <Button onClick={handleBooking} width={100}>
              Đặt đơn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboMenuDetail;
