const Customer = require('../models/Customers');

exports.createCustomer = async (input) => {
    const customer = await Customer.create(input);
    return customer;
};

exports.findCustomerById = async (id) => {
    const customer = await Customer.findById(id).lean();
    return customer;
};

exports.findCustomer = async (query, options = {}) => {
    return await Customer.findOne(query, {}, options).select('+password');
};

exports.signToken = async (customer) => {
    const access_token = signJwt(
        { sub: customer._id },
        {
            expiresIn: '1d',
        }
    );

    return { access_token };
};
