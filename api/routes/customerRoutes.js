//create a customer account 
const express = require('express');
const router = express.Router();
const { registerCustomer} = require('../controllers/customerController')


router.post('/customers' , registerCustomer)

module.exports = router