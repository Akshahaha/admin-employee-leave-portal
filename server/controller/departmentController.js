// server/controllers/departmentController.js
const { Department } = require("../models"); // Import the Department model

const departmentController = {
  createDepartment: async (req, res) => {
    try {
      const { deptCode, name, shortName } = req.body;

      // Basic validation
      if (!deptCode || !name || !shortName) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const department = await Department.create({
        deptCode,
        name,
        shortName,
      });
      res.status(201).json(department);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating department", error: error.message });
    }
  },
  // ... rest of your controller methods remain unchanged

  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.findAll({
        attributes: ["id", "name", "deptCode", "shortName", "createdAt"], // Ensure createdAt is included
        order: [["createdAt", "DESC"]], // Order by latest first
      });
      res.status(200).json(departments);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error getting departments", error: error.message });
    }
  },

  getDepartmentById: async (req, res) => {
    try {
      const departmentId = req.params.id;
      const department = await Department.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
      res.status(200).json(department);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error getting department", error: error.message });
    }
  },
  updateDepartment: async (req, res) => {
    try {
      const departmentId = req.params.id;
      const { name, shortName, deptCode } = req.body;

      const department = await Department.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      department.name = name;
      department.shortName = shortName;
      department.deptCode = deptCode; // Ensure deptCode can be updated
      await department.save();

      res
        .status(200)
        .json({ message: "Department updated successfully", department });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating department", error: error.message });
    }
  },

  deleteDepartment: async (req, res) => {
    try {
      const departmentId = req.params.id;
      const department = await Department.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
      await department.destroy();
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting department", error: error.message });
    }
  },
};

module.exports = departmentController;
