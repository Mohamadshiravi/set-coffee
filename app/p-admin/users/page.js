import RenderUsersField from "@/components/template/p-admin/users/renderUsersField";
import userModel from "@/models/user";
import ConnectTODb from "@/utils/connecttodb";
import { FiUser } from "react-icons/fi";

export default async function UsersPage() {
  await ConnectTODb();
  const allUser = await userModel.find({}, "_id");

  return (
    <div className="px-6">
      <div className="bg-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
        <div className="flex flex-col items-center gap-4 text-2xl">
          <span>مجموع کاربر های سایت</span>
          <span className="font-mono font-bold text-5xl text-blue-500">
            {allUser.length}
          </span>
        </div>
        <FiUser className="text-8xl" />
      </div>
      <RenderUsersField />
    </div>
  );
}
