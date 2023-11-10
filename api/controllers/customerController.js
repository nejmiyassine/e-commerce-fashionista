const bcrypt = require('bcrypt');

const saltRounds = require('../config/env').SALT;
const Customer = require('../models/Customers');
const authService = require('../services/authServices');

exports.registerCustomer = (req, res) => {
    authService.authRegister(req, res, Customer, 'Customer');
};

exports.loginCustomer = (req, res, next) => {
    authService.authLogin(req, res, next, 'local-customer');
};

exports.getAllCustomersList = async (req, res) => {
    const page = req.query.page || 0;
    // const sort = req.query.sort || 'DESC';
    const sort = req.query.sort || 'ASC';
    const customerPerPage = 13;

    try {
        const customers = await Customer.find()
            .skip(page * customerPerPage)
            .sort({ first_name: sort })
            .limit(customerPerPage);

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
        console.log('error from customerController : '  ,error)
         res.status(500).json({ message: error.message });
    }
};

exports.updateCustomers = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        const hashedPassword = await bcrypt.hash(password, salt);

        const id = { _id: req.params.id };
        const updatedFields = {
            first_name,
            last_name,
            email,
            password,
        };

        if (email) {
            const exists = await Customer.findOne({ email });
            if (exists) {
                return res
                    .status(400)
                    .json({ message: 'email is already existed' });
            }
        }
        if (password) {
            updatedFields.password = hashedPassword;
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchForCustomer = async (req, res) => {
    const query = req.query.first_name || '';
    const page = req.query.page || 0;
    const sort = req.query.sort || 'DESC';
    const customersPerPage = 2;

    const searchCriteria = {
        first_name: { $regex: query, $options: 'i' },
    };

    try {
        const customers = await Customer.find(searchCriteria)
            .sort({ first_name: sort })
            .skip(page * customersPerPage)
            .limit(customersPerPage);

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                message: 'No customers found matching the search criteria',
            });
        }
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) res.status(404).json({ message: 'Customer not found' });
        return res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
