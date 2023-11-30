const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    role: {
        type: String,
        enum: ['manager', 'admin'],
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    creation_date: {
        type: Date,
    },
    last_login: {
        type: Date,
    },
    last_update: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true,
    },
    account_type: {
        enum: ['user', 'customer', 'seller'],
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
