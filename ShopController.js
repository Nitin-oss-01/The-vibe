const path = require('path');
const Shop = require('../models/Shop');

// POST /api/shops
exports.createShop = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { name, description, category, latitude, longitude } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required." });
    }

    const shop = await Shop.create({
      name,
      description,
      category,
      latitude,
      longitude,
      imageUrl,
      user_id: userId,
    });

    const fullImageUrl = imageUrl ? `${req.protocol}://${req.get('host')}${imageUrl}` : null;

    res.status(201).json({
      message: "Shop created successfully",
      shop: {
        ...shop.toJSON(),
        imageUrl: fullImageUrl,
      },
    });

  } catch (err) {
    console.error("Shop.create() error:", err);
    res.status(500).json({ error: err.message || "Server error while creating shop" });
  }
};

// GET all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.status(200).json(shops);
  } catch (err) {
    console.error("Error fetching shops:", err);
    res.status(500).json({ error: "Server error while fetching shops" });
  }
};

// GET /api/shops/my
exports.getMyShops = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const myShops = await Shop.findAll({ where: { user_id: userId } });
    res.status(200).json(myShops);
  } catch (err) {
    console.error("Error fetching user's shops:", err);
    res.status(500).json({ error: "Server error while fetching user's shops" });
  }
};

// ✅ PUT /api/shops/:id (Edit Shop)
exports.updateShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const userId = req.user.id || req.user.userId;
    const { name, description, category, latitude, longitude } = req.body;

    const shop = await Shop.findByPk(shopId);

    if (!shop || shop.user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized or shop not found" });
    }

    if (req.file) {
      shop.imageUrl = `/uploads/${req.file.filename}`;
    }

    shop.name = name || shop.name;
    shop.description = description || shop.description;
    shop.category = category || shop.category;
    shop.latitude = latitude || shop.latitude;
    shop.longitude = longitude || shop.longitude;

    await shop.save();

    const fullImageUrl = shop.imageUrl ? `${req.protocol}://${req.get('host')}${shop.imageUrl}` : null;

    res.status(200).json({
      message: "Shop updated successfully",
      shop: {
        ...shop.toJSON(),
        imageUrl: fullImageUrl,
      }
    });
  } catch (err) {
    console.error("Error updating shop:", err);
    res.status(500).json({ error: "Server error while updating shop" });
  }
};

// DELETE /api/shops/:id
exports.deleteShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const userId = req.user.id || req.user.userId;

    const shop = await Shop.findByPk(shopId);

    if (!shop || shop.user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized or shop not found" });
    }

    await shop.destroy();

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (err) {
    console.error("Error deleting shop:", err);
    res.status(500).json({ error: "Server error while deleting shop" });
  }
};
