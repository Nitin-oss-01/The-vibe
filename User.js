const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
name: {
type: DataTypes.STRING,
allowNull: false,
},
email: {
type: DataTypes.STRING,
unique: true,
allowNull: false,
validate: {
isEmail: {
msg: "Please provide a valid email address",
},
},
},
password: {
type: DataTypes.STRING,
allowNull: false,
validate: {
len: {
args: [6, 50],  // Ensure password length is between 6 to 50 characters
msg: "Password should be between 6 and 50 characters long",
},
},
},
role: {
type: DataTypes.STRING,
defaultValue: 'user',
}
});

// Hash password before saving
User.beforeCreate(async (user) => {
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
