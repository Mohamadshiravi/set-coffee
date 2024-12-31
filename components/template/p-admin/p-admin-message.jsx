"use client";

import { newToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";

export default function PAdminMessage({ message }) {
  return (
    <div className="overflow-hidden">
      <div className="bg-gray-100 w-full py-3 px-4 text-zinc-700 rounded-lg flex flex-col shabnam">
        <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-4 transition-all items-center justify-between">
          <div className="flex gap-4 md:flex-row flex-col items-center">
            <span className="moraba-regular text-xl font-bold text-zinc-700 md:px-4 md:pb-0 pb-4 md:border-l-2 md:border-b-0 border-b-2">
              {message.nameAndLastName}
            </span>
            <span className="text-base font-bold text-zinc-700 md:px-4 md:pb-0 pb-4 md:border-l-2 md:border-b-0 border-b-2">
              {message.email}
            </span>
            <span className="font-mono font-black text-base">
              {message.phone}
            </span>
          </div>
          <div className="flex sm:mt-0 mt-1 items-center gap-4 bg-zinc-200 px-2 text-sm py-1 rounded-md">
            <span>
              ({new Date(message.createdAt).toLocaleTimeString("fa-IR")})
            </span>
            <i>{new Date(message.createdAt).toLocaleDateString("fa-IR")}</i>
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col gap-4 mt-4 items-center justify-end">
          <button
            onClick={() => {
              ShowSwal("", message.body, "خواندم");
            }}
            className="bg-blue-500 sm:w-auto w-full hover:bg-blue-600 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
          >
            مشاهده پیام
          </button>
          <button
            onClick={DeleteTiketHandler}
            className="bg-red-500 sm:w-auto w-full hover:bg-red-600 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
  async function DeleteTiketHandler() {
    const isOk = await ShowSwal("warning", "ایا از حذف پیام مطمعن هستید؟؟", [
      "خیر",
      "بله",
    ]);
    if (isOk) {
      const res = await axios.delete(`/api/message/${message._id}`);
      if (res.status === 200) {
        newToast("پیام حذف شد");
        setInterval((e) => location.reload(), 1500);
      }
    }
  }
}
