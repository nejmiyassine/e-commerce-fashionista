import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    cart: [],
    total_amount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartSidebar: (state, action) => {
            state.isOpen = action.payload;
        },
        listCartItems: (state, action) => {
            state.cart = action.payload;
        },
        addItemToCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItemIndex = state.cart.findIndex(
                (item) => item.product._id === productId
            );

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity += quantity;
            } else {
                state.cart.push({ productId, quantity });
            }
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(
                (item) => item.product._id !== productId
            );
        },
        decreaseItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cart.find(
                (item) => item.product._id === productId
            );

            if (item) {
                item.quantity = Math.max(item.quantity - quantity, 0);
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const {
    toggleCartSidebar,
    listCartItems,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
