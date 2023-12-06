import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import nProgress from 'nprogress';

import { IoCloseOutline } from 'react-icons/io5';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import {
    addItemToCart,
    removeItemFromCart,
    toggleCartSidebar,
} from '../features/cart/cartSlice';
import {
    useAddProductToCartMutation,
    useGetAllCartItemsQuery,
    useRemoveProductFromCartMutation,
} from '../app/api/cartApi';

import LoadingSpinner from '../components/LoadingSpinner';

/* eslint-disable react/prop-types */
const BagProductsSidebar = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.cart);

    const {
        data: cartItems,
        isLoading,
        isFetching,
    } = useGetAllCartItemsQuery();
    // const { cart } = useSelector((state) => state.cart);

    // console.log(cart);

    const [
        addProductToCart,
        {
            isLoading: isAddLoading,
            isError: isAddError,
            isSuccess: isAddSuccess,
        },
    ] = useAddProductToCartMutation();
    const [
        removeProductFromCart,
        {
            isLoading: isRemoveLoading,
            isError: isRemoveError,
            isSuccess: isRemoveSuccess,
        },
    ] = useRemoveProductFromCartMutation();

    const loading = isLoading || isFetching || isAddLoading || isRemoveLoading;

    const closeBagSidebar = () => {
        dispatch(toggleCartSidebar(false));
    };

    const handleAddToCart = async (productId) => {
        try {
            const quantity = 1;

            await addProductToCart({
                productId: productId,
                quantity,
            });
            dispatch(addItemToCart(productId));

            if (isAddSuccess) {
                toast.info('Product updated in the cart successfully', {
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating product in the cart', {
                position: 'bottom-right',
            });
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const quantity = 1;

            dispatch(removeItemFromCart(productId));
            await removeProductFromCart({
                productId: productId,
                quantity,
            });

            if (isRemoveSuccess) {
                toast.success('Product updated in the cart successfully', {
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating product in the cart', {
                position: 'bottom-right',
            });
        }
    };

    const subtotal = 0;

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Product updated in the cart successfully');
            nProgress.done();
        }

        if (isAddError || isRemoveError) {
            nProgress.done();
            // toast.error('Error updating product in the cart', {
            //     position: 'top-right',
            // });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    if (loading || !cartItems.cartItems) {
        return <LoadingSpinner />;
    }

    console.log(cartItems);

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

                <div className='fixed inset-y-0 left-0 max-w-full w-2/5 flex'>
                    <div className='bg-white overflow-y-auto w-full'>
                        {/* Sidebar Header */}
                        <div className='p-4 flex items-center justify-between border-b'>
                            <h2 className='text-2xl font-bold'>
                                My Bag (
                                {cartItems.cartItems.length > 0
                                    ? cartItems.cartItems.length
                                    : 0}
                                )
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
                            {cartItems.cartItems &&
                                cartItems.cartItems.map((item) => (
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
                                                    <p className='text-md w-60 capitalize font-bold'>
                                                        {
                                                            item.product
                                                                .product_name
                                                        }
                                                    </p>
                                                    <p className='font-semibold ml-5 text-sm'>
                                                        $
                                                        {
                                                            item.product
                                                                .discount_price
                                                        }
                                                    </p>
                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center border gap-4 p-1 mr-4'>
                                                        <IoIosRemove
                                                            className='cursor-pointer'
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    item.product
                                                                        ._id
                                                                )
                                                            }
                                                        />

                                                        <span className='font-semibold w-6 text-center'>
                                                            {item.quantity}
                                                        </span>

                                                        <IoIosAdd
                                                            className='cursor-pointer'
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    item.product
                                                                        ._id
                                                                )
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
