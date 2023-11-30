const { signJwt } = require('../helpers/jwt');
const User = require('../models/User');

exports.createUser = async (input) => {
    return await User.create(input);
};

exports.findUserById = async (id) => {
    return await User.findById(id).lean();
};

exports.findUser = async (query, options = {}) => {
    return await User.findOne(query, {}, options).select('+password');
};
