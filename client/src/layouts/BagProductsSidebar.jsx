import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import { toggleCartSidebar } from '@features/cart/cartSlice';
import {
    useAddProductToCartMutation,
    useGetAllCartItemsQuery,
    useRemoveProductFromCartMutation,
    useDecreaseProductQuantityMutation,
} from '@app/api/cartApi';

import LoadingSpinner from '@components/LoadingSpinner';
import { calculateSubTotal } from '@utils/calculateSubTotal';

/* eslint-disable react/prop-types */
const BagProductsSidebar = () => {
    const { isOpen } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    const [addProductToCart, { isLoading: isAddLoading }] =
        useAddProductToCartMutation();
    const [decreaseProductQuantity, { isLoading: isDecreaseLoading }] =
        useDecreaseProductQuantityMutation();
    const [removeProductFromCart, { isLoading: isRemoveLoading }] =
        useRemoveProductFromCartMutation();

    const closeBagSidebar = () => {
        dispatch(toggleCartSidebar(false));
    };

    const handleAddToCart = async (productId) => {
        const quantity = 1;

        try {
            await addProductToCart({
                productId,
                quantity,
            });

            toast.info('Quantity increased successfully', {
                position: 'bottom-right',
            });
        } catch (error) {
            toast.error(error?.message, {
                position: 'bottom-right',
            });
        }
    };

    const handleDecreaseProductQuantity = async (productId) => {
        const quantity = 1;

        try {
            await decreaseProductQuantity({
                productId: productId,
                quantity,
            });

            toast.info('Quantity decreased successfully', {
                position: 'bottom-right',
            });
        } catch (error) {
            toast.error(error?.message, {
                position: 'bottom-right',
            });
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeProductFromCart({
                productId: productId,
            });
            toast.info('Product removed from cart successfully', {
                position: 'bottom-right',
            });
        } catch (error) {
            toast.error(error?.message, {
                position: 'bottom-right',
            });
        }
    };

    return (
        <div
            className={`fixed w-screen inset-0 z-50 overflow-hidden ${
                isOpen ? 'block' : 'hidden'
            }`}
        >
            <div className="fixed inset-0 overflow-hidden">
                {/* Dark overlay */}
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={closeBagSidebar}
                ></div>

                {/* Sidebar */}

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="fixed inset-y-0 gap-4 left-0 max-w-full w-2/5 flex">
                        <div className="bg-white overflow-y-auto w-full">
                            {/* Sidebar Header */}
                            <div className="p-4 flex items-center justify-between border-b">
                                <h2 className="text-2xl font-bold">
                                    My Bag (
                                    {cartItems?.cartItems
                                        ? cartItems?.cartItems.length
                                        : 0}
                                    )
                                </h2>
                                <button
                                    className="text-gray-500"
                                    onClick={closeBagSidebar}
                                >
                                    <IoCloseOutline size={30} />
                                </button>
                            </div>

                            {/* Sidebar Content */}
                            <div className="p-4 overflow-y-hidden">
                                {cartItems === undefined ||
                                cartItems?.cartItems?.length === 0 ? (
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-400 capitalize flex justify-center">
                                            Your cart is empty!
                                        </h3>
                                    </div>
                                ) : (
                                    cartItems.cartItems.map((item) => (
                                        <div
                                            key={item.product._id}
                                            className="pb-4 last:pb-28"
                                        >
                                            <div className="flex gap-2 h-32 mb-2">
                                                <img
                                                    src={
                                                        item.product
                                                            .product_images[0]
                                                    }
                                                    alt={
                                                        item.product
                                                            .product_name
                                                    }
                                                    className="w-28 h-full object-contain mr-2"
                                                />

                                                <div className="w-full flex flex-col gap-10 justify-between">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-md w-60 capitalize font-bold">
                                                            {
                                                                item.product
                                                                    .product_name
                                                            }
                                                        </p>
                                                        <p className="font-semibold ml-5 text-sm">
                                                            $
                                                            {
                                                                item.product
                                                                    .discount_price
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border gap-4 p-1 mr-4">
                                                            <Button
                                                                size="sm"
                                                                variant="light"
                                                                className="cursor-pointer"
                                                                onClick={() =>
                                                                    handleDecreaseProductQuantity(
                                                                        item
                                                                            .product
                                                                            ._id
                                                                    )
                                                                }
                                                                isDisabled={
                                                                    isDecreaseLoading
                                                                }
                                                            >
                                                                <IoIosRemove />
                                                            </Button>

                                                            <span className="font-semibold w-6 text-center">
                                                                {item.quantity}
                                                            </span>

                                                            <Button
                                                                size="sm"
                                                                variant="light"
                                                                className="cursor-pointer"
                                                                onClick={() =>
                                                                    handleAddToCart(
                                                                        item
                                                                            .product
                                                                            ._id
                                                                    )
                                                                }
                                                                isDisabled={
                                                                    isAddLoading
                                                                }
                                                            >
                                                                <IoIosAdd />
                                                            </Button>
                                                        </div>

                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            className="cursor-pointer ml-2 text-gray-500
                                                                "
                                                            isDisabled={
                                                                isRemoveLoading
                                                            }
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    item.product
                                                                        ._id
                                                                )
                                                            }
                                                        >
                                                            <MdDelete
                                                                size={20}
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Sidebar Footer */}

                            <div className="p-4 border-t z-50 bg-white absolute bottom-0 w-full">
                                <div className="flex items-center justify-between text-sm">
                                    <p className="text-gray-500 font-semibold">
                                        Subtotal:
                                    </p>
                                    {cartItems === undefined ||
                                        (cartItems?.cartItems?.length === 0 ? (
                                            <p className="font-bold">$0</p>
                                        ) : (
                                            <p className="font-bold">
                                                $
                                                {calculateSubTotal(
                                                    cartItems?.cartItems
                                                )}
                                            </p>
                                        ))}
                                </div>

                                <Link to="/payment">
                                    <Button className="mt-4 px-2 py-3 rounded w-full font-semibold transition duration-200 bg-violet-500 text-white hover:bg-violet-700">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BagProductsSidebar;
