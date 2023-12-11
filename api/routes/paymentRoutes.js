const router = require('express').Router();

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const {
    restrictToCustomer,
    restrictTo,
} = require('../middleware/restrictMiddleware');

const {
    stripePaymentIntent,
    createCheckoutSession,
    savePaymentDetails,
    getPaymentDetailsByOrderId,
} = require('../controllers/paymentController');

router.use(deserializeUser, requireUser);

router.get('/:id', restrictTo('admin', 'manager'), getPaymentDetailsByOrderId);
router.post('/payment_intents', restrictToCustomer, stripePaymentIntent);
router.post(
    '/create-checkout-session',
    restrictToCustomer,
    createCheckoutSession
);
router.post('/create', savePaymentDetails);

module.exports = router;
