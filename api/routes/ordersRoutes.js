const express = require('express');
const router = express.Router();
const {createOrdersController, updateOrdersController, getOrdersController, getAllOrdersController} = require('../controllers/createOrdersController');


router.post('/createOrders', createOrdersController)
router.put('/updateOrders', updateOrdersController)
router.get('/getOrders', getOrdersController)
router.get('/getAllOrders', getAllOrdersController)