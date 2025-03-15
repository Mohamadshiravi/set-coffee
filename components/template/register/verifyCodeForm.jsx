import { UserContext } from "@/context/context";
import { newErrorToast, newSucToast } from "@/utils/helper-function";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function VerifyCodeForm({ user, reSend }) {
  const [code, setCode] = useState([]);
  const [seconds, setSeconds] = useState(120);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { FetchUserData } = useContext(UserContext);

  useEffect(() => {
    const firstInp = document.getElementById(`codeInp0`);
    firstInp?.focus();
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  function handleInputChange(e, index) {
    const codeClone = code;
    if (+e.target.value.length === 1) {
      codeClone[index] = e.target.value;
      const NextInp = document.getElementById(`codeInp${index + 1}`);

      NextInp?.focus();
    } else {
      codeClone[index] = "";
      const PrewInp = document.getElementById(`codeInp${index - 1}`);
      PrewInp?.focus();
    }
    setCode(codeClone);
  }
  return (
    <form className="shabnam flex flex-col items-start gap-4">
      <div
        dir="ltr"
        className="flex flex-row-reveres items-center gap-2 justify-center font-sans font-bold w-full"
      >
        {[...Array(6)].map((_, i) => (
          <input
            id={`codeInp${i}`}
            key={i}
            maxLength={1}
            type="tel"
            className="InpShadow outline-none text-center border text-3xl border-brown-500/50 py-3 rounded-sm w-full h-[80px] p-1"
            onChange={(e) => handleInputChange(e, i)}
          />
        ))}
      </div>
      <Button
        variant="contained"
        loading={isLoading}
        onClick={VerifyCodeHandler}
        size="lg"
        fullWidth
        sx={{ height: "50px", fontSize: "16px", fontWeight: "800" }}
      >
        ثبتنام
      </Button>
      <div className="text-center w-full">
        {seconds === 0 ? (
          <Button
            onClick={() => {
              setSeconds(120);
              reSend();
            }}
            className="text-myGreen-600 text-sm"
          >
            ارسال مجدد کد
          </Button>
        ) : (
          <span className="text-myGreen-600 text-sm">
            تا ارسال مجدد کد : {formatTime(seconds)}
          </span>
        )}
      </div>
    </form>
  );

  async function VerifyCodeHandler() {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/register/verify", {
        phone: user.phone,
        name: user.name,
        username: user.username,
        code: code.join(""),
      });
      newSucToast("اکانت شما با موفقیت ساخته شد");
      setIsLoading(false);

      FetchUserData();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 410) {
        newErrorToast("کد اشتباه است یا زمان ان تمام شده");
      } else {
        newErrorToast("مشکلی پیش امده است");
      }
    }
  }
}
