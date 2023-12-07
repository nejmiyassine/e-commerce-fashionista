import React from 'react';
// Import Swiper React components
import HeroImage from '../../assets/hero2.png';
import HeroImage1 from '../../assets/Hero!.png';
import {Link} from 'react-router-dom';


import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';


const Hero = () => {


    return (
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={2}
        slidesPerView={1}
        navigation={{
            nextEl: '.button.next.slide',
            prevEl: '.button.prev.slide'
        }}
        autoplay={{
            delay: 5000, // in milliseconds
            disableOnInteraction: false,
        }}
        loop={true}

    >
            <SwiperSlide>
                <div
    className='bg-cover h-screen sm:h-auto w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center'
    style={{
                        backgroundImage: `url(${HeroImage})`,
                    }}
                >
                    <div className='w-1/2 ml-8'>
                        <h2 className='text-6xl text-black capitalize'>
                            Enjoy Our <br /> Black Friday Deals
                        </h2>
                        <p className='text-xl text-yellow-600 mt-4 italic capitalize'>
                            Elevate your style and indulge in the season's hottest trends

                        </p>
                        <button className= "mt-3 bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 hover:text-white-300"> <Link  to="/catalog">
                            Shop Now</Link>
                        </button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div
    className='bg-cover h-screen sm:h-auto w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center'
    style={{
                        backgroundImage: `url(${HeroImage1})`,
                    }}
                >
                    <div className='text-center italic items-center w-[80rem]'>
                        <h2 className='text-6xl text-black capitalize font-poppins text-center'>
                        Where Trends  <br />  Meet Timelessness
                        </h2>
                        <p className='text-xl text-orange-700 mt-4 mx-1 italic text-center'>
                        Elevate Your Wardrobe, Elevate Your Confidence!
                        </p>
                        <button className= "mt-3 bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 hover:text-white-300"> <Link  to="/catalog">
                            Discover Our Collection   </Link>             </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
