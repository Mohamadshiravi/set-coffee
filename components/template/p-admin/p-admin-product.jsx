"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import EditAdminProduct from "./modals/edit-product-modal";
import axios from "axios";
import { newToast, ShowSwal } from "@/utils/helper-function";

export default function PAdminProduct({ product }) {
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isEditModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isEditModalOpen]);
  return (
    <>
      <div className="flex flex-col border-b-2">
        <div className="flex lg:flex-row flex-col items-center gap-2 moraba-regular py-2">
          <img
            src={product.images[0] || "/img/product-photo/product-1.png"}
            width={800}
            height={800}
            className="lg:w-[150px] w-[250px] aspect-square object-cover rounded-md"
            alt={product.title}
          />
          <h3 className="lg:w-[250px] lg:text-base text-2xl w-full lg:text-right text-center">
            {product.title}
          </h3>

          <h3 className="lg:w-[250px] lg:text-xs text-base w-full text-zinc-700 text-justify">
            {product.shortDes}
          </h3>
          <h3 className="w-[100px] moraba-bold text-center">
            امتیاز : {product.score}
          </h3>
          <h4 className="text-center w-[150px] lg:text-base text-xl font-bold text-red-600">
            {product.price.toLocaleString()} تومان
          </h4>
          <h4 className="text-center w-[150px] lg:text-base text-xl font-bold text-green-600">
            موجود
          </h4>
        </div>
        <div className="moraba-regular flex sm:flex-row flex-col items-center lg:justify-end justify-center gap-3 py-2">
          <button
            onClick={() => [setIsModalOpen(true)]}
            className="bg-blue-500 hover:bg-blue-600 sm:w-auto w-full transition px-6 py-2 text-white rounded-lg"
          >
            ویرایش
          </button>
          <button
            onClick={DeleteProductHandler}
            className="bg-red-500 hover:bg-red-600 sm:w-auto w-full transition px-6 py-2 text-white rounded-lg"
          >
            حذف
          </button>
          <Link
            href={`/products/${product._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 sm:w-auto w-full text-center transition px-6 py-2 text-white rounded-lg"
          >
            مشاهده محصول
          </Link>
        </div>
      </div>
      {isEditModalOpen && (
        <EditAdminProduct CloseModal={CloseModal} product={product} />
      )}
    </>
  );
  async function DeleteProductHandler() {
    const isOk = await ShowSwal("warning", "ایا از حذف محصول مطمعن هستید؟؟", [
      "خیر",
      "بله",
    ]);
    if (isOk) {
      const res = await axios.delete(`/api/product/${product._id}`);
      if (res.status === 200) {
        newToast("محصول حذف شد");
        setInterval((e) => location.reload(), 1500);
      }
    }
  }
  function CloseModal() {
    setIsModalOpen(false);
  }
}
