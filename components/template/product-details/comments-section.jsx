"use client";

import Comment from "../../module/comment";
import { useContext, useState } from "react";
import axios from "axios";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import { Button, Rating } from "@mui/material";
import { UserContext } from "@/context/context";

export default function CommentSection({ comments, productID }) {
  const [score, setScore] = useState(null);
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  return (
    <>
      <section>
        {comments.filter((e) => e.queued === false).length === 0 ? (
          <div className="mt-6 flex items-center justify-center h-[200px] text-3xl font-bold">
            <h2>): دیدگاهی موجود نیست</h2>
          </div>
        ) : (
          <div className="flex flex-col sm:py-8 py-20 sm:gap-6 gap-24">
            {comments
              .filter((e) => e.queued === false)
              .map((e, i) => (
                <Comment
                  key={i}
                  body={e.body}
                  score={e.score}
                  username={e.user.username}
                  avatar={e.user.avatar}
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
              <div className="flex items-center gap-2">
                <span className="font-bold">امتیاز شما :</span>
                <span className="text-red-500 text-2xl">*</span>
                <div dir="ltr">
                  <Rating
                    value={score}
                    onChange={(e) => {
                      setScore(e.target.value);
                    }}
                    precision={1}
                    size="large"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center text-gray-500 text-xl">
                <Rating value={score} readOnly />

                <span className="text-base mx-4 text-zinc-600">
                  امتیاز : ({score})
                </span>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setScore(null);
                  }}
                >
                  امتیاز مجدد
                </Button>
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
            className="w-full border-2 border-zinc-400 sm:min-h-[300px] min-h-[150px] max-h-[500px] rounded-md mt-1 outline-hidden p-4 focus:border-2 focus:border-brown-500 transition-all"
          ></textarea>
          <span className="block text-sm mt-2 text-zinc-600">
            ایمیل و نام کاربری از توکن شما استخراخ خواهد شد .
          </span>
          <div className="sm:w-[250px] w-full mt-6">
            <Button
              loading={loading}
              variant="contained"
              fullWidth
              size="large"
              onClick={AddCommenthandler}
              className="bg-teal-600 text-white moraba-bold rounded-lg px-20 py-2 mt-4 text-xl hover:bg-teal-700 transition"
            >
              ثبت
            </Button>
          </div>
        </div>
      </section>
    </>
  );
  async function AddCommenthandler() {
    if (!user) {
      ShowSwal("error", "لطفا ابتدا وارد حساب کاربری خود شوید", "باشه");
      return;
    }

    if (score === null) {
      return newErrorToast("لطفا امتیاز خود را ثبت کنید");
    }
    if (body === "") {
      return newErrorToast("لطفا نظر خود را  بنویسید");
    }

    setLoading(true);
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
      newToast("کامنت شما ثبت نمیشود");
      setLoading(false);
    }
  }
}
