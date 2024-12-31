"use client";

import { useState } from "react";
import MoreDetails from "./more-details";
import Description from "./description";
import CommentSection from "./comments-section";

export default function Tabs({
  longDes,
  smell,
  suitableFor,
  weight,
  comments,
  productID,
}) {
  const [tab, setTab] = useState("description");
  return (
    <section className="select-none mt-20">
      <div className="flex items-center justify-center md:gap-20 sm:gap-6 gap-2 moraba-bold w-full sm:h-[70px] h-[50px] bg-mybrown2 rounded-t-lg">
        <label
          htmlFor="description"
          className={`bg-gray-50 sm:px-10 px-6 sm:text-base text-xs rounded-lg sm:py-2 py-2 cursor-pointer ${
            tab === "description"
              ? "sm:translate-y-4 translate-y-3 rounded-none rounded-t-lg"
              : "rounded-lg"
          }`}
        >
          <input
            id="description"
            type="radio"
            checked={tab === "description" && true}
            onChange={() => {
              setTab("description");
            }}
            className="w-0 h-0 absolute"
          />
          <span>توضیحات</span>
        </label>
        <label
          htmlFor="more"
          className={`bg-gray-50 sm:px-10 px-6 sm:text-base text-xs rounded-lg sm:py-2 py-2 cursor-pointer ${
            tab === "more"
              ? "sm:translate-y-4 translate-y-3 rounded-none rounded-t-lg"
              : "rounded-lg"
          }`}
        >
          <input
            id="more"
            type="radio"
            checked={tab === "more" && true}
            onChange={() => {
              setTab("more");
            }}
            className="w-0 h-0 absolute"
          />
          <span>اطلاعات بیشتر</span>
        </label>
        <label
          htmlFor="comments"
          className={`bg-gray-50 sm:px-10 px-6 sm:text-base text-xs rounded-lg sm:py-2 py-2 cursor-pointer relative ${
            tab === "comments"
              ? "sm:translate-y-4 translate-y-3 rounded-none rounded-t-lg"
              : "rounded-lg"
          }`}
        >
          <input
            id="comments"
            type="radio"
            checked={tab === "comments" && true}
            onChange={() => {
              setTab("comments");
            }}
            className="w-0 h-0 absolute"
          />
          <span>نظرات</span>
          <span className="absolute -top-2 -left-2 bg-white shadow-3xl rounded-full w-[30px] aspect-square flex items-center justify-center">
            {comments.filter((e) => e.queued === false).length}
          </span>
        </label>
      </div>
      <div className="w-full bg-gray-50 moraba-regular pt-10 p-6 rounded-b-lg">
        {tab === "description" && <Description desc={longDes} />}
        {tab === "more" && (
          <MoreDetails
            smell={smell}
            suitableFor={suitableFor}
            weight={weight}
          />
        )}
        {tab === "comments" && (
          <CommentSection
            comments={JSON.parse(JSON.stringify(comments))}
            productID={productID}
          />
        )}
      </div>
    </section>
  );
}
