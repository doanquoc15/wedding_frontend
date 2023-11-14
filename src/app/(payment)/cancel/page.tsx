import ButtonBtn from "@/components/common/Button";

const CancelPayment = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-fit">
        <div className="mb-4 flex justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-danger" width="75" height="75"
            fill="red" viewBox="0 0 16 16">
            <path
              d="M10.727 11.293a.999.999 0 0 1-1.414 0L8 9.414l-1.314 1.88a.999.999 
              0 1 1-1.562-1.248l1.97-2.815-1.97-2.815a.999.999 0 1 1 1.562-1.248L8 
              6.586l1.314-1.88a.999.999 0 1 1 1.414 1.414L9.414 8l1.313 1.88a.997.997 0 0 1 0 1.413z" />
          </svg>
        </div>
        <div className="flex justify-center items-center text-center flex-col">
          <p className="text-[19px] font-semibold">Thanh toán thất bại</p>
          <h1 className="text-[15px] mt-3">Vui lòng thử lại !</h1>
          <ButtonBtn className="mt-6" width={200}>Thử lại</ButtonBtn>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;