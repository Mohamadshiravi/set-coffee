import tiketModel from "@/models/tiket";
import ConnectTODb from "@/utils/connecttodb";
import Image from "next/image";

export default async function TiketDetails(props) {
  const params = await props.params;
  await ConnectTODb();
  const userTiket = await tiketModel
    .findOne({ _id: params.id }, "title isClosed body createdAt department")
    .populate("user", "role username");
  const tiketAnswer = await tiketModel
    .findOne(
      { answerFor: params.id },
      "title isClosed body createdAt department"
    )
    .populate("user", "role username");
  return (
    <section className="p-8">
      <div className="w-full rounded-lg grid grid-cols-[1fr] gap-4 px-10 pb-16 bg-gray-100">
        <div>
          <h2 className="moraba-regular sm:text-right text-center text-zinc-700 text-xl mt-6">
            {userTiket.title}
          </h2>
          <hr className="border border-gray-400 my-4"></hr>
        </div>

        <div className="rounded-lg bg-white sm:w-[400px] w-[240px] p-4 justify-self-start shadow-lg">
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-6">
            <Image
              alt="guest"
              src={"/img/bg-photo/guest.jpg"}
              width={500}
              height={500}
              className="rounded-full object-cover w-[90px] h-[90px] sm:mx-0 mx-auto"
            />
            <div className="flex flex-col gap-4 w-full">
              <div className="flex w-full justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-700 font-mono">
                    {userTiket.user.username}
                  </span>
                  <span className="text-zinc-500 text-xs moraba-regular">
                    {userTiket.user.role === "ADMIN" ? "مدیریت" : "کاربر"}
                  </span>
                </div>
                <h2 className="moraba-bold text-xs">
                  {new Date(userTiket.createdAt).toLocaleDateString("Fa-ir")}
                </h2>
              </div>
              <div className="moraba-regular text-base">
                <p className="p-1 sm:text-right text-center">
                  {userTiket.body}
                </p>
              </div>
            </div>
          </div>
        </div>

        {tiketAnswer ? (
          <div
            dir="ltr"
            className="bg-gray-500 rounded-lg sm:w-[400px] w-[240px] p-4 justify-self-end shadow-lg"
          >
            <div className="flex sm:flex-row flex-col sm:gap-2 gap-6">
              <Image
                src={"/img/bg-photo/guest.jpg"}
                width={500}
                height={500}
                className="rounded-full object-cover w-[90px] h-[90px] sm:mx-0 mx-auto"
              />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-100 font-mono">
                      {tiketAnswer.user.username}
                    </span>
                    <span className="text-zinc-400 text-xs moraba-regular">
                      {tiketAnswer.user.role === "ADMIN" ? "مدیریت" : "کاربر"}
                    </span>
                  </div>
                  <h2 className="moraba-bold text-xs">
                    {new Date(tiketAnswer.createdAt).toLocaleDateString(
                      "Fa-ir"
                    )}
                  </h2>
                </div>
                <div className="moraba-regular text-white text-base">
                  <p className="p-1 sm:text-right text-center">
                    {tiketAnswer.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="w-full text-center py-6 moraba-regular bg-gray-400 rounded-lg mt-20">
            هنوز جواب داده نشده
          </h2>
        )}
      </div>
    </section>
  );
}
