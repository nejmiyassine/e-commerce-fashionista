const bcrypt = require('bcrypt');

const User = require('../models/User');
const saltRounds = require('../config/env').SALT;

exports.getMyProfileData = async (req, res, next) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
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

exports.getAllUsersList = async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const sort = req.query.sort || 'DESC';
    // const usersPerPage = 5;

    try {
        const users = await User.find();
        // .sort({ username: sort })
        // .skip((page - 1) * usersPerPage)
        // .limit(usersPerPage);

        if (!users) {
            return res.status(404).json({ message: 'users not found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchForUser = async (req, res) => {
    const { query } = req.query || '';
    const page = req.query.page || 1;
    const usersPerPage = 5;

    const searchCriteria = {
        $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
        ],
    };

    try {
        const users = await User.find(searchCriteria)
            .sort({
                username: 'DESC',
            })
            .skip((page - 1) * usersPerPage)
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

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, email, password, role } = req.body;

    try {
        const updatedFields = {
            first_name,
            last_name,
            username,
            email,
            role,
            last_update: Date.now(),
        };

        if (password) {
            const salt = await bcrypt.genSalt(parseInt(saltRounds));
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(id, updatedFields, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
