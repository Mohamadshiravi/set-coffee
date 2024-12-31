"use client";

import Link from "next/link";
import { useRef } from "react";

export default function ForgetPassPage() {
  return (
    <div
      data-aos="flip-right"
      className="sm:w-[350px] w-[300px] bg-white shadow-lg rounded-md p-6 select-none"
    >
      <form className="shabnam flex flex-col items-start gap-4">
        <input
          type="text"
          className="w-full border-2 outline-none py-3 px-4 text-sm rounded-sm border-zinc-300 focus:border-mybrown transition-all"
          placeholder="ایمیل"
        />
        <button className="moraba-bold w-full bg-mybrown hover:bg-headcolor transition-all text-white py-3 rounded-sm">
          بازنشانی رمز
        </button>
      </form>
      <div className="mt-20">
        <Link
          href={"/auth/register"}
          className="moraba-bold mt-4 w-full block text-center hover:bg-zinc-300 transition bg-zinc-200 border-zinc-500 border text-zinc-800 py-3 rounded-sm"
        >
          بازگشت
        </Link>
      </div>
    </div>
  );
}
