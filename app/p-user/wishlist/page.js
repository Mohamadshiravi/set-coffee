"use client";

import ProductItem from "@/components/module/productitem";
import { newErrorToast } from "@/utils/helper-function";
import { Skeleton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

export default function WishlistPage() {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchWishList();
  }, []);

  async function FetchWishList() {
    try {
      const res = await axios.get("/api/wishlist");
      setWishList(res.data.data);
      setLoading(false);
    } catch (error) {
      newErrorToast("در هنگام دریافت اطلاعات مشکلی پیش امد");
      setLoading(false);
    }
  }
  return (
    <div>
      <>
        {!loading && wishList.length === 0 ? (
          <div></div>
        ) : (
          <>
            <div className="sm:p-6">
              <div className="w-full rounded-lg bg-gray-100 p-4 grid gap-4 lg:grid-cols-[3fr_3fr_3fr_3fr] md:grid-cols-[4fr_4fr_4fr]  grid-cols-[1fr]">
                {!loading
                  ? wishList.map((e, i) => (
                      <ProductItem
                        key={i}
                        title={e.product.title}
                        score={e.product.score}
                        price={e.product.price}
                        id={e.product._id}
                        isWished={true}
                        wishID={e._id}
                        image={e.product.images[0] || null}
                        reRenderWish={FetchWishList}
                      />
                    ))
                  : Array.from({ length: 4 }).map((e, i) => (
                      <Skeleton
                        key={i}
                        sx={{ bgcolor: "grey.300", borderRadius: "5px" }}
                        variant="rectangular"
                        width={"100%"}
                        animation="wave"
                        height={"400px"}
                      />
                    ))}
              </div>
            </div>
          </>
        )}
      </>
      {!loading && wishList.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-screen px-6">
          <FaRegHeart className="text-9xl text-zinc-300" />
          <h1 className="moraba-bold sm:text-4xl text-3xl mt-3 text-center">
            لیست علاقه مندی های شما خالی است
          </h1>
          <p className="text-center moraba-regular mt-6 text-zinc-600 sm:px-20 px-2">
            شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید. در صفحه
            "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.
          </p>
          <Link
            href={"/"}
            className="moraba-bold text-white px-8 py-2 bg-headcolor text-lg rounded-md mt-6"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      )}
    </div>
  );
}
