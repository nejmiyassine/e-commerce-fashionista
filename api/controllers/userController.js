const bcrypt = require('bcryptjs');

const User = require('../models/User');
const saltRound = require('../config/env').SALT;

exports.register = async (req, res) => {
    const { first_name, last_name, username, email, password, role } = req.body;

    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            role,
            creation_date: Date.now(),
        });

        await newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((error) => next(error));
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res
                .status(401)
                .json({ message: 'Incorrect email or password' });

        const jwt = jwtHelper.issueJWT(user);
        const { token, expires } = jwt;

        res.status(200).json({ user, token, expiresIn: expires });
    } catch (error) {
        res.status(500).error(error.message);
    }
};

exports.getAllUsers = async (req, res) => {};
