const bcrypt = require('bcrypt');

const User = require('../models/User');
const saltRounds = require('../config/env').SALT;
const jwtHelper = require('../helpers/issueJwt');

exports.registerUser = async (req, res) => {
    const { first_name, last_name, username, email, password, role } = req.body;

    try {
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
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

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res
                .status(401)
                .json({ message: 'Incorrect email or password' });

        const jwt = jwtHelper.issueJwt(user);
        const { token, expires } = jwt;

        res.status(200).json({ user, token, expiresIn: expires });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsersList = async (req, res) => {}