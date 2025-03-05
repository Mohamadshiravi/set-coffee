import { IoMailOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMails } from "react-icons/lu";
import Link from "next/link";
import tiketModel from "@/models/tiket";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export default async function TiketsPage() {
  const theUser = await isUserLogedIn();

  await ConnectTODb();
  const userTiket = await tiketModel
    .find(
      { user: theUser._id, isAnswer: false },
      "title isClosed createdAt department"
    )
    .sort("-_id")
    .populate("department", "-_id name");
  const openedTiket = await tiketModel.find(
    { user: theUser._id, isClosed: false },
    "_id"
  );
  const closedTiket = await tiketModel.find(
    { user: theUser._id, isClosed: true },
    "_id"
  );

  return (
    <>
      <section>
        <section className="p-6">
          <div className="flex w-full flex-wrap gap-6">
            <div className="sm:w-[200px] w-[150px] grow flex flex-col trasnition duration-300 cursor-pointer items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md sm:py-10 py-4 group sm:text-base text-sm">
              <IoMailOutline className="text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
              <span>پاسخ داده شده</span>
              <span className="font-bold sm:text-2xl text-xl">
                {closedTiket.length}
              </span>
            </div>
            <div className="sm:w-[200px] w-[150px] grow flex flex-col trasnition duration-300 cursor-pointer items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md sm:py-10 py-4 group sm:text-base text-sm">
              <IoMailOpenOutline className="text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
              <span>پاسخ داده نشده</span>
              <span className="font-bold sm:text-2xl text-xl">
                {openedTiket.length}
              </span>
            </div>
            <div className="sm:w-[200px] w-[150px] grow flex flex-col trasnition duration-300 cursor-pointer items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md sm:py-10 py-4 group sm:text-base text-sm">
              <LuMails className="text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
              <span> مجموع تیکت ها</span>
              <span className="font-bold sm:text-2xl text-xl">
                {userTiket.length}
              </span>
            </div>
            <Link
              href={"/p-user/tikets/write-tiket"}
              className="sm:w-[200px] w-[150px] grow flex flex-col trasnition duration-300 bg-zinc-200 border-2 border-zinc-400 cursor-pointer items-center justify-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-400 shadow-4xl gap-3 rounded-md py-10 group text-lg"
            >
              <FaPlus className="text-5xl text-gray-600" />
              <span>تیکت جدید</span>
            </Link>
          </div>
        </section>
        <section className="bg-gray-100 px-4 mx-6 rounded-lg py-4 mb-8">
          <h2 className="moraba-bold text-zinc-700 text-xl">تیکت ها</h2>
          <hr className="border my-4 border-gray-200"></hr>
          <div className="flex flex-col gap-3">
            {userTiket.map((e, i) => (
              <Link
                href={`/p-user/tikets/${e._id}`}
                key={i}
                className="flex hover:bg-gray-300 transition-all cursor-pointer items-center justify-between w-full bg-white py-3 px-4 text-zinc-700 rounded-lg shabnam"
              >
                <div className="flex gap-4 sm:flex-row flex-col items-center">
                  <span className="font-bold">{e.title}</span>
                  <span className="font-bold bg-gray-200 rounded-md text-sm px-3 py-1 moraba-regular">
                    واحد : {e.department.name}
                  </span>
                </div>
                <div className="flex sm:flex-row flex-col items-center gap-4">
                  <span className="sm:text-sm text-xs flex gap-5">
                    ({new Date(e.createdAt).toLocaleTimeString("fa-IR")})
                    <i>{new Date(e.createdAt).toLocaleDateString("fa-IR")}</i>
                  </span>
                  <span className="text-xs">
                    {e.isClosed ? (
                      <i className="bg-green-500 px-2 py-1 rounded-xs text-white">
                        پاسخ داده شده
                      </i>
                    ) : (
                      <i className="bg-red-500 px-2 py-1 rounded-xs text-white">
                        پاسخ داده نشده
                      </i>
                    )}
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
        </section>
      </section>
    </>
  );
}
