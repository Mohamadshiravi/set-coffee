import ProductItem from "@/components/module/productitem";
import { IconButton, MenuItem, Select, Skeleton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbShoppingCartOff } from "react-icons/tb";
import {
  TfiLayoutGrid2,
  TfiLayoutGrid3,
  TfiLayoutGrid4,
} from "react-icons/tfi";

export default function RenderProductSection({ products, setFilter, loading }) {
  const [gridCols, setGridCols] = useState(4);
  const [productSort, setProductSort] = useState("newest");

  useEffect(() => {
    async function SortHandler() {
      switch (productSort) {
        case "newest": {
          const allProduct = [...products];
          let newProductArray = allProduct;
          setFilter(newProductArray);
          break;
        }
        case "oldest": {
          const allProduct = [...products];
          let newProductArray = [...allProduct.reverse()];
          setFilter(newProductArray);
          break;
        }
        case "higest": {
          const allProduct = [...products];
          let newProductArray = allProduct
            .sort((a, b) => a.price - b.price)
            .reverse();
          setFilter(newProductArray);
          break;
        }
        case "lowest": {
          const allProduct = [...products];
          let newProductArray = allProduct.sort((a, b) => a.price - b.price);
          setFilter(newProductArray);
          break;
        }
      }
    }
    SortHandler();
  }, [productSort]);

  return (
    <section className="lg:mt-0 mt-4">
      <nav className="flex items-center justify-between bg-white px-4 py-3 rounded-lg">
        <div className="flex sm:gap-3 gap-1 items-center text-zinc-800">
          <Link href={"/"} className="text-zinc-500 hover:text-zinc-800">
            خانه
          </Link>
          <span>/</span>
          <span>فروشگاه</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="md:flex hidden text-zinc-800 text-2xl">
            <IconButton
              color={`${gridCols === 4 && "primary"}`}
              onClick={() => {
                setGridCols(4);
              }}
            >
              <TfiLayoutGrid4 />
            </IconButton>
            <IconButton
              color={`${gridCols === 3 && "primary"}`}
              onClick={() => {
                setGridCols(3);
              }}
            >
              <TfiLayoutGrid3 />
            </IconButton>
            <IconButton
              color={`${gridCols === 2 && "primary"}`}
              onClick={() => {
                setGridCols(2);
              }}
            >
              <TfiLayoutGrid2 />
            </IconButton>
          </div>
          <div className="moraba-regular sm:w-[200px] w-[150px]">
            <Select
              onChange={(e) => {
                setProductSort(e.target.value);
              }}
              value={productSort}
              fullWidth
              color="primary"
              size="small"
            >
              <MenuItem value={"newest"}>جدید ترین ها</MenuItem>
              <MenuItem value={"oldest"}>قدیمی ترین ها</MenuItem>
              <MenuItem value={"higest"}>گران ترین ها</MenuItem>
              <MenuItem value={"lowest"}>ارزان ترین ها</MenuItem>
            </Select>
          </div>
        </div>
      </nav>

      <div
        className={`grid ${
          gridCols === 4 && "md:grid-cols-[3fr_3fr_3fr_3fr]"
        } ${gridCols === 3 && "md:grid-cols-[4fr_4fr_4fr]"} ${
          gridCols === 2 && "md:grid-cols-[6fr_6fr]"
        } gap-4 mt-4 grid-cols-[6fr_6fr]`}
      >
        {products?.map((e, i) => (
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
            <Skeleton
              key={i}
              sx={{ bgcolor: "grey.100", borderRadius: "5px" }}
              variant="rectangular"
              width={"100%"}
              animation="wave"
              height={"400px"}
            />
          ))}
      </div>
      {!loading && products?.length === 0 && (
        <div className="flex flex-col gap-2 text-4xl items-center justify-center w-full h-[60vh]">
          <TbShoppingCartOff className="text-9xl text-zinc-300" />
          <h2 className="moraba-bold text-zinc-700">محصولی موجود نیست</h2>
        </div>
      )}
    </section>
  );
}
