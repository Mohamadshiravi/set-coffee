"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import axios from "axios";
import { useState } from "react";
import { CiFileOn } from "react-icons/ci";

export default function SendTiketForm({ departments }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [img, setImg] = useState("");
  return (
    <form className="shabnam flex flex-col gap-4">
      <img src={img} />
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col w-full gap-3 text-sm">
          <label className="moraba-bold text-base"> موضوع تیکت :</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="px-4 sm:py-4 py-2 rounded-lg outline-hidden focus:border"
          />
        </div>
        <div className="flex flex-col w-full gap-3 text-sm">
          <label className="moraba-bold text-base">دپارتمان مورد نظر :</label>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            className="w-full sm:py-4 py-2 px-2 rounded-lg outline-"
          >
            <option defaultValue={true}>یک مورد را انتخاب کنید</option>
            {departments.map((e, i) => (
              <option key={i} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col w-full gap-3 text-sm">
          <label className="moraba-bold text-base">
            سطح اولویت تیکت را انتخاب کنید :
          </label>
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            className="w-full sm:py-4 py-2 px-2 rounded-lg outline-"
          >
            <option defaultValue={true}>یک مورد را انتخاب کنید</option>
            <option value={3}>مهم</option>
            <option value={2}>متوسط</option>
            <option value={1}>کم</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 text-sm">
        <label className="moraba-bold text-base"> متن تیکت :</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          className="px-4 py-2 rounded-lg outline-hidden focus:border min-h-[200px] max-h-[500px]"
        ></textarea>
      </div>
      <div className="bg-gray-200 moraba-bold flex flex-col items-center gap-2 rounded-lg py-6 text-zinc-700">
        <h2>حداکثر اندازه 6 مگابایت</h2>
        <h3 className="px-4 text-center">
          فرمت های مجاز : jpg , png , jpeg , rar , zip
        </h3>
        <label className="border border-dashed mt-2 rounded-md flex flex-col items-center gap-4 border-zinc-800 px-10 py-6 cursor-pointer">
          <h3>یک فایل انتخاب کنید</h3>
          <CiFileOn className="text-4xl" />
          <input
            onChange={(e) => {
              setImg(e.target.value);
            }}
            type="file"
            accept=".jpg, .png, .jpeg, .rar , .zip,"
            className="absolute w-0 h-0"
          ></input>
        </label>
      </div>
      <button
        onClick={SnedTiketHandler}
        className="bg-headcolor md:w-[200px] w-full py-3 rounded-lg text-white moraba-bold hover:bg-green-950"
      >
        ارسال
      </button>
    </form>
  );
  async function SnedTiketHandler(e) {
    e.preventDefault();
    const tiket = ValidatedTiket();
    if (tiket.title) {
      const res = await axios.post("/api/tiket", tiket);
      if (res.status === 201) {
        newToast("تیکت شما ارسال شد");
        setInterval(() => {
          location.reload();
        }, 2000);
      }
    }
  }
  function ValidatedTiket() {
    if (title === "" || department === "" || priority === "" || body === "") {
      return newErrorToast("لطفا تمام فیلد ها را انتخاب / پر کنید");
    }
    return {
      title,
      body,
      department,
      priority: Number(priority),
    };
  }
}
