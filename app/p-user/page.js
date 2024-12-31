import isUserLogedIn from "@/utils/auth-utill/is-user-login";

import { HiOutlineDocumentText } from "react-icons/hi2";
import { LiaComments } from "react-icons/lia";
import { GoUnread } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import commentModel from "@/models/comment";
import wishlistModel from "@/models/wishlist";
import tiketModel from "@/models/tiket";
import Link from "next/link";
import ConnectTODb from "@/utils/connecttodb";

export default async function Dashboard() {
  ConnectTODb();
  const theUser = await isUserLogedIn();

  const userComment = await commentModel.find({ email: theUser.email }, "_id");

  const userWishes = await wishlistModel.find({ user: theUser._id });

  const userTiket = await tiketModel
    .find(
      { user: theUser._id, isAnswer: false },
      "title isClosed createdAt department"
    )
    .sort("-_id")
    .limit(3)
    .populate("department", "-_id name");
  return (
    <div className="w-full shabnam text-zinc-800">
      <div className="grid lg:grid-cols-[3fr_3fr_3fr_3fr] p-6 sm:grid-cols-[4fr_4fr_4fr] grid-cols-[6fr_6fr] mt-6 gap-6">
        <div className="flex flex-col trasnition duration-300 items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md py-10 group sm:text-lg text-sm">
          <HiOutlineDocumentText className="sm:text-6xl text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
          <span> مجموع سفارش ها</span>
          <span className="font-bold sm:text-2xl text-lg">2</span>
        </div>
        <div className="flex flex-col trasnition duration-300 items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md py-10 group sm:text-lg text-sm">
          <FaRegHeart className="sm:text-6xl text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
          <span>مجموع علاقه مندی ها</span>
          <span className="font-bold sm:text-2xl text-lg">
            {userWishes.length}
          </span>
        </div>
        <div className="flex flex-col trasnition duration-300 items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md py-10 group sm:text-lg text-sm">
          <GoUnread className="sm:text-6xl text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
          <span> مجموع تیکت ها</span>
          <span className="font-bold sm:text-2xl text-lg">2</span>
        </div>
        <div className="flex flex-col trasnition duration-300 items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md py-10 group sm:text-lg text-sm">
          <LiaComments className="sm:text-6xl text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
          <span> مجموع کامنت ها</span>
          <span className="font-bold sm:text-2xl text-lg">
            {userComment.length}
          </span>
        </div>
      </div>
      <section className="grid lg:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-3 px-6 py-6">
        <div className="bg-mybrown2 rounded-lg text-white px-3">
          <h2 className="moraba-bold text-center py-2 border-b-2 border-mybrown">
            اخرین تیکت ها
          </h2>
          <div className="flex flex-col gap-3 my-3">
            {userTiket.map((e, i) => (
              <Link
                href={`/p-user/tikets/${e._id}`}
                key={i}
                className="flex transition-all cursor-pointer items-center justify-between w-full hover:bg-[#bcaaa3] bg-[#d6ccc7] py-3 px-4 text-zinc-700 rounded-lg shabnam"
              >
                <div className="flex gap-4 flex-col items-center">
                  <span className="font-bold">{e.title}</span>
                  <span className="font-bold bg-gray-200 rounded-md text-sm px-3 py-1 moraba-regular">
                    واحد : {e.department.name}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="sm:text-sm text-xs flex gap-5">
                    ({new Date(e.createdAt).toLocaleTimeString("fa-IR")})
                    <i>{new Date(e.createdAt).toLocaleDateString("fa-IR")}</i>
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-sm">
                    {e.isClosed ? "پاسخ داده شده" : "پاسخ داده نشده"}
                  </span>
                </div>
              </Link>
            ))}
            {userTiket.length === 0 && (
              <h3 className="text-center moraba-regular py-4">
                تیکتی موجود نیست
              </h3>
            )}
          </div>
        </div>
        <div className="bg-mybrown2 rounded-lg text-white px-3">
          <h2 className="moraba-bold text-center py-2 border-b-2 border-mybrown">
            اخرین سفارش ها
          </h2>
          <h3 className="text-center moraba-regular my-6">سفارشی موجود نیست</h3>
        </div>
      </section>
    </div>
  );
}
