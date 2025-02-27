import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex gap-4 text-7xl translate-y-10 font-mono font-black">
        <span className="text-brown-500">4</span>
        <span>0</span>
        <span className="text-brown-500">4</span>
      </div>
      <Image
        src={"/img/bg-photo/not-found.webp"}
        width={1400}
        height={1400}
        className="w-[300px]"
        quality={100}
        alt="not-Found"
      />
      <div>
        <p className="shabnam text-brown-700 sm:text-3xl text-xl text-center">
          صفحه مورد نظر یافت نشد :((
        </p>
        <Link
          href="/"
          className="bg-brown-500 text-white rounded-lg py-4 font-bold mt-4 block text-center shabnam shadow-xl shadow-brown-500"
        >
          برگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default page;
