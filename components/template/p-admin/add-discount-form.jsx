"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import { Button, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function DiscountForm({ reRender }) {
  const [code, setCode] = useState("");
  const [precent, setPrecent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  const [loading, setLoading] = useState(false);
  return (
    <form className="moraba-regular mt-10">
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-6">
        <div className="flex flex-col gap-2">
          <TextField
            fullWidth
            color="info"
            label="شناسه تخفیف"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            fullWidth
            color="info"
            label="درصد تخفیف"
            value={precent}
            onChange={(e) => setPrecent(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            fullWidth
            color="info"
            label="حداکثر استفاده"
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
            type="number"
          />
        </div>
      </div>
      <div className="mt-8 w-[200px]">
        <Button
          loading={loading}
          fullWidth
          onClick={handlerAddDiscount}
          color="info"
          variant="contained"
          size="large"
        >
          افزودن
        </Button>
      </div>
    </form>
  );
  async function handlerAddDiscount(e) {
    e.preventDefault();
    if ((code === "" || precent === "", maxUse === "")) {
      return newErrorToast("لطفا همه فیلد ها را پر کنید");
    }

    setLoading(true);
    const res = await axios.post("/api/discount", { code, precent, maxUse });
    if (res.status === 201) {
      setLoading(false);
      newToast("کد تخفیف اضافه شد");
      reRender();
      setCode("");
      setMaxUse("");
      setPrecent("");
    } else {
      setLoading(false);
    }
  }
}
