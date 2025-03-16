"use client";

import { newErrorToast } from "@/utils/helper-function";
import axios from "axios";
import { useEffect, useState } from "react";
import PAdminComment from "../comment";

export default function RenderCommentSection() {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    FetchAllComment();
  }, []);

  async function FetchAllComment() {
    try {
      const res = await axios.get("/api/comment");
      setAllComments(res.data.comments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      newErrorToast("مشکلی پیش امد");
    }
  }

  return (
    <div className="bg-white rounded-lg my-6 p-3">
      <h2 className="moraba-bold text-xl text-zinc-700 border-b border-zinc-200 pb-2">
        کامنت های تایید نشده
      </h2>
      <div className="flex flex-col md:gap-10 gap-20 sm:mt-4 mt-20">
        {allComments
          .filter((e) => e.queued === true)
          .map((e, i) => (
            <PAdminComment
              reRender={FetchAllComment}
              key={i}
              id={e._id}
              body={e.body}
              username={e.user.username}
              queued={e.queued}
              date={e.date}
              productTitle={e.product.title}
              productID={e.product._id}
              score={e.score}
              avatar={e.user.avatar}
            />
          ))}
        {allComments.filter((e) => e.queued === true).length === 0 && (
          <h3 className="moraba-regular text-base text-center w-full my-10">
            همه کامنت ها تایید شده
          </h3>
        )}
      </div>
      <h2 className="moraba-bold text-xl text-zinc-700 border-b border-zinc-200 pb-2 mt-20">
        کامنت های تایید شده
      </h2>
      <div className="flex flex-col md:gap-10 gap-20 sm:mt-4 mt-20">
        {allComments
          .filter((e) => e.queued === false)
          .map((e, i) => (
            <PAdminComment
              reRender={FetchAllComment}
              key={i}
              id={e._id}
              body={e.body}
              username={e.user.username}
              queued={e.queued}
              date={e.date}
              productTitle={e.product.title}
              productID={e.product._id}
              score={e.score}
              avatar={e.user.avatar}
            />
          ))}
      </div>
    </div>
  );
}
