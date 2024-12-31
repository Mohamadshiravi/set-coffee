"use client";

import { newToast } from "@/utils/helper-function";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ChangeUserDetails({
  name,
  role,
  CloseModal,
  id,
  email,
  username,
}) {
  const [nameInput, setNameInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  useEffect(() => {
    setNameInput(name);
    setUserNameInput(username);
  }, []);
  return (
    <section className="w-full h-screen z-[50] flex items-center fixed top-0 left-0 justify-center bg-black/30 backdrop-blur-sm">
      <div
        onClick={CloseModal}
        className="w-full h-full fixed top-0 left-0 z-[51]"
      ></div>
      <div className="bg-white z-[52] p-4 shadow-lg moraba-regular rounded-lg flex flex-col items-center gap-4">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <Image
            alt={username}
            src={"/img/bg-photo/guest.jpg"}
            width={500}
            height={500}
            className="rounded-full object-cover aspect-square w-[100px]"
          />
          <div className="flex flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-700">
            <span className="text-lg">{email}</span>
            <h3>{role === "ADMIN" ? "ادمین" : "کاربر عادی"}</h3>
          </div>
          <div className="flex flex-col lg:items-start items-center moraba-bold gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-600">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              className="text-lg outline-none border w-full border-zinc-500 rounded-md px-3 py-1"
            />
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => {
                setUserNameInput(e.target.value);
              }}
              className="text-base text-zinc-600 font-mono outline-none border w-full border-zinc-500 rounded-md px-3 py-1"
            />
          </div>
          <div className="lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 lg:mb-0 mb-4 text-zinc-800">
            <span className="text-sm font-mono font-black">{id}</span>
          </div>
        </div>
        <p>شما فقط میتوانید نام و نام کاربری کاربران را تغییر دهید !!!</p>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={ChangeUserRoleHandler}
            className="text-lg text-white px-8 py-1 rounded-lg text-zinc-400 border-zinc-400 border-2"
          >
            تغییر
          </button>
          <button
            onClick={CloseModal}
            className="bg-blue-500 text-lg text-white px-8 py-1 rounded-lg"
          >
            لغو
          </button>
        </div>
      </div>
    </section>
  );
  async function ChangeUserRoleHandler() {
    const res = await axios.put("/api/user/username-name", {
      user: id,
      name: nameInput,
      username: userNameInput,
    });
    if (res.status === 200) {
      CloseModal();
      newToast("اطلاعات کاربر تغییر کرد");
      setInterval(() => location.reload(), 1000);
    }
  }
}
