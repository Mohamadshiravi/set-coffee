"use client";

import { UserContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BsBasket } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

export default function Navbar() {
  const path = usePathname();

  const { user } = useContext(UserContext);
  return (
    <nav className="bg-white fixed left-0 bottom-0 w-full shadow-3xl sm:hidden block z-30">
      <ul className="flex items-center justify-between px-6 py-2 text-[22px]">
        <li>
          <Link
            href={"/p-user"}
            className={`${
              path === "/p-user" && "border-2 border-brown-500"
            } flex flex-col items-center gap-1 rounded-full`}
          >
            <Image
              src={user?.avatar || "/img/bg-photo/guest.jpg"}
              width={800}
              height={800}
              alt="user avatar"
              className="w-[38px] h-[38px] rounded-full object-cover"
            />
          </Link>
        </li>
        <li>
          <Link
            href={"/products"}
            className={`${
              path === "/products" && "text-brown-500"
            } flex flex-col items-center gap-1`}
          >
            <BsBasket />
            <span className="text-xs moraba-regular font-bold">فروشگاه</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/cart"}
            className={`${
              path === "/cart" && "text-brown-500"
            } flex flex-col items-center gap-1`}
          >
            <PiShoppingCartSimpleLight />
            <span className="text-xs moraba-regular font-bold">سبد خرید</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/"}
            className={`${
              path === "/" && "text-brown-500"
            } flex flex-col items-center gap-1`}
          >
            <IoHomeOutline />
            <span className="text-xs moraba-regular font-bold">خانه</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
