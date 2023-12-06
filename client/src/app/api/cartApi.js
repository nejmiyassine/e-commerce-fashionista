import NProgress from 'nprogress';

import { api } from './apiRTQ';
import { listCartItems } from '../../features/cart/cartSlice';

export const cartAPI = api.injectEndpoints({
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAllCartItems: builder.query({
            query: () => ({
                url: 'cart',
                credentials: 'include',
                method: 'GET',
            }),
            onQueryStarted() {
                NProgress.start();
            },
        }),
        addProductToCart: builder.mutation({
            query: (productData) => ({
                url: 'cart/addToCart',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                NProgress.start();
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    dispatch(listCartItems({ cart: data }));
                } catch (err) {
                    //
                }
            },
        }),
        removeProductFromCart: builder.mutation({
            query: (productData) => ({
                url: 'cart/removeFromCart',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
    }),
});

export const {
    useGetAllCartItemsQuery,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
} = cartAPI;
