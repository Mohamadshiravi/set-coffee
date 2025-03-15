"use client";

import { newErrorToast, newSucToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("لطفا نام خود را بنویسید")
    .min(3, "نام باید حدقل دو حرف باشد")
    .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
  username: yup
    .string()
    .required("لطفا برای خود یک نام کاربری ایجاد کنید")
    .min(6, "نام کاربری باید حدقل شیش حرف باشد")
    .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
});

export default function ChangeUserDetailsForm({ theUser }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setName(theUser.name);
    setUserName(theUser.username);

    setImgSrc(theUser.avatar);
  }, []);
  return (
    <section className="flex flex-col items-cneter gap-20 p-6 bg-stone-200 rounded-lg lg:w-[700px] w-full m-auto">
      <div className="flex items-center justify-center w-full">
        <div className="relative">
          <Image
            src={imgSrc || "/img/bg-photo/guest.jpg"}
            width={1400}
            height={1400}
            className="rounded-full w-[200px] aspect-square object-cover shadow-lg"
            alt={theUser.name}
          />
          <label className="absolute cursor-pointer bottom-1 right-1 bg-blue-500 text-white p-3 rounded-full sm:text-3xl text-2xl shadow-xl hover:bg-blue-600 transition">
            <FaPlus />
            <input
              type="file"
              accept=".jpg , .png , .jpeg , .webp"
              className="w-0 h-0 absolute"
              onChange={ChangeProfileHandler}
            />
          </label>
        </div>
      </div>
      <form className="flex flex-col items-center w-full gap-6">
        <TextField
          label="نام "
          fullWidth
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          label="نام کاربری"
          fullWidth
          type="text"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button
          size="large"
          loading={loading}
          onClick={ChangeDetailsHandler}
          fullWidth
          variant="contained"
        >
          ذخیره تغییرات
        </Button>
      </form>
    </section>
  );
  async function ChangeProfileHandler(e) {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("img", e.target.files[0]);

      const toastId = toast.loading("در حال اپلود عکس پروفایل");

      try {
        const res = await axios.post("/api/user/profile", formData);
        toast.success("عکس پروفایل شما تغییر کرد", {
          id: toastId,
        });
        setImgSrc(res.data.url);
      } catch (error) {
        toast.error("عکس پروفایل شما تغییر نکرد", {
          id: toastId,
        });
      }
    }
  }
  async function ChangeDetailsHandler(e) {
    e.preventDefault();

    if (name === theUser.name && username === theUser.username) {
      newErrorToast("فیلد ها تکراری میباشد");
      return;
    }

    setLoading(true);
    try {
      await schema.validate({ name, username });
      await axios.put("/api/user", { name, username });
      newSucToast("تغییرات با موفقیت ذخیره شد");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e.errors[0]) {
        newErrorToast(e.errors[0]);
        return;
      }

      newErrorToast("اطلاعات به روز نشد");
    }
  }
}
