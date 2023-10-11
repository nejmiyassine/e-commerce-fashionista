const categoryModel = require('../models/categoryModel');

//Post
const createCategoryController = async (req, res) => {
    try {
        const { name, active } = req.body; 
        
        if (!name) {
            return res.status(401).send({ message: 'Category Name is Required' }); 
        }

        const existingCategory = await categoryModel.findOne({ name }); 

        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists',
            });
        }

        const category = await categoryModel({ name, active }).save(); 
        
        res.status(201).send({
            success: true,
            message: 'New category created',
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error creating category',
        });
    }
};

module.exports = createCategoryController;


//Put 
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const id = req.params.id; 
        const category = await categoryModel.findByIdAndUpdate(id, { name });
        
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            });
        }
        
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating category'
        });
    }
};

module.exports = updateCategoryController;

//Delete 
const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params 
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        })


    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting category',
            error
        });
    }}

    module.exports = deleteCategoryController