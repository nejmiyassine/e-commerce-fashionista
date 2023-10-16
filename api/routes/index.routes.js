const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const protectedRoutes = require('./protectedRoutes');
const categoryRoutes = require('./categoryRoutes.js');
const subcategoryRoutes = require('./subcategoryRoutes.js');
const authRoutes = require('./customerRoutes');

router.use('/users', userRoutes);
router.use('/customers', authRoutes);
router.use('/', protectedRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;