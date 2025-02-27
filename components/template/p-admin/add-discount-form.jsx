"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import axios from "axios";
import { useState } from "react";

export default function DiscountForm() {
  const [code, setCode] = useState("");
  const [precent, setPrecent] = useState("");
  const [maxUse, setMaxUse] = useState("");
  return (
    <form className="moraba-regular mt-10">
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl text-zinc-600">شناسه تخفیف</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            className="w-full border-2 py-3 px-4 outline-hidden border-zinc-400 rounded-lg focus:border-zinc-800 transition"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl text-zinc-600">درصد تخفیف</label>
          <input
            value={precent}
            onChange={(e) => setPrecent(e.target.value)}
            type="text"
            className="w-full border-2 py-3 px-4 outline-hidden border-zinc-400 rounded-lg focus:border-zinc-800 transition"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl text-zinc-600">حداکثر استفاده</label>
          <input
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
            type="text"
            className="w-full border-2 py-3 px-4 outline-hidden border-zinc-400 rounded-lg focus:border-zinc-800 transition"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl text-zinc-600">محصول</label>
          <input
            type="text"
            className="w-full border-2 py-3 px-4 outline-hidden border-zinc-400 rounded-lg focus:border-zinc-800 transition"
          ></input>
        </div>
      </div>
      <button
        onClick={handlerAddDiscount}
        className="bg-blue-500 mt-10 px-10 py-3 text-xl moraba-bold text-white rounded-lg hover:bg-blue-600 transition"
      >
        افزودن
      </button>
    </form>
  );
  async function handlerAddDiscount(e) {
    e.preventDefault();
    if ((code === "" || precent === "", maxUse === "")) {
      return newErrorToast("لطفا همه فیلد ها را پر کنید");
    }
    const res = await axios.post("/api/discount", { code, precent, maxUse });
    if (res.status === 201) {
      newToast("کد تخفیف اضافه شد");
      setInterval((e) => location.reload(), 1500);
    }
  }
}
