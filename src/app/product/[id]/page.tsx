"use client";

import { Products } from "@/components/User.Type";
import Cart from "@/Icons/Shoping";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`)
      .then((response) => {
        setProduct(response.data.data.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Mahsulot ma’lumotlarini yuklashda xatolik yuz berdi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center text-blue-600 text-lg">Yuklanmoqda...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!product)
    return (
      <p className="text-center text-gray-500 text-lg">
        Mahsulot topilmadi 
      </p>
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 flex justify-center items-center">
            {product.large_images && product.large_images.length > 0 ? (
              <Image
                src={product.large_images[0]}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg shadow-lg object-contain"
              />
            ) : (
              <p className="text-gray-400">Rasm mavjud emas</p>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-600 text-lg"></p>

            <div className="mt-4">
              <p className="text-3xl font-bold text-blue-600">
                {product.sale_price} so‘m
              </p>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md transition">
                <Cart/>  Savatga qo‘shish
              </button>
              <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg shadow-md transition">
                 Saqlash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
