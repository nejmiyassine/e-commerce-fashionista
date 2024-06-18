import { useGetAllCartItemsQuery } from '@app/api/cartApi';
import CheckoutForm from '@components/Payment/CheckoutForm';
import LoadingSpinner from '@components/LoadingSpinner';
import CartProducts from '@components/Payment/CartProducts';
import { calculateSubTotal } from '@utils/calculateSubTotal';
import StripeLayout from '@layouts/StripeLayout';

const Payment = () => {
    const { data: cartItems, isLoading } = useGetAllCartItemsQuery();

    if (isLoading) return <LoadingSpinner />;

    return (
        <StripeLayout>
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 p-6 lg:flex-row lg:justify-center">
                    <div className="w-full lg:w-2/5">
                        <CartProducts />
                    </div>
                    <div className="w-full lg:w-2/5">
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
