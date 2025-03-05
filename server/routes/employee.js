const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Public route: Get all employees
router.get(
  "/profile",
  authenticateToken,
  employeeController.getEmployeeProfile
);
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  employeeController.getAllEmployees
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  employeeController.getEmployeeById
);

// Admin routes: Restricted access
router.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  (req, res, next) => {
    console.log("Request Body:", req.body);
    next();
  },
  employeeController.createEmployee
);


router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  employeeController.deleteEmployee
);


module.exports = router;
