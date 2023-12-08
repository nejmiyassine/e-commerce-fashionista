const express = require('express');
const router = express.Router();

const {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
    deleteOrdersController
} = require('../controllers/odersController');
const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const {
    restrictTo,
    restrictToCustomer,
} = require('../middleware/restrictMiddleware');

router.use(deserializeUser, requireUser);

router.post('/', restrictToCustomer, createOrdersController);
router.get('/:id', getOrderByIdController);
router.get('/', getAllOrdersController);
router.put('/:id', updateOrdersController);

module.exports = router;
