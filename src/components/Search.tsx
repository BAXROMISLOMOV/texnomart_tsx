"use client";

import CardPage from "@/app/cardpage/page";
import SearchBar from "@/Icons/Search";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type input = {
  image: string;
  name: string;
  sale_price: string;
  id: number;
};
type product = input[];
type obshiyinput = {
  total: number;
  products: product;
};

function Searchlink() {
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<obshiyinput>();

  useEffect(() => {
    if (input.trim() !== "") {
      axios
        .get(`https://gw.texnomart.uz/api/common/v1/search/result?q=${input}`)
        .then((res) => {
          setData(res.data.data);
        });
    }
  }, [input]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center border-2 border-amber-500 rounded w-[700px] p-2">
        <div>
          <SearchBar />
        </div>
        <input
          placeholder="Qidirish..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => setIsOpen(true)}
          type="text"
          className="w-72 px-3 py-2 text-lg outline-none border-none rounded-r-lg"
        />
      </div>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black opacity-40 z-10"
          ></div>
          <div className="absolute top-16 w-[520px] bg-white rounded-2xl shadow-lg z-20 overflow-auto max-h-[500px] p-4 border border-gray-200">
            <div className="flex justify-between items-center border-b pb-3">
              <p className="text-lg font-semibold text-gray-800">
                Qidiruv natijalari
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {data?.products.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col items-center border border-amber-500 p-3 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={257}
                      height={160}
                      className="rounded-lg"
                    />
                    <h2 className="text-center text-sm mt-2 font-medium text-gray-700">
                      {item.name}
                    </h2>
                    <p className="text-gray-800 font-semibold">
                      {item.sale_price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Searchlink;
