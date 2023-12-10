import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
    import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

// eslint-disable-next-line react/prop-types
const StripeLayout = ({ children }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeLayout;
