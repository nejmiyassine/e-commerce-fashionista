const { findUserById } = require('../services/userServices');
const { findCustomerById } = require('../services/customerServices');

const { verifyJwt } = require('../helpers/jwt');
const CustomError = require('../helpers/customError');

const deserializeUser = async (req, res, next) => {
    try {
        let access_token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }

        if (!access_token) {
            return next(new CustomError('You are not logged in', 401));
        }

        const decoded = verifyJwt(access_token);
        console.log('decoded' ,decoded)

        if (!decoded) {
            return next(
                new CustomError("Invalid token or user doesn't exist", 401)
            );
        }

        let user;

        if (decoded.account_type === 'customer') {
            user = await findCustomerById(decoded.sub);
        } else {
            user = await findUserById(decoded.sub);
        }

        if (!user) {
            return next(
                new CustomError('User with that token no longer exist', 401)
            );
        }

        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = deserializeUser;
