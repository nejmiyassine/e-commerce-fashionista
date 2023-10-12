const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const saltRounds = require('../config/env').SALT;
const jwtHelper = require('../helpers/issueJwt');

exports.getAllUsersList = async (req, res) => {
    const page = req.query.page || 0;
    const sort = req.query.sort || 'ASC';
    const usersPerPage = 3;

    try {
        const users = await User.find()
            .sort({ username: sort })
            .skip(page * usersPerPage)
            .limit(usersPerPage);

        if (!users) {
            return res.status(404).json({ message: 'users not found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'users not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchForUser = async (req, res) => {
    const { query } = req.query;
    const page = req.query.page || 0;
    const sort = req.query.sort || 'ASC';
    const usersPerPage = 3;

    const searchCriteria = {
        $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
        ],
    };

    try {
        const users = await User.find(searchCriteria)
            .sort({ username: sort })
            .skip(page * usersPerPage)
            .limit(usersPerPage);

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: 'No users found matching the search criteria',
            });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerUser = async (req, res) => {
    const { first_name, last_name, username, email, password, role } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, email, password, role } = req.body;

    try {
        const updatedFields = {
            first_name,
            last_name,
            username,
            email,
            password,
            role,
        };

        const user = await User.findByIdAndUpdate(id, updatedFields, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'users not found' });
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'users not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
