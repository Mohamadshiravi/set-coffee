"use client";

import { UserContext } from "@/context/context";
import { newToast } from "@/utils/helper-function";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function AddToCartBtn({ img, title, price, count, id }) {
  const [productNumber, setProductNumber] = useState(1);
  useEffect(() => {
    if (productNumber <= 0) {
      setProductNumber(1);
    }
  }, [productNumber]);

  const { FetchUserData } = useContext(UserContext);
  return (
    <div className="bg-red-500 flex relative items-center justify-center select-none hover:shadow-lg hover:translate-y-2 transition-all duration-500 hover:shadow-red-400 rounded-lg moraba-bold sm:text-3xl text-2xl text-white w-full sm:h-[100px] h-[80px] sm:w-[550px] shadow-xl shadow-red-400">
      <div className="flex flex-col items-center justify-center text-xl border-l-2 border-red-600 h-full w-[100px]">
        <button
          onClick={() => {
            setProductNumber(productNumber + 1);
          }}
          className="border-b hover:bg-red-600 rounded-tr-lg transition border-red-600 flex h-full items-center justify-center w-full text-center"
        >
          <IoIosArrowUp />
        </button>
        <span>{productNumber}</span>
        <button
          onClick={() => {
            setProductNumber(productNumber - 1);
          }}
          className="border-t hover:bg-red-600 rounded-br-lg transition border-red-600 flex h-full items-center justify-center w-full text-center"
        >
          <IoIosArrowDown />
        </button>
      </div>
      <span
        onClick={AddToCartHandler}
        className="cursor-pointer block w-full h-full flex items-center justify-center"
      >
        افزودن به سبد خرید
      </span>
    </div>
  );
  async function AddToCartHandler() {
    let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      img,
      id,
      title,
      price,
      count: productNumber,
    };

    if (cartArray.length === 0) {
      cartArray.push(cartItem);
    } else {
      const isProductInCart = cartArray.some((e) => e.id === id);
      if (!isProductInCart) {
        cartArray.push(cartItem);
      } else {
        cartArray.map(
          (e) => e.id === id && (e.count = e.count + productNumber)
        );
      }
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
    setProductNumber(1);
    newToast("محصول به سبد خرید شما اضافه شد !!!");
    FetchUserData();
  }
}
