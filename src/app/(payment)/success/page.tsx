"use client";

import { useRouter } from "next/navigation";

import ButtonBtn from "@/components/common/Button";
import { LocalStorage } from "@/shared/config/localStorage";

const SuccessPayment = () => {
  //const
  const router = useRouter();

  //function
  const handleClick = () => {
    router.push("/");
    LocalStorage.add("selectedItem", 0);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-fit">
        <div className="mb-4 flex justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width="75" height="75"
            fill="green" viewBox="0 0 16 16">
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 
                    0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </div>
        <div className="flex justify-center items-center text-center flex-col">
          <div className="text-[19px] font-semibold">Thanh toán thành công</div>
          <h1 className="text-[15px] mt-3">Cảm ơn quý khách !</h1>
          <div>Chúng tôi sẽ gửi đến email của bạn. Vui lòng kiểm tra email. </div>
          <ButtonBtn className="mt-6" width={200} onClick={handleClick}>Trang chủ</ButtonBtn>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;