import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function AuthPageLayout({ children }) {
  return (
    <section className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] w-full h-screen">
      <div className="bg-mybrown w-full h-full md:block hidden">
        <Image
          width={4000}
          height={4000}
          src="/img/bg-photo/coffee-1.jpg"
          className="object-cover w-full h-full"
          alt="coffee-bean"
        ></Image>
      </div>
      <div className="flex items-center justify-center bg-[#eeeae8] relative">
        <Link
          href={"/"}
          className="absolute top-4 right-4 bg-white rounded-full z-10 shadow-3xl p-3 text-zinc-600 text-xl hover:bg-zinc-200 transition"
        >
          <FaHome />
        </Link>
        {children}
      </div>
    </section>
  );
}
