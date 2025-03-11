"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import useMyStore from "../my-zustand";
import Menu from "../Icons/menu";
import FavouriteIcon from "../Icons/Heart";
import Cart from "../Icons/Shoping";
import Search from "../Icons/Search";
import UserIcon from "../Icons/User";
import Link from "next/link";
function Navsearch() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
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
  const handleCancel = () => setOpen(false);


  const countSelectedItems = () => Object.values(selectedItems).filter(Boolean).length;

  const clearSelectedItems = () => {
    setSelectedItems({});
    setSelectAll(false);
  };

  return (
    <div className="bg-gray-100 px-4 py-5">
      <div className="container m-auto flex items-center justify-between px-5">
        <div className="flex gap-5">
    <Link href="/">
      <img className=""src="https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg"alt="logo"
        />
      </Link>
      <button className="flex items-center gap-2 bg-amber-400 px-5 py-2 rounded font-semibold">
        <Menu /> Katalog
      </button>
    </div>

  <div className="flex items-center border-2 border-amber-500 rounded w-[700px] p-2">
      <Search className="w-5 h-5 text-gray-500" />
      <input
            value={input}
  
            onChange={(e) => setInput(e.target.value)}
  
      className="pl-2 outline-none w-full"
            type="text"
                  placeholder="Qidirish..."
  
  />
  
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

      <Modal
        title={`Savatchangiz (${countSelectedItems()} ta tanlandi)`}
    open={open}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    width={1300}
  >
    {cartCount > 0 ? (
      <>
        <div className="flex justify-between border-b pb-5 pt-10">
          <label className="text-xl flex items-center gap-2 cursor-pointer">
       <input
        type="checkbox"
        checked={selectAll}
        className="w-5 h-5 border border-gray-400 rounded cursor-pointer"
           />
            Hammasini tanlash
          </label>
       <button
         onClick={clearSelectedItems}
         className="text-xl text-yellow-500 cursor-pointer"
       >
         Tanlanganlarni o'chirish
          </button>
        </div>
      <div className="mt-5">
          {state.savatcha.map((item) => (
            <label
         className="flex items-center gap-2 cursor-pointer py-2"
       >
         <input
        
              />
              
                </label>
              ))}
            </div>
          </>
        ) : (
          <p>Savatchangiz bo‘sh</p>
        )}
      </Modal>
    </div>
  );
}

export default Navsearch;
