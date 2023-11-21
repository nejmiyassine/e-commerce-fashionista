const jwt = require('jsonwebtoken');
const JwtSecretKey = require('../config/env').JwtSecretKey;

exports.signJwt = (payload) => {
    return jwt.sign(payload, JwtSecretKey, {
        expiresIn: '1d',
    });
};

exports.verifyJwt = (token) => {
    try {
        return jwt.verify(token, JwtSecretKey);
    } catch (error) {
        return null;
    }
};
