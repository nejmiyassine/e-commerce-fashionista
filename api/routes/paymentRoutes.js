const router = require('express').Router();

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const { restrictToCustomer } = require('../middleware/restrictMiddleware');

const {
    stripePaymentIntent,
    createCheckoutSession,
    savePaymentDetails,
} = require('../controllers/paymentController');

router.use(deserializeUser, requireUser);

router.post('/payment_intents', restrictToCustomer, stripePaymentIntent);
router.post(
    '/create-checkout-session',
    restrictToCustomer,
    createCheckoutSession
);
router.post('/create', savePaymentDetails);

module.exports = router;
