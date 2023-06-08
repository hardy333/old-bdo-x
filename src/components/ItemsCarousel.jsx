import React from "react";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";

const ItemsCarousel = ({ option, options, setOption }) => {
  return (
    <Swiper
      className="mySwiper"
      slidesPerView={5}
      spaceBetween={10}
      modules={[Pagination, Navigation]}
    >
           {/* <SwiperSlide key={"all"} onClick={() => setOption("all")}>
          <div
            className={`carousel-item ${option === "all" ? "active" : ""}`}
          >
            All
          </div>
        </SwiperSlide> */}
      
      {options.map((currOption) => (
        <SwiperSlide key={currOption} onClick={() => setOption(currOption)}>
          <div
            className={`carousel-item ${option === currOption ? "active" : ""}`}
          >
            {currOption}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ItemsCarousel;
