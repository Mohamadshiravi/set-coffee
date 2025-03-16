import { FiUser } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";
import { SlBag } from "react-icons/sl";
import { FaRegComments } from "react-icons/fa6";
import commentModel from "@/models/comment";
import userModel from "@/models/user";
import productModel from "@/models/product";
import tiketModel from "@/models/tiket";
import LineChart from "@/components/template/p-admin/line-chart";
import AreaGrowthChart from "@/components/template/p-admin/area-chart";
import messageModel from "@/models/message";
import PAdminMessage from "@/components/template/p-admin/p-admin-message";
import ConnectTODb from "@/utils/connecttodb";
import orderModel from "@/models/order";

export default async function AdminDashboard() {
  await ConnectTODb();

  const allComment = await commentModel.find({}, "_id");
  const allUser = await userModel.find({}, "_id");
  const allProduct = await productModel.find({}, "_id");
  const allTiket = await tiketModel.find({}, "_id");
  const allOrder = await orderModel.find({}, "_id");

  const allMessage = await messageModel.find({}, "-__v");

  return (
    <div className="sm:px-8 px-4">
      <section className="mt-10 flex gap-8 flex-wrap">
        <div className="bg-white px-6 py-10 grow rounded-lg flex gap-8 items-center justify-center moraba-regular text-zinc-700">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع محصولات سایت</span>
            <span className="font-mono font-bold text-3xl text-blue-500">
              {allProduct.length}
            </span>
          </div>
          <SlBag className="text-7xl" />
        </div>
        <div className="bg-white px-6 py-10 grow rounded-lg flex gap-8 items-center justify-center moraba-regular text-zinc-700">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع تیکت های دریافتی</span>
            <span className="font-mono font-bold text-3xl text-blue-500">
              {allTiket.length}
            </span>
          </div>
          <FiMail className="text-7xl" />
        </div>
        <div className="bg-white px-6 py-10 grow rounded-lg flex gap-8 items-center justify-center moraba-regular text-zinc-700">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع سفارشات</span>
            <span className="font-mono font-bold text-3xl text-blue-500">
              {allOrder.length}
            </span>
          </div>
          <LuDollarSign className="text-7xl" />
        </div>
        <div className="bg-white px-6 py-10 grow rounded-lg flex gap-8 items-center justify-center moraba-regular text-zinc-700">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع کاربر های سایت</span>
            <span className="font-mono font-bold text-3xl text-blue-500">
              {allUser.length}
            </span>
          </div>
          <FiUser className="text-7xl" />
        </div>
        <div className="bg-white px-6 py-10 grow rounded-lg flex gap-8 items-center justify-center moraba-regular text-zinc-700">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع کامنت های سایت</span>
            <span className="font-mono font-bold text-3xl text-blue-500">
              {allComment.length}
            </span>
          </div>
          <FaRegComments className="text-7xl" />
        </div>
      </section>
      <section className="flex flex-col mt-8 gap-8">
        <div className="bg-white w-full rounded-lg">
          <h2 className="moraba-bold text-center py-3 text-xl">امار فروش</h2>
          <div className="pb-2 pr-4" dir="ltr">
            <AreaGrowthChart />
          </div>
        </div>
        <div className="bg-white w-full rounded-lg">
          <h2 className="moraba-bold text-center py-3 text-xl">نرخ رشد</h2>
          <div className="pb-2 pr-4" dir="ltr">
            <LineChart />
          </div>
        </div>
      </section>
      <section className="bg-white w-full rounded-lg my-8">
        <h2 className="moraba-bold text-center py-3 text-xl border-b border-gray-200">
          پیام های ارسال شده
        </h2>
        <div className="bg-white p-2 flex flex-col gap-2">
          {allMessage.map((e, i) => (
            <PAdminMessage message={JSON.parse(JSON.stringify(e))} key={i} />
          ))}
          {allMessage.length === 0 && (
            <div className="w-full py-8 moraba-bold text-2xl">
              <h2 className="text-center text-zinc-600">پیامی موجود نیست</h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
