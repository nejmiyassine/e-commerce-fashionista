import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listCartItems } from '../features/cart/cartSlice';
import { useGetAllCartItemsQuery } from '../app/api/cartApi';

import LoadingSpinner from '../components/LoadingSpinner';

const CartSidebar = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    const {
        data: cartItems,
        isLoading,
        isFetching,
    } = useGetAllCartItemsQuery();

    useEffect(() => {
        dispatch(listCartItems(cartItems));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isLoading, isFetching]);

    if (isLoading || isFetching || !cart) {
        return <LoadingSpinner />;
    }

    console.log(cart);

    return (
        <div>
            <h2>Hello</h2>
        </div>
    );
};

export default CartSidebar;
