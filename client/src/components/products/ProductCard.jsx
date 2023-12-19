import PropTypes from 'prop-types';
import { useState } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineStar, MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';

import { setProduct } from '../../features/products/productsSlice';
import { useAddProductToCartMutation } from '../../app/api/cartApi';
import { addToFavorites } from '../../features/favorites/favoritesSlice';
import { sliceText } from '../../utils/sliceText';
import { VerticalDotsIcon } from '../../icons/Icons';

const ProductCard = ({ product, isAdmin, categories, setDeleteModel }) => {
    const dispatch = useDispatch();

    const [addProductToCart] = useAddProductToCartMutation();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleUpdateProduct = (product) => {
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

    const handleAddToCart = async () => {
        try {
            const quantity = 1;

            await addProductToCart({ productId: product?._id, quantity });

            toast.success('Product added to cart successfully', {
                position: 'bottom-right',
            });
        } catch (error) {
            console.error(error);
            toast.error('Error adding product to cart', {
                position: 'bottom-right',
            });
        }
    };

    const handleAddToFavorites = (productId) => {
        try {
            dispatch(addToFavorites(productId));
        } catch (error) {
            console.error(error);
            toast.error('Error adding product to favorites', {
                position: 'bottom-right',
            });
        }
    };

    return (
        <div className={`${isAdmin && 'rounded-md'}`}>
            <div className='relative group'>
                <img
                    src={
                        product.product_images.length &&
                        product.product_images[currentImageIndex]
                    }
                    alt={`Product: ${product.product_name}`}
                    className='object-cover w-full h-60 fade-out'
                />

                <div className='z-30 absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                    {isAdmin ? (
                        <div className='flex gap-1'>
                            <Dropdown className='bg-background border-1 border-default-200'>
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        radius='full'
                                        size='sm'
                                        variant='light'
                                    >
                                        <VerticalDotsIcon className='text-default-400 rotate-90' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem
                                        onClick={() =>
                                            handleUpdateProduct(product)
                                        }
                                    >
                                        <Link
                                            to={`/admin/edit/product/${product._id}`}
                                            className='flex items-center gap-2'
                                        >
                                            <p>Edit</p>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        className='flex items-center'
                                        onClick={() =>
                                            setDeleteModel(product._id)
                                        }
                                    >
                                        <p>Delete</p>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleAddToFavorites(product._id)}
                            className='absolute top-4 right-4 transform rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100'
                        >
                            <MdFavorite className='transition-all text-red-500 w-5 h-5' />
                        </button>
                    )}
                </div>

                {product.product_images.length > 0 && (
                    <div className='opacity-0 transition-opacity group-hover:opacity-100'>
                        <button
                            onClick={handlePrevClick}
                            className='absolute top-1/2 left-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowBack className='w-5 h-5 p-1 text-white bg-black/50 rounded-full' />
                        </button>
                        <button
                            onClick={handleNextClick}
                            className='absolute top-1/2 right-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowForward className='w-5 h-5 p-1 text-white bg-black/50 rounded-full' />
                        </button>
                    </div>
                )}
            </div>

            <div className='flex flex-col gap-1 py-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex'>
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                        <MdOutlineStar size={16} className='text-yellow-500' />
                    </div>

                    <p className='text-gray-500 text-sm'>
                        {product?.category_id.name
                            ? product?.category_id.name
                            : categories.find(
                                  (cat) => cat._id === product?.category_id
                              )?.name}
                    </p>
                </div>

                <Link
                    to={`${
                        isAdmin
                            ? `/admin/product/${product._id}`
                            : `/shop/product/${product._id}`
                    }`}
                >
                    <h3 className='text-md font-bold'>
                        {sliceText(product.product_name, 25)}
                    </h3>
                </Link>

                <p className='font-semibold text-sm'>${product.price}</p>
            </div>

            {!isAdmin && (
                <div className='w-full flex text-white'>
                    <button
                        onClick={handleAddToCart}
                        className='w-full uppercase gap-1 bg-black text-white hover:bg-white hover:text-black border hover:border-black font-semibold transition-all py-2 px-2'
                    >
                        <span>add to cart</span>
                    </button>
                </div>
            )}
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
