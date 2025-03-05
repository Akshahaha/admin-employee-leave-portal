// server/routes/departments.js
const express = require("express");
const router = express.Router();
const departmentController = require("../controller/departmentController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// router.post(
//   "/add",
//   authenticateToken,
//   authorizeRole(["admin"]),
//   departmentController.createDepartment
// );

router.post("/add", departmentController.createDepartment);

router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  departmentController.getAllDepartments
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  departmentController.getDepartmentById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  departmentController.updateDepartment
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  departmentController.deleteDepartment
);

module.exports = router;
