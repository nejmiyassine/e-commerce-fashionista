const bcrypt = require('bcrypt');

const CustomError = require('../helpers/customError');

const { createUser, findUser } = require('../services/userServices');
const {
    createCustomer,
    findCustomer,
} = require('../services/customerServices');
const { signToken } = require('../helpers/jwt');

const accessTokenCookieOptions = {
    expires: new Date(Date.now() * 86400 * 1000),
    maxAge: 86400 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
};

if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true;

exports.registerHandler = async (req, res, next) => {
    const { account_type, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = {};

        if (account_type === 'user') {
            newUser = await createUser({
                ...req.body,
                password: hashedPassword,
                account_type,
                valid_account: false,
                active: true,
                creation_date: Date.now(),
                last_login: Date.now(),
            });
        } else if (account_type === 'customer') {
            newUser = await createCustomer({
                ...req.body,
                account_type,
                password: hashedPassword,
                valid_account: false,
                active: true,
                creation_date: Date.now(),
                last_login: Date.now(),
            });
        }

        return res.json({
            status: 'success',
            message: `${account_type
                .charAt(0)
                .toUpperCase()} created successfully`,
            data: { user: newUser },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already exist',
            });
        }
        next(error);
    }
};

exports.loginHandler = async (req, res, next) => {
    const { account_type, email, password } = req.body;

    try {
        let user = {};

        if (account_type === 'user') {
            user = await findUser({ email });
        } else if (account_type === 'customer') {
            user = await findCustomer({ email });
        }

        // Check if user exist and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new CustomError('Invalid email or password', 401));
        }

        // Create an Access Token
        const { access_token } = await signToken(user);

        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        res.status(200).json({
            status: 'success',
            user,
            access_token,
        });
    } catch (error) {
        next(error);
    }
};

const logout = (res) => {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', {
        maxAge: 1,
    });
};

exports.logoutHandler = (req, res, next) => {
    try {
        logout(res);

        return res.status(200).json({
            status: 'success',
            message: 'You logged out successfully.',
        });
    } catch (error) {
        next(error);
    }
};
