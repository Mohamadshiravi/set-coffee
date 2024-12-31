import ProductItem from "@/components/module/productitem";
import wishlistModel from "@/models/wishlist";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

export default async function WishlistPage() {
  await ConnectTODb();

  const theUser = await isUserLogedIn();
  const userWish = await wishlistModel
    .find({ user: theUser._id })
    .populate("product", "title price score images");
  return (
    <div>
      {userWish.length !== 0 ? (
        <>
          <h2 className="lg:text-center text-left lg:border-none w-full lg:text-3xl text-xl text-headcolor mt-3 pl-4 moraba-bold py-8 border-b-2 border-zinc-300">
            محصولات مورد علاقه شما
          </h2>
          <div className="p-6">
            <div className="w-full rounded-lg bg-gray-100 p-4 grid gap-4 lg:grid-cols-[3fr_3fr_3fr_3fr] md:grid-cols-[4fr_4fr_4fr]  grid-cols-[1fr]">
              {userWish.map((e, i) => (
                <ProductItem
                  key={i}
                  title={JSON.parse(JSON.stringify(e.product.title))}
                  score={JSON.parse(JSON.stringify(e.product.score))}
                  price={JSON.parse(JSON.stringify(e.product.price))}
                  id={JSON.parse(JSON.stringify(e.product._id))}
                  isWished={JSON.parse(JSON.stringify(true))}
                  wishID={JSON.parse(JSON.stringify(e._id))}
                  image={JSON.parse(
                    JSON.stringify(e.product.images[0] || null)
                  )}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen px-6">
          <FaRegHeart className="text-9xl text-zinc-300" />
          <h1 className="moraba-bold sm:text-4xl text-3xl mt-3 text-center">
            لیست علاقه مندی های شما خالی است
          </h1>
          <p className="text-center moraba-regular mt-6 text-zinc-600 sm:px-20 px-2">
            شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید. در صفحه
            "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.
          </p>
          <Link
            href={"/"}
            className="moraba-bold text-white px-8 py-2 bg-headcolor text-lg rounded-md mt-6"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      )}
    </div>
  );
}
