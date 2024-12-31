"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";

export default function SendMessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");

  const schema = yup.object({
    nameAndLastName: yup
      .string()
      .required("لطفا نام خود را بنویسید")
      .min(3, "نام باید حدقل دو حرف باشد"),
    email: yup
      .string()
      .email("ایمیل صحیح نیست")
      .required("لطفا ایمیل خود را وارد کنید"),
    phone: yup.string().required("لطفا شماره تماس خود را وارد کنید"),
    body: yup.string().required("لطفا پیغام خود را بنویسید"),
  });
  return (
    <form>
      <div className="flex gap-2">
        <div className="w-full">
          <label
            htmlFor="name-lastname"
            className="after:content-['*'] after:text-red-500 after:text-2xl"
          >
            نام و نام خانوادگی
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name-lastname"
            type="text"
            className="text-base mt-1 p-2 outline-none border border-zinc-600 focus:border-2 rounded-md w-full"
          ></input>
        </div>
        <div className="w-full">
          <label
            htmlFor="email-input"
            className="after:content-['*'] after:text-red-500 after:text-2xl"
          >
            آدرس ایمیل
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email-input"
            type="email"
            className="text-base mt-1 p-2 outline-none border border-zinc-600 focus:border-2 rounded-md w-full"
          ></input>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-full">
          <label
            htmlFor="phone-number"
            className="after:content-['*'] after:text-red-500 after:text-2xl"
          >
            شماره تماس
          </label>
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="phone-number"
            type="text"
            className="text-base mt-1 p-2 outline-none border border-zinc-600 focus:border-2 rounded-md w-full"
          ></input>
        </div>
        <div className="w-full">
          <label
            htmlFor="company-name"
            className="after:content-['*'] after:text-zinc-200 after:text-2xl"
          >
            نام شرکت
          </label>
          <input
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            id="company-name"
            type="text"
            className="text-base mt-1 p-2 outline-none border border-zinc-600 focus:border-2 rounded-md w-full"
          ></input>
        </div>
      </div>
      <label
        htmlFor="message-body"
        className="mt-4 block after:content-['*'] after:text-red-500 after:text-2xl"
      >
        متن پیام
      </label>
      <textarea
        id="message-body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        className="w-full mt-1 rounded-md border border-zinc-600 outline-none focus:border-2 text-base p-2 h-[200px] max-h-[500px] min-h-[100px]"
      ></textarea>
      <button
        onClick={SendMessageHndler}
        className="w-full bg-mybrown text-white moraba-bold py-3 rounded-md text-lg hover:bg-headcolor transition"
      >
        ارسال
      </button>
    </form>
  );
  async function SendMessageHndler(e) {
    e.preventDefault();

    const message = await Validator();
    if (message) {
      const res = await axios.post("/api/message", message);
      if (res.status === 201) {
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setBody("");
        newToast("پیام شما با موفقیت ارسال شد");
      }
    }
  }
  async function Validator() {
    const message = {
      nameAndLastName: name,
      email,
      phone,
      body,
      companyName: company,
    };
    try {
      const res = await schema.validate(message);
      return res;
    } catch (e) {
      newErrorToast(`${e.errors}`);
    }
  }
}
