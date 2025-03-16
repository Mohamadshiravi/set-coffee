"use client";

import { HiOutlineDocumentText } from "react-icons/hi2";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import { GoUnread } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { TbLayoutDashboard } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import axios from "axios";
import { ShowSwal } from "@/utils/helper-function";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProfileSection = React.memo(
  ({ isProfileOpen, isNavTop, theUser, setIsProfileOpen }) => {
    return (
      <>
        <div
          className={`w-full h-screen fixed top-0 left-0 ${
            isProfileOpen ? "block" : "hidden"
          }`}
          onClick={() => {
            setIsProfileOpen(false);
          }}
        ></div>
        <div className="group relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
            }}
            className={`bg-zinc-800 relative text-white moraba-bold shadow-xl shadow-zinc-600 ${
              isNavTop ? "px-0 aspect-square" : "px-4"
            } items-center justify-center rounded-lg h-[50px] lg:flex hidden gap-2 hover:bg-zinc-900 transition`}
          >
            <span
              className={`${
                isNavTop ? "hidden" : "block"
              } text-lg font-mono font-bold`}
            >
              {theUser.username}
            </span>
            <CgProfile className={`${isNavTop ? "text-3xl" : "text-2xl"}`} />
          </button>
          <div
            id={`${isProfileOpen ? "animate-proile" : "animate-proile-close"}`}
            className={`${
              isProfileOpen ? "block" : "hidden"
            } absolute top-14 left-0 rounded-lg shadow-lg w-[350px] bg-white p-3`}
          >
            <div className="flex gap-3 items-center border-b border-zinc-100 pb-3">
              <div className="w-full">
                <h2 className="text-zinc-800 font-bold text-xl truncate w-full text-left">
                  {theUser.name}
                </h2>
                <h3 className="text-zinc-600 text-sm truncate w-full text-left">
                  {theUser.phone}
                </h3>
              </div>
              <div className="w-[80px] aspect-square overflow-hidden rounded-full bg-gray-200">
                <Image
                  className="w-full h-full object-cover rounded-full"
                  src={theUser.avatar || "/img/bg-photo/guest.jpg"}
                  width={800}
                  height={800}
                  alt={"user avatar"}
                />
              </div>
            </div>
            <ul className="flex flex-col gap-3 moraba-bold text-base font-bold items-center mt-4">
              {theUser.role === "ADMIN" && (
                <Link
                  href={"/p-admin"}
                  className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg"
                >
                  <span className="block bg-backicon p-2 rounded-lg">
                    <GrUserAdmin className="text-2xl text-icon" />
                  </span>
                  <h3>پنل ادمین</h3>
                </Link>
              )}
              <Link
                href={"/p-user"}
                className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg"
              >
                <span className="block bg-backicon p-2 rounded-lg">
                  <TbLayoutDashboard className="text-2xl text-icon" />
                </span>
                <h3>پنل کاربری</h3>
              </Link>
              <Link
                href={"/p-user/tikets"}
                className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg"
              >
                <span className="block bg-backicon p-2 rounded-lg">
                  <GoUnread className="text-2xl text-icon" />
                </span>
                <h3>تیکت های پشتیبانی</h3>
              </Link>
              <li className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg">
                <span className="block bg-backicon p-2 rounded-lg">
                  <HiOutlineDocumentText className="text-2xl text-icon" />
                </span>
                <h3>سفارش ها</h3>
              </li>
              <Link
                href={"/p-user/comments"}
                className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg"
              >
                <span className="block bg-backicon p-2 rounded-lg">
                  <LiaComments className="text-2xl text-icon" />
                </span>
                <h3>کامنت ها</h3>
              </Link>
              <Link
                href={"/p-user/account-details"}
                className="flex bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer items-center justify-start w-full gap-4 text-zinc-700 p-2 rounded-lg"
              >
                <span className="block bg-backicon p-2 rounded-lg">
                  <FaRegCircleUser className="text-2xl text-icon" />
                </span>
                <h3>جزئیات حساب</h3>
              </Link>
              <hr className="border w-full border-zinc-100 my-2" />
              <li
                onClick={logOutHandler}
                className="flex bg-stone-500 hover:bg-stone-600 transition-all cursor-pointer items-center justify-center w-full text-white p-2 rounded-lg"
              >
                <h3>خروج</h3>
              </li>
            </ul>
          </div>
        </div>
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
);
export default ProfileSection;
