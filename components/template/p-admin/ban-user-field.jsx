"use client";

import { newToast } from "@/utils/helper-function";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function BanUserField({ phone, id, reRenderBanUsers }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="text-zinc-600 font-bold text-xl flex sm:flex-row flex-col gap-4 items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
      <span>{phone}</span>
      <Button
        loading={loading}
        size="large"
        color="info"
        variant="contained"
        onClick={UnBanUserhandler}
      >
        رفع بن
      </Button>
    </div>
  );
  async function UnBanUserhandler() {
    setLoading(true);
    const res = await axios.delete(`/api/user/banuser/${id}`);

    if (res.status === 200) {
      setLoading(false);
      newToast("کاربر با موفقیت از بن خارج شد");
      reRenderBanUsers();
    }
  }
}
