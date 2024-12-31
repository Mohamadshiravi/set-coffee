"use client";

import Image from "next/image";
import { useState } from "react";
import ChangeUserRole from "./modals/user-role-modal";
import ChangeUserDetails from "./modals/user-change-modal";
import swal from "sweetalert";
import axios from "axios";
import { newToast } from "@/utils/helper-function";

export default function UserField({ name, email, username, role, id }) {
  const [roleModal, setRoleModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg p-4 flex xl:flex-row flex-col items-center justify-between">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <Image
            alt={username}
            src={"/img/bg-photo/guest.jpg"}
            width={500}
            height={500}
            className="rounded-full object-cover aspect-square w-[100px]"
          />
          <div className="flex flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-700">
            <span className="text-lg">{email}</span>
            <span className="text-base text-zinc-600 font-mono">
              {username}
            </span>
          </div>
          <div className="flex flex-col lg:items-start items-center moraba-bold gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-600">
            <span className="text-lg">{name}</span>
            <h3>{role === "ADMIN" ? "ادمین" : "کاربر عادی"}</h3>
          </div>
          <div className="lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 lg:mb-0 mb-4 text-zinc-800">
            <span className="text-sm font-mono font-black">{id}</span>
          </div>
        </div>
        <div className="grid grid-cols-[6fr_6fr] gap-2">
          <button
            onClick={() => {
              setDetailsModal(true);
            }}
            className="moraba-regular bg-blue-500 hover:bg-blue-600 transition rounded-lg px-8 py-3 text-white text-lg"
          >
            ویرایش
          </button>
          <button
            onClick={() => {
              setRoleModal(true);
            }}
            className="moraba-regular bg-indigo-500 hover:bg-indigo-600 transition rounded-lg px-8 py-3 text-white text-lg"
          >
            تغییر نقش
          </button>
          <button
            onClick={DeleteUserHandler}
            className="moraba-regular bg-red-500 hover:bg-red-600 transition rounded-lg px-8 py-3 text-white text-lg"
          >
            حذف
          </button>
          <button
            onClick={HandleBanUser}
            className="moraba-regular bg-zinc-900 hover:bg-zinc-950 transition rounded-lg px-8 py-3 text-white text-lg"
          >
            بن
          </button>
        </div>
      </div>
      {roleModal && (
        <ChangeUserRole
          name={name}
          role={role}
          CloseModal={CloseModal}
          id={id}
        />
      )}
      {detailsModal && (
        <ChangeUserDetails
          name={name}
          role={role}
          email={email}
          username={username}
          CloseModal={CloseModal}
          id={id}
        />
      )}
    </>
  );
  function CloseModal() {
    setRoleModal(false);
    setDetailsModal(false);
  }
  async function DeleteUserHandler() {
    const isOk = await swal({
      icon: "warning",
      title: `از حذف کاربر ${name} اطمینان دارید؟؟؟`,
      buttons: ["خیر", "بله"],
    });
    if (isOk) {
      const res = await axios.delete(`/api/user/${id}`);
      if (res.status === 200) {
        newToast("کاربر حذف شد !");
        setInterval(() => location.reload(), 1000);
      }
    }
  }
  async function HandleBanUser() {
    const isOk = await swal({
      icon: "warning",
      title: `از بن کاربر ${name} اطمینان دارید؟؟؟`,
      buttons: ["خیر", "بله"],
    });
    if (isOk) {
      const res = await axios.post("/api/user/banuser", { email, id });
      if (res.status === 200) {
        newToast("کاربر بن شد !");
        setInterval(() => location.reload(), 1000);
      }
    }
  }
}
