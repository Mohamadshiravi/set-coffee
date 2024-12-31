import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

export default function DashboardComment({
  body,
  username,
  score,
  date,
  queued,
  productTitle,
  productID,
}) {
  return (
    <div className="shadow-lg">
      <div className="flex sm:flex-row flex-col gap-6 p-4 bg-white relative rounded-t-xl">
        <div className="sm:w-auto w-full">
          <div className="sm:w-[150px] sm:shadow-none shadow-xl w-[120px] sm:static absolute -top-16 left-[25%] sm:m-0 m-auto aspect-square rounded-full font-bold md:text-5xl text-3xl flex items-center justify-center bg-gray-200">
            <span className="uppercase">{username.substring(0, 1)}</span>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-0 items-center">
              <span className="text-zinc-800 font-bold">{username}</span>
              <span className="text-xs">
                {new Date(date).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <div className="flex">
              {Array.from({ length: score }).map((e, i) => (
                <IoStar key={i} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - score }).map((e, i) => (
                <IoIosStarOutline key={i} className="text-gray-500" />
              ))}
            </div>
          </div>
          <p className="mt-8 text-justify text-zinc-600">{body}</p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-between px-6 gap-3 w-[300px] items-center justify-center py-4 bg-zinc-100 w-full">
        <div className="flex items-center gap-2">
          <span>وضعیت:</span>
          <span>
            {!queued ? (
              <i className="font-bold text-green-500">تایید شده</i>
            ) : (
              <i className="font-bold text-red-500"> هنوز تایید نشده</i>
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <span>برای محصول :</span>
          <Link
            href={`/products/${productID}`}
            className="block sm:w-[200px] w-[140px] truncate underline underline-offset-8 text-mybrown2"
          >
            {productTitle}
          </Link>
        </div>
      </div>
    </div>
  );
}
