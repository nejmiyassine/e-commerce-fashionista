const { genSalt, hash } = require('bcrypt');
const passport = require('passport');

const tokenSecretKey = require('../config/env').tokenSecretKey;
const jwtHelper = require('../helpers/issueJwt');

const authRegister = async (req, res, model) => {
    const { firstName, lastName, userName, email, password } = req.body;

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
            first_name: firstName,
            last_name: lastName,
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

const authLogin = async (req, res, next, local) => {
    passport.authenticate(local, { session: false }, (error, user) => {
        console.log('user: ', user);
        console.log('local: ', local);
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const jwt = jwtHelper.issueJwt(user, tokenSecretKey);
        const { token, expires } = jwt;

        res.status(200).json({ user, token, expiresIn: expires });
    })(req, res, next, local);
};

module.exports = { authRegister, authLogin };
