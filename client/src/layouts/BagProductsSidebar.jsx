import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoCloseOutline } from 'react-icons/io5';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import { toggleBag } from '../features/bag/bagSlice';
import { sliceText } from '../utils/sliceText';
import {
    useAddProductToCartMutation,
    useGetAllCartItemsQuery,
} from '../app/api/cartApi';

import LoadingSpinner from '../components/LoadingSpinner';

/* eslint-disable react/prop-types */
const BagProductsSidebar = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.bag);

    const { data: cart, isLoading, isFetching } = useGetAllCartItemsQuery();
    // const [
    //     addProductToCart,
    //     { isLoading: isAddLoading, isSuccess: isAddSuccess },
    // ] = useAddProductToCartMutation();

    const loading = isLoading || isFetching;

    // eslint-disable-next-line no-unused-vars
    const [quantity, setQuantity] = useState(1);

    const closeBagSidebar = () => {
        dispatch(toggleBag(false));
    };

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

    const subtotal = 0;

    if (loading) {
        return <LoadingSpinner />;
    }

    console.log(cart);

    return (
        <div
            className={`fixed w-screen inset-0 z-50 overflow-hidden ${
                isOpen ? 'block' : 'hidden'
            }`}
        >
            <div className='absolute inset-0 overflow-hidden'>
                {/* Dark overlay */}
                <div
                    className='absolute inset-0 bg-black opacity-50'
                    onClick={closeBagSidebar}
                ></div>

                {/* Sidebar */}
                <div className='fixed inset-y-0 left-0 max-w-full w-[350px] flex'>
                    <div className='bg-white overflow-y-auto'>
                        {/* Sidebar Header */}
                        <div className='p-4 flex items-center justify-between border-b'>
                            <h2 className='text-2xl font-bold'>
                                My Bag (
                                {cart.cartItems && cart.cartItems.length})
                            </h2>
                            <button
                                className='text-gray-500'
                                onClick={closeBagSidebar}
                            >
                                <IoCloseOutline size={30} />
                            </button>
                        </div>

                        {/* Sidebar Content */}
                        <div className='p-4 overflow-y-hidden'>
                            {/* Product List */}
                            {cart.cartItems &&
                                cart.cartItems.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className='pb-4 last:pb-28'
                                    >
                                        <div className='flex mb-2'>
                                            <img
                                                src={
                                                    item.product
                                                        .product_images[0]
                                                }
                                                alt={item.product.product_name}
                                                className='w-28 h-50 object-contain mr-2'
                                            />

                                            <div className='w-full flex flex-col gap-10 justify-between'>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-md capitalize font-bold'>
                                                        {sliceText(
                                                            'Dr. Scholl is Shoes womens Brianna Ankle Boot',
                                                            24
                                                        )}
                                                    </p>
                                                    <p className='font-semibold'>
                                                        ${item.product.price}
                                                    </p>
                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center border gap-4 p-1 mr-4'>
                                                        <IoIosRemove
                                                            className='cursor-pointer'
                                                            onClick={
                                                                handleDecrementQuantity
                                                            }
                                                        />
                                                        <input
                                                            className='font-semibold w-6 text-center'
                                                            type='number'
                                                            value={quantity}
                                                        />

                                                        <IoIosAdd
                                                            className='cursor-pointer'
                                                            onClick={
                                                                handleIncrementQuantity
                                                            }
                                                        />
                                                    </div>

                                                    <button className='ml-2 text-gray-500'>
                                                        <span className='sr-only'>
                                                            Delete
                                                        </span>
                                                        <MdDelete size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Sidebar Footer */}
                        <div className='p-4 border-t z-50 bg-white absolute bottom-0 w-full'>
                            <div className='flex items-center justify-between text-sm'>
                                <p className='text-gray-500 font-semibold'>
                                    Subtotal:
                                </p>
                                <p className='font-bold'>${subtotal}</p>
                            </div>
                            <button className='mt-4 px-2 py-3 rounded w-full font-semibold transition duration-200 bg-violet-500 text-white hover:bg-violet-700'>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BagProductsSidebar;
