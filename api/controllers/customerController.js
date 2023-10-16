const Customer = require('../models/Customers');
const customerModel = require('../models/Customers');
const { genSalt, hash } = require('bcrypt');
const bcrypt = require('bcrypt');
const tokenSecretKey = require('../config/env').tokenSecretKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.registerCustomer = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        if (!firstName) {
            return res.status(400).json({
                error: 'FirstName is required',
            });
        }

        if (!lastName) {
            return res.status(400).json({
                error: 'LastName is required',
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password is requred and must be at least 6 charachters long ',
            });
        }

        const exists = await customerModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                error: 'Email is already existed',
            });
        }
        const customer = await customerModel.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({message : 'customer created successfully'});
    } catch (err) {
        return res.status(400).json({message : "customer can't created"});
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
        res.status(200).json(customers);
        if (!customers) {
            return res.status(404).json({ message: 'There is no customers' });
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
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
        return res.json({ message: error.message });
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
    try {
        const updatedFields = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        const id = { _id: req.params.id };
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );
        if (!updatedCustomer) {
            //a revoir
            return res.status(400).json({ message: error.message });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.searchCustomer = async (req, res) => {

   let searchedCustomer = await Customer.find(
    {
        first_name : {$regex : req.params.key}
    }
   )
   res.status(200).json({searchedCustomer})


};


