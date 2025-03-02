"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FilterSection from "./shop/filterSection";
import RenderProductSection from "./shop/renderProductSection";

export default function ShopeSection() {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firstFetchProduct();
  }, []);

  async function firstFetchProduct() {
    setLoading(true);
    const product = await FetchAllProduct();
    setAllProduct(product);
    setLoading(false);
  }

  return (
    <main className="grid lg:grid-cols-[2fr_10fr] grid-cols-[1fr] lg:gap-4 gap-0 xl:px-20 sm:px-6 px-3 moraba-regular md:my-10 my-3">
      <FilterSection
        setFilter={(value) => {
          setAllProduct(value);
        }}
        FetchAllProduct={FetchAllProduct}
      />
      <RenderProductSection
        setFilter={(value) => {
          setAllProduct(value);
        }}
        loading={loading}
        products={allProduct}
      />
    </main>
  );
  async function FetchAllProduct() {
    const res = await axios.get("/api/product");
    return res.data.data;
  }
}
