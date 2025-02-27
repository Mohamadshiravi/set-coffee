"use client";

import { TfiLayoutGrid4 } from "react-icons/tfi";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import ProductItem from "@/components/module/productitem";
import MultiRangeSlider from "@/components/template/multi-range-select";
import { useEffect, useState } from "react";
import { IoCloseSharp, IoStarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { IoStar } from "react-icons/io5";
import axios from "axios";
import { TbShoppingCartOff } from "react-icons/tb";
import Link from "next/link";

export default function ShopeSection({ products }) {
  const [maxValue, setMaxValue] = useState();
  const [minValue, setMinValue] = useState();

  const [gridCols, setGridCols] = useState(4);

  const [allProduct, setAllProduct] = useState([]);

  const [productSort, setProductSort] = useState("newest");

  const [firstMin, setFirstMin] = useState(0);
  const [firstMax, setFirstMax] = useState(0);

  const [scoreFilter, setScoreFilter] = useState(null);

  const [isFilterOn, setIsFilterOn] = useState(false);

  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setAllProduct(products);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function SortHandler() {
      switch (productSort) {
        case "newest": {
          const allProduct = await FetchAllProduct();
          let newProductArray = allProduct;
          setAllProduct(newProductArray);
          break;
        }
        case "oldest": {
          const allProduct = await FetchAllProduct();
          let newProductArray = [...allProduct.reverse()];
          setAllProduct(newProductArray);
          break;
        }
        case "higest": {
          const allProduct = await FetchAllProduct();
          let newProductArray = allProduct
            .sort((a, b) => a.price - b.price)
            .reverse();
          setAllProduct(newProductArray);
          break;
        }
        case "lowest": {
          const allProduct = await FetchAllProduct();
          let newProductArray = allProduct.sort((a, b) => a.price - b.price);
          setAllProduct(newProductArray);
          break;
        }
      }
    }
    SortHandler();
  }, [productSort]);
  useEffect(() => {
    if (products.length !== 0) {
      let sortedProduct = products.sort((a, b) => a.price - b.price);

      setFirstMin(sortedProduct[0].price);
      setFirstMax(sortedProduct[sortedProduct.length - 1].price);
    }
  }, []);
  return (
    <main className="grid lg:grid-cols-[2fr_10fr] grid-cols-[1fr] lg:gap-4 gap-0 xl:px-20 sm:px-6 px-3 moraba-regular md:mt-10 mt-3">
      <button
        onClick={() => {
          setIsFilterSectionOpen(!isFilterSectionOpen);
        }}
        className="bg-white w-full lg:hidden flex items-center rounded-t-lg justify-between px-3 py-2 border-b"
      >
        <span>فیلتر پیشرفته</span>
        <IoIosArrowDown
          className={`${
            isFilterSectionOpen ? "rotate-180" : "rotate-0"
          } transition`}
        />
      </button>
      <section
        className={`px-3 py-3 lg:flex ${
          isFilterSectionOpen ? "flex" : "hidden"
        } flex-col gap-4 bg-white lg:rounded-lg rounded-b-lg`}
      >
        <div className="flex flex-col gap-6 border-b border-gray-300 pb-4 text-zinc-800">
          <label className="text-lg font-bold">فیلتر براساس قیمت</label>
          <MultiRangeSlider
            min={firstMin}
            max={firstMax}
            onChange={({ min, max }) => {
              setMaxValue(max);
              setMinValue(min);
            }}
          />
          <button
            onClick={PriceFilterHandler}
            className="w-full bg-zinc-300 border-zinc-800 text-zinc-800 border py-2 rounded-xs hover:bg-zinc-400 transition"
          >
            اعمال فیلتر
          </button>
        </div>
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-6">
          <label className="text-lg font-bold">انتخاب بر اساس امتیاز</label>
          <button
            onClick={() => {
              ScoreFilterHandler(0);
            }}
            className={`${
              scoreFilter === 0 ? "translate-y-1 shadow-xs" : "shadow-lg"
            } flex items-center hover:translate-y-1 transition duration-500 hover:shadow-xs justify-center text-xl bg-white bg-zinc-50 shadow-black/10 py-2 px-2 rounded-lg`}
          >
            {Array.from({ length: 5 }).map((e, i) => (
              <IoStarOutline key={i} className="text-zinc-500" />
            ))}
          </button>
          {Array.from({ length: 5 }).map((e, i) => (
            <button
              key={i}
              onClick={() => {
                ScoreFilterHandler(i + 1);
              }}
              className={`${
                scoreFilter === i + 1 ? "translate-y-1 shadow-xs" : "shadow-lg"
              } flex items-center hover:translate-y-1 transition duration-500 hover:shadow-xs justify-center text-xl bg-white bg-zinc-50 shadow-black/10 py-2 px-2 rounded-lg`}
            >
              {Array.from({ length: i + 1 }).map((e, i) => (
                <IoStar key={i} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - (i + 1) }).map((e, i) => (
                <IoStarOutline key={i} className="text-zinc-500" />
              ))}
            </button>
          ))}
        </div>
      </section>
      <section className="lg:mt-0 mt-4">
        <nav className="flex items-center justify-between bg-white px-4 py-3 rounded-lg">
          <div className="flex sm:gap-3 gap-1 items-center text-zinc-800">
            <Link href={"/"} className="text-zinc-500 hover:text-zinc-800">
              خانه
            </Link>
            <span>/</span>
            <span>فروشگاه</span>
          </div>
          <div className="flex gap-6">
            <div className="md:flex hidden text-zinc-800 gap-2 text-2xl">
              <TfiLayoutGrid4
                onClick={() => {
                  setGridCols(4);
                }}
                className={`${
                  gridCols === 4 ? "text-zinc-800" : "text-zinc-500"
                } hover:text-zinc-800 transition cursor-pointer text-[26px]`}
              />
              <TfiLayoutGrid3
                onClick={() => {
                  setGridCols(3);
                }}
                className={`${
                  gridCols === 3 ? "text-zinc-800" : "text-zinc-500"
                } hover:text-zinc-800 transition cursor-pointer`}
              />
              <TfiLayoutGrid2
                onClick={() => {
                  setGridCols(2);
                }}
                className={`${
                  gridCols === 2 ? "text-zinc-800" : "text-zinc-500"
                } hover:text-zinc-800 transition cursor-pointer`}
              />
            </div>
            <select
              value={productSort}
              onChange={(e) => {
                setProductSort(e.target.value);
              }}
              className="sm:pl-24 pl-2 border-b-2 border-zinc-800 py-1 outline-hidden rounded-xs cursor-pointer"
            >
              <option value={"newest"}>بر اساس جدیدترین</option>
              <option value={"oldest"}>بر اساس قدیمی ترین</option>
              <option value={"higest"}>بر اساس گران ترین</option>
              <option value={"lowest"}>بر اساس ارزان ترین</option>
            </select>
          </div>
        </nav>
        {isFilterOn && (
          <button
            onClick={DeleteFilterHandler}
            className="flex w-full items-center gap-4 hover:bg-zinc-300 transition cursor-pointer bg-zinc-200 mt-4 p-2 rounded-lg border-zinc-700 border-2 border-dashed"
          >
            <IoCloseSharp className="text-xl" />
            <span>حذف فیلتر</span>
          </button>
        )}
        <div
          className={`grid ${
            gridCols === 4 && "md:grid-cols-[3fr_3fr_3fr_3fr]"
          } ${gridCols === 3 && "md:grid-cols-[4fr_4fr_4fr]"} ${
            gridCols === 2 && "md:grid-cols-[6fr_6fr]"
          } gap-4 mt-4 grid-cols-[6fr_6fr]`}
        >
          {allProduct.map((e, i) => (
            <ProductItem
              key={i}
              title={e.title}
              score={e.score}
              price={e.price}
              image={e.images[0]}
              id={e._id}
            />
          ))}
          {loading &&
            Array.from({ length: 8 }).map((e, i) => (
              <div
                key={i}
                className="w-full h-[400px] rounded-lg bg-gray-300 animate-pulse"
              ></div>
            ))}
        </div>
        {!loading && allProduct.length === 0 && (
          <div className="flex flex-col gap-2 text-4xl items-center justify-center w-full h-[60vh]">
            <TbShoppingCartOff className="text-9xl text-zinc-300" />
            <h2 className="moraba-bold text-zinc-700">محصولی موجود نیست</h2>
          </div>
        )}
      </section>
    </main>
  );
  async function FetchAllProduct() {
    const res = await axios.get("/api/product");
    return res.data.data;
  }
  async function PriceFilterHandler() {
    setIsFilterSectionOpen(false);
    setIsFilterOn(true);
    const allProduct = await FetchAllProduct();
    const filteredProduct = allProduct.filter(
      (e) => e.price >= minValue && e.price <= maxValue
    );
    setAllProduct(filteredProduct);
  }
  async function ScoreFilterHandler(input) {
    setIsFilterSectionOpen(false);
    setIsFilterOn(true);
    setScoreFilter(input);
    const allProduct = await FetchAllProduct();
    const filteredProduct = allProduct.filter((e) => e.score === input);
    setAllProduct(filteredProduct);
  }
  async function DeleteFilterHandler(params) {
    setAllProduct(await FetchAllProduct());
    setIsFilterOn(false);
    setScoreFilter(null);
  }
}
