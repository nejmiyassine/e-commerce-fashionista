import React from 'react';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

const CartSidebar = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart-sidebar">
      <h3>Your Cart</h3>
      <div className="cart-items-sidebar">
        {cart.cartItems.map((item) => (
          <div key={item._id} className="cart-item-sidebar">
            <img src={item.product_images[0]} alt={item.product_name} />
            <div>
              <h4>{item.product_name}</h4>
              <p>Quantity: {item.cartQuantity}</p>
              <p>Total: ${item.price * item.cartQuantity}</p>
              <button>
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary-sidebar">
        <p>Subtotal: ${cart.cartTotalAmount}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;