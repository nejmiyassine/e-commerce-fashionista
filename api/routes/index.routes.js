const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const customerRoutes = require('./customerRoutes');
const sellerRoutes = require('./sellerRoutes');
const categoryRoutes = require('./categoryRoutes.js');
const subcategoryRoutes = require('./subcategoryRoutes.js');
const productRoutes = require('./productRoutes.js');
const ordersRoutes = require('./ordersRoutes.js');
const uploadImageRoutes = require('./uploadImageRoutesCopy.js');
//
const favoritesRoutes = require('./favoritesRoutes.js')

router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/seller', sellerRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/orders', ordersRoutes);
router.use('/uploads', uploadImageRoutes);
//
router.use('/favorites' , favoritesRoutes);
module.exports = router;
