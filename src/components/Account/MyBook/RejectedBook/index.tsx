import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";

import { CancelIcon } from "@/components/Icons";
import ButtonBtn from "@/components/common/Button";
import CheckNotFound from "@/components/common/CheckNotFound";
import { formatDateReceivedBooking } from "@/utils/convertDate";
import { formatMoney } from "@/utils/formatMoney";
import ModalPopup from "@/components/common/ModalPopup";
import { rejectedSchema } from "@/libs/validation/rejectedSchema";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { checkBookingIsCustom, getAllFoodByBooking } from "@/services/book";
import { getAllZones } from "@/services/zone";
import DetailModalBook from "@/components/DetailModalBook";

const RejectedPage = (props) => {
  //useState
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(rejectedSchema),
    defaultValues: {
      date: undefined,
      comeInAt: "",
      comeOutAt: "",
    },
  });
  //useState

  const [isOpenReBooking, setIsOpenReBooking] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>();
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [zones, setZones] = useState<any[] | undefined>([]);
  const [comboMenuItem, setComboMenuItem] = useState<any>([]);

  //const
  const dispatch = useAppDispatch();
  const { data, reFetchData } = props;

  //functions
  const handleClickCancelReBooking = () => {
    setIsOpenReBooking(false);
  };

  const handleCloseModalReBooking = () => {
    setIsOpenReBooking(false);
  };

  const handleReBooking = async (booking) => {
    setIsOpenReBooking(true);
    setBooking(booking);
    try {
      const isCheck = await checkBookingIsCustom(booking?.id);
      if (isCheck) {
        const all = await getAllFoodByBooking(booking?.id);
        setComboMenuItem(all?.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        })));
      } else {
        setComboMenuItem([]);
      }
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const router = useRouter();
  const pathName = usePathname();

  const fetchZones = async () => {
    try {
      const res = await getAllZones({ pageSize: 100 });
      setZones(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <CheckNotFound data={data}>
        {
          data?.map((item, index) => (
            <div key={index} className="flex flex-col gap-[3px] shadow-[1px_3px-5px_red]">
              <div className="rounded-b-[6px] p-4 bg-[--clr-white-75] w-full text-[13px] text-[--clr-gray-500]">
                <div className="flex justify-between pb-1 text-[16px] text-[--clr-blue-400]">
                  <span>Sky View - Restaurant</span>
                  <span
                    className="flex gap-2 justify-between items-center"> <CancelIcon/><span>Dịch vụ đang đã hủy</span></span>
                </div>
                <hr/>
                <div className="pt-1 flex gap-3">
                  <span>
                    {
                      item?.comboMenu?.service?.image && <Image
                        src={item?.comboMenu?.service?.image}
                        width={100} height={100} priority={true} alt="book pending"/>
                    }
                  </span>
                  <div className="flex flex-col w-full justify-around">
                    <span className="text-[16px] font-semibold">{item?.comboMenu?.comboName}</span>
                    <span
                      className={"text-[14px] text-[--clr-gray-400]"}>{item?.comboMenu?.description}</span>
                    <div className="flex justify-between items-end w-full text-[14px] font-[500] text-[--clr-red-400]">
                      <span>Tổng tiền : {formatMoney(item?.totalMoney)} VND</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <span>Ngày nhận : {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.comeInAtDate}</span>
                    <span>Thời gian : {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.hourComeInAt} -
                      {formatDateReceivedBooking(item?.comeInAt, item?.comeOutAt)?.hourComeOutAt}</span>
                  </div>
                </div>
              </div>
              <div
                className="rounded-t-[6px] p-4 bg-[--clr-orange-50] text-[13px] text-[--clr-gray-500] flex flex-col justify-end gap-3 w-full items-end">
                <span
                  className="text-[14px] text-[--clr-red-400] font-[500]">Tiền cọc : {formatMoney(item?.depositMoney) || 0} VND</span>
                <div className="flex gap-3">
                  <ButtonBtn width={150} bg="var(--clr-green-600)" onClick={() => handleReBooking(item)}>Đặt
                    lại</ButtonBtn>
                  <ButtonBtn width={150} bg="var(--clr-green-400)"
                    onClick={() => router.push(`${pathName}/${item?.id}`)}>Chi
                    tiết</ButtonBtn>
                </div>
              </div>
            </div>))
        }
      </CheckNotFound>

      <ModalPopup
        open={isOpenReBooking}
        title={"Đặt lại"}
        setOpen={setIsOpenReBooking}
        closeModal={handleCloseModalReBooking}
      >
        <DetailModalBook
          handleClickCancel={handleClickCancelReBooking}
          handleCloseModals={handleCloseModalReBooking}
          serviceId={booking?.serviceId}
          comboMenuId={booking?.comboMenuId}
          comboMenuItem={comboMenuItem}
          priceTotalDish={booking?.comboMenu?.totalPrice}/>
      </ModalPopup>
    </div>
  );
};

export default RejectedPage;