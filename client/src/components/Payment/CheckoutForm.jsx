/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@nextui-org/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../../app/api/api';

import BillingDetailsFields from './BillingDetailsFields';

const schema = yup
    .object({
        country: yup.string().required('Country is a required field'),
        first_name: yup.string().required('First Name is a required field'),
        last_name: yup.string().required('Last Name is a required field'),
        email: yup.string().email().required('Email is a required field'),
        address: yup.string().required('Address is a required field'),
        city: yup.string().required('City is a required field'),
        postal_code: yup.string().required('Postal Code is a required field'),
        phone: yup
            .string()
            .min(10, 'Minimun 10 digits')
            .required('Phone Number is a required field'),
    })
    .required();

const CheckoutForm = ({ price }) => {
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#000',
                '::placeholder': {
                    color: '#555',
                },
            },
            invalid: {
                color: '#ffc7ee',
                iconColor: '#ffc7ee',
            },
        },
        hidePostalCode: true,
    };

    const navigate = useNavigate();

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();

    const handleCardDetailsChange = (ev) => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    // eslint-disable-next-line no-unused-vars
    // const getCountryName = async () => {
    //     try {
    //         const { data: location } = await axios.get(
    //             'https://api.ipregistry.co/?key=tryout'
    //         );
    //         console.log(location.country);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            country: 'MA',
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            city: '',
            postal_code: '',
            phone: '',
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = methods;

    const handleFormSubmit = async (billingDetails) => {
        setProcessingTo(true);

        const cardElement = elements.getElement('card');

        const stripeBillingDetails = {
            name: billingDetails.first_name + ' ' + billingDetails.last_name,
            email: billingDetails.email,
            address: {
                city: billingDetails.city,
                line1: billingDetails.address,
                state: billingDetails.city,
                postal_code: billingDetails.postal_code,
            },
        };

        try {
            const { data: client_secret } = await API.post(
                '/stripe/payment_intents',
                {
                    amount: price * 100,
                },
                {
                    withCredentials: true,
                }
            );

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: stripeBillingDetails,
            });

            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            const { error } = await stripe.confirmCardPayment(client_secret, {
                payment_method: paymentMethodReq.paymentMethod.id,
            });

            if (error) {
                setCheckoutError(error.message);
                setProcessingTo(false);
                return;
            }

            navigate('/payment/success');
        } catch (err) {
            setCheckoutError(err.message);
        }
    };

    return (
        <div className='pt-4'>
            <div className=''>
                <h2 className='font-bold text-2xl pb-6'>Checkout</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <BillingDetailsFields errors={errors} control={control} />

                    <div className='pl-1 mb-6'>
                        <p className='text-sm py-3'>Credit Card</p>
                        <CardElement
                            options={cardElementOptions}
                            onChange={handleCardDetailsChange}
                        />
                    </div>

                    <div className='my-2'>
                        <Button
                            className='rounded w-full font-semibold transition duration-200 bg-violet-500 text-white hover:bg-violet-700'
                            isDisabled={isProcessing}
                            type='submit'
                        >
                            {isProcessing ? 'Processing...' : `Pay $${price}`}
                        </Button>
                    </div>
                </form>

                <div className='error'>
                    {checkoutError && (
                        <p className='text-error'>{checkoutError}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
