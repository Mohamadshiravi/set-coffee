import SendTiketForm from "@/components/template/p-user/send-tiket-form";
import departmentModel from "@/models/department";
import ConnectTODb from "@/utils/connecttodb";

export default async function WriteTicketForm() {
  await ConnectTODb();
  const departments = await departmentModel.find({});
  return (
    <main className="w-full h-screen flex items-center justify-center p-6">
      <section className="bg-stone-200 p-4 lg:w-[700px] w-full m-auto rounded-lg my-8">
        <h2 className="moraba-bold text-stone-700 text-xl text-center">
          ارسال تیکت
        </h2>
        <hr className="border my-4 border-gray-200"></hr>
        <SendTiketForm departments={JSON.parse(JSON.stringify(departments))} />
      </section>
    </main>
  );
}
