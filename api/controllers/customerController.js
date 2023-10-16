const { genSalt, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const saltRounds = require('../config/env').SALT;
const tokenSecretKey = require('../config/env').tokenSecretKey;
const Customer = require('../models/Customers');

exports.registerCustomer = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const salt = genSalt(saltRounds);
        const hashedPassword = hash(password, salt);

        const exists = await Customer.findOne({ email });

        if (exists) {
            return res.status(400).json({
                error: 'Email is already existed',
            });
        }

        const customer = await Customer.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });

        return res
            .status(200)
            .json({ message: 'customer created successfully', customer });
    } catch (err) {
        return res.status(500).json({ message: err.message });
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

        const token = jwt.sign({ _id: customer._id }, tokenSecretKey, {
            expiresIn: '1d',
        });

        res.json({ customer, token });
    })(req, res, next);
};

exports.getAllCustomersList = async (req, res) => {
    const page = req.query.page || 0;
    const sort = req.query.sort || 'DESC';

    try {
        const customers = await Customer.find()
            .skip(page * 2)
            .sort({ first_name: sort })
            .limit(2);

        if (!customers) {
            return res.status(404).json({ message: 'customers not found' });
        }

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) res.status(404).json({ message: 'Customer not found' });
        return res
            .status(200)
            .json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomers = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const id = { _id: req.params.id };
        const updatedFields = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.password = hashedPassword;
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );
        if (!updatedCustomer) {
            //a revoir
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchCustomer = async (req, res) => {
    try {
        const searchCriteria = {
            $or: [
                { first_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ],
        };

        let searchedCustomer = await Customer.find(searchCriteria);

        if (!searchedCustomer)
            res.status(404).json({ message: 'Customer not found' });

        res.status(200).json({ searchedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
