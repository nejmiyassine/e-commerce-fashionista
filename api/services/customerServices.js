const Customer = require('../models/Customers');

exports.createCustomer = async (input) => {
    return await Customer.create(input);
};

exports.findCustomerById = async (id) => {
    return await Customer.findById(id).lean();
};

exports.findCustomer = async (query, options = {}) => {
    return await Customer.findOne(query, {}, options).select('+password');
};
