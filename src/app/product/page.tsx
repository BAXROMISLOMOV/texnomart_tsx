"use client";

import { Products } from "@/components/User.Type";
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

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`
        );
        setProduct(response.data.data.data);
      } catch (err) {
        setError("API Error: Ma’lumot yuklanmadi");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-10 my-6">
      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-xl font-bold mb-4">{product?.name}</h1>
          {product?.large_images && (
            <Image
              src={product.large_images[0]}
              alt={product.name}
              width={500}
              height={300}
              className="rounded-md"
            />
          )}
        </div>
        <p className="text-lg text-gray-700 font-semibold">
          Narxi: {product?.sale_price} so‘m
        </p>
      </div>
    </div>
  );
}

export default ProductPage;