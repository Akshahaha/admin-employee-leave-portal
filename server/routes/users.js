// server/routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController"); // Create this later
const departmentController = require("../controller/departmentController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware"); // For protecting routes

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/add", departmentController.createDepartment);
router.get("/profile", authenticateToken, userController.getProfile); // Example protected route
router.put("/profile", authenticateToken, userController.updateProfile); // Example protected route

//Admin-only routes
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  userController.getAllUsers
); // Admin gets all users
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  userController.getUserById
); // Admin gets a specific user
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  userController.updateUser
); // Admin updates user
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  userController.deleteUser
); // Admin deletes user

module.exports = router;
