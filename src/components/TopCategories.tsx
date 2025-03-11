"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TopCategoriesType } from "./User.Type";

function TopCategories() {
  const [topCategories, setTopCategories] = useState<TopCategoriesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://gw.texnomart.uz/api/web/v1/header/top-categories"
        );
        setTopCategories(response.data?.data?.data || []);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Xatolik yuz berdi, ma’lumot yuklanmadi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();
  }, []);

  return (
    <div className="container mx-auto px-10 my-6">
      {loading ? (
        <p className="text-center text-lg">Yuklanmoqda...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : topCategories.length > 0 ? (
        <div className="flex justify-between">
          {topCategories.map((item) => (
            <Link key={item.slug} href={`/top-menu/${item.slug}`}>
              <p className="select-none cursor-pointer hover:text-blue-500">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Kategoriyalar topilmadi</p>
      )}
    </div>
  );
}

export default TopCategories;
