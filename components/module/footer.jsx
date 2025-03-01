import { IoLocationSharp } from "react-icons/io5";
import { MdPhoneIphone } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 sm:mb-0 mb-[58px]">
      <div className="grid xl:grid-cols-[4fr_4fr_4fr] md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-6 lg:px-32 sm:px-16 px-8 py-14">
        <div className="text-zinc-300 text-sm flex flex-col gap-6 shabnam">
          <img src="/img/logo/logo_light.png" className="w-[200px]" />
          <h3 className="moraba-bold">فروشگاه اینترنتی قهوه ست</h3>
          <h3 className="flex items-center gap-3">
            <IoLocationSharp className="text-4xl" />
            <span className="">
              تهران. شریف آباد . شهرک صنعتی خوارزمی فاز 2 . بلوار بهارستان.
              خیابان ماگنولیا بلوک آ117
            </span>
          </h3>
          <h3 className="flex items-center gap-3">
            <MdPhoneIphone className="text-xl" />
            <span>پیگیری سفارشات : </span>
            <span className="moraba-bold" dir="ltr">
              0901 146 8142
            </span>
          </h3>
          <h3 className="flex items-center gap-3">
            <AiOutlineMail className="text-xl" />
            <span>mohamadshiravi85@gmail.com</span>
          </h3>
          <a
            href="https://set-coffee.com/"
            target="_blank"
            className="text-red-700 underline text-base hover:underline-offset-8"
          >
            لینک سایت اصلی ست کافی
          </a>
        </div>

        <div className="flex">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-white moraba-bold text-lg">دسترسی سریع</h2>
            <div className="w-full mt-6 flex flex-col items-center gap-4 shabnam text-sm">
              <Link
                href="/"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                صفحه اصلی
              </Link>
              <Link
                href="/products"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                فروشگاه
              </Link>
              <Link
                href="/contact-us"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                تماس با ما
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-white moraba-bold text-lg">منوی فوتر</h2>
            <div className="w-full mt-6 flex flex-col items-center gap-4  shabnam text-sm">
              <Link
                href="/"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                صفحه اصلی
              </Link>
              <Link
                href="/products"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                فروشگاه
              </Link>
              <Link
                href="/contact-us"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                تماس با ما
              </Link>
              <Link
                href="/about-us"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                درباره ما
              </Link>
              <Link
                href="/about-site"
                className="text-zinc-300 hover:text-white transition cursor-pointer"
              >
                درباره سایت
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:mt-0 mt-6 gap-1 items-center">
          <div className="flex gap-1">
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={"/img/logo/license1.png"}
                className="w-[50px] mix-blend-multiply"
                width={400}
                height={400}
                alt="license1"
              />
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={"/img/logo/license2.svg"}
                className="w-[50px] mix-blend-multiply"
                width={400}
                height={400}
                alt="license2"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={"/img/logo/license3.png"}
                className="w-[50px] mix-blend-multiply"
                width={400}
                height={400}
                alt="license3"
              />
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={"/img/logo/license4.jpg"}
                className="w-[50px] mix-blend-multiply"
                width={400}
                height={400}
                alt="license4"
              />
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={"/img/logo/license5.jpg"}
                className="w-[50px] mix-blend-multiply"
                width={400}
                height={400}
                alt="license5"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-zinc-800">
        <h2 className="w-full text-center text-zinc-300 moraba-bold py-4 sm:text-base text-sm">
          برنامه نویسی کامل سایت و باز طراحی UI توسط محمد شیروی
        </h2>
      </div>
    </footer>
  );
}
