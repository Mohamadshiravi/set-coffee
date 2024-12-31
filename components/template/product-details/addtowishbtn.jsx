"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import { CiHeart } from "react-icons/ci";
import axios from "axios";

export default function AddToWishBtn({ id }) {
  return (
    <button
      onClick={AddToWishHandler}
      className="border shadow-lg shadow-red-200 hover:bg-red-200 transition-all flex gap-4 items-center justify-between border-red-700 pr-4 pl-2 py-2 rounded-lg text-red-700 text-center bg-red-100 select-none"
    >
      <span> افزودن به علاقه مندی ها</span>
      <CiHeart className="text-2xl" />
    </button>
  );
  async function AddToWishHandler() {
    try {
      const res = await axios.post("/api/wishlist", { productID: id });
      if (res.status === 201) {
        newToast("با موفقیت به لیست علاقه مندی ها اضافه شد");
        setInterval(() => {
          location.reload();
        }, 500);
      } else if (res.status === 207) {
        newToast("محصول در علاقه مندی ها شما موجود میباشد");
      }
    } catch (error) {
      if (error.response.status === 401) {
        newErrorToast("لطفا ابتدا وارد حساب کاربری خود شوید");
      }
    }
  }
}
