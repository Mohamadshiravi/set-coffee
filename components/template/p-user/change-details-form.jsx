"use client";

import ValidateUserObj from "@/utils/auth-utill/userObjectValidator";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

export default function ChangeUserDetailsForm({ theUser }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setName(theUser.name);
    setUserName(theUser.username);
    setEmail(theUser.email);

    setImgSrc(theUser.avatar);
  }, []);
  return (
    <section className="flex lg:flex-row flex-col-reverse lg:gap-3 gap-20 px-3 py-14 bg-gray-100 rounded-lg">
      <form className="flex flex-col items-center w-full gap-6 px-4 lg:w-6/12 w-full">
        <div className="w-full flex flex-col gap-3 moraba-regular text-lg">
          <label>نام :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="outline-none border-2 font-mono border-mybrown2 px-4 py-3 w-full rounded-lg focus:border-mybrown transition-all"
          ></input>
        </div>
        <div className="w-full flex flex-col gap-3 moraba-regular text-lg">
          <label>نام کاربری:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="outline-none border-2 font-mono border-mybrown2 px-4 py-3 w-full rounded-lg focus:border-mybrown transition-all"
          ></input>
        </div>
        <div className="w-full flex flex-col gap-3 moraba-regular text-lg">
          <label> ایمیل:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="outline-none border-2 font-mono border-mybrown2 px-4 py-3 w-full rounded-lg focus:border-mybrown transition-all"
          ></input>
        </div>
        <div className="w-full flex flex-col gap-3 moraba-regular text-lg">
          <label> گذرواژه:</label>
          <input
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            className="outline-none border-2 font-mono border-mybrown2 px-4 py-3 w-full rounded-lg focus:border-mybrown transition-all"
          ></input>
          <span className="text-base text-gray-500">
            برای تغییر مشخصات اکانت باید گذرواژه خود را وارد کنید
          </span>
        </div>
        <button
          onClick={ChangeDetailsHandler}
          className="bg-mybrown2 w-full moraba-bold text-white rounded-lg py-4 hover:bg-mybrown transition"
        >
          ذخیره تغییرات
        </button>
      </form>
      <div className="flex w-full items-center justify-center lg:w-6/12 w-full">
        {imgSrc ? (
          <div className="relative">
            <img
              src={imgSrc}
              className="rounded-full sm:w-[300px] w-[200px] aspect-square object-cover shadow-lg"
              alt={theUser.name}
            />
            <button
              onClick={DeleteProfileHandler}
              className="absolute cursor-pointer sm:bottom-2 bottom-1 sm:right-2 right-1 bg-red-500 text-white sm:p-5 p-3 rounded-full sm:text-3xl text-2xl shadow-xl hover:bg-red-600 transition"
            >
              <MdDelete />
            </button>
          </div>
        ) : (
          <div className="relative">
            <Image
              src={"/img/bg-photo/guest.jpg"}
              width={800}
              height={800}
              className="rounded-full sm:w-[300px] w-[200px] aspect-square object-cover shadow-lg"
              alt={theUser.name}
            />
            <label className="absolute cursor-pointer sm:bottom-2 bottom-1 sm:right-2 right-1 bg-blue-500 text-white sm:p-5 p-3 rounded-full sm:text-3xl text-2xl shadow-xl hover:bg-blue-600 transition">
              <FaPlus />
              <input
                type="file"
                accept=".jpg , .png , .jpeg , .webp"
                className="w-0 h-0 absolute"
                onChange={ChangeProfileHandler}
              />
            </label>
          </div>
        )}
      </div>
    </section>
  );
  async function DeleteProfileHandler() {
    const res = await axios.delete(`/api/user/profile/${theUser._id}`);
    if (res.status === 200) {
      newToast("پروفایل حذف شد");
      setInterval(() => {
        location.reload();
      }, 1500);
    }
  }
  async function ChangeProfileHandler(e) {
    if (e.target.files[0]) {
      const imgReader = new FileReader();
      imgReader.readAsDataURL(e.target.files[0]);
      imgReader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      const formData = new FormData();
      formData.append("img", e.target.files[0]);
      formData.append("user", theUser._id);
      const res = await axios.post("/api/user/profile", formData);
    }
  }
  async function ChangeDetailsHandler(e) {
    e.preventDefault();
    const validatedData = await ValidateUserObj({
      name,
      username,
      email,
      password: pass,
    });
    if (validatedData[0]) {
      return newErrorToast(validatedData[0]);
    }

    try {
      const response = await axios.put("/api/user", validatedData);
      if (response.status === 200) {
        ShowSwal("success", "تغییرات با موفقیت ذخیره شد");
        setInterval(() => {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      newErrorToast("گذرواژه اشتباه میباشد");
    }
  }
}
