const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
    valid_account: {
        type: Boolean,
        default: false,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    account_type: {
        enum: ['user', 'customer', 'seller'],
        type: String,
    },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
