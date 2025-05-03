// server/routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const validateRequest = require("../middleware/validationMiddleware");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  authController.register
);

router.post(
  "/login",
  [
    body("usernameOrEmail")
      .notEmpty()
      .withMessage("Username or Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  authController.login
);

router.get(
  "/userInformation",
  authMiddleware,
  authController.getUserInformation
);

router.put(
  "/change-password",
  authMiddleware,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    body("confirmNewPassword")
      .notEmpty()
      .withMessage("Please confirm new password"),
  ],
  validateRequest,
  authController.changePassword
);

router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
