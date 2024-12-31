export default function Description({ desc }) {
  return (
    <section
      className="flex flex-col sm:gap-20 gap-14 sm:p-0 p-4"
      data-aos="fade"
      data-aos-duration="300"
    >
      <p className="text-justify text-lg mt-10 p-2">{desc}</p>
    </section>
  );
}
