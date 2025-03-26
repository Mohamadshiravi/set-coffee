"use client";

import { newErrorToast, newSucToast, newToast } from "@/utils/helper-function";
import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ChangeUserRole({
  name,
  role,
  CloseModal,
  id,
  reRenderUsers,
}) {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section className="w-full h-screen z-50 flex items-center fixed top-0 left-0 justify-center bg-black/30 backdrop-blur-xs">
      <div
        onClick={CloseModal}
        className="w-full h-full fixed top-0 left-0 z-51"
      ></div>
      <div className="bg-white z-52 p-4 shadow-lg moraba-regular rounded-lg flex flex-col items-center gap-10 w-[300px]">
        <h4 className="text-center">
          تغییر نقش کاربر ({name}) از {role} به {userRole}
        </h4>
        <Select
          fullWidth
          color="info"
          size="small"
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
          }}
          displayEmpty
        >
          <MenuItem value={""} disabled>
            انتخاب کنید
          </MenuItem>
          <MenuItem value={"ADMIN"}>ادمین</MenuItem>
          <MenuItem value={"USER"}>کاربر عادی</MenuItem>
        </Select>
        <div className="w-full flex items-center justify-between">
          <Button
            loading={loading}
            size="large"
            variant="outlined"
            color="info"
            onClick={ChangeUserRoleHandler}
          >
            تغییر
          </Button>
          <Button
            size="large"
            variant="contained"
            color="info"
            onClick={CloseModal}
          >
            لغو
          </Button>
        </div>
      </div>
    </section>
  );
  async function ChangeUserRoleHandler() {
    setLoading(true);
    try {
      await axios.post("/api/user/role", {
        user: id,
        role: userRole,
      });

      setLoading(false);
      newSucToast("نقش کاربر تغییر کرد");
      reRenderUsers();
      CloseModal();
    } catch (error) {
      setLoading(false);
      newErrorToast("مشکلی پیش امد");
    }
  }
}
