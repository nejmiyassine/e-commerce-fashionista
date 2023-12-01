import React from 'react';

const Product = () => {
  const products = [
    // Product 1
    {
      imageSrc: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: '39% OFF',
      title: 'Nike Air MX Super 2500 - Red',
      price: 449,
      discountedPrice: 699,
      rating: 4,
      reviews: 24,
    },
    // Product 2
    {
      imageSrc: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: '39% OFF',
      title: 'Nike Air MX Super 2500 - Red',
      price: 449,
      discountedPrice: 699,
      rating: 4,
      reviews: 24,
    },
    // Product 3
    {
      imageSrc: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: '39% OFF',
      title: 'Nike Air MX Super 2500 - Red',
      price: 449,
      discountedPrice: 699,
      rating: 4,
      reviews: 24,
    },
  ];

  return (
    <div className='mx-4 md:mx-8 lg:mx-20'>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-900 capitalize font-mono">New Arrivals:</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="relative m-3 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
              <img className="object-cover" src={product.imageSrc} alt="product image" />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{product.discount}</span>
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
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
                  className="bg-black text-white py-2 px-4 rounded hover:bg-purple-600 hover:text-yellow-300"
                  onClick={() => console.log(`Add to Cart clicked for Product ${index + 1}`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
