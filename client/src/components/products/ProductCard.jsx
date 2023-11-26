import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';

const ProductCard = ({ cols, product }) => {
    const images = [
        'https://images.unsplash.com/photo-1700574979184-da204dd04079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1700669211625-e8ee85edce45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    console.log(product);

    return (
        <div className={`grid grid-cols-${cols} grid-flow-row gap-4`}>
            <div className={`flex flex-col gap-2 max-w-1/${cols}`}>
                <div className='relative group'>
                    <img
                        src={
                            images.length
                                ? images[currentImageIndex]
                                : 'https://images.unsplash.com/photo-1700574979184-da204dd04079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8'
                        }
                        alt={`Product ${currentImageIndex + 1}`}
                        className={`h-70 object-cover fade-out`}
                    />

                    {images.length > 0 && (
                        <div className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                            <button
                                onClick={handlePrevClick}
                                className='absolute top-1/2 left-4 transform -translate-y-1/2'
                            >
                                <IoIosArrowDropleftCircle className='text-white w-6 h-6' />
                            </button>
                            <button
                                onClick={handleNextClick}
                                className='absolute top-1/2 right-4 transform -translate-y-1/2'
                            >
                                <IoIosArrowDroprightCircle className='text-white w-6 h-6' />
                            </button>
                        </div>
                    )}

                    <div className='absolute w-full flex justify-center gap-2 px-2 py-1 text-white bottom-0 left-0 opacity-0 transition-opacity duration-200 bg-black/50 group-hover:opacity-100'>
                        {product.options.map((option) => (
                            <span
                                className='cursor-pointer font-regular  transition duration-200 hover:font-semibold'
                                key={option}
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <h3 className='text-md font-semibold'>
                        {product.product_name}
                    </h3>
                    <p className='text-sm text-right'>${product.price}</p>
                </div>

                <button className='font-semibold py-2 border w-full mx-auto px-4'>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    cols: PropTypes.number,
    product: PropTypes.object,
};
