import CheckoutForm from '../../components/Payment/CheckoutForm';
import StripeLayout from '../../layouts/StripeLayout';
import CustomerNavbar from '../../layouts/CustomerNavbar';
import { useGetAllCartItemsQuery } from '../../app/api/cartApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { calculateSubTotal } from '../../utils/calculateSubTotal';
import CartProducts from '../../components/Payment/CartProducts';

const Payment = () => {
    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    if (isLoading) return <LoadingSpinner />;

    return (
        <StripeLayout>
            <CustomerNavbar />
            <div className='container mx-auto'>
                <div className='flex flex-col gap-4 p-6 lg:justify-around lg:flex-row lg:justify-center'>
                    <div className='w-full lg:w-2/5'>
                        <CartProducts />
                    </div>
                    <div className='w-full lg:w-2/5'>
                        <CheckoutForm
                            price={calculateSubTotal(cartItems?.cartItems)}
                            cartItems={cartItems?.cartItems}
                        />
                    </div>
                </div>
            </div>
        </StripeLayout>
    );
};

export default Payment;
