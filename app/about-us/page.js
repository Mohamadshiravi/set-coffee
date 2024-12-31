import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import BreadCrumb from "@/components/module/breadcrumb";

export default async function AboutUS() {
  return (
    <>
      <BreadCrumb path={"درباره ما"} />
      <div className="text-zinc-800 w-full shabnam">
        <section className="flex lg:flex-row flex-col items-center justify-center gap-20 bg-zinc-200 lg:h-[400px]">
          <div className="w-[300px] lg:mt-0 mt-20 flex flex-col gap-6">
            <span className="font-bold text-center">درباره ما</span>
            <p className="sm:text-5xl text-4xl moraba-bold text-center">
              قهوه ست
            </p>
          </div>
          <p className="lg:w-[250px] w-9/12 text-justify text-zinc-600 text-lg">
            تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن این
            ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد اولیه راسا
            به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت تولید قهوه
            است.
          </p>
          <p className="lg:w-[250px] w-9/12 lg:mb-0 mb-20 text-justify text-zinc-600 text-lg">
            مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال
            2007 به عضویت انجمن تخصصی قهوه اروپا (Speciality coffee association
            of Europe) در آمده است.
          </p>
        </section>
        <main className="lg:my-40 my-20">
          <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-40 gap-20">
            <div className="lg:w-[400px] w-9/12 text-zinc-600 text-lg">
              <span className="font-bold text-xl">Set Coffee</span>
              <p className="sm:text-5xl text-4xl moraba-bold text-zinc-800">
                داستان قهوه ست
              </p>
              <p className="text-justify mt-10">
                تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن
                این ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد
                اولیه راسا به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت
                تولید قهوه است.
              </p>
              <p className="text-justify">
                مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال
                2007 به عضویت انجمن تخصصی قهوه اروپا (Speciality coffee
                association of Europe) در آمده است و بسیاری از دوره‌های مربوط به
                فرآوری قهوه را مدیریت این مجموعه به صورت تخصصی در کارگاه‌های
                آموزشی این انجمن و همچنین کارگاه‌های تخصصی فرآوری قهوه به خصوص
                در زمینه بو دادن قهوه(Roasting) را در کشور آمریکا که از پیشگامان
                این صنعت است را گذرانده است. اکنون با پشتوانه دستاوردهای گذشته و
                تکنولوژی روز دنیا وارد مرحله تولید قهوه به صورت صنعتی و گسترده
                شده‌ایم و مفتخریم اعلام کنیم که «قهوه ست» از این پس یک نام تجاری
                صنعتی در صنعت قهوه ایران است.
              </p>
            </div>
            <div className="lg:w-[400px] w-9/12">
              <p className="text-justify">
                مسیری را که بنیان‌گذاران «قهوه ست» در دهه 20 شمسی آغاز کرده‌اند
                اکنون وارد مرحله جدیدی شده است و مفتخریم اعلام کنیم در بهمن ماه
                94 موفق به اخذ مجوزهای مربوطه از وزارت بهداشت درمان و آموزش
                پزشکی و سازمان غذا دارو شده‌ایم و تولید سنتی و محدود قهوه را
                تبدیل به تولید صنعتی و انبوه کرده‌ایم.
              </p>
              <p className="text-justify">
                از دیگر افتخارات مجموعه «قهوه ست» اخذ مدرک دیپلم دانش قهوه از
                انجمن قهوه تخصصی اروپا در فروردین ماه سال 95 است. (SCAE Coffee
                Diploma)
              </p>
              <p className="text-justify">
                امید داریم با کسب دانش روز دنیا در این صنعت ارتقا کیفیت و تنوع
                محصول در حد استانداردهای جهانی را در آینده‌ای نزدیک شاهد باشیم.
              </p>
              <p className="text-center mt-4 text-zinc-800 text-xl">
                صاحب امتیاز: شرکت فنجان داغ خوارزمی
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
