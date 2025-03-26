"use client";

import { useEffect, useState } from "react";
import AddProductForm from "../add-product-form";
import { newErrorToast } from "@/utils/helper-function";
import axios from "axios";
import PAdminProduct from "../p-admin-product";

export default function RenderProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchProducts();
  }, []);

  async function FetchProducts() {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      newErrorToast("مشکلی پیش امده");
      setLoading(false);
    }
  }
  return (
    <>
      <section className="flex flex-col items-center bg-white my-6 rounded-lg p-4">
        <div className="flex flex-col gap-2 w-full">
          {loading
            ? Array.from({ length: 4 }).map((e, i) => (
                <div
                  key={i}
                  className="w-full lg:h-[240px] sm:h-[450px] h-[500px] bg-zinc-200 animate-pulse rounded-lg"
                ></div>
              ))
            : products.map((e, i) => (
                <PAdminProduct key={i} product={e} reRender={FetchProducts} />
              ))}
        </div>
      </section>
      <section className="rounded-lg bg-white my-6 p-4 moraba-regular">
        <h2 className="moraba-bold text-2xl text-zinc-700">
          افزودن محصول جدید
        </h2>
        <AddProductForm reRender={FetchProducts} />
      </section>
    </>
  );
}
