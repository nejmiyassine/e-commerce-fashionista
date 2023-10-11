const jwt = require('jsonwebtoken');
const JwtSecretKey = require('../config/env').JwtSecretKey;

const issueJwt = (user) => {
    const userId = user._id;
    const expiresIn = '1d';

    const payload = { userId };

    const token = jwt.sign(payload, JwtSecretKey, { expiresIn });

    return {
        token: 'Bearer ' + token,
        expires: expiresIn,
    };
};

module.exports.issueJwt = issueJwt;
