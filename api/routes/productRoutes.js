const router = require('express').Router();
const {
    addProduct,
    listProduct,
    listProductsByCategoryName,
    deleteProduct,
    updateProduct,
    getProductID,
    searchforProduct,
} = require('../controllers/productController');

router.post('/', addProduct);
router.get('/categories', listProductsByCategoryName);

router.get('/', listProduct);
router.get('/:name', searchforProduct);
router.get('/:id', getProductID);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;
