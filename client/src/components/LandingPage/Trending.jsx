import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import slider_image_1 from '../../assets/style3.jpg';
import slider_image_2 from '../../assets/style2.jpg';
import slider_image_3 from '../../assets/style4.jpg';
import slider_image_4 from '../../assets/style6.jpg';
import slider_image_5 from '../../assets/style7.jpg';
import slider_image_6 from '../../assets/style5.jpg';
import slider_image_7 from '../../assets/style1.jpg';
import slider_image_8 from '../../assets/style8.jpg';

import Women from '../../assets/women.jpg'

const Trending = () => {
  return (
    <div className="trending-container py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:py-5 font-poppins capitalize italic font-bold text-center">
@Fashionista      </h2>
<h3 className="text-2xl text-yellow-600 md:text-3xl lg:text-4xl xl:text-5xl py-3 md:py-5 font-poppins capitalize font-semibold text-center">
Enjoy Our Timeless Style      </h3>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={4}
        slidesPerView={4}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation
        pagination={{ el: '.swiper-pagination', clickable: true }}
        modules={[Navigation, EffectCoverflow, Pagination, Scrollbar, A11y]}
      >
        {[slider_image_1, slider_image_2, slider_image_3, slider_image_4, slider_image_5, slider_image_6, slider_image_7, slider_image_8, Women].map(
          (image, index) => (
            <SwiperSlide key={index}>
              <img className="w-full object-cover cursor-pointer rounded-xl md:pb-8 lg:pb-10" src={image} alt="" />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default Trending;
