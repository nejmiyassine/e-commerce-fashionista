/* eslint-disable react/prop-types */
import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

import { getProductById } from '../features/products/productsSlice';
import LoadingSpinner from './LoadingSpinner';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAddProductToCartMutation } from '../app/api/cartApi';
import { toast } from 'react-toastify';
import { addToFavorites } from '../features/favorites/favoritesSlice';

const ProductDetailsSection = ({ productId, isAdmin }) => {
    const dispatch = useDispatch();
    const { product, isLoading } = useSelector((state) => state.products);

    const [addProductToCart, { isSuccess: isAddSuccess }] =
        useAddProductToCartMutation();

    const [quantity, setQuantity] = useState(1);

    const handleIncrementQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity > 0 ? prevQuantity + 1 : 1
        );
    };

    const handleDecrementQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : 1
        );
    };

    const handleAddToCart = async () => {
        try {
            const quantity = 1;

            await addProductToCart({ productId: productId, quantity });

            if (isAddSuccess) {
                toast.success('Product added to cart successfully', {
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding product to cart', {
                position: 'bottom-right',
            });
        }
    };

    const handleAddToFavorites = () => {
        try {
            dispatch(addToFavorites(productId));
        } catch (error) {
            console.error(error);
            toast.error('Error adding product to favorites', {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductById(productId));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, productId]);

    if (isLoading || !Object.keys(product).length) {
        return <LoadingSpinner />;
    }

    return (
        <section className='overflow-hidden bg-white font-poppins dark:bg-gray-800'>
            <div className='max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-4'>
                <div className='flex flex-wrap -mx-4'>
                    <div className='w-full px-4 md:w-1/2 '>
                        <div className='sticky top-0 z-50 overflow-hidden '>
                            <div className='relative mb-6 lg:mb-10 lg:h-2/4 '>
                                <Image
                                    src={
                                        product?.product_images.length > 0
                                            ? product.product_images[0]
                                            : 'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                    }
                                    alt={product?.product_name}
                                    className='object-cover w-full lg:h-full cursor-pointer'
                                />
                            </div>
                            <div className='flex-wrap hidden md:flex '>
                                {product?.product_images.length > 1 &&
                                    product?.product_images
                                        .slice(1, product.product_images.length)
                                        .map((src, idx) => (
                                            <div
                                                key={idx}
                                                className='w-1/2 p-2 sm:w-1/4'
                                            >
                                                <img
                                                    src={src}
                                                    alt={
                                                        product.product_name +
                                                        idx
                                                    }
                                                    className='object-contain cursor-pointer w-full lg:h-20'
                                                />
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-4 md:w-1/2 '>
                        <div className='lg:pl-20'>
                            <div className='mb-8 '>
                                <div className='flex items-center justify-between'>
                                    <span className='text-lg font-medium text-rose-500 dark:text-rose-200'>
                                        {product?.category_id.name}
                                    </span>
                                    {isAdmin && (
                                        <Link
                                            to={`/admin/edit/product/${product._id}`}
                                        >
                                            <MdEdit
                                                size={20}
                                                className='text-green-500 cursor-pointer'
                                            />
                                        </Link>
                                    )}
                                </div>
                                <h2 className='max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl'>
                                    {product?.product_name}
                                </h2>
                                <div className='flex items-center mb-6'>
                                    <ul className='flex mr-2'>
                                        <li>
                                            <FaStar
                                                size={16}
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star cursor-pointer'
                                            />
                                        </li>
                                        <li>
                                            <FaStar
                                                size={16}
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star cursor-pointer'
                                            />
                                        </li>
                                        <li>
                                            <FaStar
                                                size={16}
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star cursor-pointer'
                                            />
                                        </li>
                                        <li>
                                            <FaStar
                                                size={16}
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star cursor-pointer'
                                            />
                                        </li>
                                        <li>
                                            <FaStar
                                                size={16}
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star cursor-pointer'
                                            />
                                        </li>
                                    </ul>
                                    <p className='text-xs dark:text-gray-400 '>
                                        (2 customer reviews)
                                    </p>
                                </div>
                                <p className='max-w-md mb-8 text-gray-700 dark:text-gray-400'>
                                    {product?.short_description}
                                </p>
                                <div className='flex items-center justify-between'>
                                    <p className='inline-block mb-2 text-4xl font-bold text-gray-700 dark:text-gray-400 '>
                                        <span>${product?.discount_price}</span>
                                        <span className='text-base font-normal text-gray-500 line-through dark:text-gray-400'>
                                            ${product?.price}
                                        </span>
                                    </p>
                                    <p className='dark:text-green-300 text-green-500'>
                                        {product?.quantity} in stock
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-center mb-8'>
                                <h2 className='w-16 text-xl font-bold dark:text-gray-400'>
                                    Size:
                                </h2>
                                <div className='flex flex-wrap -mx-2 -mb-2'>
                                    {product?.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className='py-1 mb-2 mr-1 uppercase text-sm font-semibold border px-2 hover:border-black dark:border-white hover:bg-black hover:text-white dark:hover:border-gray-300 dark:text-gray-400'
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className='w-32 mb-8'>
                                <label
                                    htmlFor='quantity'
                                    className='w-16 text-xl font-bold dark:text-gray-400'
                                >
                                    Quantity:
                                </label>
                                <div className='relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg'>
                                    <button
                                        onClick={handleDecrementQuantity}
                                        className='w-20 h-full text-gray-600 bg-black text-white rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:bg-black/70'
                                    >
                                        <span className='m-auto text-2xl font-thin'>
                                            -
                                        </span>
                                    </button>
                                    <input
                                        id='quantity'
                                        name='quantity'
                                        type='number'
                                        value={quantity}
                                        className='flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100/70 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black'
                                        placeholder='1'
                                    />
                                    <button
                                        className='w-20 h-full text-gray-600 bg-black text-white rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:bg-black/70'
                                        onClick={handleIncrementQuantity}
                                    >
                                        <span className='m-auto text-2xl font-thin'>
                                            +
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center mb-8'>
                                <h2 className='w-16 text-xl font-bold dark:text-gray-400'>
                                    Description:
                                </h2>
                                <p className='pt-2'>
                                    {product?.long_description}
                                </p>
                            </div>
                            {!isAdmin ? (
                                <div className='flex flex-wrap items-center -mx-4 '>
                                    <div className='w-full px-4 mb-4 lg:w-1/2 lg:mb-0'>
                                        <button className='flex items-center gap-2 capitalize justify-center w-full font-semibold py-4 text-white bg-black border border-black rounded-md transition dark:text-gray-200 dark:border-white hover:bg-white hover:text-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300'>
                                            <FaCartPlus
                                                size={18}
                                                onClick={handleAddToCart}
                                            />
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div className='w-full px-4 mb-4 lg:mb-0 lg:w-1/2'>
                                        <button className='flex items-center gap-2 capitalize justify-center w-full p-4 border border-rose-500 rounded-md dark:text-gray-200 dark:border-rose-500 text-white bg-rose-500 transition hover:border-rose-500 hover:bg-white hover:text-rose-500 dark:bg-rose-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300'>
                                            <CiHeart
                                                size={18}
                                                onClick={handleAddToFavorites}
                                            />
                                            Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsSection;
