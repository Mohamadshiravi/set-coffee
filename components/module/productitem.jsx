"use client";

import { IoStar } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { newErrorToast, newToast } from "@/utils/helper-function";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/context/context";

export default function ProductItem({
  title,
  price,
  score,
  id,
  isWished,
  wishID,
  image,
  reRenderWish,
}) {
  const { IncrementUserWish, FetchUserCart, DecrementUserWish } =
    useContext(UserContext);
  return (
    <>
      <div>
        <div className="w-full bg-white rounded-md overflow-hidden shadow-xs">
          <div className="relative group">
            {!isWished ? (
              <button
                onClick={AddToWishHandler}
                className="transition text-zinc-700 hover:bg-zinc-100 cursor-pointer lg:hidden block absolute p-2 rounded-full text-2xl top-1 left-1"
              >
                <FaRegHeart />
              </button>
            ) : (
              <button
                onClick={DeleteFromWish}
                className="transition text-zinc-700 hover:bg-zinc-100 cursor-pointer lg:hidden block absolute p-2 rounded-full text-2xl top-1 left-1"
              >
                <MdOutlineClose />
              </button>
            )}
            <div className="w-full lg:flex hidden group rounded-sm oveflow-hidden opacity-0 z-2 hover:opacity-100 transition-all duration-500 h-full bg-black/40 absolute top-0 left-0 items-center justify-center">
              {!isWished ? (
                <button
                  onClick={AddToWishHandler}
                  className="absolute -translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group/item top-3 left-3 flex items-center gap-3"
                >
                  <span className="bg-black group-hover/item:block hidden text-white text-xs py-2 px-4 after:content-[''] relative after:absolute after:top-2 after:rotate-45 after:-left-1 after:w-[15px] after:h-[15px] after:bg-black moraba-bold">
                    افزودن به علاقه مندی ها
                  </span>
                  <FaRegHeart className="text-white cursor-pointer text-2xl" />
                </button>
              ) : (
                <button
                  onClick={DeleteFromWish}
                  className="absolute -translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group/item top-3 left-3 flex items-center gap-3"
                >
                  <span className="bg-black group-hover/item:block hidden text-white text-xs py-2 px-4 after:content-[''] relative after:absolute after:top-2 after:rotate-45 after:-left-1 after:w-[15px] after:h-[15px] after:bg-black moraba-bold">
                    حذف از علاقه مندی ها
                  </span>
                  <MdOutlineClose className="text-white cursor-pointer text-2xl" />
                </button>
              )}
              <button
                onClick={AddToCartHandler}
                className="border-2 group/items2 translate-y-10 group-hover:translate-y-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 border-white relative w-[100px] h-[40px] group moraba-bold before:content-['خرید'] overflow-hidden before:transition-all before:text-white hover:before:translate-y-[-150%] before:block"
              >
                <PiShoppingCartSimpleLight className="text-white text-center p-1 w-full h-full absolute bottom-[-100%] group-hover/items2:bottom-0 transition-all" />
              </button>
            </div>
            <Image
              className="lg:group-hover:scale-[110%] transition-all duration-700 w-300 sm:h-[300px] h-[200px] object-contain m-auto"
              src={image || "/img/product-photo/product-1.png"}
              alt={title}
              width={800}
              height={800}
            />
          </div>
          <div className="px-2 lg:hidden block">
            <button
              onClick={AddToCartHandler}
              className="group/items3 hover:bg-green-800 transition-all bg-brown-500 rounded-xs relative w-full sm:h-[40px] h-[30px] moraba-bold overflow-hidden"
            >
              <span className="text-white sm:text-base text-sm block group-hover/items3:translate-y-[-150%] transition-all">
                افزودن به سبد خرید
              </span>
              <PiShoppingCartSimpleLight className="text-white text-center p-1 w-full h-full absolute bottom-[-100%] group-hover/items3:bottom-0 transition-all" />
            </button>
          </div>
          <Link href={`/products/${id}`}>
            <h3 className="text-center py-4 px-3 sm:text-base text-sm moraba-bold truncate-2 text-zinc-700 h-[62px]">
              {title}
            </h3>
            <div className="flex items-center justify-center text-lg p-2">
              {Array.from({ length: score }).map((e, i) => (
                <IoStar key={i} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - score }).map((e, i) => (
                <IoIosStarOutline
                  key={i}
                  kernelMatrix={i}
                  className="text-zinc-500"
                />
              ))}
            </div>
            <div className="moraba-bold flex gap-1 items-center justify-center h-[30px] mb-2 text-zinc-800">
              <h4>{price.toLocaleString()}</h4>
              <h4 className="text-sm text-zinc-600">تومان</h4>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
  async function DeleteFromWish() {
    try {
      const res = await axios.delete(`/api/wishlist/${wishID}`);
      if (res.status === 200) {
        newToast("با موفقیت از لیست علاقه مندی ها حذف شد");
        if (reRenderWish) {
          reRenderWish();
          DecrementUserWish();
        }
      }
    } catch (error) {
      newToast("Error");
    }
  }
  async function AddToWishHandler() {
    try {
      const res = await axios.post("/api/wishlist", { productID: id });
      if (res.status === 201) {
        newToast("با موفقیت به لیست علاقه مندی ها اضافه شد");
        IncrementUserWish();
      } else if (res.status === 207) {
        newToast("محصول در علاقه مندی ها شما موجود میباشد");
      }
    } catch (error) {
      if (error.response.status === 401) {
        newErrorToast("لطفا ابتدا وارد حساب کاربری خود شوید");
      }
    }
  }

  async function AddToCartHandler() {
    let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id,
      img: image,
      title,
      price,
      count: 1,
    };

    if (cartArray.length === 0) {
      cartArray.push(cartItem);
      newToast("محصول به سبد خرید شما اضافه شد !!!");
    } else {
      const isProductInCart = cartArray.some((e) => e.id === id);
      if (!isProductInCart) {
        newToast("محصول به سبد خرید شما اضافه شد !!!");
        cartArray.push(cartItem);
      } else {
        newToast("محصول در سبد خرید شما موجود میباشد");
        cartArray.map((e) => e.id === id && (e.count = e.count + 1));
      }
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
    FetchUserCart();
  }
}
