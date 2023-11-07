const express = require('express');
const router = express.Router();

const {
    loginSeller,
    registerSeller,
    getSellerById,
} = require('../controllers/sellerController');

router.post('/', registerSeller);
router.post('/login', loginSeller);
router.get('/:id', getSellerById);
router.post('/verify-email', (req, res) => verifyEmail(req, res, 'seller'));

module.exports = router;
