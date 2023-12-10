import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
    EffectCoverflow,
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
} from 'swiper/modules';

import { getAllProducts } from '../../features/products/productsSlice';
import LoadingSpinner from '../LoadingSpinner';
import { sliceText } from '../../utils/sliceText';
import { Link } from 'react-router-dom';

const Product = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='mx-4 md:mx-8 lg:mx-20'>
            <div>
                <h2 className='text-3xl md:text-4xl lg:text-5xl py-3 md:py-5 font-bold text-center text-gray-900'>
                    New Arrivals:
                </h2>
            </div>

            <div className='swiper-container' style={{ width: '100%' }}>
                <Swiper
                    // effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={300}
                    slidesPerView={1}
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
                        depth: 5,
                        modifier: 1.5,
                    }}
                    navigation
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    modules={[
                        Navigation,
                        EffectCoverflow,
                        Pagination,
                        Scrollbar,
                        A11y,
                    ]}
                >
                    {products.slice(0, 6).map((product, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative w-[18rem] px-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
                                <img
                                    className='object-contain object-center relative mt-3 flex h-60 w-full overflow-hidden rounded-xl'
                                    src={product.product_images[0]}
                                    alt='product image'
                                />
                                <span className='absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white'>
                                    {product.discount}
                                </span>
                                <div className='mt-4 px-5 pb-5'>
                                    <Link to={`/shop/product/${product._id}`}>
                                        <h5 className='text-sm font-semibold tracking-tight'>
                                            {sliceText(
                                                product.product_name,
                                                25
                                            )}
                                        </h5>
                                    </Link>
                                    <div className='mt-2 mb-3 flex items-center gap-1'>
                                        <span className='text-xl font-bold'>
                                            ${product.discount_price}
                                        </span>
                                        <span className='text-sm text-slate-900 line-through'>
                                            ${product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Product;
