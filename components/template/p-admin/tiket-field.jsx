"use client";

import { newToast, ShowSwal } from "@/utils/helper-function";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

export default function TiketField({
  reRenderTiket,
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
  const [loading, setLoading] = useState(false);
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
              <i className="bg-red-400 text-white moraba-regular text-sm px-2 py-1 rounded-xs">
                مهم
              </i>
            )}
            {priority === 2 && (
              <i className="bg-yellow-400 text-white moraba-regular text-sm px-2 py-1 rounded-xs">
                اهمیت متوسط
              </i>
            )}
            {priority === 1 && (
              <i className="bg-green-400 text-white moraba-regular text-sm px-2 py-1 rounded-xs">
                کم اهمیت
              </i>
            )}
          </div>
          <span className="sm:text-sm text-xs bg-white px-2 py-1 rounded-xs flex gap-5">
            ({new Date(createdAt).toLocaleTimeString("fa-IR")})
            <i>{new Date(createdAt).toLocaleDateString("fa-IR")}</i>
          </span>
          <span className="text-xs">
            {isClosed ? (
              <i className="bg-green-500 px-2 py-1 rounded-xs text-white">
                پاسخ داده شده
              </i>
            ) : (
              <i className="bg-red-500 px-2 py-1 rounded-xs text-white">
                پاسخ داده نشده
              </i>
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-end w-full mt-4 ">
        <div className="flex sm:flex-row flex-col gap-2 sm:w-[400px] w-full items-center">
          <Button
            fullWidth
            color="info"
            variant="contained"
            size="large"
            onClick={() => {
              ShowSwal("", body, "خواندم");
            }}
          >
            مشاهده
          </Button>
          <Button
            loading={loading}
            fullWidth
            color="error"
            variant="contained"
            size="large"
            onClick={DeleteTiketHandler}
          >
            حذف
          </Button>
          {!isClosed ? (
            <Button
              fullWidth
              color="success"
              variant="contained"
              size="large"
              onClick={TiketResponseHandler}
            >
              پاسخ
            </Button>
          ) : (
            <Button
              fullWidth
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                ShowSwal("", answer.body, "خواندم");
              }}
            >
              مشاهده پاسخ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  async function DeleteTiketHandler() {
    const isOk = await ShowSwal("warning", "ایا از حذف تیکت مطمعن هستید ؟؟؟", [
      "خیر",
      "بله",
    ]);
    if (isOk) {
      setLoading(true);
      const res = await axios.delete(`/api/tiket/${id}`);
      if (res.status === 200) {
        setLoading(false);
        newToast("تیکت پاک شد");
        reRenderTiket();
      } else {
        setLoading(false);
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
        reRenderTiket();
      }
    }
  }
}
