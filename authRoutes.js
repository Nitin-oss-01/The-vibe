const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authController");

router.post("/login", login);  // Ensure this is correct
router.post("/signup", signup);  // If you're testing signup as well

module.exports = router;
