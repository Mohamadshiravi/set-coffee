"use client";

import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import BreadCrumb from "@/components/module/breadcrumb";
import { useEffect, useRef, useState } from "react";

export default function AboutUS() {
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const p4Ref = useRef(null);

  const timeoutRef = useRef(null);
  let isComponentMounted = false;

  const text = {
    p1: "تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن این ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد اولیه راسا به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت تولید قهوه است.",
    p2: "مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال 2007 به عضویت انجمن تخصصی قهوه اروپا (Speciality coffee association of Europe) در آمده است.",
    p3: "تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن این ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد اولیه راسا به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت تولید قهوه است. مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال 2007 به عضویت انجمن تخصصی قهوه اروپا (Speciality coffee association of Europe) در آمده است و بسیاری از دوره‌های مربوط به فرآوری قهوه را مدیریت این مجموعه به صورت تخصصی در کارگاه‌های آموزشی این انجمن و همچنین کارگاه‌های تخصصی فرآوری قهوه به خصوص در زمینه بو دادن قهوه(Roasting) را در کشور آمریکا که از پیشگامان این صنعت است را گذرانده است. اکنون با پشتوانه دستاوردهای گذشته و تکنولوژی روز دنیا وارد مرحله تولید قهوه به صورت صنعتی و گسترده شده‌ایم و مفتخریم اعلام کنیم که «قهوه ست» از این پس یک نام تجاری صنعتی در صنعت قهوه ایران است.",
    p4: "مسیری را که بنیان‌گذاران «قهوه ست» در دهه 20 شمسی آغاز کرده‌اند اکنون وارد مرحله جدیدی شده است و مفتخریم اعلام کنیم در بهمن ماه 94 موفق به اخذ مجوزهای مربوطه از وزارت بهداشت درمان و آموزش پزشکی و سازمان غذا دارو شده‌ایم و تولید سنتی و محدود قهوه را تبدیل به تولید صنعتی و انبوه کرده‌ایم. از دیگر افتخارات مجموعه «قهوه ست» اخذ مدرک دیپلم دانش قهوه از انجمن قهوه تخصصی اروپا در فروردین ماه سال 95 است. (SCAE Coffee Diploma) امید داریم با کسب دانش روز دنیا در این صنعت ارتقا کیفیت و تنوع محصول در حد استانداردهای جهانی را در آینده‌ای نزدیک شاهد باشیم.",
  };

  useEffect(() => {
    isComponentMounted = true;
    RenderText();

    return () => {
      isComponentMounted = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  let countObject = {
    p1Count: 0,
    p2Count: 0,
    p3Count: 0,
    p4Count: 0,
  };

  function RenderText() {
    if (!isComponentMounted) return;

    if (countObject.p1Count < text.p1.length) {
      p1Ref.current.textContent += text.p1[countObject.p1Count];
      countObject.p1Count++;
    }
    if (
      countObject.p2Count < text.p2.length &&
      countObject.p1Count === text.p1.length
    ) {
      p2Ref.current.textContent += text.p2[countObject.p2Count];
      countObject.p2Count++;
    }
    if (
      countObject.p3Count < text.p3.length &&
      countObject.p2Count === text.p2.length
    ) {
      p3Ref.current.textContent += text.p3[countObject.p3Count];
      countObject.p3Count++;
    }
    if (
      countObject.p4Count < text.p4.length &&
      countObject.p3Count === text.p3.length
    ) {
      p4Ref.current.textContent += text.p4[countObject.p4Count];
      countObject.p4Count++;
    }

    if (
      countObject.p1Count < text.p1.length ||
      countObject.p2Count < text.p2.length ||
      countObject.p3Count < text.p3.length ||
      countObject.p4Count < text.p4.length
    ) {
      timeoutRef.current = setTimeout(RenderText, 20);
    }
  }
  return (
    <>
      <Header />
      <BreadCrumb path={"درباره ما"} />
      <div className="text-zinc-800 w-full shabnam">
        <section className="flex lg:flex-row flex-col items-center justify-center gap-20 bg-white shadow-sm lg:h-[400px]">
          <div className="w-[300px] lg:mt-0 mt-20 flex flex-col gap-6">
            <span className="font-bold text-center">درباره ما</span>
            <p className="sm:text-5xl text-4xl moraba-bold text-center">
              قهوه ست
            </p>
          </div>
          <p
            ref={p1Ref}
            className="lg:w-[250px] w-9/12 text-justify text-zinc-600 text-lg"
          ></p>
          <p
            ref={p2Ref}
            className="lg:w-[250px] w-9/12 lg:mb-0 mb-20 text-justify text-zinc-600 text-lg"
          ></p>
        </section>
        <main className="lg:my-40 my-20">
          <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-40 gap-20">
            <div className="lg:w-[400px] w-9/12 text-zinc-600 text-lg">
              <span className="font-bold text-xl">Set Coffee</span>
              <p className="sm:text-5xl text-4xl moraba-bold text-zinc-800">
                داستان قهوه ست
              </p>
              <p className="text-justify mt-10" ref={p3Ref}></p>
            </div>
            <div className="lg:w-[400px] w-9/12">
              <p className="text-justify" ref={p4Ref}></p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
