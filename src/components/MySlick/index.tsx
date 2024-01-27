import React, { useState } from "react";
import Slider from "react-slick";

import NextArrow from "@/components/NextArrow";
import PrevArrow from "@/components/PrevArrow";

const MySlider = ({ children, ...data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 4;
  const { title } = data;

  // @ts-ignore
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    autoPlay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow disabled={currentSlide === 10 - slidesToShow} onClick={undefined}/>,
    prevArrow: <PrevArrow disabled={currentSlide === 0} onClick={undefined}/>,
    beforeChange: (_, next) => setCurrentSlide(next),
  };


  return (
    <div>
      <div className={"px-8 flex gap-4 items-center"}>
        <p className='font-bold text-[20px]'>{title}</p>
      </div>
      <div className='relative mt-4'>
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default MySlider;