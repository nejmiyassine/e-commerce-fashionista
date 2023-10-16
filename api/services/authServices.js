const { genSalt, hash } = require('bcrypt');
const passport = require('passport');

const tokenSecretKey = require('../config/env').tokenSecretKey;
const jwtHelper = require('../helpers/issueJwt');

const authRegister = async (req, res, model) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const exists = await model.findOne({ email });

        if (exists) {
            return res.status(400).json({
                error: 'Email is already existed',
            });
        }

        const user = await model.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json({ message: 'user created successfully', user });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const authLogin = async (req, res, next, model) => {
    passport.authenticate('local', { session: false }, (error, user) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!user) {
            return res.status(401).send('invalid credentials');
        }

        const jwt = jwtHelper.issueJwt(user, tokenSecretKey);
        const { token, expires } = jwt;

        res.status(200).json({ user, token, expiresIn: expires });
    })(req, res, next);
};

module.exports = { authRegister, authLogin };
