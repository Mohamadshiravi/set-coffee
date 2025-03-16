"use client";

import { newToast } from "@/utils/helper-function";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Discount({ code, precent, use, maxUse, id, reRender }) {
  return (
    <div className="bg-blue-400 w-[400px] rounded-lg flex flex-col items-center justify-between shadow-xl shadow-blue-300">
      <span className="font-mono font-black text-2xl text-zinc-700 border-b-4 border-dashed border-blue-700 w-full block text-center py-6">
        {code}
      </span>
      <div className="flex items-center flex-col w-full sm:text-3xl text-2xl justify-center gap-10 py-10">
        <span className="font-mono font-bold">{precent}%</span>
        <span className="moraba-regular">{use} بار استفاده شده</span>
        <span className="moraba-regular">حداکثر استفاده : {maxUse}</span>
      </div>
      <div
        onClick={HandleDeleteDiscount}
        className="w-full flex items-center justify-center text-6xl text-white bg-blue-600 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition"
      >
        <MdDelete />
      </div>
    </div>
  );
  async function HandleDeleteDiscount() {
    const res = await axios.post(`/api/discount/${id}`);
    if (res.status === 200) {
      newToast("کد تخفیف حذف شد");
      reRender();
    }
  }
}
