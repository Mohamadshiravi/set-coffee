import PAdminComment from "@/components/template/p-admin/comment";
import RenderCommentSection from "@/components/template/p-admin/comments/renderCommentSection";
import commentModel from "@/models/comment";
import ConnectTODb from "@/utils/connecttodb";
import { FiMail } from "react-icons/fi";

export default async function CommentsPage() {
  await ConnectTODb();
  const allComments = await commentModel.find({}, "_id");

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
      <RenderCommentSection />
    </section>
  );
}
