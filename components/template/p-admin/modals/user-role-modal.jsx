"use client";

import { newToast } from "@/utils/helper-function";
import axios from "axios";
import { useState } from "react";

export default function ChangeUserRole({ name, role, CloseModal, id }) {
  const [userRole, setUserRole] = useState(role);
  return (
    <section className="w-full h-screen z-[50] flex items-center fixed top-0 left-0 justify-center bg-black/30 backdrop-blur-sm">
      <div
        onClick={CloseModal}
        className="w-full h-full fixed top-0 left-0 z-[51]"
      ></div>
      <div className="bg-white z-[52] p-4 shadow-lg moraba-regular rounded-lg flex flex-col items-center gap-10 w-[300px]">
        <h4 className="text-center">
          تغییر نقش کاربر ({name}) از {role} به {userRole}
        </h4>
        <select
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
          }}
          className="px-3 py-1 border rounded-lg"
        >
          <option value={role}>انتخاب کنید</option>
          <option value={"ADMIN"}>ادمین</option>
          <option value={"USER"}>کاربر عادی</option>
        </select>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={ChangeUserRoleHandler}
            className="text-lg text-white px-8 py-1 rounded-lg text-zinc-400 border-zinc-400 border-2"
          >
            تغییر
          </button>
          <button
            onClick={CloseModal}
            className="bg-blue-500 text-lg text-white px-8 py-1 rounded-lg"
          >
            لغو
          </button>
        </div>
      </div>
    </section>
  );
  async function ChangeUserRoleHandler() {
    const res = await axios.post("/api/user/role", {
      user: id,
      role: userRole,
    });
    if (res.status === 200) {
      CloseModal();
      newToast("نقش کاربر تغییر کرد");
      setInterval(() => location.reload(), 1000);
    }
  }
}
