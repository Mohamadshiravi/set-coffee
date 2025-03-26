import RenderProductsSection from "@/components/template/p-admin/products/renderProductsSection";
import productModel from "@/models/product";
import ConnectTODb from "@/utils/connecttodb";
import { SlBag } from "react-icons/sl";

export default async function ProductsAdminPage() {
  await ConnectTODb();
  const allProduct = await productModel.find({}, "_id");

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
      <RenderProductsSection />
    </section>
  );
}
