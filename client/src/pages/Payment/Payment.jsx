// const STRIPE_SECRET_KEY = import.meta.env.VITE_REACT_APP_STRIPE_SECRET_KEY;
import { useNavigate } from 'react-router-dom';

import CheckoutForm from '../../components/Payment/CheckoutForm';
import StripeLayout from '../../layouts/StripeLayout';
import Navbar from '../../layouts/Navbar';
import { useGetAllCartItemsQuery } from '../../app/api/cartApi';
import LoadingSpinner from '../../components/LoadingSpinner';

const Payment = () => {
    const navigate = useNavigate();

    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    if (isLoading) return <LoadingSpinner />;

    const calculateSubTotal = (cartItems) =>
        cartItems
            .reduce((previousValue, currentValue) => {
                return (
                    parseFloat(previousValue) +
                    parseFloat(currentValue.quantity) *
                        parseFloat(currentValue.product.price)
                );
            }, 0)
            .toFixed(2);

    return (
        <StripeLayout>
            <Navbar />
            <div className='container mx-auto'>
                <CheckoutForm
                    onSuccessfulCheckout={() => navigate('/landing-page')}
                    price={calculateSubTotal(cartItems?.cartItems)}
                />
            </div>
        </StripeLayout>
    );
};

export default Payment;
