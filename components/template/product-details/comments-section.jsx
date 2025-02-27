"use client";

import { IoIosStarOutline } from "react-icons/io";
import Comment from "../../module/comment";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import LoadingSwg from "@/components/module/loading-swg";

export default function CommentSection({ comments, productID }) {
  const [score, setScore] = useState(null);
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);
  return (
    <>
      <section>
        <h2 className="moraba-bold text-xl text-zinc-600">
          {comments.filter((e) => e.queued === false).length} دیدگاه برای پودر
          قهوه ترک بسته 2 عددی
        </h2>
        {comments.filter((e) => e.queued === false).length === 0 ? (
          <div className="mt-6 flex items-center justify-center h-[200px] text-3xl font-bold">
            <h2>): دیدگاهی موجود نیست</h2>
          </div>
        ) : (
          <div className="flex flex-col sm:py-8 py-20 sm:gap-6 gap-24 mt-6">
            {comments
              .filter((e) => e.queued === false)
              .map((e, i) => (
                <Comment
                  key={i}
                  body={e.body}
                  score={e.score}
                  username={e.username}
                  avatar={e.avatar}
                  date={e.date}
                />
              ))}
          </div>
        )}
        <div className="mt-10 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">دیدگاه خود را بنویسید</h3>
          <h4 className="mt-8 text-zinc-500">
            نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری
            شده‌اند
            <span className="text-red-500 text-2xl mr-2">*</span>
          </h4>
          <div className="flex gap-4 mt-4">
            {!score ? (
              <>
                <span className="font-bold">امتیاز شما :</span>
                <span className="text-red-500 text-2xl">*</span>
                <div className="flex text-gray-500 text-xl" id="rating">
                  <IoIosStarOutline
                    className="cursor-pointer"
                    onClick={() => {
                      setScore(5);
                    }}
                  />
                  <IoIosStarOutline
                    className="cursor-pointer"
                    onClick={() => {
                      setScore(4);
                    }}
                  />
                  <IoIosStarOutline
                    className="cursor-pointer"
                    onClick={() => {
                      setScore(3);
                    }}
                  />
                  <IoIosStarOutline
                    className="cursor-pointer"
                    onClick={() => {
                      setScore(2);
                    }}
                  />
                  <IoIosStarOutline
                    className="cursor-pointer"
                    onClick={() => {
                      setScore(1);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center text-gray-500 text-xl">
                {Array.from({ length: score }).map((e, i) => (
                  <IoStar key={i} className="text-yellow-500" />
                ))}
                {Array.from({ length: 5 - score }).map((e, i) => (
                  <IoIosStarOutline key={i} className="" />
                ))}
                <span className="text-base mx-4 text-zinc-600">
                  امتیاز : ({score})
                </span>
                <button
                  className="bg-gray-300 border border-gray-500 px-2 py-1 text-sm text-zinc-800 hover:bg-gray-400"
                  onClick={() => {
                    setScore(null);
                  }}
                >
                  امتیاز مجدد
                </button>
              </div>
            )}
          </div>
          <h3 className="font-bold mt-2">
            دیدگاه شما :<span className="text-red-500 text-xl mr-2">*</span>
          </h3>
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="w-full border-2 border-zinc-400 sm:min-h-[300px] min-h-[150px] max-h-[500px] rounded-md mt-1 outline-hidden p-4 focus:border-2 focus:border-mybrown2 transition-all"
          ></textarea>
          <span className="block text-sm mt-2 text-zinc-600">
            ایمیل و نام کاربری از توکن شما استخراخ خواهد شد .
          </span>
          <button
            onClick={AddCommenthandler}
            className="bg-teal-600 text-white moraba-bold rounded-lg px-20 py-2 mt-4 text-xl hover:bg-teal-700 transition"
          >
            {loading ? <LoadingSwg /> : "ثبت"}
          </button>
        </div>
      </section>
    </>
  );
  async function AddCommenthandler() {
    setLoading(true);
    if (score === null) {
      setLoading(false);
      return newErrorToast("لطفا امتیاز خود را ثبت کنید");
    }
    const comment = {
      body,
      score,
      product: productID,
    };
    try {
      const res = await axios.post("/api/comment", comment);
      if (res.status === 201) {
        setScore(null);
        setBody("");
        newToast("ممنون از دیدگاهت");
        ShowSwal(
          "success",
          "کامنت شما پس از تایید در سایت نمایش داده میشود",
          "باشه"
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      ShowSwal("error", "لطفا ابتدا وارد حساب کاربری خود شوید", "باشه");
    }
  }
}
