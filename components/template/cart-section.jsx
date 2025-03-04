"use client";

import { useContext, useEffect, useState } from "react";
import CartItem from "./cart-item";
import axios from "axios";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/context";

export default function CartSection() {
  const [userCart, setUserCart] = useState([]);
  const [discountInp, setDiscountInp] = useState("");
  const [allPriceState, setAllPriceState] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { user } = useContext(UserContext);

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
    <main className="sm:p-10 p-4 flex md:flex-row flex-col sm:gap-10 gap-4 moraba-regular">
      {!loading && userCart.length !== 0 && (
        <>
          <section className="flex relative flex-col gap-4 rounded-lg w-full">
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
            className={`md:w-[500px] w-full sticky top-[100px] left-0 sm:h-[600px] h-[350px] bg-white py-4 px-6 rounded-lg flex flex-col justify-between`}
          >
            <div className="flex flex-col gap-4">
              <div className="border-b py-5 flex items-center justify-between">
                <span className="font-bold text-lg">مجموع کل</span>
                <span className="moraba-bold text-xl text-zinc-700">
                  {(
                    allPriceState -
                    (allPriceState * discount) / 100
                  ).toLocaleString()}
                  <span className="pr-2 text-sm"> تومان</span>
                </span>
              </div>
              {discount === 0 && (
                <div className="flex flex-col gap-2 w-full xl:text-base text-lg">
                  <TextField
                    value={discountInp}
                    onChange={(e) => {
                      setDiscountInp(e.target.value);
                    }}
                    type="text"
                    label="کد تخفیف"
                    size="small"
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    disabled={loading}
                    onClick={UseDiscountHandler}
                    className="border bg-headcolor text-white px-4 xl:w-full sm:py-3 py-2 w-[300px] rounded-md hover:bg-green-950 transition"
                  >
                    اعمال کد
                  </Button>
                </div>
              )}
            </div>

            <Button
              onClick={BuyHandler}
              variant="contained"
              size="large"
              fullWidth
            >
              تکمیل سفارش
            </Button>
          </section>
        </>
      )}
      {!loading && userCart.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-[80vh] px-6 bg-white rounded-lg">
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
    </main>
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
    if (user === null) {
      newErrorToast("لطفا ابتدا یک اکانت بسازید  یا وارد اکانت خود شوید");
    } else {
      router.push("checkout");
    }
  }
}
