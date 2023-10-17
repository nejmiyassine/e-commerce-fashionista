const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes.js');
const subcategoryRoutes = require('./subcategoryRoutes.js');
const customerRoutes = require('./customerRoutes');

router.use('/users', userRoutes);
router.use('/customers',  customerRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
