import PAdminComment from "@/components/template/p-admin/comment";
import commentModel from "@/models/comment";
import ConnectTODb from "@/utils/connecttodb";
import { FiMail } from "react-icons/fi";

export default async function CommentsPage() {
  ConnectTODb();
  const allComments = await commentModel
    .find({}, "-__V")
    .populate("product", "title");
  return (
    <section className="px-6">
      <div className="bg-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
        <div className="flex flex-col items-center gap-4 text-2xl">
          <span>مجموع کامنت های سایت</span>
          <span className="font-mono font-bold text-5xl text-blue-500">
            {allComments.length}
          </span>
        </div>
        <FiMail className="text-8xl" />
      </div>
      <div className="bg-white rounded-lg my-10 p-3">
        <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 pb-2">
          کامنت های تایید نشده
        </h2>
        <div className="flex flex-col md:gap-10 gap-20 sm:mt-4 mt-20">
          {allComments
            .filter((e) => e.queued === true)
            .map((e, i) => (
              <PAdminComment
                key={i}
                id={JSON.parse(JSON.stringify(e._id))}
                body={JSON.parse(JSON.stringify(e.body))}
                username={JSON.parse(JSON.stringify(e.username))}
                queued={JSON.parse(JSON.stringify(e.queued))}
                date={JSON.parse(JSON.stringify(e.date))}
                productTitle={JSON.parse(JSON.stringify(e.product.title))}
                productID={JSON.parse(JSON.stringify(e.product._id))}
                score={JSON.parse(JSON.stringify(e.score))}
                avatar={JSON.parse(JSON.stringify(e.avatar || ""))}
              />
            ))}
          {allComments.filter((e) => e.queued === true).length === 0 && (
            <h3 className="moraba-regular text-2xl text-center w-full my-10">
              همه کامنت ها تایید شده
            </h3>
          )}
        </div>
        <h2 className="moraba-bold text-2xl text-zinc-700 border-b-2 pb-2 mt-20">
          کامنت های تایید شده
        </h2>
        <div className="flex flex-col md:gap-10 gap-20 sm:mt-4 mt-20">
          {allComments
            .filter((e) => e.queued === false)
            .map((e, i) => (
              <PAdminComment
                key={i}
                id={JSON.parse(JSON.stringify(e._id))}
                body={JSON.parse(JSON.stringify(e.body))}
                username={JSON.parse(JSON.stringify(e.username))}
                queued={JSON.parse(JSON.stringify(e.queued))}
                date={JSON.parse(JSON.stringify(e.date))}
                productTitle={JSON.parse(JSON.stringify(e.product.title))}
                productID={JSON.parse(JSON.stringify(e.product._id))}
                score={JSON.parse(JSON.stringify(e.score))}
                avatar={JSON.parse(JSON.stringify(e.avatar || ""))}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
