"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "../app/cardpage/page";
import { cards } from "./User.Type";
import Link from "next/link";

function Cards() {
  const [products, setProducts] = useState<cards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://gw.texnomart.uz/api/web/v1/home/special-products?type=hit_products"
        );
        setProducts(response.data?.data?.data || []);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Xatolik yuz berdi, ma’lumot yuklanmadi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-2xl mb-4 font-medium">Xit Savdo</h2>

      {loading ? (
        <p className="text-center text-lg">Yuklanmoqda...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-5 gap-6">
          {products.map((item) => (
            <Link href={`/CardPage/${item.id}`} key={item.id}>
              <CardPage item={item} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Mahsulotlar topilmadi</p>
      )}
    </div>
  );
}

export default Cards;
