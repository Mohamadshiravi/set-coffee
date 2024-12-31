import Header from "@/components/module/header-nav/header";
import ProductSlider from "@/components/template/product-details/product-slider";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import AddToCartBtn from "@/components/template/product-details/buy-btn";
import PageTags from "@/components/template/product-details/tags";

import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";

import Tabs from "@/components/template/product-details/tabs";
import Footer from "@/components/module/footer";
import LastestProductSlider from "@/components/template/product-details/lastest-product-slider";
import ConnectTODb from "@/utils/connecttodb";
import productModel from "@/models/product";
import AddToWishBtn from "@/components/template/product-details/addtowishbtn";

export default async function ProductDetails({ params }) {
  await ConnectTODb();

  const product = await productModel
    .findOne({ _id: params.id }, "-__v")
    .populate("comments", "-__v");

  const lastestProduct = await productModel.find(
    { smell: product.smell },
    "title price score images",
    { limit: 4 }
  );

  return (
    <>
      <main className="mt-[150px] lg:px-20 md:px-10 sm:px-4 px-2 text-zinc-700">
        <section className="w-full overflow-hidden flex xl:flex-row pb-2 flex-col gap-3">
          <div
            data-aos="fade-left"
            className="xl:w-[500px] w-full select-none bg-gray-100"
          >
            <ProductSlider images={product.images} alt={product.title} />
          </div>
          <div data-aos="fade-right" className="flex flex-col gap-2 w-full p-4">
            <div className="flex gap-3 shabnam text-zinc-700 text-sm">
              <Link
                href={"/"}
                className="hover:text-zinc-950 cursor-pointer transition"
              >
                خانه
              </Link>
              <span>/</span>
              <Link
                href={"/products"}
                className="hover:text-zinc-950 cursor-pointer transition"
              >
                فروشگاه
              </Link>
              <span>/</span>
              <h3>{product.title}</h3>
            </div>
            <div className="mt-2">
              <h1 className="moraba-bold text-3xl border-b pb-4">
                {product.title}
              </h1>
              <div className="flex items-center text-2xl mt-10 text-yellow-500">
                {Array.from({ length: Math.floor(product.score) }).map(
                  (e, i) => (
                    <IoStar key={i} className="text-yellow-500" />
                  )
                )}
                {Array.from({ length: 5 - Math.floor(product.score) }).map(
                  (e, i) => (
                    <IoIosStarOutline key={i} className="text-zinc-500" />
                  )
                )}
                <span className="text-zinc-600 text-base mr-2 shabnam">
                  ({product.comments.filter((e) => e.queued === false).length}
                  کاربر)
                </span>
              </div>
              <div className="moraba-bold flex items-center text-2xl gap-2 mt-3">
                <span>{TidyNumber(product.price)}</span>
                <span className="text-xl">تومان</span>
              </div>
              <p className="moraba-regular mt-3 text-justify text-zinc-500">
                {product.shortDes}
              </p>
            </div>
            <div className="moraba-regular mt-14 border-b pb-10 flex flex-col items-center gap-4">
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between w-full sm:w-[550px] w-full">
                <span className="border border-green-700 px-8 py-2 rounded-lg text-green-700 w-[200px] text-center bg-green-100 select-none">
                  موجود در انبار
                </span>
                <AddToWishBtn id={JSON.parse(JSON.stringify(product._id))} />
              </div>
              <AddToCartBtn
                id={JSON.parse(JSON.stringify(product._id))}
                title={JSON.parse(JSON.stringify(product.title))}
                price={JSON.parse(JSON.stringify(product.price))}
                img={JSON.parse(JSON.stringify(product.images[0] || null))}
              />
            </div>
            <div className="flex flex-col gap-6 shabnam mt-4">
              <h3 className="font-bold">
                شناسه محصول: {JSON.parse(JSON.stringify(product._id))}C
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">دسته:</span>
                <span className="text-zinc-500">
                  همه موارد , {product.title}
                </span>
              </h3>
              <PageTags tags={JSON.parse(JSON.stringify(product.tags))} />
              <h3 className="gap-4 flex">
                <span className="font-bold text-zinc-800">
                  به اشتراک گذاری :
                </span>
                <div className="flex gap-2 text-2xl">
                  <FaFacebook className="text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer" />
                  <FaLinkedin className="text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer" />
                  <FaPinterest className="text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer" />
                  <FaSquareXTwitter className="text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer" />
                  <FaTelegram className="text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer" />
                </div>
              </h3>
            </div>
          </div>
        </section>
        <Tabs
          longDes={JSON.parse(JSON.stringify(product.longDes))}
          smell={JSON.parse(JSON.stringify(product.smell))}
          suitableFor={JSON.parse(JSON.stringify(product.suitableFor))}
          weight={JSON.parse(JSON.stringify(product.weight))}
          comments={JSON.parse(JSON.stringify(product.comments))}
          productID={JSON.parse(JSON.stringify(product._id))}
        />
        <LastestProductSlider
          lastestProduct={JSON.parse(
            JSON.stringify(lastestProduct.filter((e) => e.id !== params.id))
          )}
        />
      </main>
      <Footer />
    </>
  );
  function TidyNumber(Number) {
    Number += "";
    Number = Number.replace(",", "");
    let x = Number.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }
}

export async function generateMetadata({ params }) {
  const product = await productModel.findOne(
    { _id: params.id },
    "title shortDes -_id"
  );
  return {
    title: product.title,
    description: product.shortDes,
  };
}
