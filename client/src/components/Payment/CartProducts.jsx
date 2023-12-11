import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import {
    useAddProductToCartMutation,
    useDecreaseProductQuantityMutation,
    useGetAllCartItemsQuery,
    useRemoveProductFromCartMutation,
} from '../../app/api/cartApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Button } from '@nextui-org/react';
import { MdDelete } from 'react-icons/md';

const CartProducts = () => {
    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    const [
        addProductToCart,
        {
            isLoading: isAddLoading,
            isSuccess: isAddSuccess,
            isError: isAddError,
            error: addError,
        },
    ] = useAddProductToCartMutation();
    const [
        decreaseProductQuantity,
        {
            isLoading: isDecreaseLoading,
            isSuccess: isDecreaseSuccess,
            isError: isDecreaseError,
            error: decreaseError,
        },
    ] = useDecreaseProductQuantityMutation();
    const [
        removeProductFromCart,
        {
            isLoading: isRemoveLoading,
            isSuccess: isRemoveSuccess,
            isError: isRemoveError,
            error: removeError,
        },
    ] = useRemoveProductFromCartMutation();

    const handleAddToCart = (productId) => {
        const quantity = 1;

        addProductToCart({
            productId,
            quantity,
        });
    };

    const handleDecreaseProductQuantity = async (productId) => {
        const quantity = 1;

        await decreaseProductQuantity({
            productId: productId,
            quantity,
        });
    };

    const handleRemoveFromCart = async (productId) => {
        await removeProductFromCart({
            productId: productId,
        });
    };

    useEffect(() => {
        if (isAddSuccess) {
            toast.info('Product updated successfully', {
                position: 'bottom-right',
            });
        }

        if (isAddError) {
            if (Array.isArray(addError.data.error)) {
                addError.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'bottom-right',
                    })
                );
            } else {
                toast.error(addError.data.message, {
                    position: 'bottom-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddLoading]);

    useEffect(() => {
        if (isDecreaseSuccess) {
            toast.info('Product updated successfully', {
                position: 'bottom-right',
            });
        }

        if (isDecreaseError) {
            if (Array.isArray(decreaseError.data.error)) {
                decreaseError.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'bottom-right',
                    })
                );
            } else {
                toast.error(decreaseError.data.message, {
                    position: 'bottom-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDecreaseLoading]);

    useEffect(() => {
        if (isRemoveSuccess) {
            toast.info('Product removed successfully', {
                position: 'bottom-right',
            });
        }

        if (isRemoveError) {
            if (Array.isArray(removeError.data.error)) {
                removeError.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'bottom-right',
                    })
                );
            } else {
                toast.error(removeError.data.message, {
                    position: 'bottom-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRemoveLoading]);

    return (
        <>
            {isLoading || !cartItems ? (
                <LoadingSpinner />
            ) : (
                <div className='cart-container py-4'>
                    <h2 className='font-bold text-2xl pb-6'>
                        My Bag ({cartItems.cartItems.length})
                    </h2>

                    {cartItems.cartItems.length === 0 ? (
                        <div className='empty-cart'>
                            <p>Your cart is empty</p>
                            <div className='start-shopping'>
                                <Link to='/shop' className='flex items-center'>
                                    <FaArrowLeftLong />
                                    <span>Start Shopping</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        cartItems.cartItems.map((item) => (
                            <div key={item.product._id} className='pb-4'>
                                <div className='flex gap-2 h-32 mb-2'>
                                    <img
                                        src={item.product.product_images[0]}
                                        alt={item.product.product_name}
                                        className='w-28 h-full object-contain mr-2'
                                    />

                                    <div className='w-full flex flex-col gap-10 justify-between'>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-md w-60 capitalize font-bold'>
                                                {item.product.product_name}
                                            </p>
                                            <p className='font-semibold ml-5 text-sm'>
                                                ${item.product.discount_price}
                                            </p>
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center border gap-4 p-1 mr-4'>
                                                <Button
                                                    size='sm'
                                                    variant='light'
                                                    className='cursor-pointer z-1'
                                                    onClick={() =>
                                                        handleDecreaseProductQuantity(
                                                            item.product._id
                                                        )
                                                    }
                                                    isDisabled={
                                                        isDecreaseLoading
                                                    }
                                                >
                                                    <IoIosRemove />
                                                </Button>

                                                <span className='font-semibold w-6 text-center'>
                                                    {item.quantity}
                                                </span>

                                                <Button
                                                    size='sm'
                                                    variant='light'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            item.product._id
                                                        )
                                                    }
                                                    isDisabled={isAddLoading}
                                                >
                                                    <IoIosAdd />
                                                </Button>
                                            </div>

                                            <Button
                                                size='sm'
                                                variant='light'
                                                className='cursor-pointer ml-2 text-gray-500'
                                                isDisabled={isRemoveLoading}
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        item.product._id
                                                    )
                                                }
                                            >
                                                <MdDelete
                                                    size={20}
                                                    className='z-0'
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default CartProducts;
