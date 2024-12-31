"use client";

import { newToast, ShowSwal } from "@/utils/helper-function";
import axios from "axios";
import swal from "sweetalert";

export default function TiketField({
  title,
  department,
  createdAt,
  isClosed,
  user,
  body,
  priority,
  id,
  answer,
}) {
  return (
    <div className="bg-gray-100 w-full py-3 px-4 text-zinc-700 rounded-lg flex flex-col shabnam">
      <div className="flex transition-all items-center justify-between">
        <div className="flex gap-4 md:flex-row flex-col items-center">
          <span className="font-mono text-xl font-bold text-zinc-700 md:px-4 md:pb-0 pb-4 md:border-l-2 md:border-b-0 border-b-2">
            {user.username}
          </span>
          <span className="font-bold">{title}</span>
          <span className="font-bold bg-gray-200 rounded-md text-sm px-3 py-1 moraba-regular">
            واحد : {department.name}
          </span>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <div>
            {priority === 3 && (
              <i className="bg-red-400 text-white moraba-regular text-sm px-2 py-1 rounded-sm">
                مهم
              </i>
            )}
            {priority === 2 && (
              <i className="bg-yellow-400 text-white moraba-regular text-sm px-2 py-1 rounded-sm">
                اهمیت متوسط
              </i>
            )}
            {priority === 1 && (
              <i className="bg-green-400 text-white moraba-regular text-sm px-2 py-1 rounded-sm">
                کم اهمیت
              </i>
            )}
          </div>
          <span className="sm:text-sm text-xs bg-white px-2 py-1 rounded-sm flex gap-5">
            ({new Date(createdAt).toLocaleTimeString("fa-IR")})
            <i>{new Date(createdAt).toLocaleDateString("fa-IR")}</i>
          </span>
          <span className="text-xs">
            {isClosed ? (
              <i className="bg-green-500 px-2 py-1 rounded-sm text-white">
                پاسخ داده شده
              </i>
            ) : (
              <i className="bg-red-500 px-2 py-1 rounded-sm text-white">
                پاسخ داده نشده
              </i>
            )}
          </span>
        </div>
      </div>
      <div className="w-full flex sm:flex-row flex-col gap-4 mt-4 items-center justify-end">
        <button
          onClick={() => {
            ShowSwal("", body, "خواندم");
          }}
          className="bg-blue-500 sm:w-auto w-full hover:bg-blue-600 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
        >
          مشاهده
        </button>
        <button
          onClick={DeleteTiketHandler}
          className="bg-red-500 sm:w-auto w-full hover:bg-red-600 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
        >
          حذف
        </button>
        {!isClosed ? (
          <button
            onClick={TiketResponseHandler}
            className="bg-yellow-400 sm:w-auto w-full hover:bg-yellow-500 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
          >
            پاسخ
          </button>
        ) : (
          <button
            onClick={() => {
              ShowSwal("", answer.body, "خواندم");
            }}
            className="bg-yellow-400 sm:w-auto w-full hover:bg-yellow-500 transition moraba-regular text-lg text-white px-6 py-2 rounded-lg"
          >
            مشاهده پاسخ
          </button>
        )}
      </div>
    </div>
  );
  async function DeleteTiketHandler() {
    const isOk = await ShowSwal("warning", "ایا از حذف تیکت مطمعن هستید ؟؟؟", [
      "خیر",
      "بله",
    ]);
    if (isOk) {
      const res = await axios.delete(`/api/tiket/${id}`);
      if (res.status === 200) {
        newToast("تیکت پاک شد");
        setInterval(() => location.reload(), 1500);
      }
    }
  }
  async function TiketResponseHandler() {
    const isOk = await swal({
      title: `پاسخ به ${user.username} `,
      content: "input",
      buttons: ["لغو", "ارسال"],
    });
    if (isOk) {
      const res = await axios.post("/api/tiket", {
        title,
        body: isOk,
        department: department._id,
        priority,
        isAnswer: true,
        isClosed: true,
        answerFor: id,
      });
      if (res.status === 201) {
        newToast("تیکت پاسخ داده شد");
        setInterval(() => location.reload(), 1500);
      }
    }
  }
}
