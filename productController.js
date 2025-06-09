const Product = require("../models/product");
const Shop = require("../models/Shop");

// Create a new product for a specific shop
exports.createProduct = async (req, res) => {
  try {
    const { shopId, name, description, price, image_url } = req.body;

    // Check if the shop exists and belongs to the logged-in user
    const shop = await Shop.findOne({ where: { id: shopId, user_id: req.user.userId } });
    if (!shop) {
      return res.status(403).json({ error: "Unauthorized or shop not found" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image_url,
      shopId,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all products for a specific shop
exports.getProductsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;

    const products = await Product.findAll({ where: { shopId } });

    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all products (optional)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch all products error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// (Optional) Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findByPk(productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if the logged-in user owns the shop the product belongs to
    const shop = await Shop.findOne({ where: { id: product.shopId, user_id: req.user.userId } });
    if (!shop) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await product.update(updates);
    res.status(200).json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// (Optional) Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const shop = await Shop.findOne({ where: { id: product.shopId, user_id: req.user.userId } });
    if (!shop) return res.status(403).json({ error: "Unauthorized" });

    await product.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
        