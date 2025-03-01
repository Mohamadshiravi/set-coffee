import Image from "next/image";
import Link from "next/link";

export default function BreadCrumb(prop) {
  return (
    <header className="sm:mt-[90px] mt-[65px] w-full sm:h-[300px] h-[250px] relative select-none">
      <Image
        className="w-full h-full object-cover"
        src={"/img/bg-photo/coffee-bg-header.jpg"}
        width={1400}
        height={1000}
        quality={100}
        alt="bg-photo"
        priority
      />
      <div className="w-full text-white h-full absolute gap-8 top-0 left-0 flex flex-col items-center justify-center">
        <h2 className="sm:text-6xl text-5xl text-center shabnam font-bold">
          {prop.path}
        </h2>
        <div className="flex gap-4 text-xs shabnam">
          <Link
            href={"/"}
            className="cursor-pointer hover:text-zinc-400 transition"
          >
            خانه
          </Link>
          <span>/</span>
          <span>{prop.path}</span>
        </div>
      </div>
    </header>
  );
}
