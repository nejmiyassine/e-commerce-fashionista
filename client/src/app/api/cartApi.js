import { api } from './apiRTQ';
// import { listCartItems } from '../../features/cart/cartSlice';

export const cartAPI = api.injectEndpoints({
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAllCartItems: builder.query({
            query: () => ({
                url: 'cart',
                credentials: 'include',
                method: 'GET',
            }),
            providesTags: [{ type: 'Cart', id: 'LIST' }],
        }),
        addProductToCart: builder.mutation({
            query: (productData) => ({
                url: 'cart/addToCart',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [
                          { type: 'Cart', id },
                          { type: 'Cart', id: 'LIST' },
                      ]
                    : [{ type: 'Cart', id: 'LIST' }],
            // async onQueryStarted(args, { dispatch, queryFulfilled }) {
            //     NProgress.start();
            //     try {
            //         const { data } = await queryFulfilled;
            //         dispatch(listCartItems({ cart: data.cart }));
            //     } catch (err) {
            //         //
            //     }
            // },
        }),
        removeProductFromCart: builder.mutation({
            query: (productData) => ({
                url: 'cart/removeFromCart',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
            // onQueryStarted() {
            //     NProgress.start();
            // },
        }),
        decreaseProductQuantity: builder.mutation({
            query: (productData) => ({
                url: 'cart/decreaseQuantity',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
            // onQueryStarted() {
            //     NProgress.start();
            // },
        }),
    }),
});

export const {
    useGetAllCartItemsQuery,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
    useDecreaseProductQuantityMutation,
} = cartAPI;
