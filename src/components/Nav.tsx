import React from "react";
import Call from "../Icons/Call";
import Global from "../Icons/global";
import LocationIcon from "../Icons/LokationIcon";

const Nav: React.FC = () => {
  return (
    <div>
      <div className="bg-[#333] px-8 text-white py-2">
        <div className="container mx-auto w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <LocationIcon style={{ color: "#ffffff" }} />
              <p className="font-bold">Tashkent</p>
              <div className="flex gap-6 font-semibold ml-20">
                <p className="cursor-pointer">Bizning do'konlarimiz</p>
                <p className="cursor-pointer">Yuridik shaxslar uchun</p>
                <p className="cursor-pointer">To'lov usullari</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 font-semibold cursor-pointer">
                <Call style={{ color: "#ffffff" }} />
                <p>+998 93 874 40 25</p>
              </div>
              <div className="border px-2 py-1 rounded-[10px] flex items-center gap-2 cursor-pointer">
                <Global style={{ color: "#ffffff" }} />
                <p>UZ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      

    </div>
  );
};

export default Nav;