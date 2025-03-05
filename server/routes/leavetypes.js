const express = require("express");
const router = express.Router();
const leaveTypeController = require("../controller/leaveTypeController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Public route: Get all leave types
router.get("/", leaveTypeController.getAllLeaveTypes);
router.get("/:id", leaveTypeController.getLeaveTypeById);

// Admin routes: Restricted access
router.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveTypeController.createLeaveType
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveTypeController.updateLeaveType
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  leaveTypeController.deleteLeaveType
);

module.exports = router;
