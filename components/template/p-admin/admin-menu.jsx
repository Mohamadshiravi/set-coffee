"use client";

import { LuLayoutDashboard } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";
import { SlBag } from "react-icons/sl";
import { FaRegComments } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";

export default function AdminMenu({ isMenuOpen, CloseMenu }) {
  const path = usePathname();
  return (
    <>
      <div
        id="adminMenuBack"
        className={`${
          isMenuOpen ? "block" : "hidden"
        } z-40 w-full h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-xs`}
        onClick={CloseMenu}
      ></div>
      <nav
        className={`${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 sm:translate-x-[350px] translate-x-[300px]"
        } bg-white z-41 sm:w-[350px] w-[300px] h-screen fixed top-0 right-0 transition-all duration-500`}
      >
        <div className="w-full flex flex-col mt-2 text-zinc-700 px-6">
          <h2 className="text-zinc-900 text-center text-5xl mt-4">
            <span className="font-black">SET</span>
            <span className="font-semibold">Coffee</span>
          </h2>
          <ul className="text-lg flex flex-col gap-4 w-full mt-10">
            <Link
              href={"/"}
              className={`flex transition bg-gray-200 hover:bg-gray-300 text-zinc-700 px-2 cursor-pointer rounded-lg py-3 gap-6 items-center moraba-bold`}
            >
              <IoHomeOutline className="text-2xl" />
              <span>بازگشت به خانه</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin"}
              className={`${
                path === "/p-admin"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <LuLayoutDashboard className="text-2xl" />
              <span>پیشخوان</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin/users"}
              className={`${
                path === "/p-admin/users"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <FiUser className="text-2xl" />
              <span>کاربران</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin/tikets"}
              className={`${
                path === "/p-admin/tikets"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <FiMail className="text-2xl" />
              <span>تیکت ها</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin/comments"}
              className={`${
                path === "/p-admin/comments"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <FaRegComments className="text-2xl" />
              <span>کامنت ها</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin/discounts"}
              className={`${
                path === "/p-admin/discounts"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <LuDollarSign className="text-2xl" />
              <span>تخفیفات</span>
            </Link>
            <Link
              onClick={CloseMenu}
              href={"/p-admin/products"}
              className={`${
                path === "/p-admin/products"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-gray-100"
              } flex transition cursor-pointer rounded-lg px-2 py-3 gap-6 items-center moraba-bold`}
            >
              <SlBag className="text-2xl" />
              <span>محصولات</span>
            </Link>
          </ul>
          <button className="moraba-bold bg-red-500 text-white py-3 rounded-lg mt-10 hover:bg-red-600 transition-all">
            خروج
          </button>
        </div>
      </nav>
    </>
  );
}
