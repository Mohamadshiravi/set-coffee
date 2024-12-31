export default function MoreDetails({ smell, suitableFor, weight }) {
  return (
    <section
      className="flex flex-col gap-4 sm:p-0 p-4"
      data-aos="fade"
      data-aos-duration="300"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold sm:text-lg text-sm">وزن</span>
        <span className="sm:text-base text-xs">{weight} کیلوگرم</span>
      </div>
      <hr className="border w-full"></hr>
      <div className="flex items-center justify-between">
        <span className="font-bold sm:text-lg text-sm">میزان بو دادن</span>
        <span className="sm:text-base text-xs">{smell}</span>
      </div>
      <hr className="border w-full"></hr>
      <div className="flex items-center justify-between">
        <span className="font-bold sm:text-lg text-sm">مناسب برای</span>
        <span className="sm:text-base text-xs">{suitableFor}</span>
      </div>
    </section>
  );
}
