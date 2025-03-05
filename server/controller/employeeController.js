const { Employee } = require("../models"); // Import the Employee model

const employeeController = {
  // Create a new employee
  createEmployee: async (req, res) => {
    try {
      console.log("Incoming Request Body:", req.body);
      const newEmployee = await Employee.create(req.body);
      res
        .status(201)
        .json({ message: "Employee added successfully", newEmployee });
    } catch (error) {
      console.error("Create Employee Error:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to add employee" });
    }
  },

  // Get all employees
  getAllEmployees: async (req, res) => {
    try {
      console.error("Attempting to fetch all employees..."); // Log before
      const employees = await Employee.findAll();
      console.error("Successfully fetched employees."); // Log after
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error in getAllEmployees:", error); // Log the *full* error object!
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const employee = await Employee.findOne({ where: { id: id } }); // Use correct variable

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error("Error fetching employee details", error);
      res.status(500).json({ error: "Error fetching employee details" });
    }
  },
  // Update employee details
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });

      await employee.update(req.body);
      res
        .status(200)
        .json({ message: "Employee updated successfully", employee });
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  },

  // Delete an employee
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });

      await employee.destroy();
      res.status(200).json({ message: "✅ Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  },

 getEmployeeProfile: async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from JWT
      console.log("Extracted User ID:", userId);

      const employee = await Employee.findOne({
        where: { user_id: userId }, // Match user_id, not id
        attributes: [
          "id",
          "name",
          "job_position",
          "email",
          "phone_number",
          "qualification",
        ],
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(employee);
    } catch (error) {
      console.error("Error fetching employee profile:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = employeeController;
