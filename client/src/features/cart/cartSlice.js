import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const initialState = {
  cartItems,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { 
        addToCart(state, action) {
            const existingIndex = state.cartItems.findIndex(
              (item) => item.product._id === action.payload.product._id
            );
      
            if (existingIndex >= 0) {
              state.cartItems[existingIndex] = {
                ...state.cartItems[existingIndex],
                cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
              };
              toast.info(`Increased ${state.cartItems[existingIndex].product.product_name} quantity`, {
                position: "bottom-left",
              });
            } else {
              let tempProductItem = { ...action.payload, cartQuantity: 1 };
              state.cartItems.push(tempProductItem);
              toast.success(`Product ${action.payload.product.product_name} to cart`, {
                position: "bottom-left",
              });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
              (cartItem) => cartItem.product._id !== action.payload.product._id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.product.product_name} removed from cart`, {
              position: "bottom-left",
            });
          },
          decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item._id === action.payload._id
            );
            if(state.cartItems[itemIndex].cartQuantity > 1){
              state.cartItems[itemIndex].cartQuantity -= 1;
              toast.info(`Decreased ${action.payload.product_name} cart Quantity`, {
                position: "bottom-left",
              });
            }else if (state.cartItems[itemIndex].cartQuantity === 1){
              const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
              );
              state.cartItems = nextCartItems;
              toast.error(`${action.payload.product_name} removed from cart`, {
                position: "bottom-left",
              });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
          },
          clearCart(state, action) {
            state.cartItems = [];
            toast.error("Cart cleared ", {
              position: "bottom-left",
            });
            localStorage.removeItem("cartItems");
          },
          getTotals(state, action) {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) =>{
              const {product, cartQuantity} = cartItem;
              const itemTotal = product.price * cartQuantity;
              cartTotal.total += itemTotal;
              cartTotal.quantity += cartQuantity;
              return cartTotal;
            }, {
              total: 0,
              quantity: 0,
            });

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total
          },
    }
});
export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;

export default cartSlice.reducer;