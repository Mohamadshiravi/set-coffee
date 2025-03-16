"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ChangeUserDetails({
  name,
  role,
  CloseModal,
  id,
  phone,
  avatar,
  username,
  reRenderUsers,
}) {
  const [nameInput, setNameInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNameInput(name);
    setUserNameInput(username);
  }, []);
  return (
    <section className="w-full h-screen z-50 flex items-center fixed top-0 left-0 justify-center bg-black/30 backdrop-blur-xs">
      <div
        onClick={CloseModal}
        className="w-full h-full fixed top-0 left-0 z-51"
      ></div>
      <div className="bg-white z-52 p-4 shadow-lg moraba-regular rounded-lg flex flex-col items-center gap-4">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <Image
            alt={"user avatar"}
            src={avatar || "/img/bg-photo/guest.jpg"}
            width={500}
            height={500}
            className="rounded-full object-cover aspect-square w-[100px]"
          />
          <div className="flex flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-700">
            <span className="text-lg">{phone}</span>
            <h3>{role === "ADMIN" ? "ادمین" : "کاربر عادی"}</h3>
          </div>
          <div className="flex flex-col lg:items-start items-center moraba-bold gap-4 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-600">
            <TextField
              size="small"
              label="نام"
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
            <TextField
              size="small"
              label="نام کاربری"
              type="text"
              value={userNameInput}
              onChange={(e) => {
                setUserNameInput(e.target.value);
              }}
            />
          </div>
          <div className="lg:border-b-0 border-b-2 lg:pl-8 pb-4 lg:mb-0 mb-4 text-zinc-800">
            <span className="text-sm font-mono font-black">{id}</span>
          </div>
        </div>
        <p>شما فقط میتوانید نام و نام کاربری کاربران را تغییر دهید !!!</p>
        <div className="w-full flex items-center justify-between">
          <Button
            loading={loading}
            size="large"
            variant="outlined"
            color="info"
            onClick={ChangeUserRoleHandler}
            className="text-lg px-8 py-1 rounded-lg text-zinc-400 border-zinc-400 border-2"
          >
            تغییر
          </Button>
          <Button
            size="large"
            variant="contained"
            color="info"
            onClick={CloseModal}
            className="bg-blue-500 text-lg text-white px-8 py-1 rounded-lg"
          >
            لغو
          </Button>
        </div>
      </div>
    </section>
  );
  async function ChangeUserRoleHandler() {
    setLoading(true);
    try {
      await axios.put("/api/user/username-name", {
        user: id,
        name: nameInput,
        username: userNameInput,
      });

      setLoading(false);
      reRenderUsers();
      newToast("اطلاعات کاربر تغییر کرد");
      CloseModal();
    } catch (error) {
      setLoading(false);
      newErrorToast("مشکلی پیش امد");
    }
  }
}
