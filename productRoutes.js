const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/shop/:shopId", productController.getProductsByShop);     // Get products for a shop
router.get("/:productId", productController.getProductById);          // Get single product
router.get("/", productController.getAllProducts);                    // Optional: all products

// Protected routes
router.post("/", authMiddleware, productController.createProduct);    // Create product
router.put("/:productId", authMiddleware, productController.updateProduct); // Update product
router.delete("/:productId", authMiddleware, productController.deleteProduct); // Delete product

module.exports = router;
