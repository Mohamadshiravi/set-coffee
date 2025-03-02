import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MultiRangeSlider from "../multi-range-select";
import { Button, IconButton, Rating } from "@mui/material";
import { GrPowerReset } from "react-icons/gr";

export default function FilterSection({ setFilter, FetchAllProduct }) {
  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);
  const [minRange, setMinRange] = useState(null);
  const [maxRange, setMaxRange] = useState(null);
  const [isFilterOn, setIsfilterOn] = useState(false);

  const [firstRange, setFirstRange] = useState([0, 0]);

  const [score, setScore] = useState(0);

  async function SetMinAndMax() {
    const products = await FetchAllProduct();
    let sortedProduct = products.sort((a, b) => a.price - b.price);

    setFirstRange([
      sortedProduct[0].price,
      sortedProduct[sortedProduct.length - 1].price,
    ]);
  }

  useEffect(() => {
    SetMinAndMax();
  }, []);

  return (
    <>
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
        {isFilterOn && (
          <Button
            variant="contained"
            onClick={async () => {
              setFilter(await FetchAllProduct());
              if (score !== 0) {
                setScore(0);
              }
              if (minRange || maxRange) {
                SetMinAndMax();
                setFirstRange([0, 0]);
              }
              setIsfilterOn(false);
            }}
          >
            <GrPowerReset className="mx-2 text-lg" />
            حذف فیلتر ها
          </Button>
        )}
        <div className="flex flex-col gap-6 border-b border-gray-300 pb-4 text-zinc-800">
          <label className="text-base font-bold text-center">
            فیلتر براساس قیمت
          </label>

          <MultiRangeSlider
            min={firstRange[0]}
            max={firstRange[1]}
            onChange={(e) => {
              setMinRange(e.min);
              setMaxRange(e.max);
            }}
          />
          <Button
            variant="contained"
            onClick={PriceFilterHandler}
            color="primary"
          >
            اعمال فیلتر
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-base font-bold text-center">
            فیلتر بر اساس امتیاز
          </label>
          <div dir="ltr" className="flex flex-col items-center gap-3">
            <Rating
              defaultValue={0}
              precision={1}
              value={score}
              onChange={(e) => ScoreFilterHandler(Number(e.target.value))}
            />
          </div>
        </div>
      </section>
    </>
  );
  async function PriceFilterHandler() {
    if (minRange !== firstRange[0] || maxRange !== firstRange[1]) {
      setIsfilterOn(true);
      setIsFilterSectionOpen(false);

      const allProduct = await FetchAllProduct();

      const filteredProduct = allProduct.filter(
        (e) => e.price >= minRange && e.price <= maxRange
      );
      setFilter(filteredProduct);
    }
  }
  async function ScoreFilterHandler(input) {
    setIsfilterOn(true);
    setScore(input);
    setIsFilterSectionOpen(false);
    const allProduct = await FetchAllProduct();
    const filteredProduct = allProduct.filter((e) => e.score === input);
    setFilter(filteredProduct);
  }
}
