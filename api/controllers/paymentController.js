const Stripe = require('stripe');
const { STRIPE_SECRET_KEY } = require('../config/env');
const Payment = require('../models/Payment');

const stripe = new Stripe(STRIPE_SECRET_KEY);

const stripePaymentIntent = async (req, res, next) => {
    const { amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json(payment.client_secret);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCheckoutSession = async (req, res) => {
    const { cartItems } = req.body;
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1OKeBDLKD6VHuc9nc3acLlfP' },
                { shipping_rate: 'shr_1OKeC3LKD6VHuc9n3G5txRgD' },
            ],
            line_items: cartItems.map(({ product, quantity }) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.product_name,
                            images: product.product_images,
                        },
                        unit_amount: product.price * 100, // It has to be in cent
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity,
                };
            }),
            success_url: `${BASE_URL}/checkout?success=true`,
            cancel_url: `${BASE_URL}/checkout?canceled=true`,
        };

        const session = await stripe.checkout.sessions.create(params);

        res.status(200).json({
            status: 'success',
            data: session,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const savePaymentDetails = async (req, res) => {
    const { order_id, payment_date, amount, card, status, billing_details } =
        req.body;

    try {
        const payment = await Payment.create({
            order_id,
            payment_date,
            amount,
            card,
            status,
            billing_details,
        });

        res.status(200).json({
            status: 'success',
            payment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getPaymentDetailsByOrderId = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.find({ order_id: id });

        if (!payment) {
            return res.status(404).json({
                status: 404,
                message: 'Payment details for this order not found',
            });
        }

        res.status(200).json({
            status: 'success',
            payment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// const getPaymentDetails = (req, res) => {};

module.exports = {
    stripePaymentIntent,
    createCheckoutSession,
    savePaymentDetails,
    getPaymentDetailsByOrderId,
};
