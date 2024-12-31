"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import ArticleItem from "../module/article";

export default function ArticlesSection({ params }) {
  return (
    <section className="w-full mt-20">
      <div data-aos="fade-left" className="w-full">
        <h2 className="moraba-bold text-center text-4xl text-headcolor">
          مقالات ما
        </h2>
        <h3 className="text-center moraba-regular text-zinc-700 mt-4">
          دانستنی های جذاب دنیای قهوه
        </h3>
      </div>
      <div className="mt-10 xl:w-10/12 w-11/12 m-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
          }}
          style={{
            "--swiper-pagination-color": "#fff",
          }}
          pagination={true}
          breakpoints={{
            1100: {
              slidesPerView: 3,
            },
            720: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          slidesPerView={3}
          className="w-full"
          spaceBetween={"20px"}
          grabCursor
        >
          <SwiperSlide>
            <ArticleItem />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleItem />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleItem />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleItem />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
