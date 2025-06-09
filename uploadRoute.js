const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ imagePath }); // Send this path to be stored in DB
});

module.exports = router;
