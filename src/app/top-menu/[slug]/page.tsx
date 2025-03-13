"use client";

import CardPage from "@/app/cardpage/page";
import { TopMenuType } from "@/components/User.Type";
import { Pagination } from "antd";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function TopMenu() {
  const [topMenu, setTopMenu] = useState<TopMenuType | null>(null);
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTopMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=${slug}&sort=-order_count&page=${currentPage}`
        );
        console.log("API response:", response.data);
        setTopMenu(response.data?.data || null);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Xatolik yuz berdi, ma’lumot yuklanmadi");
        setTopMenu(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMenu();
  }, [slug, currentPage]);

  if (!slug) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="px-10 mx-auto my-6">
      <div className="grid grid-cols-5 gap-6 container px-10 mx-auto mb-4">
        {loading ? (
          <p className="text-center text-lg">Yuklanmoqda...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : topMenu?.products?.length > 0 ? (
          topMenu.products.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <CardPage item={item} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Mahsulotlar topilmadi</p>
        )}
      </div>

      {topMenu?.total && topMenu.total > 0 && (
        <Pagination
          current={currentPage}
          total={topMenu.total}
          pageSize={30}
          onChange={(page) => setCurrentPage(page)}
          className="text-center mt-4"
        />
      )}
    </div>
  );
}

export default TopMenu;
