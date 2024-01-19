import React from "react";
import { Grid, Paper } from "@mui/material";
import Image from "next/legacy/image";
import { styled } from "@mui/material/styles";

import { formatMoney } from "@/utils/formatMoney";
import RatingCustom from "@/components/common/RatingCustom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "25px",
  color: theme.palette.text.secondary,
}));

const CardService = ({ data }) => {
  const calculateStar = (data) => {
    const dataNew = data?.filter(item => item?.feedback);
    return dataNew?.reduce((total, item) => total + item?.feedback?.rating || 0, 0) / dataNew?.length;
  };

  const calculateFeedBack = (data) => {
    return data?.filter(item => item?.feedback)?.length;
  };

  return (
    <Grid item xs={2} sm={4} md={4} key={data.id}>
      <Item>
        <div
          className="rounded-[50%] w-[100px] h-[100px] overflow-hidden border-[4px] border-[--clr-orange-300]">
          <Image
            src={data?.image || ""}
            alt="image service"
            width={100}
            height={100}
            priority={true}
            objectFit="cover"
          />
        </div>
        <div className="text-[16px] font-bold flex"><span
          className="min-w-[100px] block">Loại dịch vụ</span>: <span
          className="ml-2">{data?.serviceName}</span>
        </div>
        <div className="text-[16px] font-bold flex"><span
          className="min-w-[100px] block">Phí dịch vụ</span>: <span
          className="ml-2">{formatMoney(data?.price)} vnd</span>
        </div>
        <div className="text-[16px] font-bold flex"><span
          className="min-w-[100px] block">Menu hiện có</span>: <span
          className="ml-2">{data?.comboMenus?.length || 0}</span>
        </div>
        <div className="text-[16px] font-bold flex"><span
          className="min-w-[100px] block">Số lần được đặt</span>: <span
          className="ml-2">{data?.bookings?.length || 0}</span>
        </div>
        <div className="text-[16px] font-bold flex items-center gap-3">
          <span
            className="text-yellow-400 ">{calculateStar(data?.bookings) ? calculateStar(data?.bookings).toFixed(1) : 0}</span>
          <span
            className="ml-2"><RatingCustom
              rating={calculateStar(data?.bookings)}/></span>
          <span
            className="text-[--clr-gray-500] ">{calculateFeedBack(data?.bookings) || 0} Đánh giá</span>
        </div>
      </Item>
    </Grid>
  );
};

export default CardService;
