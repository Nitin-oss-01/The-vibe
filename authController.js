const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require(path.resolve(__dirname, "../models/User"));
require("dotenv").config();

// SIGNUP
exports.signup = async (req, res) => {
try {
const { name, email, password, role } = req.body;

// Check if email already exists
const existingUser = await User.findOne({ where: { email } });
if (existingUser) {
return res.status(400).json({ message: "Email is already in use" });
}

// Create user - password is hashed automatically by model hook
const user = await User.create({ name, email, password, role });

res.status(201).json({ message: "User registered successfully", user });
} catch (err) {
console.error("Signup error:", err);
res.status(500).json({ error: "Server error during signup" });
}
};

// LOGIN
exports.login = async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ where: { email } });

if (!user) {
return res.status(401).json({ message: "Invalid credentials" });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(401).json({ message: "Invalid credentials" });
}

console.log("JWT_SECRET is:", process.env.JWT_SECRET);

const token = jwt.sign(
{ userId: user.id, role: user.role, email: user.email }, // Include more data if necessary
process.env.JWT_SECRET,
{ expiresIn: "1d" }
);

res.json({ message: "Login successful", token });
} catch (err) {
console.error("Login error:", err);
res.status(500).json({ error: "Server error during login" });
}
};
