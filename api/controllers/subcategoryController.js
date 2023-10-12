const subcategoryModel = require('../models/subcategoryModel');

// Post
const createSubCategoryController = async (req, res) => {
    try {
        const { name, active, categoryId } = req.body; 
        
        if (!name) {
            return res.status(400).send({ message: 'Sub-Category Name is Required' }); 
        }

        const existingSubCategory = await subcategoryModel.findOne({ name });

        if (existingSubCategory) { 
            return res.status(200).send({
                success: true,
                message: 'SubCategory already exists',
            });
        }

        const newSubCategory = await subcategoryModel.create({ name, active, categoryId });
        
        res.status(201).send({
            success: true,
            message: 'New SubCategory created',
            subcategory: newSubCategory, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error creating sub-category',
        });
    }
};

module.exports = createSubCategoryController;
