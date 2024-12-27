import React, {useState, useRef} from 'react';
import { GrFormNextLink } from "react-icons/gr";  //리액트 아이콘
import { GrFormPreviousLink } from "react-icons/gr";
import { RxPause } from "react-icons/rx";
import { IoIosPlay } from "react-icons/io";

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// data 불러오기
import data from '../data/data';

const MainSlider = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);  //페이지 네이션으로 사용
  const [swiper, setSwiper] = useState(null); // 슬라이드용으로 사용
  const [textSwiperIndex, setTextSwiperIndex] = useState(0);  //텍스트 슬라이드용
  const [textSwiper, setTextSwiper] = useState(null); //텍스트 슬라이드용 스와이퍼
  const [bgColor, setBgColor]  = useState();  //이미지에 따라 배경색을 변경(슬라이드 될때마다 변경)

  const swiperRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);  //제어버튼
  const [isActive, setIsActive] = useState(false);  //active 버튼

  //왼쪽버튼(<-) 클릭했을때
  const prev = () => {
    swiper?.slidePrev();
    textSwiper?.slidePrev();
  }
  //오른쪽버튼(->) 클릭했을때
  const next = () => {
    swiper?.slideNext();
    textSwiper?.slideNext();
  }
  const autoPlayToggle = () => {
    if(swiper && swiper.autoplay && textSwiper && textSwiper.autoplay){
      if(swiper.autoplay.running && textSwiper.autoplay.running){
        textSwiper.autoplay.stop();
        swiper.autoplay.stop();
        setIsAutoplayPaused(true);
      }
      else{
        textSwiper.autoplay.start();
        swiper.autoplay.start();
        setIsAutoplayPaused(false);
      }
    }


    setIsActive(!isActive);
    
  }


  return (
    <div className={`mySwiper mainslider`} style={{background: bgColor}}>
      <div className="cont">
        <Swiper
          
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1} //슬라이드가 보이는 갯수
          speed={1500}
          autoplay={
            {
              delay: 4000,  //4초
              disableOnInteraction: false,
            }
          }
          loop
          onSwiper={(swiper) => {setTextSwiper(swiper); swiperRef.current = swiper}}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          className='textSlide'
        >
          {
            data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="tit_wrap">
                  <em>{item.textT}</em>
                  <strong>{item.textblod}</strong>
                  <a href={item.textLink}>자세히보기</a>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className="img_wrap">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          speed={1500}
          slidesPerView={'auto'} //슬라이드가 보이는 갯수
          autoplay={
            {
              delay: 4000,  //4초
              disableOnInteraction: false,
            }
          }
          loop
          onSwiper={(swiper) => {setSwiper(swiper); swiperRef.current = swiper}}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          onSlideChange={(e) => {
            const realIndex = e.realIndex;
            const bgColors = ['rgb(98, 197, 233)', 'rgb(255, 213, 173)', 'rgb(255, 205, 212)']  //배경색 설정
            setBgColor(bgColors[realIndex]
            )
            const progressWidth = ((realIndex + 1) / data.length) * 100;

            const progressBar = document.querySelector('.fill')
            if(realIndex === 0 && e.activeIndex !== 0){
              progressBar.style.transition = 'none';
              progressBar.style.width = '0%';

              setTimeout(() => {
                progressBar.style.transition = 'width .3s ease'
              }, 50);
              if(e.activeIndex !== 0){
                progressBar.style.transition = 'width .3s ease';
                progressBar.style.width = `${progressWidth}%`;
              }
            }
            else{
              progressBar.style.width = `${progressWidth}%`;
            }

            setSwiperIndex(realIndex)
          }}
          // onReachEnd={() => {
          //   document.querySelector('.fill').style.width = '0%';
          //   setSwiperIndex(0)
          // }}

          className='mainSwiper'
        >
          {
            data.map((item) => (
              <SwiperSlide key={item.id}><img src={process.env.PUBLIC_URL + item.img} alt={item.textT} /></SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className="page_box">
        <div className="page">
          <div className="swiper_progress_bar">
            <div className='slider-bar'>
              <div className="fill"></div>
            </div>
          </div>
          <div className="swiper-pagination">
            <span>{swiperIndex+1}</span>
            <span> / </span>
            <span>{data.length}</span>
          </div>
          <div className="swiper_btn">
            <div className="swiperPrevBtn" onClick={prev}><GrFormPreviousLink /></div>
            <div className="btn-auto">
              <div className="btn-stop" onClick={autoPlayToggle}>
                {
                  isActive ?  <IoIosPlay /> : <RxPause />
                }
               </div>
            </div>
            <div className="swiperNextBtn" onClick={next}><GrFormNextLink /></div>
            
          </div>
        </div>
      </div>
      {/* <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1} //슬라이드가 보이는 갯수
        navigation
        autoplay={
          {
            delay: 4000,  //4초
            disableOnInteraction: false,
          }
        }
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/images/slider01.jpg'} alt="mainImg1" /></SwiperSlide>
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/images/slider02.png'} alt="mainImg2" /></SwiperSlide>
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/images/slider03.jpg'} alt="mainImg3" /></SwiperSlide>
      </Swiper> */}
    </div>
  );
};

export default MainSlider;