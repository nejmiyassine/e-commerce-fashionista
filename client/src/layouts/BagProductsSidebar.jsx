import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';

import { toggleBag } from '../features/bag/bagSlice';

/* eslint-disable react/prop-types */
const BagProductsSidebar = () => {
    const { isOpen } = useSelector((state) => state.bag);

    const dispatch = useDispatch();

    const closeBagSidebar = () => {
        dispatch(toggleBag(false));
    };

    const cartItems = [
        {
            _id: 1,
            product_name: 'title',
            product_image:
                'https://images.unsplash.com/photo-1701198067358-dbe0ac58a2c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
            quantity: 1,
            price: 20,
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    return (
        <div
            className={`fixed inset-0 z-50 overflow-hidden ${
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
                <div className='fixed inset-y-0 left-0 max-w-full flex'>
                    <div className='w-72 bg-white overflow-y-auto'>
                        {/* Sidebar Header */}
                        <div className='p-4 flex items-center'>
                            <h2 className='text-lg font-semibold'>
                                My Bag ({cartItems.length} items)
                            </h2>
                            <button
                                className='absolute top-2 right-2 text-gray-500'
                                onClick={closeBagSidebar}
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        {/* Sidebar Content */}
                        <div className='p-4'>
                            {/* Product List */}
                            {cartItems.map((item) => (
                                <div key={item._id} className='mb-4'>
                                    <div className='flex items-center mb-2'>
                                        {/* Product Image */}
                                        <img
                                            src={item.product_image}
                                            alt={item.product_title}
                                            className='w-12 h-12 object-cover mr-2'
                                        />

                                        {/* Product Title */}
                                        <p className='text-sm font-semibold'>
                                            {item.product_title}
                                        </p>
                                    </div>

                                    <div className='flex items-center'>
                                        {/* Counter */}
                                        <div className='flex items-center mr-4'>
                                            {/* Add and Remove buttons go here */}
                                            {/* You can use a state to manage the quantity */}
                                            <button className='mr-1'>-</button>
                                            <span>{item.quantity}</span>
                                            <button className='ml-1'>+</button>
                                        </div>

                                        {/* Price */}
                                        <p className='text-sm'>${item.price}</p>

                                        {/* Delete Icon */}
                                        <button className='ml-2 text-red-500'>
                                            <span className='sr-only'>
                                                Delete
                                            </span>
                                            <svg
                                                className='h-4 w-4'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M6 18L18 6M6 6l12 12'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sidebar Footer */}
                        <div className='p-4 border-t'>
                            <p className='text-lg font-semibold'>
                                Subtotal: ${subtotal}
                            </p>
                            <button className='mt-4 bg-blue-500 text-white p-2 rounded'>
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
