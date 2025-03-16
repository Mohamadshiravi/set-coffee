"use client";

import { newToast } from "@/utils/helper-function";
import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

export default function PAdminComment({
  body,
  username,
  score,
  date,
  queued,
  productTitle,
  productID,
  id,
  avatar,
  reRender,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="moraba-regular">
      <div className="flex sm:flex-row flex-col gap-6 p-4 bg-gray-100 relative rounded-t-xl">
        {!avatar ? (
          <div className="sm:w-auto w-full">
            <div className="sm:w-[150px] sm:shadow-none shadow-xl w-[120px] sm:static absolute -top-16 left-[25%] sm:m-0 m-auto aspect-square rounded-full font-bold md:text-5xl text-3xl flex items-center justify-center bg-gray-200">
              <span className="uppercase">{username.substring(0, 1)}</span>
            </div>
          </div>
        ) : (
          <div className="sm:w-auto w-full">
            <Image
              width={800}
              height={800}
              alt="user-avatar"
              src={avatar}
              className="sm:w-[150px] object-cover sm:shadow-none shadow-xl w-[120px] sm:static absolute -top-16 left-[25%] sm:m-0 m-auto aspect-square rounded-full"
            />
          </div>
        )}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-0 items-center">
              <span className="text-zinc-800 font-bold">{username}</span>
              <span className="text-xs">
                {new Date(date).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <div className="flex">
              {Array.from({ length: score }).map((e, i) => (
                <IoStar key={i} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - score }).map((e, i) => (
                <IoIosStarOutline key={i} className="text-gray-500" />
              ))}
            </div>
          </div>
          <p className="mt-8 text-justify text-zinc-600">{body}</p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-between px-6 gap-3 w-[300px] items-center justify-center py-4 bg-zinc-100 w-full">
        <div className="flex items-center gap-2">
          <span>
            {!queued ? (
              <i className="bg-green-500 text-white px-2 py-1 text-sm rounded-md">
                تایید شده
              </i>
            ) : (
              <i className="bg-red-500 text-white px-2 py-1 text-sm rounded-md">
                هنوز تایید نشده
              </i>
            )}
          </span>
        </div>
        <div className="flex gap-2 text-left">
          <span>برای محصول :</span>
          <Link
            href={`/products/${productID}`}
            className="block truncate underline underline-offset-8 text-brown-500"
          >
            {productTitle}
          </Link>
        </div>
      </div>
      {queued ? (
        <div className="flex items-center justify-between mt-2">
          <Button
            loading={loading}
            size="large"
            color="success"
            variant="contained"
            onClick={AccpetCommentHandler}
          >
            تایید
          </Button>
          <Button
            loading={loading}
            size="large"
            color="error"
            variant="contained"
            onClick={RejectCommentHandler}
          >
            رد
          </Button>
        </div>
      ) : (
        <div className="mt-2">
          <Button
            loading={loading}
            size="large"
            color="error"
            variant="contained"
            onClick={RejectCommentHandler}
          >
            حذف
          </Button>
        </div>
      )}
    </div>
  );
  async function AccpetCommentHandler() {
    setLoading(true);
    const res = await axios.put(`/api/comment/${id}`);
    if (res.status === 200) {
      setLoading(false);
      newToast("کامنت تایید شد");
      reRender();
    } else {
      setLoading(false);
    }
  }
  async function RejectCommentHandler() {
    setLoading(true);
    const res = await axios.delete(`/api/comment/${id}`);
    if (res.status === 200) {
      setLoading(false);
      newToast("کامنت حذف شد");
      reRender();
    } else {
      setLoading(false);
    }
  }
}
