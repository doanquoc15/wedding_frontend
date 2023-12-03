import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div
      className="w-full h-full flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center">
        <Image width={300} height={300} priority={true}
          src="https://res.cloudinary.com/quoccloudinary/image/upload/v1701097055/fksa0xjwbbajonwwko6o.jpg"
          alt="warning"/>
        <span className="font-bold leading-5 text-[25px]">Không có dữ liệu</span>
      </div>

    </div>
  );
};

export default NotFound;
