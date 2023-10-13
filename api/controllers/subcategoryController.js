const subcategoryModel = require('../models/subcategoryModel');

// Post sub-category
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

//Delete sub-category
const deleteSubCategoryController = async (req, res) => {
    try {
        const subcategoryId = req.params.id; 

        const subcategory = await subcategoryModel.findById(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({
                success: false,
                message: 'Subcategory not found',
            });
        }

       
        await subcategoryModel.findByIdAndRemove(subcategoryId);

        return res.status(200).json({
            success: true,
            message: 'Subcategory deleted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            error: error.message,
            message: 'Bad Request: Error deleting subcategory',
        });
    }
};

module.exports = deleteSubCategoryController;

//Get by ID
const getSubCategoryController = async (req, res) => {
    try {
        const {id} = req.params 
        await subcategoryModel.findById(id);
        res.status(200).send({
            success: true,
            message: 'SubCategory found successfully'
        })


    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: 'Error finding SubCategory',
            error
        });
    }}

    module.exports = getSubCategoryController

    //Get ALL 
    const getAllSubCategoryController = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const limit = 10;
            const skip = (page - 1) * limit;
    
            const subcategories = await subcategoryModel
                .find({})
                .limit(limit)
                .skip(skip)
                .select('_id')
    
            if (subcategories.length === 0) {
                return res.status(200).send([]); 
            }
            res.status(200).send({
              
                data: subcategories,
            });
        }
    
        catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error listing all the subcategories',
                error
            });
        }}
    
        module.exports = getAllSubCategoryController


//Get Search Subcategories
const getSearchSubCategoryController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.search || '';

        const searchRegex = new RegExp(searchTerm, 'i');

        const query = searchTerm
            ? { name: { $regex: searchRegex } }
            : {};

        const subcategories = await subcategoryModel
            .find(query) 
            .select('_id') 
            .limit(limit)
            .skip(skip);

        if (subcategories.length === 0) {
            return res.status(200).send([]);
        }
        res.status(200).send({
          
            data: subcategories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error listing subcategories',
            error,
        });
    }
}

module.exports = getSearchSubCategoryController;

//Put Subcategory
const updateSubCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const id = req.params.id; 

        const subcategory = await subcategoryModel.findById(id);

        if (!subcategory) {
            return res.status(404).send({
                success: false,
                message: 'SubCategory not found',
            });
        }

        subcategory.name = name;
        await subcategory.save();

        res.status(200).send({
            success: true,
            message: 'SubCategory updated successfully',
            subcategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating subcategory'
        });
    }
};

module.exports = updateSubCategoryController;


