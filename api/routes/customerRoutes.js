//create a customer account
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const Customer = require('../models/Customers');
const {
    isAdminOrManager,
    isCustomer,
} = require('../middleware/authMiddleware');

const {
    registerCustomer,
    getAllCustomersList,
    loginCustomer,
    getCustomerById,
    deleteCustomerById,
    updateCustomers,
    searchForCustomer,
} = require('../controllers/customerController');

router.post(
    '/',
    [
        check('firstName').notEmpty().withMessage('First name is required'),
        check('lastName').notEmpty().withMessage('Last name is required'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid')
            .custom(async (email) => {
                // Check if the email is already registered
                const existingCustomer = await Customer.findOne({ email });
                if (existingCustomer) {
                    throw new Error('Email is already in use');
                }
            }),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    registerCustomer
);

router.post(
    '/login',
    [
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    loginCustomer
);

router.get('/', isCustomer, getAllCustomersList);
router.get('/:id', isAdminOrManager, getCustomerById);
router.put('/:id', isAdminOrManager, updateCustomers);
router.get('/', isAdminOrManager, searchForCustomer);
router.delete('/:id', isCustomer, isAdminOrManager, deleteCustomerById);

module.exports = router;
