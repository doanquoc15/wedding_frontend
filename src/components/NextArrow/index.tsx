import React from "react";
import { FaAngleRight } from "react-icons/fa";

interface IResponse {
  disabled: boolean;
  onClick: any
}

const NextArrow = ({ disabled, onClick }) => {
  return (
    <div className='absolute right-5 -top-[40px]' onClick={onClick}>
      <div><FaAngleRight opacity={disabled ? 0.3 : 1} size={25}/></div>
    </div>
  );
};

export default NextArrow;