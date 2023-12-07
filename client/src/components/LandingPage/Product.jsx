import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productsSlice';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Product = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='mx-4 md:mx-8 lg:mx-20'>
      <div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl py-3 md:py-5 font-mono font-bold text-center text-gray-900">
New Arrivals:</h2>
      </div>
      <div className="swiper-container" style={{ width: '100%' }}>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={250}
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
        modules={[Navigation, EffectCoverflow, Pagination, Scrollbar, A11y]}
      >
        {products.slice(0, 8).map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-[18rem] px-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <a className="relative  mx-7 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover object-center" src={product.product_images[0]} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{product.discount}</span>
              </a>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">{product.product_name}</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                    <span className="text-sm text-slate-900 line-through">${product.discountedPrice}</span>
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} aria-hidden="true" className={`h-5 w-5 ${i < product.rating ? 'text-yellow-300' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-blue-950 text-yellow-300 py-2 px-4 rounded transition ease-in-out delay-150 hover:bg-yellow-300 hover:text-blue-950"
                    onClick={() => console.log(`Add to Cart clicked for Product ${index + 1}`)}
                  >
                    Add to Cart
                  </button>
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
