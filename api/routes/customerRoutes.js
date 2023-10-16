//create a customer account
const express = require('express');
const router = express.Router();

const {
  registerCustomer,
  getAllCustomersList,
    loginCustomer,
    getCustomerById,
    deleteCustomerById,
    updateCustomers,
    searchCustomer,
} = require('../controllers/customerController');

router.post('/', registerCustomer);
router.get('/', getAllCustomersList);
router.post('/login', loginCustomer);
router.get('/:id', getCustomerById);
router.delete('/:id', deleteCustomerById);
router.put('/:id', updateCustomers);
router.get('/:key' , searchCustomer)

module.exports = router;
