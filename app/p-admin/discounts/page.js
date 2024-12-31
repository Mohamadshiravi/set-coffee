import DiscountForm from "@/components/template/p-admin/add-discount-form";
import Discount from "@/components/template/p-admin/discount";
import discountModel from "@/models/discount";
import ConnectTODb from "@/utils/connecttodb";

export default async function DiscountPage() {
  await ConnectTODb();
  const allDiscount = await discountModel.find({});
  return (
    <section className="px-6 text-zinc-700">
      <div className="bg-white p-4 mt-6 rounded-lg">
        <h2 className="moraba-bold text-2xl text-zinc-700">
          افزودن کد تخفیف جدید
        </h2>
        <DiscountForm />
      </div>
      <div className="bg-white rounded-lg mt-6 w-full px-8 pb-8 mb-10">
        <h3 className="py-8 block moraba-bold text-2xl border-b-2">
          کد های موجود
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {allDiscount.map((e, i) => (
            <Discount
              key={i}
              code={e.code}
              precent={e.precent}
              use={e.use}
              maxUse={e.maxUse}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
