import React from "react";

const SafetyPolicy = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-[15px] font-bold ">Cam Kết An Toàn của Nhà Hàng:</h2>
      <p className="mb-4">
        Chúng tôi tận tâm trong việc bảo đảm sự an toàn và vệ sinh tuyệt đối cho tất cả khách hàng và nhân viên.
        Dưới đây là những cam kết của chúng tôi:
      </p>

      <div className="">
        <h3 className="text-[15px] font-bold">1. Vệ Sinh Nhà Hàng:</h3>
        <ul className="list-disc pl-6">
          <li>Duy trì tiêu chuẩn vệ sinh cao nhất trong mọi khu vực của nhà hàng, từ nhà bếp đến khu vực phục vụ.</li>
          <li>Đội ngũ nhân viên được đào tạo về các biện pháp vệ sinh và đeo đủ trang bị bảo hộ.</li>
        </ul>
      </div>

      <div className="">
        <h3 className="text-[15px] font-bold">2. Kiểm Soát An Toàn Thực Phẩm:</h3>
        <ul className="list-disc pl-6">
          <li>Theo dõi chặt chẽ nguồn cung thực phẩm để đảm bảo chất lượng và an toàn thực phẩm.</li>
          <li>Các món ăn được chuẩn bị và lưu trữ theo các quy tắc vệ sinh an toàn thực phẩm.</li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyPolicy;
