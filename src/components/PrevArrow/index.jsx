import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
const PrevArrow = ({onClick, disabled}) => {
    return (
        <div className='absolute right-10 -top-[40px]' onClick={onClick}>
            <div><FaAngleLeft opacity={disabled ? 0.3 : 1} size={25}/></div>
        </div>
    );
};

export default PrevArrow;