"use client";

import BreadCrumb from "@/components/module/breadcrumb";
import Header from "@/components/module/header-nav/header";

import { FaCoffee } from "react-icons/fa";
import { BsBrowserChrome } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import Footer from "@/components/module/footer";
import SendMessageForm from "@/components/template/contact-us/send-mssage-form";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

export default function ContactUsPage() {
  const MapSection = dynamic(
    () => import("@/components/template/contact-us/map-section"),
    {
      ssr: false,
      loading: () => (
        <Skeleton
          sx={{ bgcolor: "grey.200" }}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          animation="wave"
        />
      ),
    }
  );

  return (
    <>
      <Header />
      <BreadCrumb path={"تماس با ما"} />

      <main className="lg:w-10/12 w-full sm:px-8 px-4 m-auto text-zinc-500 text-sm shabnam">
        <section className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] md:gap-6 gap-28 mt-10 md:h-[500px] h-[800px]">
          <MapSection
            title={"آدرس فروشگاه حضوری قهوه ست (شعبه انقلاب)"}
            des={
              "تهران - خ انقلاب بین میدان فردوسی و چهار راه کالج روبروی خ ویلا شماره ۸۵۲"
            }
            phone={"0901-146-8142"}
            position={[35.70153474690238, 51.41497422314844]}
          />
          <MapSection
            title={"آدرس فروشگاه حضوری قهوه ست (شعبه جم)"}
            des={
              "تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) – شماره ۱۰"
            }
            phone={"0901-146-8142"}
            position={[35.72021225108499, 51.42222691580869]}
          />
        </section>
        <section className="grid lg:grid-cols-[6fr_6fr] md:gap-2 gap-20 sm:py-10 py-4 mt-28">
          <div className="w-full">
            <div className="lg:h-[150px] h-[100px]">
              <h4 className="sm:text-base text-sm text-zinc-500">تماس با ما</h4>
              <h2 className="sm:text-3xl text-2xl moraba-bold mt-3 text-zinc-800">
                اطلاعات تماس
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-start gap-2">
                <FaCoffee className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">(کارخانه قهوه ست )</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <BsBrowserChrome className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">set-coffee.com</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <FaRegAddressBook className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">
                  تهران. پاکدشت . شهرک صنعتی خوارزمی. فاز 2 . بلوار بهارستان.
                  خیابان ماگنولیا بلوک آ117
                </span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <IoCall className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">0901-146-8142</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <IoIosMail className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">mohamadshiravi85@gmail.com</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <FaTelegramPlane className="text-4xl text-gray-500 w-[40px] h-[40px]" />
                <span className="w-full px-2">
                  تماس با مدیریت از طریق واتساپ و یا تلگرام :
                  <span dir="ltr" className="mx-2">
                    {" "}
                    0901-146-8142{" "}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="h-[150px]">
              <h4 className="sm:text-base text-sm text-zinc-500">
                فرم تماس با ما / ثبت شکایات
              </h4>
              <h2 className="sm:text-3xl text-2xl moraba-bold mt-3 text-zinc-800">
                برای تماس با ما یا ثبت شکایات و انتقادات فرم زیر را تکمیل کنید.
              </h2>
            </div>
            <SendMessageForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
