import BanUserField from "@/components/template/p-admin/ban-user-field";
import UserField from "@/components/template/p-admin/user-field";
import BanUserModel from "@/models/banuser";
import userModel from "@/models/user";
import ConnectTODb from "@/utils/connecttodb";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

export default async function UsersPage() {
  await ConnectTODb();
  const allUser = await userModel.find({});

  const banUser = await BanUserModel.find({}, "-__v");
  // return (
  //   <div className="px-6">
  //     <div className="bg-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
  //       <div className="flex flex-col items-center gap-4 text-2xl">
  //         <span>مجموع کاربر های سایت</span>
  //         <span className="font-mono font-bold text-5xl text-blue-500">
  //           {allUser.length}
  //         </span>
  //       </div>
  //       <FiUser className="text-8xl" />
  //     </div>
  //     <div className="flex flex-col gap-4 w-full my-8">
  //       <div className="rounded-lg my-10 p-4 shadow-lg shadow-black/20 flex xl:flex-row flex-col items-center justify-between bg-gray-300 xl:sticky top-24 left-0">
  //         <div className="flex lg:flex-row flex-col items-center gap-6 moraba-bold">
  //           <Image
  //             alt="guest-user"
  //             src={"/img/bg-photo/guest.jpg"}
  //             width={500}
  //             height={500}
  //             className="rounded-full object-cover aspect-square w-[100px]"
  //           />
  //           <div className="flex flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 border-gray-400 lg:pl-8 pb-4 text-zinc-600">
  //             <span className="text-lg">ایمیل کاربر</span>
  //             <span className="text-base text-zinc-500">نام کاربری کاربر</span>
  //           </div>
  //           <div className="flex flex-col lg:items-start items-center moraba-bold border-gray-400 gap-2 lg:border-l-2 border-b-2 lg:border-b-0 lg:pl-8 pb-4 text-zinc-600">
  //             <span className="text-lg">نام کاربر</span>
  //             <h3>نقش کاربر</h3>
  //           </div>
  //           <div className="lg:border-l-2 border-b-2 border-gray-400 lg:pl-8 pb-4 lg:border-b-0 lg:mb-0 mb-6 text-zinc-800">
  //             <span className="text-sm font-black">شناشه کاربر</span>
  //           </div>
  //         </div>
  //         <div className="grid grid-cols-[6fr_6fr] gap-2">
  //           <button className="moraba-regular bg-blue-500 hover:bg-blue-600 transition rounded-lg px-8 py-3 text-white text-lg">
  //             ویرایش
  //           </button>
  //           <button className="moraba-regular bg-indigo-500 hover:bg-indigo-600 transition rounded-lg px-8 py-3 text-white text-lg">
  //             تغییر نقش
  //           </button>
  //           <button className="moraba-regular bg-red-500 hover:bg-red-600 transition rounded-lg px-8 py-3 text-white text-lg">
  //             حذف
  //           </button>
  //           <button className="moraba-regular bg-zinc-900 hover:bg-zinc-950 transition rounded-lg px-8 py-3 text-white text-lg">
  //             بن
  //           </button>
  //         </div>
  //       </div>
  //       {allUser.map((e, i) => (
  //         <UserField
  //           key={i}
  //           phone={JSON.parse(JSON.stringify(e.phone))}
  //           name={JSON.parse(JSON.stringify(e.name))}
  //           username={JSON.parse(JSON.stringify(e.username))}
  //           role={JSON.parse(JSON.stringify(e.role))}
  //           id={JSON.parse(JSON.stringify(e._id))}
  //         />
  //       ))}
  //     </div>
  //     <div className="bg-white rounded-lg p-3 mb-10">
  //       <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 py-2">
  //         ایمیل کاربران بن شده
  //       </h2>
  //       <div className="my-2 flex flex-col gap-3">
  //         {banUser.map((e, i) => (
  //           <BanUserField
  //             key={i}
  //             email={JSON.parse(JSON.stringify(e.email))}
  //             id={JSON.parse(JSON.stringify(e._id))}
  //           />
  //         ))}
  //         {banUser.length === 0 && (
  //           <h2 className="text-center my-4 moraba-regular text-lg">
  //             کاربری وجود ندارد
  //           </h2>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}
