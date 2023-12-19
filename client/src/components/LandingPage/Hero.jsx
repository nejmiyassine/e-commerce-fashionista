/* eslint-disable react/no-unescaped-entities */
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
import { FaChevronRight } from 'react-icons/fa';

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
                    className='relative bg-cover h-screen md:h-[36rem] text-center md:text-start w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center'
                    style={{
                        backgroundImage: `url(${HeroImage})`,
                    }}
                >
                    <div className='fixed inset-0 h-full bg-black opacity-50 md:opacity-0 md:hidden'></div>
                    <div className='w-full z-50 md:w-1/2 md:ml-8'>
                        <h2 className='text-3xl md:text-6xl font-bold text-black capitalize'>
                            Discover{' '}
                            <span className='text-primaryColor-gold'>
                                Trendsetting
                            </span>{' '}
                            Fashion
                        </h2>
                        <p className='text-sm md:text-md mx-auto md:mx-0 w-4/5 text-white md:text-gray-500 mt-4 mb-2 italic capitalize'>
                            Explore our handpicked collection of chic essentials
                            and statement pieces. Crafted to make you stand out,
                            our latest fashion speaks volumes about your
                            personality and passion. Stay trendy with us!
                        </p>
                        <button className='mt-3 bg-black text-white py-2 px-4 rounded  hover:text-primaryColor-gold'>
                            <Link
                                to='/shop'
                                className='flex items-center gap-2'
                            >
                                Shop Now
                                <FaChevronRight size={14} />
                            </Link>
                        </button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div
                    className='relative bg-cover h-screen md:h-[36rem] text-center md:text-start w-full bg-no-repeat bg-center py-10 sm:py-28 flex items-center justify-center'
                    style={{
                        backgroundImage: `url(${HeroImage1})`,
                    }}
                >
                    <div className='italic flex flex-col items-center justify-center w-[80rem]'>
                        <h2 className='text-center text-3xl w-4/5 md:text-6xl md:w-2/5 mx-auto font-bold text-black capitalize font-poppins text-center'>
                            Elevate Your{' '}
                            <span className='text-primaryColor-gold'>
                                Everyday{' '}
                            </span>
                            Style
                        </h2>

                        <p className='text-sm md:text-md text-gray-600 w-4/5 md:w-2/5 my-8 mx-auto'>
                            Unleash your individuality with our versatile
                            collection. Whether it's a casual day out or a
                            special occasion, our fashion adapts to your
                            lifestyle. Dive into a world where comfort meets
                            sophistication. Explore the extraordinary and
                            redefine your everyday style.
                        </p>
                        <button className='mt-3 bg-black text-white py-2 px-4 rounded hover:bg-primaryColor-gold hover:text-white-300'>
                            <Link to='/shop'>Discover Our Collection</Link>
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
