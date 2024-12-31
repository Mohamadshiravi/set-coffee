import AddProductForm from "@/components/template/p-admin/add-product-form";
import PAdminProduct from "@/components/template/p-admin/p-admin-product";
import productModel from "@/models/product";
import ConnectTODb from "@/utils/connecttodb";
import { SlBag } from "react-icons/sl";

export default async function ProductsAdminPage() {
  await ConnectTODb();
  const allProduct = await productModel.find({}, "-__v", { sort: "-_id" });

  return (
    <section className="px-6">
      <div className="bg-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
        <div className="flex flex-col items-center gap-4 text-2xl">
          <span>مجموع محصولات سایت</span>
          <span className="font-mono font-bold text-5xl text-blue-500">
            {allProduct.length}
          </span>
        </div>
        <SlBag className="text-8xl" />
      </div>
      <section className="flex flex-col items-center bg-white my-8 rounded-lg p-4">
        <div className="lg:flex hidden gap-2 w-full justify-center moraba-bold text-zinc-700 text-lg border-b pb-3">
          <span className="w-[150px] text-center">عکس</span>
          <span className="w-[250px] text-center">عنوان</span>
          <span className="w-[250px] text-center">توضیحات کوتاه</span>
          <span className="w-[100px] text-center">امتیاز</span>
          <span className="w-[150px] text-center">قیمت</span>
          <span className="w-[150px] text-center">وضعیت</span>
        </div>

        <div className="flex flex-col gap-2">
          {allProduct.map((e, i) => (
            <PAdminProduct key={i} product={JSON.parse(JSON.stringify(e))} />
          ))}
        </div>
      </section>
      <section className="rounded-lg bg-white my-10 p-4 moraba-regular">
        <h2 className="moraba-bold text-2xl text-zinc-700">
          افزودن محصول جدید
        </h2>
        <AddProductForm />
      </section>
    </section>
  );
}
