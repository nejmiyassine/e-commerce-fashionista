const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../config/env').JWT_SECRET_KEY;

const signJwt = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: '1d',
    });
};

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

const signToken = async (user) => {
    const access_token = signJwt({
        sub: user._id,
        account_type: user.account_type,
    });

    return { access_token };
};

module.exports = { signJwt, verifyJwt, signToken };
