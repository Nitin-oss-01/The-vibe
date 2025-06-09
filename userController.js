const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required." });
        }

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Create user error:", err);
        res.status(500).json({ error: "Server error while creating user" });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error("Get all users error:", err);
        res.status(500).json({ error: "Server error while fetching users" });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error("Get user by ID error:", err);
        res.status(500).json({ error: "Server error while fetching user" });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { name, email, password, role } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
        console.error("Update user error:", err);
        res.status(500).json({ error: "Server error while updating user" });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ error: "Server error while deleting user" });
    }
};
