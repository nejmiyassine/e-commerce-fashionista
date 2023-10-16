const { genSalt, hash } = require('bcrypt');
const passport = require('passport');

const tokenSecretKey = require('../config/env').tokenSecretKey;
const jwtHelper = require('../helpers/issueJwt');
const customerModel = require('../models/Customers');

exports.registerCustomer = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const exists = await customerModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                error: 'Email is already existed',
            });
        }

        const customer = await customerModel.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json({ message: 'customer created successfully', customer });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.loginCustomer = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, customer) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!customer) {
            return res.status(401).send('invalid credentials');
        }

        const jwt = jwtHelper.issueJwt(customer, tokenSecretKey);
        const { token, expires } = jwt;

        res.status(200).json({ customer, token, expiresIn: expires });
    })(req, res, next);
};
