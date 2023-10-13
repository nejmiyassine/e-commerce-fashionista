//create a customer account 
const express = require('express');
const router = express.Router();
const { registerCustomer} = require('../controllers/customer/customerRegisterController')
const { loginCustomer} = require('../controllers/customer/customerLoginController')


router.post('/customers' , registerCustomer)
router.post('/customers/login', loginCustomer)


module.exports = router
