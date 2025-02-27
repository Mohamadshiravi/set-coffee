import Image from "next/image";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";

export default function ArticleItem() {
  return (
    <div
      data-aos="fade-up"
      className="select-none relative rounded-md overflow-hidden cursor-pointer group"
    >
      <Image
        src={"/img/article-photo/cold-berw-coffee.png"}
        width={800}
        height={800}
        className="group-hover:scale-[120%] transition-all duration-1000"
        alt="article-alt"
      />
      <div className="absolute top-0 left-0 w-full h-full group-hover:bg-linear-to-t group-hover:from-black/50 group-hover:to-black/50 bg-linear-to-t from-black/70 to-black/10">
        <div className="flex rounded-md shadow-lg flex-col text-zinc-700 items-center justify-center bg-white absolute top-3 right-3 moraba-bold w-[50px] aspect-square">
          <span className="text-xl">09</span>
          <span className="text-xs">مرداد</span>
        </div>
        <div className="w-full absolute flex flex-col items-center bottom-0 left-0">
          <span className="text-white rounded-xs px-2 py-1 text-xs bg-red-800 shabnam">
            دسته بندی نشده
          </span>
          <p className="text-white shabnam px-6 text-center mt-2 text-lg">
            ارزیابی شیمیایی و حسی قهوه های کلد براساس پروفیل های مختلف برشته
            کاری و روش های دم کردن
          </p>
          <div className="text-xs flex gap-2 w-full items-center justify-center text-zinc-400 py-5">
            <span className="shabnam">نویسنده</span>
            <img
              src="/img/article-photo/guest.png"
              className="rounded-full aspect-square w-[20px]"
            />
            <h4>mohamad</h4>
            <div className="relative">
              <span className="absolute -top-2 -left-2 bg-red-800 rounded-full text-white w-[15px] flex items-center justify-center aspect-square">
                0
              </span>
              <FaRegCommentAlt className="text-base hover:text-white cursor-pointer" />
            </div>
            <IoShareSocialOutline className="text-lg hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
