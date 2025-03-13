"use client";

import { Modal } from "antd";
import Link from "next/link";
import { useState } from "react";
import FavouriteIcon from "../Icons/Heart";
import Menu from "../Icons/menu";
import Search from "../Icons/Search";
import Cart from "../Icons/Shoping";
import UserIcon from "../Icons/User";
import useMyStore from "../my-zustand";
import Searchlink from "./Search";
function Navsearch() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedItems] = useState({});
  const [input, setInput] = useState("");
  const state = useMyStore();
  const cartCount = state.savatcha.length;

  const showModal = () => setOpen(true);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-100 px-4 py-5">
      <div className="container m-auto flex items-center justify-between px-5">
        <div className="flex gap-5">
          <Link href="/">
            <img
              className=""
              src="https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg"
              alt="logo"
            />
          </Link>
          <button className="flex items-center gap-2 bg-amber-400 px-5 py-2 rounded font-semibold">
            <Menu /> Katalog
          </button>
        </div>

        <div className="">
          {/* <Search className="w-5 h-5 text-gray-500" /> */}
          {/* <input
            value={input}
  
            onChange={(e) => setInput(e.target.value)}
  
      className="pl-2 outline-none w-full"
            type="text"
                  placeholder="Qidirish..."
  
  /> */}

          <Searchlink />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center">
            <UserIcon />
            <p>Krish</p>
          </div>
          <div className="flex flex-col items-center">
            <FavouriteIcon />
            <p>Sevimli</p>
          </div>
          <div
            onClick={showModal}
            className="flex flex-col items-center relative cursor-pointer"
          >
            <Cart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-500 text-white text-xs font-bold flex items-center justify-center rounded-full w-5 h-5">
                {cartCount}
              </span>
            )}
            <p>Savatcha</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navsearch;
