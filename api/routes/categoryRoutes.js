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

//Post route
router.post('/create-category', createCategory);

//Update route
router.put('/update-category/:id', updateCategory);

//Delete route
router.delete('/delete-category/:id', deleteCategory);

//Get category
router.get('/get-category/:id', getCategoryById);

//Get all categories
router.get('/category', getAllCategories);

//Get Search category
router.get('/search-category', getSearchCategory);

module.exports = router;
