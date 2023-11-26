const jwt = require('jsonwebtoken');
const JwtSecretKey = require('../config/env').JwtSecretKey;

const signJwt = (payload) => {
    return jwt.sign(payload, JwtSecretKey, {
        expiresIn: '1d',
    });
};

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, JwtSecretKey);
    } catch (error) {
        console.log(error);
        return null;
    }
};

const signToken = async (user) => {
    const access_token = signJwt(
        { sub: user._id, account_type: user.account_type },
        {
            expiresIn: '1d',
        }
    );

    return { access_token };
};

module.exports = { signJwt, verifyJwt, signToken };
