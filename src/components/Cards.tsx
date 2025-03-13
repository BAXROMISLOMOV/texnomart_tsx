"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "../app/cardpage/page";
import { cards } from "./User.Type";
import Link from "next/link";

function Cards() {
  const [products, setProducts] = useState<cards[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://gw.texnomart.uz/api/web/v1/home/special-products?type=hit_products"
      )
      .then((response) => {
        setProducts(response.data.data.data);
      });
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-2xl mb-4 font-medium">Xit Savdo</h2>
      <div className="grid grid-cols-5 gap-6">
        {products?.map((item) => {
          return (
            <Link href={`/product/${item.id}`} key={item.id}>
              <CardPage item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
