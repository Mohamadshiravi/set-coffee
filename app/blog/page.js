import ArticleItem from "@/components/module/article";
import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import { MdErrorOutline } from "react-icons/md";

export default async function BlogPage() {
  return (
    <>
      <BreadCrumb path={"وبلاگ"} />
      <h2 className="xl:mx-20 sm:mx-10 mx-4 rounded-md py-4 px-4 gap-3 flex items-center sm:text-xl text-lg text-zinc-800 text-center sm:mt-10 mt-4 moraba-regular text-red-900 bg-red-200">
        <MdErrorOutline className="text-red-700 text-3xl" />
        قابلیت وبلاگ ها به دلیل تکراری بودن هنوز پیاده سازی نشده است.
      </h2>
      <main className="grid lg:grid-cols-[4fr_4fr_4fr] md:grid-cols-[6fr_6fr] xl:px-20 sm:px-10 px-4 sm:gap-8 gap-4 sm:pt-10 pt-4">
        {Array.from({ length: 9 }).map((e, i) => (
          <ArticleItem key={i} />
        ))}
      </main>
      <Footer />
    </>
  );
}
