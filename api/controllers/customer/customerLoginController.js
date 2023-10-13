const bcrypt = require('bcryptjs');
const tokenSecretKey = require('../../config/env').tokenSecretKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const loginCustomer = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, customer) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!customer) {
            return res.status(401).send('invalid credentials');
        }

        const token = jwt.sign({ _id: customer._id }, tokenSecretKey, {
            expiresIn: '1d',
        });

        res.json({ customer, token });
    })(req, res, next);
};

module.exports = { loginCustomer };
