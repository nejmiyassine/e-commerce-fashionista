const jwt = require('jwt');
const JwtSecretKey = require('../config/JwtSecretKey');

const issueJwt = (user) => {
    const userId = user._id;
    const expiresIn = '1d';

    const payload = { id: userId, email, role };

    const token = jwt.sign(payload, JwtSecretKey, { expiresIn });

    return {
        token: 'Bearer ' + token,
        expires: expiresIn,
    };
};

module.exports = issueJwt;
