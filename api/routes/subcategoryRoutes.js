const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController'); // Import the object containing controllers
const {
    isAdminOrManager,
    isCustomer,
} = require('../middleware/authMiddleware');

router.post('/', subcategoryController.createSubCategoryController); // Use the correct controller from the object
router.delete('/:id', subcategoryController.deleteSubCategoryController);
router.get('/:id', subcategoryController.getSubCategoryController);
router.get('/', subcategoryController.getAllSubCategoryController);
router.get('/search', subcategoryController.getSearchSubCategoryController); // Use a different route path for search
router.put('/:id', subcategoryController.updateSubCategoryController);

module.exports = router;
