import CheckoutForm from '../../components/Payment/CheckoutForm';
import StripeLayout from '../../layouts/StripeLayout';
import Navbar from '../../layouts/Navbar';
import { useGetAllCartItemsQuery } from '../../app/api/cartApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { calculateSubTotal } from '../../utils/calculateSubTotal';
import CartProducts from '../../components/Payment/CartProducts';

const Payment = () => {
    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    if (isLoading) return <LoadingSpinner />;

    return (
        <StripeLayout>
            <Navbar />
            <div className='container mx-auto'>
                <CartProducts />
                <CheckoutForm
                    price={calculateSubTotal(cartItems?.cartItems)}
                    cartItems={cartItems.cartItems}
                />
            </div>
        </StripeLayout>
    );
};

export default Payment;
