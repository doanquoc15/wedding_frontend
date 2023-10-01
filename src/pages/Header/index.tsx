import React from "react";

const Header = () => {
  return (
    <div className="min-h-[var(--header-height)] border-[1px] bg-white border-b-gray-400 text-[10px] flex justify-between px-10 items-center">
      <span>MANAGED BY H&K HOSPITALITY</span>
      <div className="flex gap-10">
        <span>(+84) 236 392 86 88</span>
        <span>INFO@BELLEMAISONDANANG.COM</span>
      </div>
    </div>
  );
};

export default Header;
