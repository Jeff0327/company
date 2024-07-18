"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

type Props = {};

const LastView: React.FC<Props> = () => {
  return (
    <div className="flex flex-col min-h-[80vw] sm:min-h-[35vw] py-5">
      <Swiper
        spaceBetween={10}
        slidesPerView={1.3}
        centeredSlides={true}
        loop={true}
        speed={3000}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-[80vw] sm:h-[35vw]"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {[1, 2, 3, 4].map((index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center w-full h-full">
              <div className="relative w-[90%] h-full">
                <Image
                  alt={`swiper_${index}`}
                  src={`/image/swiper_${index}.jpg`}
                  width={1000}
                  height={1000}
                  className="object-cover sm:object-cover w-full h-full sm:h-[35vw] py-4"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LastView;
