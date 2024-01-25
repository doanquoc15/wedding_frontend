"use client";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { createSlug } from "@/utils/createSlug";
import { useAppDispatch } from "@/stores/hook";
import { formatMoney } from "@/utils/formatMoney";
import RatingCustom from "@/components/common/RatingCustom";
import DetailModalBook from "@/components/DetailModalBook";
import ModalPopup from "@/components/common/ModalPopup";
import { getUserLocal } from "@/services/getUserLocal";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

import Button from "../common/Button";

interface Combo {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const calculateStar = (data) => {
  const dataNew = data?.filter(item => item?.feedback);
  return dataNew?.reduce((total, item) => total + item?.feedback?.rating || 0, 0) / dataNew?.length;
};

const calculateFeedBack = (data) => {
  return data?.filter(item => item?.feedback)?.length;
};

const ComboMenuDetail = ({ menuCombo }) => {
  //useState
  const [isOpenBooking, setIsOpenBooking] = useState<boolean>(false);
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
    if (getUserLocal()?.id) {
      setIsOpenBooking(true);
    } else {
      dispatch(statusApiReducer.actions.setMessageError("Bạn cần đăng nhập để đặt bàn"));
    }
  };

  const convertDataMenuItems = (menuItems) => {
    return menuItems?.map((item) => ({
      quantity: item?.quantity,
      totalPrice: item?.totalPrice,
      menuItemId: item?.menuItemId
    }));
  };

  const handleCloseModalBooking = () => {
    setIsOpenBooking(false);
  };
  const handleClickCancelBooking = () => {
    setIsOpenBooking(false);
  };
  //useEffect
  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[500px] border-2 border-gray-300 rounded-4 overflow-hidden relative">
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
           
            <div className="text-[16px] font-bold flex items-center gap-3">
              <span
                className="text-yellow-400 pt-1">{calculateStar(menuCombo?.bookings) || 0}</span>
              <span
                className="ml-2"><RatingCustom
                  rating={calculateStar(menuCombo?.bookings) || 0}/></span>
              <span
                className="text-[--clr-gray-500] pt-1">
                {calculateFeedBack(menuCombo?.bookings) > 0 && calculateFeedBack(menuCombo?.bookings)?.toFixed(1) || 0} Đánh giá</span>
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
      <ModalPopup
        open={isOpenBooking}
        title={"Đặt bàn"}
        setOpen={setIsOpenBooking}
        closeModal={handleCloseModalBooking}
      >
        <DetailModalBook
          handleClickCancel={handleClickCancelBooking}
          handleCloseModals={handleCloseModalBooking}
          serviceId={+menuCombo?.serviceId}
          comboMenuId={+menuCombo?.id}
          comboMenuItem={convertDataMenuItems(menuCombo?.comboItems)}
          priceTotalDish={menuCombo?.totalPrice}/>
      </ModalPopup>
    </div>
  );
};

export default ComboMenuDetail;
