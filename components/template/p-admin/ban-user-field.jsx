"use client";

import { newToast } from "@/utils/helper-function";
import axios from "axios";

export default function BanUserField({ email, id }) {
  return (
    <div className="text-zinc-600 font-bold text-xl flex sm:flex-row flex-col gap-4 items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
      <span>{email}</span>
      <button
        onClick={UnBanUserhandler}
        className="bg-blue-500 text-white moraba-bold px-10 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        رفع بن
      </button>
    </div>
  );
  async function UnBanUserhandler() {
    const res = await axios.delete(`/api/user/banuser/${id}`);

    if (res.status === 200) {
      newToast("کاربر با موفقیت از بن خارج شد");
      setInterval(() => location.reload(), 1000);
    }
  }
}
