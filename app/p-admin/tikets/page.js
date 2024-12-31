import TiketField from "@/components/template/p-admin/tiket-field";
import tiketModel from "@/models/tiket";
import ConnectTODb from "@/utils/connecttodb";
import { FiMail } from "react-icons/fi";

export default async function TiketsPage() {
  await ConnectTODb();
  const allTiket = await tiketModel
    .find({})
    .sort("-_id")
    .populate("department", "name")
    .populate("user", "username")
    .populate("answer", "body")
    .lean();
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
      <div className="bg-white rounded-lg my-10 p-3">
        <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 pb-2">
          تیکت های پاسخ داده نشده
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          {allTiket
            .filter((e) => e.isClosed === false && e.isAnswer === false)
            .map((e, i) => (
              <TiketField
                key={i}
                id={JSON.parse(JSON.stringify(e._id))}
                title={JSON.parse(JSON.stringify(e.title))}
                body={JSON.parse(JSON.stringify(e.body))}
                priority={JSON.parse(JSON.stringify(e.priority))}
                department={JSON.parse(JSON.stringify(e.department))}
                createdAt={JSON.parse(JSON.stringify(e.createdAt))}
                isClosed={JSON.parse(JSON.stringify(e.isClosed))}
                user={JSON.parse(JSON.stringify(e.user))}
              />
            ))}
        </div>
        <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 mt-14 pb-2">
          تیکت های پاسخ داده شده
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          {allTiket
            .filter((e) => e.isClosed === true && e.isAnswer === false)
            .map((e, i) => (
              <TiketField
                key={i}
                id={JSON.parse(JSON.stringify(e._id))}
                title={JSON.parse(JSON.stringify(e.title))}
                body={JSON.parse(JSON.stringify(e.body))}
                priority={JSON.parse(JSON.stringify(e.priority))}
                department={JSON.parse(JSON.stringify(e.department))}
                createdAt={JSON.parse(JSON.stringify(e.createdAt))}
                isClosed={JSON.parse(JSON.stringify(e.isClosed))}
                user={JSON.parse(JSON.stringify(e.user))}
                answer={JSON.parse(JSON.stringify(e.answer ? e.answer : false))}
              />
            ))}
        </div>
        {allTiket.length === 0 && (
          <h3 className="text-center moraba-regular text-xl">
            تیکتی موجود نیست
          </h3>
        )}
      </div>
    </section>
  );
}
