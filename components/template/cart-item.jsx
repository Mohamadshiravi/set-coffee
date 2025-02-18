"use client";

import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { newToast } from "@/utils/helper-function";
import { UserContext } from "@/context/context";

export default function CartItem({
  title,
  img,
  price,
  count,
  id,
  getAllPrice,
  GetCart,
}) {
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    if (productCount <= 0) {
      setProductCount(1);
    }
    let userCart = JSON.parse(localStorage.getItem("cart"));
    userCart.map((e) => e.id === id && (e.count = productCount));
    localStorage.setItem("cart", JSON.stringify(userCart));
    getAllPrice();
  }, [productCount]);

  useEffect(() => {
    setProductCount(count);
  }, []);
  const { FetchUserData } = useContext(UserContext);
  return (
    <div className="flex relative lg:flex-row flex-col lg:gap-0 gap-4 items-center xl:justify-start justify-center mt-4 border-b lg:pb-0 pb-4 border-gray-100">
      <button
        onClick={RemoveFromCartHandler}
        className="text-2xl transition mr-4 hover:bg-gray-100 rounded-full p-1 text-zinc-700"
      >
        <IoCloseOutline />
      </button>
      <div className="lg:w-[300px] w-full flex gap-2 items-center">
        <img
          src={img || "/img/product-photo/product-1.png"}
          className="w-[120px] aspect-square object-contain"
          alt={title}
        />
        <h3>{title}</h3>
      </div>
      <div className="lg:w-[150px] w-full flex justify-between items-center lg:px-0 px-4">
        <h3 className="lg:hidden text-lg moraba-bold">قیمت</h3>
        <h4 className="text-center">{TidyNumber(price)} تومان</h4>
      </div>
      <div className="flex justify-between items-center w-full lg:w-[150px] lg:px-0 px-4">
        <span className="lg:hidden text-lg moraba-bold">تعداد</span>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setProductCount(productCount + 1);
            }}
            className="bg-headcolor hover:bg-green-950 transition text-white w-[30px] aspect-square flex items-center justify-center"
          >
            <IoMdAdd />
          </button>
          <span className="block text-zinc-700 font-black w-[30px] border-headcolor border-2 aspect-square flex items-center justify-center">
            {productCount}
          </span>
          <button
            onClick={() => {
              setProductCount(productCount - 1);
            }}
            className="bg-headcolor hover:bg-green-950 transition text-white w-[30px] aspect-square flex items-center justify-center"
          >
            <FiMinus />
          </button>
        </div>
      </div>
      <div className="lg:w-[150px] w-full flex items-center justify-between lg:px-0 px-4">
        <span className="lg:hidden text-lg moraba-bold">جمع جزء</span>
        <h3 className="text-center font-bold">
          {TidyNumber(productCount * price)} تومان
        </h3>
      </div>
    </div>
  );
  function TidyNumber(Number) {
    Number += "";
    Number = Number.replace(",", "");
    let x = Number.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }
  async function RemoveFromCartHandler() {
    let userCart = JSON.parse(localStorage.getItem("cart"));
    const newUserCart = userCart.filter((e) => e.id !== id);
    localStorage.setItem("cart", JSON.stringify(newUserCart));
    newToast("محصول حذف شد");
    GetCart();
    FetchUserData();
  }
}
