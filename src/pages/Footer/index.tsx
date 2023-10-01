"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiLogoFacebook } from "react-icons/bi";
import { AiFillYoutube , AiOutlineInstagram , AiOutlineTwitter } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link";

import logo_sky_view_footer from "@/statics/images/logo_ft.png";
import MapIFrame from "@/components/Map";
import style from "@/styles/footer.module.scss";
const Footer = () => {
  return (
    <div className="flex justify-between p-10 items-center bg-[--clr-gray-200] mt-12">
      {/* Logo restaurant */}
      <section className="w-[100px] rounded-[50%] overflow-hidden">
        <Image
          src={logo_sky_view_footer}
          alt="Logo sky view restaurant"
          width={100}
          height={100}
          priority={true}
        />
      </section>
      {/* Contact */}
      <section className="text-center text-[13px]">
        <p className="mb-4">SKEY VIEW - RESTAURANT</p>
        <p>
          Tầng 20 Belle Maison Parosand, 216 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà,
          Đà Nẵng.
        </p>
        <p>(84 24) 3747 6373 l | (84 24) 3747 6371</p>
        <p>infoskv@hkh.vn & skyview.vn | www.skv.com.vn</p>
        <div className={`${style.social_links}`}>
          <Link href="">
            <BiLogoFacebook className={`${style.icon_item}`} />
          </Link>
          <Link href="">
            <AiFillYoutube className={`${style.icon_item}`} />
          </Link>
          <Link href="">
            <BsLinkedin className={`${style.icon_item}`}/>
          </Link>
          <Link href="">
            <AiOutlineInstagram className={`${style.icon_item}`} />
          </Link>
          <Link href="">
            <AiOutlineTwitter className={`${style.icon_item}`} />
          </Link>
        </div>
      </section>
      {/* Map */}
      <section>
        <MapIFrame />
      </section>
    </div>
  );
};

export default Footer;
