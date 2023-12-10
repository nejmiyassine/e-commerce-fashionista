const express = require('express');
const router = express.Router();

const {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
    getCustomerOrders,
} = require('../controllers/odersController');

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const { restrictToCustomer } = require('../middleware/restrictMiddleware');

router.use(deserializeUser, requireUser);

router.post('/', restrictToCustomer, createOrdersController);
router.get('/customer/order', restrictToCustomer, getCustomerOrders);

router.get('/:id', getOrderByIdController);
router.get('/', getAllOrdersController);
router.put('/:id', updateOrdersController);

module.exports = router;
