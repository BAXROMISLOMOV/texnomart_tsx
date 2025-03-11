"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function Corusel() {
  const url: string[] = [
    "https://mini-io-api.texnomart.uz/newcontent/slider/347/yYmFXeGX6qjS4LaqXmDbDHznlrgSJwJH3Wqw3YQy.webp",
    "https://mini-io-api.texnomart.uz/newcontent/slider/352/ScBALpx2hFb2aR4Nez7hr9AhHLg5MKwNjRVIgPek.webp",
    "https://mini-io-api.texnomart.uz/newcontent/slider/351/pu5Chblpp3CiDorsHhIAtvH26ldADVvmXFXLoFJq.webp",
    "https://mini-io-api.texnomart.uz/newcontent/slider/353/xAv9zeSr5NdTLAtVxLqpQibPdMIkwBNylsl0JafB.webp",
    "https://mini-io-api.texnomart.uz/newcontent/slider/347/yYmFXeGX6qjS4LaqXmDbDHznlrgSJwJH3Wqw3YQy.webp",
    "https://mini-io-api.texnomart.uz/newcontent/slider/350/L60iXNcOovoZLCBOYWRU1uTAUHUwCQauDFPTDj7l.webp",
  ];

  const [index, setIndex] = useState<number>(0);

  const Next = () => {
    setIndex((prevIndex) => (prevIndex < url.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const Back = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="mt-8 ml-[180px] mx-auto container px-8">
      <div className="relative">
        <button
          className={`absolute bg-white border top-[180px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full text-xl pb-1 cursor-pointer shadow-xl border-none text-[#DA002B] ${
            index === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={Back}
          disabled={index === 0}
        >
          <LeftOutlined className="w-6 h-6" />
        </button>

        <img
          className="rounded-xl h-[400px] cursor-pointer"
          onClick={Next}
          src={url[index]}
          alt={`Slider ${index + 1}`}
        />

        <button
          className={`absolute bg-white border top-[180px] left-[1420px] w-[40px] h-[40px] flex items-center justify-center rounded-full text-xl pb-1 cursor-pointer shadow-xl border-none text-[#DA002B] ${
            index === url.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={Next}
          disabled={index === url.length - 1}
        >
          <RightOutlined className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Corusel;
