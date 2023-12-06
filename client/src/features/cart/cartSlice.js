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
            state.cart = action.payload.cart;
        },
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart?.find(
                (item) => item.product._id === newItem._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...newItem, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            state.cart = state.cart.filter(
                (item) => item.product._id !== itemId
            );
        },
        decreaseItemQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.cart.find(
                (item) => item.product._id === itemId
            );

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.id !== itemId
                    );
                }
            }
        },
        clearCart: () => initialState,
    },
});

export const {
    listCartItems,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    clearCart,
    toggleCartSidebar,
} = cartSlice.actions;

export default cartSlice.reducer;
