export default async function UserOrderpage() {
  return (
    <>
      <h2 className="lg:text-center text-left lg:border-none w-full lg:text-3xl text-xl text-headcolor mt-3 pl-4 moraba-bold py-8 border-b-2 border-zinc-300">
        سفارش های شما
      </h2>
      <div className="p-6">
        <div className="bg-gray-100 flex flex-col sm:gap-4 gap-20 shabnam p-4 rounded-lg">
          <h3 className="moraba-regular text-center text-2xl w-full py-10">
            شما تابحال سفارشی نداشته اید
          </h3>
        </div>
      </div>
    </>
  );
}
