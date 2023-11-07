const express = require('express');
const router = express.Router();

const {
    loginSeller,
    registerSeller,
    getSellerById,
} = require('../controllers/sellerController');
const {
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../services/authServices');

const { isResetTokenValid } = require('../middleware/resetTokenMiddleware');

router.post('/', registerSeller);
router.post('/login', loginSeller);
router.get('/:id', getSellerById);
router.post('/verify-email', (req, res) => verifyEmail(req, res, 'seller'));
router.post('/forgot-password', (req, res) =>
    forgotPassword(req, res, 'Customer')
);
router.post('/reset-password', isResetTokenValid, (req, res) =>
    resetPassword(req, res, 'Seller')
);

module.exports = router;
