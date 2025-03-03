"use client";

import { UserContext } from "@/context/context";
import { useContext, useEffect } from "react";

export default function CheckoutReceipt() {
  const { userCart } = useContext(UserContext);

  useEffect(() => {
    console.log(userCart);
  }, [userCart]);

  return (
    <section className="flex flex-col items-center bg-stone-300 rounded-xs p-4 relative">
      <h2 className="moraba-bold text-xl">سفارش شما</h2>
      <div className="bg-white w-full mt-4 p-4 shadow-lg sticky top-24">
        <div className="moraba-bold flex items-center justify-between w-full border-b-2 border-zinc-200 pb-4">
          <span>محصول</span>
          <span>جمع جزء</span>
        </div>
        <div className="flex flex-col">
          {userCart?.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b py-3 text-zinc-800/80"
            >
              <span>
                {e.title}{" "}
                <span className="px-2 text-zinc-800 text-sm">
                  {e.count} عدد
                </span>
              </span>
              <span className="text-sm">
                {(e.price * e.count).toLocaleString()}
                <span className="text-xs pr-1">تومان</span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between py-3 border-b font-bold">
          <span className="moraba-bold">جمع جزء</span>
          <span>
            {getAllPrice().toLocaleString()}
            <span className="text-xs pr-1">تومان</span>
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b font-bold">
          <span className="moraba-bold">حمل و نقل</span>
          <span>
            <span className="text-sm px-1 text-zinc-800/80 font-normal">
              ارسال با پیک موتوری{" "}
            </span>
            {(50000).toLocaleString()}
            <span className="text-xs pr-1">تومان</span>
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 font-bold">
          <span className="moraba-bold">مجموع</span>
          <span className="flex flex-col items-end gap-1 text-2xl">
            <span>
              {getAllPrice(100000).toLocaleString()}
              <span className="text-xs pr-1">تومان</span>
            </span>
            <span className="text-xs px-1 text-zinc-800 font-normal">
              شامل {(21364).toLocaleString()} تومان مالیات بر ارزش افزوده
            </span>
          </span>
        </div>
      </div>
      {/* <div className="bg-stone-500 text-white w-full mt-4 p-2 rounded-md">
        به دلیل نمونه کار بودن وبسایت امکان پرداخت وجود ندارد و سفارش شما رایگان
        ثبت میشود !
      </div> */}
    </section>
  );
  function getAllPrice(addedValue = 0) {
    let allPrice = 0;

    userCart?.map((e) => (allPrice = allPrice + e.price * e.count));

    allPrice = allPrice + addedValue;

    return allPrice;
  }
}
