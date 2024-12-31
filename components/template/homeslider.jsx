"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function HomeSlider() {
  return (
    <section className="w-full sm:mt-[90px] mt-[65px] lg:h-[600px] md:h-[500px] sm:h-[400px] h-[200px]">
      <Swiper
        className="w-full h-full"
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: "5000", disableOnInteraction: false }}
        grabCursor
      >
        <SwiperSlide className="w-full h-full">
          <img
            src={"/img/bg-photo/photo_2024-10-24_15-45-52.jpg"}
            alt="slide0"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <img
            src={"/img/bg-photo/photo_2024-10-24_15-46-19.jpg"}
            alt="slide1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <img
            src={"/img/bg-photo/photo_2024-10-24_15-46-26.jpg"}
            alt="slide2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
