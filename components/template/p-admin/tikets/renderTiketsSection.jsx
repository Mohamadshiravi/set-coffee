"use client";

import { newErrorToast } from "@/utils/helper-function";
import axios from "axios";
import { useEffect, useState } from "react";
import TiketField from "../tiket-field";

export default function RenderTiketsSection() {
  const [allTiket, setAllTiket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchAllTiket();
  }, []);

  async function FetchAllTiket() {
    try {
      const res = await axios.get("/api/tiket");
      setAllTiket(res.data.allTikets);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      newErrorToast("مشکلی پیش امد");
    }
  }
  return (
    <div className="bg-white rounded-lg my-6 p-3">
      <h2 className="moraba-bold text-xl text-zinc-700 border-b border-zinc-200 pb-3">
        تیکت های پاسخ داده نشده
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        {loading
          ? Array.from({ length: 3 }).map((e, i) => (
              <div
                key={i}
                className="w-full md:h-[115px] sm:h-[200px] h-[300px] bg-zinc-200 animate-pulse rounded-lg"
              ></div>
            ))
          : allTiket
              .filter((e) => e.isClosed === false && e.isAnswer === false)
              .map((e, i) => (
                <TiketField
                  reRenderTiket={FetchAllTiket}
                  key={i}
                  id={e._id}
                  title={e.title}
                  body={e.body}
                  priority={e.priority}
                  department={e.department}
                  createdAt={e.createdAt}
                  isClosed={e.isClosed}
                  user={e.user}
                />
              ))}
      </div>
      {allTiket.length === 0 && !loading && (
        <h3 className="text-center moraba-regular text-base">
          تیکتی موجود نیست
        </h3>
      )}
      <h2 className="moraba-bold text-xl text-zinc-700 border-b border-zinc-200 py-3">
        تیکت های پاسخ داده شده
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        {loading
          ? Array.from({ length: 3 }).map((e, i) => (
              <div
                key={i}
                className="w-full md:h-[115px] sm:h-[200px] h-[300px] bg-zinc-200 animate-pulse rounded-lg"
              ></div>
            ))
          : allTiket
              .filter((e) => e.isClosed === true && e.isAnswer === false)
              .map((e, i) => (
                <TiketField
                  reRenderTiket={FetchAllTiket}
                  key={i}
                  id={e._id}
                  title={e.title}
                  body={e.body}
                  priority={e.priority}
                  department={e.department}
                  createdAt={e.createdAt}
                  isClosed={e.isClosed}
                  user={e.user}
                  answer={e.answer ? e.answer : false}
                />
              ))}
      </div>
      {allTiket.filter((e) => e.isClosed === true && e.isAnswer === false)
        .length === 0 &&
        !loading && (
          <h3 className="text-center moraba-regular text-base">
            تیکتی موجود نیست
          </h3>
        )}
    </div>
  );
}
