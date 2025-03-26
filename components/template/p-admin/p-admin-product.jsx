"use client";

import { useEffect, useState } from "react";
import EditAdminProduct from "./modals/edit-product-modal";
import axios from "axios";
import { newSucToast, newToast, ShowSwal } from "@/utils/helper-function";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PAdminProduct({ product, reRender }) {
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isEditModalOpen]);

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col border rounded-lg p-2">
        <div className="flex lg:flex-row flex-col items-center gap-2 moraba-regular py-2">
          <Image
            src={product.images[0] || "/img/product-photo/product-1.png"}
            width={1000}
            height={1000}
            className="lg:w-[150px] w-[250px] aspect-square object-cover rounded-md"
            alt={"product photo"}
          />
          <h3 className="lg:w-[250px] lg:text-base text-2xl w-full lg:text-right text-center">
            {product?.title}
          </h3>

          <h3 className="lg:w-[250px] lg:text-xs text-base w-full text-zinc-700 text-justify">
            {product?.shortDes}
          </h3>
          <h3 className="w-[100px] moraba-bold text-center">
            امتیاز : {product?.score}
          </h3>
          <h4 className="text-center w-[150px] lg:text-base text-xl font-bold text-red-600">
            {product?.price?.toLocaleString()} تومان
          </h4>
          <h4 className="text-center w-[150px] lg:text-base text-xl font-bold text-green-600">
            موجود
          </h4>
        </div>
        <div className="moraba-regular flex sm:flex-row flex-col items-center lg:justify-end justify-center gap-3 mt-2">
          <Button
            color="info"
            variant="contained"
            size="large"
            onClick={() => [setIsModalOpen(true)]}
          >
            ویرایش
          </Button>
          <Button
            loading={loading}
            color="error"
            variant="contained"
            size="large"
            onClick={DeleteProductHandler}
          >
            حذف
          </Button>
          <Button
            color="warning"
            variant="contained"
            size="large"
            onClick={() => router.push(`/products/${product._id}`)}
          >
            مشاهده محصول
          </Button>
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
      setLoading(true);
      const res = await axios.delete(`/api/product/${product._id}`);
      if (res.status === 200) {
        newSucToast("محصول حذف شد");
        reRender();
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }
  function CloseModal() {
    setIsModalOpen(false);
  }
}
