import orderModel from "@/models/order";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";
import Image from "next/image";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default async function UserOrderpage() {
  await ConnectTODb();
  const theUser = await isUserLogedIn();
  const userOrders = await orderModel
    .find(
      { user: theUser._id },
      "_id address details order createdAt allPrice province city firstname lastname postCode"
    )
    .populate("order.product", "images title price");

  return (
    <>
      <section className="p-6">
        <div className="flex flex-col trasnition duration-300 items-center text-zinc-600 font-bold moraba-bold hover:bg-zinc-100 shadow-4xl gap-3 rounded-md py-10 group sm:text-lg text-sm">
          <HiOutlineDocumentText className="sm:text-6xl text-5xl text-gray-400 group-hover:text-zinc-600 trasnition duration-300" />
          <span> مجموع سفارش ها</span>
          <span className="font-bold sm:text-2xl text-lg">
            {userOrders.length}
          </span>
        </div>
      </section>
      <section className="bg-gray-100 px-4 mx-6 rounded-lg py-4 mb-8">
        <h2 className="moraba-bold text-zinc-700 text-xl">سفارش ها</h2>
        <hr className="border my-4 border-gray-200"></hr>
        <div className="flex flex-col gap-3">
          {userOrders.map((e, i) => (
            <div
              key={i}
              className="flex flex-col gap-6 sm:items-start items-center transition-all justify-between w-full bg-white py-3 px-4 text-zinc-700 rounded-lg shabnam"
            >
              <div className="w-full border-b pb-3 flex flex-col gap-4">
                <p className="moraba-regular text-center border-b pb-3">
                  ارسال به{" "}
                  <span className="px-2 text-zinc-800 font-bold">
                    {e.province} - {e.city} - {e.address}
                  </span>
                  با کد پستی{" "}
                  <span className="px-3 text-zinc-800 font-bold">
                    {e.postCode}
                  </span>
                  به نام{" "}
                  <span className="px-3 text-zinc-800 font-bold">
                    {e.firstname} {e.lastname}
                  </span>
                </p>
                <div className="flex items-center w-full justify-between gap-4">
                  <span className="sm:text-sm text-xs gap-5 flex sm:flex-row flex-col">
                    ({new Date(e.createdAt).toLocaleTimeString("fa-IR")})
                    <i>{new Date(e.createdAt).toLocaleDateString("fa-IR")}</i>
                  </span>
                  <div className="text-sm flex flex-col items-center gap-2 bg-zinc-100 px-3 py-2 rounded-md ">
                    <span className="font-bold">
                      {e.allPrice.toLocaleString()} تومان
                    </span>
                    <span className="text-[12px] moraba-regular">
                      شامل هزینه پست و مالیات بر ارزش افزوده
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                {e.order.map((p, i) => (
                  <div key={i} className="flex items-center border-b w-full">
                    <span className="text-zinc-800 text-sm">{p.count} x</span>
                    <Image
                      src={"/img/product-photo/product-1.png"}
                      alt="coffee photo"
                      width={100}
                      height={100}
                      className="w-[80px] h-[80px]"
                    />
                    <h4 className="moraba-regular text-sm">
                      {p.product.title}
                    </h4>
                    <h4 className="moraba-regular text-sm px-4">
                      {(p.product.price * p.count).toLocaleString()}
                      <span className="px-1 text-xs">تومان</span>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {userOrders.length === 0 && (
            <h3 className="text-center moraba-regular py-4">
              شما تابحال سفارشی نداشته اید
            </h3>
          )}
        </div>
      </section>
    </>
  );
}
