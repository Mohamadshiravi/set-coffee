"use client";

import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { newToast } from "@/utils/helper-function";
import { UserContext } from "@/context/context";
import { Button, IconButton } from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";

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
    <div className="flex w-full relative lg:flex-row flex-col bg-white rounded-lg p-3 lg:gap-0 gap-4 items-center xl:justify-start justify-center">
      <div className="lg:border-l lg:pl-3 lg:h-full lg:items-center flex lg:static absolute top-2 right-2">
        <IconButton onClick={RemoveFromCartHandler}>
          <RiDeleteBin5Line />
        </IconButton>
      </div>
      <div className="flex gap-2 items-center w-[150px] h-[150px]">
        <img
          src={img || "/img/product-photo/product-1.png"}
          className="w-full h-full object-contain"
          alt={title}
        />
      </div>
      <div className="flex flex-col items-center w-full">
        <h3 className="moraba-bold text-zinc-800 py-4 w-full border-b border-zinc-200 lg:text-right text-center">
          {title}
        </h3>
        <div className="w-full flex items-center justify-between border-b border-zinc-200 py-3">
          <div className="w-full flex justify-between items-center lg:px-0 px-4">
            <h4 className="text-center">
              {price.toLocaleString()}{" "}
              <span className="text-xs px-1">تومان</span>
            </h4>
          </div>
          <div className="flex justify-between items-center lg:px-0">
            <div className="flex items-center justify-center border border-zinc-300 rounded-full px-1 py-0.5">
              <IconButton
                size="small"
                onClick={() => {
                  setProductCount(productCount + 1);
                }}
              >
                <IoMdAdd />
              </IconButton>
              <span className=" text-zinc-700 w-[30px] h-[30px] flex items-center justify-center">
                {productCount}
              </span>
              <IconButton
                size="small"
                onClick={() => {
                  setProductCount(productCount - 1);
                }}
              >
                <FiMinus />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between lg:px-0 px-4 text-lg mt-3">
          <h3 className="text-center w-full">
            {(productCount * price).toLocaleString()}
            <span className="text-xs px-1">تومان</span>
          </h3>
        </div>
      </div>
    </div>
  );

  async function RemoveFromCartHandler() {
    let userCart = JSON.parse(localStorage.getItem("cart"));
    const newUserCart = userCart.filter((e) => e.id !== id);
    localStorage.setItem("cart", JSON.stringify(newUserCart));
    newToast("محصول حذف شد");
    GetCart();
    FetchUserData();
  }
}
