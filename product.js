const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Shop = require("./Shop");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [1, 500],
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
 image_url: {
  type: DataTypes.STRING,
  allowNull: true,
  validate: {
    isUrlOrEmpty(value) {
      if (value && value.trim() !== '' && !validator.isURL(value)) {
        throw new Error('Must be a valid URL');
      }
    },
  },
},

});

// Set up relationship
Product.belongsTo(Shop, {
  foreignKey: {
    name: "shopId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// (Optional) define reverse relation in your Shop model or sync file
// Shop.hasMany(Product, { foreignKey: "shopId" });

module.exports = Product;
