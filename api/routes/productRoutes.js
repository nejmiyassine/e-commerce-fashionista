const router = require("express").Router();
const { addProduct,
        listProduct,
        deleteProduct,
        updateProduct,
        getProductID,
        searchforProduct
    } = require("../controllers/productController");
const {isAdminOrManager} = require("../middleware/authMiddleware");

router.post("/", addProduct);
router.get("/", listProduct);
router.get("/:name", searchforProduct); 
router.get("/:id", getProductID);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;