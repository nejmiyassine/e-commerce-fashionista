import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  getTotals,
} from '../../features/cart/cartSlice';
import PayButton from './PayButton';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container p-8">
      <h2 className="text-2xl font-semibold mb-8">My Bag (2)</h2>
      {cart.cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to="/HomeTest" className="flex items-center">
              <FaArrowLeftLong />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles hidden md:grid grid-cols-5 gap-2 mb-4">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total">Total</h3>
            <h3 className="remove">Remove</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((item) => (
                <div key={item._id} className="cart-item grid grid-cols-1 md:grid-cols-5 gap-2 border-t py-4">
                  <div className="cart-product flex items-center">
                    <img src={item.product_images[0]} alt={item.product_name} className="w-24 mr-4" />
                    <div>
                      <h3>{item.product_name}</h3>
                      <p>{item.short_description}</p>
                      
                    </div>
                  </div>
                  <div className="cart-prouduct-price flex items-center justify-content">
                    <h5 className="text-gray-400 md:hidden">Price: </h5>
                    <span>${item.price}</span>
                  </div>
                  <div className="relative flex items-center max-w-[8rem]">
                  <button
                    type="button"
                    onClick={() => handleDecreaseCart(item)}
                    id="decrement-button"
                    data-input-counter-decrement="quantity-input"
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <span className="text-gray-900 dark:text-white">-</span>
                  </button>
                  <input
                    type="text"
                    id="quantity-input"
                    data-input-counter
                    aria-describedby="helper-text-explanation"
                    value={item.cartQuantity}
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="999"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleIncreaseCart(item)}
                    id="increment-button"
                    data-input-counter-increment="quantity-input"
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <span className="text-gray-900 dark:text-white">+</span>
                  </button>
                </div>
                  <div className="cart-product-total-price flex justify-content">
                    <h5 className="text-gray-400 md:hidden">Total: </h5>
                    <span>${item.price * item.cartQuantity}</span>
                  </div>
                  <div className="cart-product-remove ">
                    <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-red-300 hover:text-red-500 flex items-center justify-content"
                      >
                      <FaTrash className="mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary flex flex-col lg:flex-row justify-between border-t pt-8">
          <button onClick={() => handleClearCart()} className="clear-btn w-40 h-12 border-2 border-gray-500 text-gray-500 rounded mt-5 cursor-pointer">
            Clear Cart
          </button>
            <div className="cart-checkout lg:w-1/3 ">
              <div className="subtotal flex justify-between text-xl">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p className="text-sm font-light mt-2">Taxes and shipping calculated at checkout</p>
              <PayButton cartItems = {cart.cartItems} />
              <div className="start-shopping mt-4">
                <Link to="/HomeTest" className="flex items-center text-gray-500">
                  <FaArrowLeftLong />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Cart;












// <form className="w-full lg:w-1/2 max-w-lg mb-8 lg:mb-0">

//               <div className="flex flex-wrap -mx-3 mb-6">
//                 <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
//                     First Name
//                   </label>
//                   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name"></input>
//                   <p className="text-red-500 text-xs italic">Please fill out this field.</p>
//                 </div>
//                 <div className="w-full md:w-1/2 px-3">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
//                     Last Name
//                   </label>
//                   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name"></input>
//                 </div>
//               </div>
//               <div className="flex flex-wrap -mx-3 mb-6">
//                 <div className="w-full px-3">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-number">
//                     Phone Number
//                   </label>
//                   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-number" type="number" placeholder="+212 000000000"></input>
//                   <p className="text-gray-600 text-xs italic">Double-check phone number for accuracy</p>
//                 </div>
//               </div>
//               <div className="flex flex-wrap -mx-3 mb-2">
//                 <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//                     Address
//                   </label>
//                   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"></input>
//                 </div>
//                 <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
//                     City
//                   </label>
//                   <div className="relative">
//                     <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
//                       <option>Casablanca</option>
//                       <option>Rabat</option>
//                       <option>Marrakech</option>
//                       <option>Fes</option>
//                       <option>Tangier</option>
//                       <option>Agadir</option>
//                       <option>Chefchaouen</option>
//                       <option>Essaouira</option>
//                       <option>Meknes</option>
//                       <option>Ouarzazate</option>
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
//                     Zip
//                   </label>
//                   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"></input>
//                   </div>
//               </div>
//               <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
//             </form>

