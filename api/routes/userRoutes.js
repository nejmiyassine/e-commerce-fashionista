const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const User = require('../models/User');

const {
    getMyProfileData,
    getAllUsersList,
    getUserById,
    searchForUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const {
    registerHandler,
    loginHandler,
    logoutHandler,
} = require('../controllers/authController');

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');

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
        check('role')
            .notEmpty()
            .withMessage('Role is required')
            .isIn(['manager', 'admin']),
        check('username')
            .notEmpty()
            .withMessage('Username is required')
            .custom(async (username) => {
                // Check if the username is already registered
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error('Username is already in use');
                }
            }),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    registerHandler
);

router.post(
    '/login',
    [
        check('email').notEmpty().isEmail().withMessage('Email is required'),
        check('password').notEmpty().withMessage('Password is required'),
    ],
    loginHandler
);

router.use(deserializeUser, requireUser);

router.get('/logout', logoutHandler);

router.get('/profile', getMyProfileData);
router.get('/', getAllUsersList);
router.get('/search', searchForUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;
