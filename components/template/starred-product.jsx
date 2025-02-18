"use client";

import Link from "next/link";
import ProductItem from "../module/productitem";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StarredProduct() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function FetchProduct() {
      setLoading(true);
      const res = await axios.get("/api/product");
      const product = res.data.data;

      const filteredProduct = product.filter((e) => e.score > 0);

      setProducts(filteredProduct);
      setLoading(false);
    }
    FetchProduct();
  }, []);
  return (
    <section className=" md:w-10/12 w-full m-auto sm:mt-32 mt-24">
      <div className="p-4 flex sm:flex-row flex-col gap-2 items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <h2 className="sm:text-4xl text-2xl moraba-bold text-headcolor py-2">
            ستاره دار ها
          </h2>
          <h3 className="sm:text-base text-xs text-zinc-500">Starred</h3>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-200 transition-all group rounded-xl p-3">
          <Link href={"/products"} className="moraba-bold sm:text-xl text-sm">
            مشاهده همه محصولات
          </Link>
          <IoIosArrowBack className="text-xl group-hover:-translate-x-2 transition-all" />
        </div>
      </div>
      <div className="w-full md:p-0 p-4 grid gap-4 lg:grid-cols-[2.4fr_2.4fr_2.4fr_2.4fr_2.4fr] md:grid-cols-[3fr_3fr_3fr_3fr] md:grid-cols-[4fr_4fr_4fr]  grid-cols-[6fr_6fr]">
        {products.map((e, i) => (
          <ProductItem
            key={i}
            title={e.title}
            score={e.score}
            price={e.price}
            image={e.images[0]}
            id={e._id}
          />
        ))}
        {loading &&
          Array.from({ length: 2 }).map((e, i) => (
            <div
              key={i}
              className="border flex gap-2 flex-col itemsc-enter animate-pulse w-full sm:h-[400px] h-[350px] bg-gray-200 rounded-md"
            ></div>
          ))}
      </div>
      {products.length === 0 && !loading && (
        <h3 className="moraba-regular sm:text-4xl text-xl w-full sm:mt-16 mt-4 text-center text-zinc-600">
          {" "}
          هنوز محصولی موجود نمیباشد
        </h3>
      )}
    </section>
  );
}
