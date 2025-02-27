"use client";

import ValidateUserObj from "@/utils/auth-utill/userObjectValidator";
import { newErrorToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

export default function RegisterPage() {
  const nameInpRef = useRef();
  const usernameInpRef = useRef();
  const emailInpRef = useRef();
  const passInpRef = useRef();
  const rePassInpRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div
        data-aos="flip-left"
        className="sm:w-[350px] w-[300px] bg-white shadow-lg rounded-md p-6 select-none"
      >
        <form className="shabnam flex flex-col items-start gap-4">
          <input
            ref={nameInpRef}
            type="text"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="نام"
          />
          <input
            ref={usernameInpRef}
            type="text"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="نام کاربری"
          />
          <input
            ref={emailInpRef}
            type="email"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="ایمیل"
          />
          <hr className="border w-full my-4 border-zinc-200" />
          <input
            ref={passInpRef}
            type="password"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="رمز عبور"
          />
          <input
            ref={rePassInpRef}
            type="password"
            className="w-full border-2 outline-hidden py-3 px-4 text-sm rounded-xs border-zinc-300 focus:border-mybrown transition-all"
            placeholder="تکرار رمز عبور"
          />
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <img src="/img/loading/Walk.gif" className="w-[50px]"></img>
            </div>
          ) : (
            <button
              onClick={RegisterHandler}
              className="moraba-bold w-full bg-mybrown hover:bg-headcolor transition-all text-white py-3 rounded-xs"
            >
              ثبتنام
            </button>
          )}
          <span className="w-full text-center text-xs text-zinc-600">
            ثبتنام شما در سایت به این معنی است که تمامی قوانین را پذیرفته اید.
          </span>
        </form>
        <div className="mt-20">
          <Link
            href={"/auth/login"}
            className="moraba-bold mt-4 w-full block text-center hover:bg-zinc-300 transition bg-zinc-200 border-zinc-500 border text-zinc-800 py-3 rounded-xs"
          >
            بازگشت به ورود
          </Link>
        </div>
      </div>
    </>
  );
  async function RegisterHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    if (passInpRef.current.value !== rePassInpRef.current.value) {
      setIsLoading(false);
      return newErrorToast("رمز های عبور یکسان نیستند");
    }
    const user = {
      name: nameInpRef.current.value,
      username: usernameInpRef.current.value,
      email: emailInpRef.current.value,
      password: passInpRef.current.value,
    };

    const validator = await ValidateUserObj(user);
    if (validator[0]) {
      setIsLoading(false);
      return newErrorToast(validator[0]);
    }

    try {
      const response = await axios.post("/api/auth/register", validator);
      if (response.status === 201) {
        setIsLoading(false);
        const isClicked = await ShowSwal(
          "success",
          "با موفقیت ثبتنام شدید",
          "رفتن به داشبورد"
        );
        if (isClicked) {
          location.href = "/p-user";
        } else {
          location.href = "/";
        }
      }
    } catch (error) {
      if (error.response.status === 403) {
        setIsLoading(false);
        newErrorToast("شما بن شده اید");
      }
      if (error.response.status === 409) {
        setIsLoading(false);
        return newErrorToast("نام کاربری یا ایمیل قبلا استفاده شده است");
      } else if (error.response.status === 422) {
        setIsLoading(false);
        return newErrorToast("داده های نامعتبر");
      }
    }
  }
}
