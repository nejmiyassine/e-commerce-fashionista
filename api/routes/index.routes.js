const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const customerRoutes = require('./customerRoutes');
const sellerRoutes = require('./sellerRoutes');
const categoryRoutes = require('./categoryRoutes.js');
const subcategoryRoutes = require('./subcategoryRoutes.js');
const ordersRoutes = require('./ordersRoutes.js');
const uploadImageRoutes = require('./uploadImageRoutesCopy.js');

router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/seller', sellerRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', ordersRoutes);
router.use('/', uploadImageRoutes);

module.exports = router;
