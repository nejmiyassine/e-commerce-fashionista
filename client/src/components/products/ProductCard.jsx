import PropTypes from 'prop-types';
import { useState } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
    MdOutlineStar,
    MdFavoriteBorder,
    MdDelete,
    MdEdit,
} from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../features/products/productsSlice';

const ProductCard = ({ product, isAdmin, categories, setDeleteModel }) => {
    const dispatch = useDispatch();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleUpdateProduct = (product) => {
        console.log(product);
        dispatch(setProduct(product));
    };

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : product.product_images.length - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < product.product_images.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <div className={`${isAdmin && 'bg-white rounded-md'}`}>
            <div className='relative group'>
                <img
                    src={
                        product.product_images.length &&
                        product.product_images[currentImageIndex]
                    }
                    alt={`Product: ${product.product_name}`}
                    // className={`h-[300px] w-full object-cover fade-out`}
                    className='object-contain w-full h-60'
                />

                <div className='z-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                    {isAdmin ? (
                        <div className='flex gap-1'>
                            <Link
                                to={`/admin/edit/product/${product._id}`}
                                className='absolute top-10 left-6 transform -translate-y-1/2 rounded-full bg-white p-2 shadow-md'
                                onClick={() => handleUpdateProduct(product)}
                            >
                                <MdEdit className='transition-all text-green-500 w-5 h-5' />
                            </Link>

                            <button
                                onClick={() => setDeleteModel(product._id)}
                                className='absolute top-10 right-6 transform -translate-y-1/2 rounded-full bg-white p-2 shadow-md'
                            >
                                <MdDelete className='transition-all text-red-500 w-5 h-5' />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleNextClick}
                            className='absolute top-10 right-6 transform -translate-y-1/2 rounded-full bg-white p-2 shadow-md'
                        >
                            <MdFavoriteBorder className='transition-all hover:text-red-500 w-5 h-5' />
                        </button>
                    )}
                </div>

                {product.product_images.length > 0 && (
                    <div className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <button
                            onClick={handlePrevClick}
                            className='absolute top-1/2 left-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowBack className='w-5 h-5' />
                        </button>
                        <button
                            onClick={handleNextClick}
                            className='absolute top-1/2 right-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowForward className='w-5 h-5' />
                        </button>
                    </div>
                )}

                {/* {isAdmin && ( */}
                    <div className='absolute w-full flex justify-center gap-2 px-2 py-1 text-white bottom-6 left-0 opacity-0 transition-opacity duration-200  group-hover:opacity-100'>
                        <button className='flex items-center gap-1 rounded-md bg-black/70 text-white hover:bg-black font-semibold transition-all  py-2 mx-auto px-4'>
                            <FaCartPlus />
                            <span>Add to cart</span>
                        </button>
                    </div>
                {/* )} */}
            </div>

            <div className='flex flex-col gap-1 py-2 px-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex'>
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                    </div>
                    {isAdmin && (
                        <p className='text-gray-500'>
                            {product?.category_id.name
                                ? product?.category_id.name
                                : categories.find(
                                      (cat) => cat._id === product?.category_id
                                  )?.name}
                        </p>
                    )}
                </div>

                <Link
                    to={`${
                        isAdmin
                            ? `/admin/product/${product._id}`
                            : `/shop/product/${product._id}`
                    }`}
                >
                    <h3 className='text-xl font-bold'>
                        {product.product_name}
                    </h3>
                </Link>

                <p className='font-semibold text-sm'>${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    // cols: PropTypes.number,
    isAdmin: PropTypes.any,
    product: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.object),
    setEditModel: PropTypes.func,
    setDeleteModel: PropTypes.func,
};
