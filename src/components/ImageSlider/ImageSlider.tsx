"use client";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ImageSlider.module.css";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="sticky top-[64px]">
      <Swiper
        style={{
          //   @ts-ignore
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className={`${styles.mySwiper2} ${"min-h-full max-h-[600px]"}`}
      >
        {images.map((img: string, index: number) => (
          <SwiperSlide key={index}>
            <Image
              alt=""
              height={650}
              width={650}
              src={img}
              className="object-contain h-full justify-self-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2">
        <Swiper
          onSwiper={setThumbsSwiper as (swiper: any) => void}
          loop={true}
          spaceBetween={10}
          direction="horizontal"
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${
            styles.mySwiper
          } ${"max-h-[100px] min-h-[100px] flex flex-row"}`}
        >
          {images.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <img src={img} className="h-[100px] justify-self-center" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
