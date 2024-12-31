"use client";

import stateData from "@/utils/all-country";
import { useEffect, useState } from "react";
import Select from "react-select";
import CartItem from "./cart-item";
import axios from "axios";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";

export default function CartSection() {
  const [userCart, setUserCart] = useState([]);

  const [postOption, setPostOption] = useState("41000");

  const [isAddressOpen, setIsAddresOpen] = useState(false);

  const [discountInp, setDiscountInp] = useState("");

  const [country, setCountry] = useState([]);
  const [city, setCity] = useState("تهران");

  const [allPriceState, setAllPriceState] = useState(0);

  const [discount, setDiscount] = useState(0);

  const stateOptions = stateData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCart();
  }, []);
  async function GetCart() {
    setLoading(true);
    setUserCart(JSON.parse(localStorage.getItem("cart")) || []);

    getAllPrice();
    setLoading(false);
  }
  return (
    <>
      {!loading && userCart.length !== 0 && (
        <>
          <section className="flex relative flex-col bg-white rounded-lg p-3">
            <div className="lg:flex hidden w-full xl:justify-strat justify-center moraba-bold text-zinc-700 text-lg border-b pb-3">
              <span className="w-[300px] text-center">محصول</span>
              <span className="w-[150px] text-center">قیمت</span>
              <span className="w-[150px] text-center">تعداد</span>
              <span className="w-[150px] text-center">جمع جزء</span>
            </div>

            {userCart?.map((e, i) => (
              <CartItem
                key={i}
                img={e.img}
                title={e.title}
                price={e.price}
                count={e.count}
                id={e.id}
                getAllPrice={getAllPrice}
                GetCart={GetCart}
              />
            ))}
          </section>

          <section
            className={`w-full sticky top-[100px] left-0 mb-20 ${
              !isAddressOpen ? "xl:h-[520px]" : "h-auto"
            } bg-gray-200 bg-white py-4 px-6 rounded-lg`}
          >
            <h2 className="moraba-bold text-2xl text-zinc-700">
              جمع کل سبد خرید
            </h2>
            <div className="border-b py-5 flex items-center justify-between">
              <span className="font-bold text-lg">جمع کل محصولات</span>
              <span className="text-base font-bold">
                {allPriceState.toLocaleString()} تومان
              </span>
            </div>
            <div className="border-b flex items-center py-5 justify-between">
              <span className="font-bold">حمل و نقل</span>
              <div className="flex flex-col items-end gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <label>ارسال با پست پیشتاز</label>
                    <input
                      checked={postOption === "41000" && true}
                      onChange={() => {
                        setPostOption("41000");
                      }}
                      type="radio"
                    />
                  </div>
                  <span className="font-bold">41,000 تومان</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <label>ارسال سریع ( چاپار )</label>
                    <input
                      checked={postOption === "80000" && true}
                      onChange={() => {
                        setPostOption("80000");
                      }}
                      type="radio"
                    />
                  </div>
                  <span className="font-bold">80,000 تومان</span>
                </div>
                <h3 className="text-lg">
                  حمل و نقل به {country.label}, {city}
                </h3>
                <button
                  onClick={() => {
                    setIsAddresOpen(!isAddressOpen);
                  }}
                  className="border px-6 py-1 border-zinc-400 text-zinc-400 rounded-md hover:bg-zinc-400 hover:text-white transition"
                >
                  تغییر ادرس
                </button>
                {isAddressOpen && (
                  <div
                    data-aos={"fade-up"}
                    className="flex  flex-col gap-5 mt-4"
                  >
                    <Select
                      onChange={setCountry}
                      options={stateOptions}
                      placeholder={"استان"}
                      isClearable={true}
                      isRtl={true}
                      isSearchable={true}
                      defaultValue={null}
                    />
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      className="border border-gray-300 text-zinc-500 py-2 rounded-[4px] px-2 outline-none focus:ring-2 ring-blue-500 transition"
                    >
                      <option value={null}>شهر را انتخاب کنید</option>
                      {country.value?.map((e, i) => (
                        <option key={i} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="کد پستی"
                      type="text"
                      className="border border-gray-300 outline-none text-zinc-500 py-2 rounded-[4px] px-2 w-[280px] py-2 focus:ring-2 ring-blue-500 transition"
                    />
                    <button
                      onClick={() => {
                        setIsAddresOpen(false);
                      }}
                      className="bg-headcolor text-white py-2 hover:bg-green-950 transition rounded-md"
                    >
                      به روزرسانی
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="border-b py-5 flex items-center justify-between">
              <span className="font-bold text-lg">مجموع کل</span>
              <span className="text-sm moraba-bold text-xl text-zinc-700">
                {(
                  allPriceState +
                  Number(postOption) -
                  ((allPriceState + Number(postOption)) * discount) / 100
                ).toLocaleString()}
                تومان
              </span>
            </div>
            <button
              onClick={BuyHandler}
              className="bg-headcolor shadow-xl shadow-green-950/50 hover:bg-green-950 transition text-white w-full py-3 rounded-md mt-6"
            >
              ادامه جهت تسویه حساب
            </button>
            {discount === 0 && (
              <div className="flex gap-2 absolute xl:-bottom-16 -bottom-20 right-0 w-full xl:text-base text-lg">
                <input
                  value={discountInp}
                  onChange={(e) => {
                    setDiscountInp(e.target.value);
                  }}
                  type="text"
                  placeholder="کد تخفیف"
                  className="border-2 border-headcolor px-6 sm:py-3 py-2 rounded-md xl:w-auto w-full"
                />
                <button
                  disabled={loading}
                  onClick={UseDiscountHandler}
                  className="border bg-headcolor text-white px-4 xl:w-full sm:py-3 py-2 w-[300px] rounded-md hover:bg-green-950 transition"
                >
                  اعمال کد
                </button>
              </div>
            )}
          </section>
        </>
      )}
      {!loading && userCart.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-[80vh] px-6">
          <TbShoppingCartX className="text-9xl text-zinc-300" />
          <h1 className="moraba-bold sm:text-4xl text-3xl mt-3 text-center">
            سبد خرید شما خالی میباشد
          </h1>
          <p className="text-center mt-6 text-zinc-600 sm:px-20 px-2 moraba-regular">
            شما هنوز هیچ محصولی در سبد خرید خود ندارید. در صفحه "فروشگاه"
            محصولات جالب زیادی پیدا خواهید کرد.
          </p>
          <Link
            href={"/products"}
            className="moraba-bold text-white px-8 py-2 bg-headcolor text-lg rounded-md mt-6"
          >
            رفتن به فروشگاه
          </Link>
        </div>
      )}
      {loading && (
        <>
          <div className="w-full h-[500px] rounded-lg flex flex-col gap-4">
            {Array.from({ length: 5 }).map((e, i) => (
              <div
                key={i}
                className="w-full bg-gray-300 h-full animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
          <div className="w-[600px] h-[500px] bg-gray-300 animate-pulse rounded-lg"></div>
        </>
      )}
    </>
  );
  function getAllPrice() {
    let allPrice = 0;

    let MyuserCart = JSON.parse(localStorage.getItem("cart")) || [];
    MyuserCart.map((e) => (allPrice = allPrice + e.price * e.count));

    setAllPriceState(allPrice);
  }
  async function UseDiscountHandler() {
    try {
      const res = await axios.post("/api/discount/check-discount", {
        code: discountInp,
      });
      if (res.status === 200) {
        newToast("کد تخفیف اعمال شد");
        setDiscount(res.data.data.precent);
        setDiscountInp("");
      }
    } catch (error) {
      if (error.response.status === 404) {
        return newErrorToast("کد تخفیف پیدا نشد");
      } else if (error.response.status === 422) {
        return newErrorToast("کد تخفیف منقضی شده است ");
      }
    }
  }
  async function BuyHandler() {
    ShowSwal(
      "info",
      "این وبسایت صرفا نمونه کار است و خدماتی ارائه نمیکند",
      "اوکی"
    );
  }
}
