"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import { Box, Button, Input, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export default function SendMessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

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

  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <CacheProvider value={rtlCache}>
      <form>
        <div className="flex sm:flex-row flex-col gap-2">
          <div className="w-full">
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
              label=" نام و نام خانوادگی"
            />
          </div>
          <div className="w-full">
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
              label=" آدرس ایمیل"
            />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 mt-4">
          <div className="w-full">
            <TextField
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
              label="  شماره تماس"
            />
          </div>
          <div className="w-full">
            <TextField
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              fullWidth
              label=" نام شرکت"
            />
          </div>
        </div>
        <div className="my-4 w-full">
          <TextField
            multiline
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            fullWidth
            label=" متن پیام"
          />
        </div>
        <Button
          sx={{ height: "50px", fontSize: "15px", fontFamily: "moraba-bold" }}
          loading={loading}
          fullWidth
          onClick={SendMessageHndler}
          variant="contained"
          size="large"
        >
          ارسال
        </Button>
      </form>
    </CacheProvider>
  );
  async function SendMessageHndler(e) {
    setLoading(true);
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
        setLoading(false);
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
      setLoading(false);
      newErrorToast(`${e.errors}`);
    }
  }
}
