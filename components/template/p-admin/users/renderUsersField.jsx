"use client";

import { newErrorToast } from "@/utils/helper-function";
import axios from "axios";
import { useEffect, useState } from "react";
import UserField from "../user-field";
import Image from "next/image";
import BanUserField from "../ban-user-field";

export default function RenderUsersField() {
  const [users, setUsers] = useState([]);
  const [banUsers, setBanUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchAllUsers();
    FetchBanUsers();
  }, []);

  async function FetchAllUsers() {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      newErrorToast("مشکلی وجود دارد");
      setLoading(false);
    }
  }

  async function FetchBanUsers() {
    try {
      const res = await axios.get("/api/user/banuser");
      setBanUsers(res.data.banUsers);
      setLoading(false);
    } catch (error) {
      newErrorToast("مشکلی وجود دارد");
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4 w-full my-8">
        <div className="rounded-lg my-10 p-4 shadow-lg shadow-black/20 flex xl:flex-row flex-col items-center justify-between bg-gray-300 xl:sticky top-24 left-0">
          <div className="flex lg:flex-row flex-col items-center gap-6 moraba-bold">
            <Image
              alt="guest-user"
              src={"/img/bg-photo/guest.jpg"}
              width={500}
              height={500}
              className="rounded-full object-cover aspect-square w-[100px]"
            />
            <div className="flex flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 border-gray-400 lg:pl-8 pb-4 text-zinc-600">
              <span className="text-lg">ایمیل کاربر</span>
              <span className="text-base text-zinc-500">نام کاربری کاربر</span>
            </div>
            <div className="flex flex-col lg:items-start items-center moraba-bold border-gray-400 gap-2 lg:border-l-2 border-b-2 lg:border-b-0 lg:pl-8 pb-4 text-zinc-600">
              <span className="text-lg">نام کاربر</span>
              <h3>نقش کاربر</h3>
            </div>
            <div className="lg:border-l-2 border-b-2 border-gray-400 lg:pl-8 pb-4 lg:border-b-0 lg:mb-0 mb-6 text-zinc-800">
              <span className="text-sm font-black">شناشه کاربر</span>
            </div>
          </div>
        </div>
        {loading
          ? Array.from({ length: 6 }).map((e, i) => (
              <div
                key={i}
                className="w-full xl:h-[140px] lg:h-[230px] h-[500px] bg-zinc-200 animate-pulse rounded-lg"
              ></div>
            ))
          : users.map((e, i) => (
              <UserField
                reRenderUsers={FetchAllUsers}
                reRenderBanUsers={FetchBanUsers}
                key={i}
                phone={e.phone}
                name={e.name}
                username={e.username}
                avatar={e.avatar}
                role={e.role}
                id={e._id}
              />
            ))}
      </div>
      <div className="bg-white rounded-lg p-3 mb-10">
        <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 py-2">
          شماره های بن شده
        </h2>
        <div className="my-2 flex flex-col gap-3">
          {banUsers.map((e, i) => (
            <BanUserField
              reRenderBanUsers={FetchBanUsers}
              key={i}
              phone={e.phone}
              id={e._id}
            />
          ))}
          {banUsers.length === 0 && (
            <h2 className="text-center my-4 moraba-regular text-lg">
              کاربری وجود ندارد
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
