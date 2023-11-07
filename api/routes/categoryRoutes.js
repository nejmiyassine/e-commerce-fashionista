const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    getSearchCategory,
    createCategory,
    deleteCategory,
    updateCategory,
} = require('../controllers/categoryController');
const {
    isAdminOrManager,
    isCustomer,
} = require('../middleware/authMiddleware')

//Post route
router.post('/', createCategory);

//Update route
router.put('/:id', updateCategory);

//Delete route
router.delete('/:id', deleteCategory);

//Get category
router.get('/:id', getCategoryById);

//Get all categories
router.get('/', getAllCategories);

//Get Search category
router.get('/',  getSearchCategory);

module.exports = router;
