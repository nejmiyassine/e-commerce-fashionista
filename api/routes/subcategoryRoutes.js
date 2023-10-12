const express = require('express')
const router = express.Router()
const createSubCategoryController = require('../controllers/subcategoryController');

router.post('/create-subcategory', createSubCategoryController);


module.exports = router;
