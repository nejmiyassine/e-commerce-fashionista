const Seller = require('../models/Seller');
const authService = require('../services/authService');

exports.registerSeller = (req, res) => {
    authService.authRegister(req, res, Seller);
};

exports.loginSeller = (req, res, next) => {
    authService.authLogin(req, res, next, Seller);
};
