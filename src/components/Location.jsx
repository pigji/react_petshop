import React, {useState} from 'react';
import datalocation from '../data/datalocation';
import { Link } from 'react-router-dom';
import './Location.scss';

//리액트 스와이퍼
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


const Location = () => {
  const [dataLocation] = useState(true);
  return (
    <div className='location'>
      <h2>Location</h2>
      <p>신규 가맹점..</p>
      <div className='slideLocation'>
        <Swiper
          className='locationSwiper'
          modules={[Navigation, Autoplay]}
          spaceBetween={5}
          slidesPerView={4} //화면에 보이는 슬라이드 갯수
          navigation
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false
          }}
          speed={5000}  //5초
          loopAdditionalSlides={1}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {
            datalocation.map((data) => {  /* map함수를 사용하여 데이터 뿌려줌 */
              return(
                <SwiperSlide key={data.id}>
                  <div className="locationList">
                    <Link to="">
                      <div className="imgBox">
                        <img src={process.env.PUBLIC_URL + data.img} alt={data.title} />
                      </div>
                      <div className='textBox'>
                        <p>{data.title}</p>
                      </div>
                      <div className='addBox'>
                        <p>{data.add}</p>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  );
};

export default Location;