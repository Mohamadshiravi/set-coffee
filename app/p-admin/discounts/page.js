"use client";

import DiscountForm from "@/components/template/p-admin/add-discount-form";
import Discount from "@/components/template/p-admin/discount";
import { newErrorToast } from "@/utils/helper-function";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DiscountPage() {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchAllDiscounts();
  }, []);

  async function FetchAllDiscounts() {
    try {
      const res = await axios.get("/api/discount");
      setAllDiscounts(res.data.allDiscount);
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      newErrorToast("مشکلی پیش امد");
    }
  }

  return (
    <section className="px-6 pb-6 text-zinc-700">
      <div className="bg-white p-4 mt-6 rounded-lg">
        <h2 className="moraba-bold text-xl text-zinc-700">
          افزودن کد تخفیف جدید
        </h2>
        <DiscountForm reRender={FetchAllDiscounts} />
      </div>
      <div className="bg-white rounded-lg mt-6 w-full p-4">
        <h3 className="block moraba-bold text-xl border-b border-zinc-200 pb-4">
          کد های موجود
        </h3>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          {loading
            ? Array.from({ length: 3 }).map((e, i) => (
                <div
                  key={i}
                  className="w-[400px] h-[500px] bg-blue-300 animate-pulse rounded-lg"
                ></div>
              ))
            : allDiscounts.map((e, i) => (
                <Discount
                  reRender={FetchAllDiscounts}
                  key={i}
                  code={e.code}
                  precent={e.precent}
                  use={e.use}
                  maxUse={e.maxUse}
                  id={e._id}
                />
              ))}
          {allDiscounts.length === 0 && (
            <div className="text-center mt-3">کد تخفیفی موجود نیست</div>
          )}
        </div>
      </div>
    </section>
  );
}
