"use client";

import { HiOutlineDocumentText } from "react-icons/hi2";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import { GoUnread } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/context";

export default function DashboardMenu() {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, error, FetchUserData, loading } = useContext(UserContext);

  useEffect(() => {
    if (!user && error !== "unAuth") {
      FetchUserData();
    }
  }, []);
  return (
    <>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full h-screen fixed top-0 left-0 z-41 backdrop-blur-xs`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      ></div>
      <button
        onClick={() => {
          setIsMenuOpen(true);
        }}
        className="fixed top-2 right-2 hover:bg-zinc-100 transition text-zinc-600 z-40 lg:hidden  bg-white flex items-center justify-center w-[40px] h-[40px] shadow-4xl rounded-lg"
      >
        <IoMenu className="text-3xl" />
      </button>
      <article
        className={`${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[350px]"
        } bg-zinc-100 lg:sticky fixed lg:opacity-100 lg:overflow-y-auto overflow-y-scroll lg:translate-x-0 top-0 z-50 right-0 lg:w-auto w-[270px] h-screen transition-all duration-500`}
      >
        {loading ? (
          <div className="flex gap-3 items-center border-b border-stone-300 px-3 py-4">
            <div className="w-full flex flex-col gap-2 items-end">
              <div className="bg-zinc-200 w-[150px] h-[30px] animate-pulse"></div>
              <div className="bg-zinc-200 w-[100px] h-[20px] animate-pulse"></div>
            </div>
            <div className="w-[90px] aspect-square overflow-hidden rounded-full bg-zinc-200 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex gap-3 items-center border-b border-stone-300 px-3 py-4">
            <div className="w-full">
              <h2 className="text-zinc-700 text-base font-bold truncate w-full text-left">
                {user?.name}
              </h2>
              <h3 className="text-zinc-600 text-xs truncate w-full text-left">
                {user?.phone}
              </h3>
            </div>
            <div className="w-[90px] aspect-square overflow-hidden rounded-full bg-gray-200">
              <Image
                className="w-full h-full object-cover rounded-full"
                src={user?.avatar || "/img/bg-photo/guest.jpg"}
                width={800}
                height={800}
                alt={"user avatar"}
              />
            </div>
          </div>
        )}
        <ul className="flex flex-col gap-4 moraba-bold px-4 py-4 text-sm font-bold items-center">
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/"}
            className={`flex hover:shadow-none bg-stone-500 hover:bg-stone-600 my-3 duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-white p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <FiHome className="text-lg text-icon" />
            </span>
            <h3>بازگشت به خانه</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user"}
            className={`${
              pathName === "/p-user" ? "shadow-none bg-stone-300" : " bg-white"
            } hover:bg-stone-300 flex  duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <TbLayoutDashboard className="text-lg text-icon" />
            </span>
            <h3>پیشخوان</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user/wishlist"}
            className={`${
              pathName === "/p-user/wishlist"
                ? "shadow-none bg-stone-300"
                : " bg-white"
            } hover:bg-stone-300 flex duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <FaRegHeart className="text-lg text-icon" />
            </span>
            <h3>علاقه مندی ها</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user/tikets"}
            className={`${
              pathName === "/p-user/tikets"
                ? "shadow-none bg-stone-300"
                : " bg-white"
            } hover:bg-stone-300 flex duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <GoUnread className="text-lg text-icon" />
            </span>
            <h3>تیکت های پشتیبانی</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user/orders"}
            className={`${
              pathName === "/p-user/orders"
                ? "shadow-none bg-stone-300"
                : "bg-white"
            } hover:bg-stone-300 flex duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <HiOutlineDocumentText className="text-lg text-icon" />
            </span>
            <h3>سفارش ها</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user/comments"}
            className={`${
              pathName === "/p-user/comments"
                ? "shadow-none bg-stone-300"
                : "bg-white"
            } hover:bg-stone-300 flex duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <LiaComments className="text-lg text-icon" />
            </span>
            <h3>کامنت ها</h3>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/p-user/account-details"}
            className={`${
              pathName === "/p-user/account-details"
                ? "shadow-none bg-stone-300"
                : " bg-white"
            } hover:bg-stone-300 flex duration-500 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg`}
          >
            <span className="block bg-backicon p-2 rounded-lg">
              <FaRegCircleUser className="text-lg text-icon" />
            </span>
            <h3>جزئیات حساب</h3>
          </Link>
          <hr className="border w-full border-zinc-200 my-1" />
          <li
            onClick={logOutHandler}
            className="flex bg-stone-500 hover:bg-stone-600 transition-all cursor-pointer items-center justify-center w-full text-white p-2 rounded-lg"
          >
            <h3>خروج</h3>
          </li>
        </ul>
      </article>
    </>
  );
  async function logOutHandler() {
    const res = await axios.post("/api/auth/logout");
    if (res.status === 200) {
      const isClicked = await ShowSwal(
        "success",
        "شما با موفقت از اکانت خود خارج شدید"
      );
      if (isClicked) {
        return (location.href = "/");
      } else {
        return (location.href = "/");
      }
    }
  }
}
