const express = require("express");
const router = express.Router();
const leaveApplicationController = require("../controller/leaveApplicationController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Employee Routes
router.post(
  "/apply",
  authenticateToken,
  authorizeRole(["employee"]),
  leaveApplicationController.createLeaveApplication
);
 // Apply for leave
router.get(
  "/history/:id",
  authenticateToken,
  authorizeRole(["employee"]),
  leaveApplicationController.getEmployeeLeaveHistory
); // View leave history

// Admin Routes
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveApplicationController.getAllLeaveApplications
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveApplicationController.getLeaveApplicationById
);
router.put(
  "/:id/status",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveApplicationController.updateLeaveStatus // Change function name for clarity
);

module.exports = router;
