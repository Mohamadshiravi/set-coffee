"use client";

import { newErrorToast, newSucToast, newToast } from "@/utils/helper-function";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SendTiketForm({ departments }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <form className="shabnam flex flex-col gap-4 ">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col w-full gap-3 text-sm">
          <TextField
            label="موضوع تیکت"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="flex flex-col w-full gap-3 text-sm">
          <Select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            displayEmpty
          >
            <MenuItem disabled value="">
              یک مورد را انتخاب کنید
            </MenuItem>
            {departments.map((e, i) => (
              <MenuItem key={i} value={e._id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col w-full gap-3 text-sm">
          <label className="moraba-bold text-base"></label>
          <Select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            displayEmpty
          >
            <MenuItem disabled value="">
              سطح اولویت تیکت را انتخاب کنید
            </MenuItem>

            <MenuItem value={1}>مهم</MenuItem>
            <MenuItem value={2}>متوسط</MenuItem>
            <MenuItem value={3}>کم</MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 text-sm">
        <TextField
          label="متن تیکت"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
        />
      </div>

      <Button
        loading={loading}
        size="large"
        fullWidth
        variant="contained"
        onClick={SnedTiketHandler}
        className="bg-headcolor md:w-[200px] w-full py-3 rounded-lg text-white moraba-bold hover:bg-green-950"
      >
        ارسال
      </Button>
    </form>
  );
  async function SnedTiketHandler(e) {
    e.preventDefault();
    const tiket = ValidatedTiket();

    if (tiket.title) {
      setLoading(true);
      try {
        const res = await axios.post("/api/tiket", tiket);
        newSucToast("تیکت شما ارسال شد");
        setLoading(false);
        setTimeout(() => router.push("/p-user/tikets"), 1000);
      } catch (error) {
        newToast("تیکت شما ارسال نمیشود ");
        setLoading(false);
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
