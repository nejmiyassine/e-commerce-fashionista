import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from 'swiper/modules';

import HeroImage from '../../assets/hero2.png';
import HeroImage1 from '../../assets/Hero!.png';

const Hero = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={2}
            slidesPerView={1}
            navigation={{
                nextEl: '.button.next.slide',
                prevEl: '.button.prev.slide',
            }}
            autoplay={{
                delay: 5000, // in milliseconds
                disableOnInteraction: false,
            }}
            loop={true}
        >
            <SwiperSlide>
                <div
                    className='bg-cover h-screen md:h-[36rem] w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center'
                    style={{
                        backgroundImage: `url(${HeroImage})`,
                    }}
                >
                    <div className='w-1/2 ml-8'>
                        <h2 className='text-6xl text-black capitalize'>
                            Enjoy Our <br /> Black Friday Deals
                        </h2>
                        <p className='text-lg text-gray-400 mt-4 mb-2 italic capitalize'>
                            Elevate your style and indulge in the season is
                            hottest trends
                        </p>
                        <button className='mt-3 bg-black text-white py-2 px-4 rounded hover:bg-primaryColor-blueCyan hover:text-white-300'>
                            {' '}
                            <Link to='/catalog'>Shop Now</Link>
                        </button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div
                    className='bg-cover h-screen md:h-[36rem] w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center'
                    style={{
                        backgroundImage: `url(${HeroImage1})`,
                    }}
                >
                    <div className='text-center italic items-center w-[80rem]'>
                        <h2 className='text-6xl text-black capitalize font-poppins text-center'>
                            Where Trends <br /> Meet Timelessness
                        </h2>
                        <p className='text-xl text-gray-500 mt-4 mb-2 mx-1 italic text-center'>
                            Elevate Your Wardrobe, Elevate Your Confidence!
                        </p>
                        <button className='mt-3 bg-black text-white py-2 px-4 rounded hover:bg-primaryColor-blueCyan hover:text-white-300'>
                            <Link to='/catalog'>Discover Our Collection</Link>
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
