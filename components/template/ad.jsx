import Image from "next/image";
import Link from "next/link";

export default function AdSectionOne() {
  return (
    <section className="container-bg mt-20 w-full overflow-hidden">
      <div className="flex xl:flex-row flex-col pt-14 sm:w-[90%] w-full m-auto">
        <div className="flex flex-col justify-between xl:gap-0 gap-10 items-center xl:m-0 m-auto xl:w-[850px] w-full">
          <div className="flex flex-col gap-2 items-center mt-14">
            <h2 className="text-headcolor moraba-bold xl:text-3xl sm:text-4xl text-2xl">
              خرید قهوه ، به سبک حرفه ای ها
            </h2>
            <h3 className="moraba-regular sm:text-base text-sm text-zinc-400">
              زیبایی امروز رو با قهوه “ست” کنید
            </h3>
            <Link
              href={"/contact-us"}
              className="moraba-regular underline underline-offset-8 text-zinc-800 cursor-pointer hover:text-zinc-500 trasition"
            >
              تماس با ما
            </Link>
          </div>
          <Image
            src={"/img/ad/coffee-image-1.jpg"}
            className="sm:w-[250px] w-[150px]"
            width={1440}
            height={1440}
            quality={100}
            alt="coffee img"
          />
        </div>
        <div className="relative">
          <Image
            src={"/img/ad/clubset1.jpg"}
            width={1440}
            height={800}
            alt="cofee pack img"
          />
          <div className="flex flex-col sm:items-end items-start gap-4 bg-[#f3f3f3] absolute bottom-0 left-0 sm:p-8 px-4 py-3 sm:w-[400px] w-[300px]">
            <h2 className="text-headcolor moraba-bold sm:text-3xl text-2xl">
              باشگاه مشتریان ست
            </h2>
            <h3 className="moraba-regular text-zinc-400 sm:text-base text-xs">
              برای مشتریان وفادار قهوه ست{" "}
            </h3>
            <span className="moraba-regular underline sm:text-base text-xs underline-offset-8 text-zinc-800 cursor-pointer hover:text-zinc-500 trasition">
              اطلاعات بیشتر
            </span>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col pb-10 gap-4 sm:w-[90%] w-full m-auto xl:mt-40 mt-10">
        <Image
          src={"/img/ad/Home32.jpg"}
          width={1440}
          height={1440}
          quality={100}
          className="xl:w-[600px] w-full"
          alt="coffee maker machine"
        />
        <div className="w-full flex items-center">
          <div className="flex flex-col gap-4 sm:p-2 p-4">
            <Image
              src={"/img/logo/coffee-svg-2.svg"}
              width={800}
              height={800}
              className="w-[80px] aspect-square"
              alt="coffee beans logo"
            />
            <div className="flex flex-col gap-4">
              <h2 className="moraba-bold sm:text-5xl text-3xl text-[#711D1C]">
                چرا قهوه سِت
              </h2>
              <p className="shabnam text-zinc-500 sm:text-base text-sm pl-6 text-justify">
                برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
                راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم)
                است .تجربه ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان
                قهوه ضامن این ویژگیها است.
              </p>
              <div className="sm:mt-6 sm:mr-10 m-auto flex gap-2">
                <Link
                  href={"/about-us"}
                  className="bg-[#711D1C] border-2 hover:border-mybrown border-[#711D1C] hover:bg-mybrown transition px-8 py-2 moraba-bold text-white"
                >
                  بیشتر بخوانید
                </Link>
                <Link
                  href={"/products"}
                  className="border-2 border-[#711D1C] text-[#711D1C] hover:bg-[#711D1C] hover:text-white transition px-8 py-2 moraba-bold"
                >
                  فروشگاه
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
