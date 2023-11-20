const router = require("express").Router();
const { addProduct,
        listProduct,
        deleteProduct,
        updateProduct,
        getProductID,
        searchforProduct
    } = require("../controllers/productController");
const {isAdminOrManager} = require("../middleware/authMiddleware");

router.post("/",isAdminOrManager, addProduct);
router.get("/",isAdminOrManager, listProduct);
router.get("/:name",isAdminOrManager, searchforProduct); 
router.get("/:id",isAdminOrManager, getProductID);
router.delete("/:id",isAdminOrManager, deleteProduct);
router.put("/:id",isAdminOrManager, updateProduct);

module.exports = router;