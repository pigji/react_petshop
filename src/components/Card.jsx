import React from "react";
import { Autoplay } from "swiper/modules";

//리액트 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import datafresh from "../data/datafresh"; //datafresh.js 데이터 가져오기
import "../components/FreshBox.scss"; //스타일

const FreshBox = () => {
  return (
    <Swiper
      className="freshboxswiper"
      modules={[Autoplay]}
      speed={1500}
      autoplay={{
        delay: 3000, // 슬라이드 대기 시간 (ms)
        disableOnInteraction: false, // 사용자가 스와이프해도 autoplay 유지
      }}
      loop={true} // 루프 활성화
      spaceBetween={10} // 슬라이드 간 간격
      slidesPerView={4} // 한번에 보이는 슬라이드 개수
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      onSwiper={(swiper) => console.log(swiper)} // 디버깅용
      onSlideChange={() => console.log("slide change")} // 디버깅용
    >
      {datafresh.map((item, idx) => (
        <SwiperSlide className="freshWrap">
          <img src={item.img} alt="" />
          <div className="txt" key={idx}>
            <span className="freshNumber">{item.id + 1}</span>
            <strong>{item.title}</strong>
            <span className="price">{item.price}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FreshBox;
