"use client";

import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import AdminMenu from "./admin-menu";

export default function AdminHeader({ theUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-white z-[40] w-full sticky top-0 left-0 py-3 shadow-lg">
        <div className="flex justify-between items-center w-full sm:px-6 px-3">
          <div className="flex items-center gap-3">
            <span
              onClick={() => {
                setIsMenuOpen(true);
              }}
              className="bg-gray-100 w-[50px] h-[50px] rounded-lg hover:bg-gray-200 cursor-pointer transition block flex items-center justify-center"
            >
              <TiThMenu className="text-3xl text-zinc-700" />
            </span>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <div className="w-full">
              <h2 className="text-zinc-800 font-bold text-lg truncate w-full text-left">
                {theUser.username}
              </h2>
              <h3 className="text-zinc-600 text-xs truncate w-full text-left">
                Admin
              </h3>
            </div>
            <div className="w-[90px] aspect-square overflow-hidden rounded-full bg-gray-200">
              <img
                className="w-full h-full object-cover rounded-full"
                src={theUser.avatar || "/img/bg-photo/guest.jpg"}
                width={800}
                height={800}
                alt={theUser.name}
              />
            </div>
          </div>
        </div>
      </header>
      <AdminMenu isMenuOpen={isMenuOpen} CloseMenu={CloseMenu} />
    </>
  );
  function CloseMenu() {
    setIsMenuOpen(false);
  }
}
