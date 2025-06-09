const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload'); // Import upload middleware
const authenticateToken = require("../middleware/authMiddleware");

// Import controller methods
const {
  createShop,
  getAllShops,
  getMyShops,
  updateShop,
  deleteShop, 
} = require("../controllers/ShopController");


router.post('/', authenticateToken, upload.single('image'), createShop);

router.get('/', getAllShops);

router.get('/my', authenticateToken, getMyShops);

router.put('/:id', authenticateToken, upload.single('image'), updateShop);

router.delete('/:id', authenticateToken, deleteShop);

module.exports = router;
