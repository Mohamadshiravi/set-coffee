"use client";

import VerifyCodeForm from "@/components/template/register/verifyCodeForm";
import ValidateUserObj from "@/utils/auth-utill/userObjectValidator";
import { newErrorToast, newSucToast } from "@/utils/helper-function";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="sm:w-[350px] w-[300px] bg-white shadow-lg rounded-md p-6 select-none">
        {!isCodeSent ? (
          <form className="shabnam flex flex-col items-start gap-4">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              label="نام"
              fullWidth
            />
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              label="نام کاربری"
              fullWidth
            />

            <hr className="border-0.5 w-full my-2 border-zinc-300" />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="شماره موبایل"
              fullWidth
            />

            <Button
              variant="contained"
              loading={isLoading}
              onClick={SendCodeHandler}
              size="lg"
              fullWidth
              sx={{ height: "50px", fontSize: "16px", fontWeight: "800" }}
            >
              ارسال کد
            </Button>
          </form>
        ) : (
          <VerifyCodeForm
            reSend={SendCodeHandler}
            user={{
              name,
              username,
              phone,
            }}
          />
        )}
        <div className="mt-20">
          <Button
            onClick={() => router.push("/auth/login")}
            variant="outlined"
            size="lg"
            fullWidth
            sx={{ height: "50px", fontSize: "16px" }}
            className="moraba-bold mt-4 w-full block text-center hover:bg-zinc-300 transition bg-zinc-200 border-zinc-500 border text-zinc-800 py-3 rounded-xs"
          >
            بازگشت به ورود
          </Button>
        </div>
      </div>
    </>
  );

  async function SendCodeHandler(e) {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);

    const user = {
      name,
      username,
      phone,
    };

    const validator = await ValidateUserObj(user);
    if (validator[0]) {
      setIsLoading(false);
      return newErrorToast(validator[0]);
    }

    try {
      await axios.post("/api/auth/register/send", {
        phone: user.phone,
      });
      if (true) {
        setIsLoading(false);
        newSucToast("کد به شماره موبایل شما ارسال شد !");
        setIsCodeSent(true);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 403) {
        newErrorToast("شما بن شده اید");
      }
      if (error.response.status === 409) {
        return newErrorToast("این شماره تلفن قبلا ثبت شده است !");
      } else if (error.response.status === 422) {
        return newErrorToast("داده های نامعتبر");
      } else {
        return newErrorToast("مشکلی پیش امده");
      }
    }
  }
}
