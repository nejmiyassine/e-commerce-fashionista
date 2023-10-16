//create a customer account
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const isAdminOrManager = require('../middleware/isAdminOrManager');

const {
  registerCustomer,
  getAllCustomersList,
    loginCustomer,
    getCustomerById,
    deleteCustomerById,
    updateCustomers,
    searchCustomer,
} = require('../controllers/customerController');


router.post(
    '/',
    [
        check('first_name').notEmpty().withMessage('First name is required'),
        check('last_name').notEmpty().withMessage('Last name is required'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid')
            .custom(async (email) => {
                // Check if the email is already registered
                const existingUser = await User.findOne({ email });
                if (existingUser) {
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
router.get('/', getAllCustomersList);
router.get('/:id', getCustomerById);
router.delete('/:id', deleteCustomerById);
router.put('/:id', updateCustomers);
router.get('/:key' , searchCustomer)


module.exports = router;
