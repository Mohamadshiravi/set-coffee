"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ProductItem from "@/components/module/productitem";

export default function LastestProductSlider({ lastestProduct }) {
  return (
    <section className="w-full mt-20">
      <div data-aos="fade-left" className="w-full">
        <h2 className="moraba-bold text-center sm:text-4xl text-3xl text-headcolor">
          محصولات مرتبط
        </h2>
      </div>
      <div className="mt-10 w-full m-auto">
        <Swiper
          modules={[Pagination]}
          style={{
            "--swiper-pagination-color": "#755f56",
          }}
          pagination={true}
          breakpoints={{
            1100: {
              slidesPerView: 4,
            },
            720: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 2,
            },
          }}
          slidesPerView={3}
          className="w-full"
          spaceBetween={"20px"}
          grabCursor
        >
          {lastestProduct.map((e, i) => (
            <SwiperSlide key={i}>
              <ProductItem
                img={"/img/product-photo/product-1.png"}
                title={e.title}
                score={e.score}
                price={e.price}
                id={e._id}
                image={e.images[0]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
