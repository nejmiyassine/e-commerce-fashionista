const express = require('express');
const router = express.Router();
const createCategoryController = require('../controllers/categoryController');
const updateCategoryController = require('../controllers/categoryController');
const deleteCategoryController = require('../controllers/categoryController');
const getCategoryController = require('../controllers/categoryController');
const getAllCategoryController = require('../controllers/categoryController');
const getSearchCategoryController = require('../controllers/categoryController');
//Post route
router.post('/create-category', createCategoryController)

//Update route
router.put('/update-category/:id', updateCategoryController)

//Delete route
router.delete('/delete-category/:id', deleteCategoryController)

//Get category
router.get('/get-category/:id', getCategoryController)

//Get all categories
router.get('/category', getAllCategoryController)

//Get Search category
router.get('/search-category', getSearchCategoryController)

module.exports = router;
