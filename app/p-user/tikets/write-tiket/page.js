import SendTiketForm from "@/components/template/p-user/send-tiket-form";
import departmentModel from "@/models/department";
import ConnectTODb from "@/utils/connecttodb";

export default async function WriteTicketForm() {
  ConnectTODb();
  const departments = await departmentModel.find({});
  return (
    <main>
      <section className="bg-gray-100 px-4 mx-6 rounded-lg py-4 my-8">
        <h2 className="moraba-bold text-zinc-700 text-xl text-center">
          ارسال تیکت
        </h2>
        <hr className="border my-4 border-gray-200"></hr>
        <SendTiketForm departments={JSON.parse(JSON.stringify(departments))} />
      </section>
    </main>
  );
}
