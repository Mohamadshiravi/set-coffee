"use client";

import { newErrorToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const identifierInpRef = useRef();
  const passInpRef = useRef();
  return (
    <>
      <div
        data-aos="flip-right"
        className="sm:w-[350px] w-[300px] bg-white shadow-lg rounded-md p-6 select-none"
      >
        <form className="shabnam flex flex-col items-start gap-4">
          <input
            ref={identifierInpRef}
            type="text"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="ایمیل  | نام کاربری"
          />
          <input
            ref={passInpRef}
            type="password"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="رمز عبور"
          />

          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <img src="/img/loading/Walk.gif" className="w-[40px]"></img>
            </div>
          ) : (
            <button
              onClick={LoginHandler}
              className="moraba-bold w-full bg-mybrown hover:bg-headcolor transition-all text-white py-3 rounded-xs"
            >
              ورود
            </button>
          )}
        </form>
        <div className="mt-20">
          <h3 className="text-sm text-zinc-700 shabnam">
            آیا حساب کاربری ندارید؟
          </h3>
          <Link
            href={"/auth/register"}
            className="moraba-bold mt-4 w-full block text-center hover:bg-zinc-300 transition bg-zinc-200 border-zinc-500 border text-zinc-800 py-3 rounded-xs"
          >
            ثبتنام
          </Link>
        </div>
      </div>
    </>
  );
  async function LoginHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      identifier: identifierInpRef.current.value,
      password: passInpRef.current.value,
    };
    try {
      const res = await axios.post("/api/auth/login", user);
      if (res.status === 200) {
        setIsLoading(false);
        const isClicked = await ShowSwal(
          "success",
          "با موفقیت وارد شدید",
          "رفتن به داشبورد"
        );
        if (isClicked) {
          location.href = "/p-user";
        } else {
          location.href = "/";
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        setIsLoading(false);
        newErrorToast("اکانتی یافت نشد");
      }
      if (error.response.status === 403) {
        setIsLoading(false);
        newErrorToast("شما بن شده اید");
      }
      if (error.response.status === 401) {
        setIsLoading(false);
        newErrorToast("رمز عبور صحیح نمیباشد");
      }
    }
  }
}
