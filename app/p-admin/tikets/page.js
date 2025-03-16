import TiketField from "@/components/template/p-admin/tiket-field";
import RenderTiketsSection from "@/components/template/p-admin/tikets/renderTiketsSection";
import tiketModel from "@/models/tiket";
import ConnectTODb from "@/utils/connecttodb";
import { FiMail } from "react-icons/fi";

export default async function TiketsPage() {
  await ConnectTODb();
  const allTiket = await tiketModel.find({}, "_id");

  return (
    <section className="px-6">
      <div className="bg-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
        <div className="flex flex-col items-center gap-4 text-2xl">
          <span>مجموع تیکت های سایت</span>
          <span className="font-mono font-bold text-5xl text-blue-500">
            {allTiket.filter((e) => e.isAnswer === false).length}
          </span>
        </div>
        <FiMail className="text-8xl" />
      </div>
      <RenderTiketsSection />
    </section>
  );
}
