const router = require('express').Router();
const {
    addProduct,
    listProduct,
    listProductsByCategoryName,
    deleteProduct,
    updateProduct,
    getProductById,
    searchforProduct,
} = require('../controllers/productController');

router.post('/', addProduct);
router.get('/categories', listProductsByCategoryName);

router.get('/', listProduct);
router.get('/:name', searchforProduct);
router.get('/product/:id', getProductById);

router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;
