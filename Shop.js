const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const path = require('path');
const User = require(path.resolve(__dirname, 'User'));

const Shop = sequelize.define("Shop", {
id: {
type: DataTypes.UUID,
defaultValue: DataTypes.UUIDV4,
primaryKey: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
len: [3, 100],
notEmpty: true,
},
},
description: {
type: DataTypes.TEXT,
validate: {
len: [3, 500],
},
},
category: {
type: DataTypes.STRING,
validate: {
len: [3, 50],
},
},
latitude: {
type: DataTypes.DOUBLE,
validate: {
isDecimal: true,
},
},
longitude: {
type: DataTypes.DOUBLE,
validate: {
isDecimal: true,
},
},
imageUrl: {
type: DataTypes.STRING,
allowNull: true,
// ✅ Remove this validation
// validate: {
//   isUrl: true,
// },
},

user_id: {
type: DataTypes.UUID,
allowNull: false,
references: {
model: 'Users',
key: 'id',
},
validate: {
notEmpty: true,
},
},
});

// Define the relationship between Shop and User
Shop.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Shop;
