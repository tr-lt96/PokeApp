// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../../config");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token; for simplicity, we include the user id
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.getUserInformation = async (req, res) => {
  try {
    // Lookup full user document from DB
    const user = await User.findById(req.user.userId).select("email username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all their teams
    const teams = await Team.find({ userId: req.user.userId });

    res.status(200).json({
      message: "User information retrieved successfully",
      user: {
        email: user.email,
        username: user.username,
      },
      teams,
    });
  } catch (error) {
    console.error("Get user information error:", error.message);
    res.status(500).json({
      message: "Failed to retrieve user information",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    // ✅ Just assign new password — pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // With JWT, there's nothing to "invalidate" unless you use a blacklist
    // But we can respond with a message and let frontend remove token
    res.status(200).json({
      message:
        "Logged out successfully. Please remove token from client storage.",
    });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
