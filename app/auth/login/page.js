"use client";

import VerifyCodeForm from "@/components/template/login/verifyCodeForm";
import { newErrorToast, newSucToast, ShowSwal } from "@/utils/helper-function";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phone, setPhone] = useState("");

  const [ident, setIdent] = useState("");

  const router = useRouter();
  return (
    <>
      <div
        data-aos="flip-right"
        className="sm:w-[350px] w-[300px] bg-white shadow-lg rounded-md p-6 select-none"
      >
        {!isCodeSent ? (
          <>
            <form className="shabnam flex flex-col items-start gap-4">
              <TextField
                value={ident}
                onChange={(e) => setIdent(e.target.value)}
                type="text"
                label="شماره تماس  | نام کاربری"
                fullWidth
              />

              <Button
                variant="contained"
                loading={isLoading}
                onClick={LoginHandler}
                size="lg"
                fullWidth
                sx={{ height: "50px", fontSize: "16px", fontWeight: "800" }}
              >
                ورود
              </Button>
            </form>
            <div className="mt-20">
              <h3 className="text-sm text-zinc-700 pb-2 shabnam">
                آیا حساب کاربری ندارید؟
              </h3>
              <Button
                onClick={() => router.push("/auth/register")}
                variant="outlined"
                size="lg"
                fullWidth
                sx={{ height: "50px", fontSize: "16px" }}
                className="moraba-bold mt-4 w-full block text-center hover:bg-zinc-300 transition bg-zinc-200 border-zinc-500 border text-zinc-800 py-3 rounded-xs"
              >
                ثبتنام
              </Button>
            </div>
          </>
        ) : (
          <VerifyCodeForm reSend={LoginHandler} phone={phone} />
        )}
      </div>
    </>
  );
  async function LoginHandler(e) {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);

    if (ident === "") {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/auth/login/send", {
        ident,
      });

      setIsLoading(false);
      newSucToast("کد برای شماره موبایل شما ارسال شد");
      setIsCodeSent(true);
      setPhone(res.data.phone);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 404) {
        newErrorToast("اکانتی یافت نشد");
      }
      if (error.response.status === 403) {
        newErrorToast("شما بن شده اید");
      }
    }
  }
}
