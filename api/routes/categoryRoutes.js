const express = require('express');
const router = express.Router();
const createCategoryController = require('../controllers/categoryController')
const updateCategoryController = require('../controllers/categoryController')
const deleteCategoryController = require('../controllers/categoryController')
//Post route
router.post('/create-category', createCategoryController)

//Update route
router.put('/update-category/:id', updateCategoryController)

//Delete route
router.delete('/delete-category/:id', deleteCategoryController)

module.exports = router;
