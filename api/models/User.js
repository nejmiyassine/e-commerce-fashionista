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
        default: Date.now,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
    last_update: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
