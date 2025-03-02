"use client";

import Link from "next/link";
import ProductItem from "../module/productitem";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";

export default function LastestProduct() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    FetchProduct();
  }, []);

  async function FetchProduct() {
    setLoading(true);
    const res = await axios.get("/api/product");
    const product = res.data.data;

    const filteredProduct = product.filter((e) => e.score > 0);

    setProducts(filteredProduct);

    setLoading(false);
  }
  return (
    <section className="md:w-11/12 w-[95%] m-auto bg-[#ac9f99] rounded-md shadow-md sm:mt-16 mt-4">
      <div className="sm:px-12 px-4 sm:py-8 py-6 flex sm:flex-row flex-col gap-0 items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-4xl moraba-bold text-white py-2">ستاره دارها</h2>
          <h3 className="text-base text-brown-700 font-semibold">Starred</h3>
        </div>
        <div className="flex text-white items-center gap-2 hover:bg-gray-100/50 transition-all group rounded-xl sm:p-3 px-3 py-2 sm:mt-0 mt-1">
          <Link
            href={"/products"}
            className="moraba-bold sm:text-xl text-base text-white"
          >
            مشاهده همه محصولات
          </Link>
          <IoIosArrowBack className="text-xl group-hover:-translate-x-2 transition-all" />
        </div>
      </div>
      <div className="w-full sm:p-4 p-2 grid sm:gap-4 gap-2 lg:grid-cols-[2.4fr_2.4fr_2.4fr_2.4fr_2.4fr] md:grid-cols-[3fr_3fr_3fr_3fr] md:grid-cols-[4fr_4fr_4fr]  grid-cols-[6fr_6fr]">
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
          Array.from({ length: 5 }).map((e, i) => (
            <Skeleton
              key={i}
              sx={{ bgcolor: "grey.100", borderRadius: "5px" }}
              variant="rectangular"
              width={"100%"}
              animation="wave"
              height={"400px"}
            />
          ))}
      </div>
      {products.length === 0 && !loading && (
        <h3 className="moraba-regular text-xl w-full py-10 text-center text-zinc-200">
          هنوز محصولی موجود نمیباشد
        </h3>
      )}
    </section>
  );
}
