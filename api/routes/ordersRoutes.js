const express = require('express');
const router = express.Router();

const {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
} = require('../controllers/odersController');
const {
    isAdminOrManager,
    isCustomer,
} = require('../middleware/authMiddleware');

router.post('/', isCustomer, createOrdersController);
router.get('/:id', isCustomer, getOrderByIdController);
router.get('/', getAllOrdersController);
router.put('/:id', isAdminOrManager, updateOrdersController);

module.exports = router;
