const { LeaveType } = require("../models"); // Import the LeaveType model

const leaveTypeController = {
  // Create a new leave type
  createLeaveType: async (req, res) => {
    try {
      const { name, description } = req.body;
      const leaveType = await LeaveType.create({ name, description });
      res.status(201).json({ message: "Leave type added", leaveType });
      console.log(req.body);
    } catch (error) {
      res.status(500).json({ error: "Failed to add leave type" });
    }
  },

  // Get all leave types
  getAllLeaveTypes: async (req, res) => {
    try {
      const leaveTypes = await LeaveType.findAll();
      res.status(200).json(leaveTypes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leave types" });
    }
  },

  // Get a single leave type by ID
  getLeaveTypeById: async (req, res) => {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (!leaveType) {
        return res.status(404).json({ message: "Leave type not found" });
      }
      res.status(200).json(leaveType);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting leave type", error: error.message });
    }
  },

  // Update a leave type by ID
  updateLeaveType: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const leaveType = await LeaveType.findByPk(id);
      if (!leaveType)
        return res.status(404).json({ error: "Leave type not found" });

      await leaveType.update({ name, description });
      res.status(200).json({ message: "Leave type updated", leaveType });
    } catch (error) {
      res.status(500).json({ error: "Failed to update leave type" });
    }
  },

  // Delete a leave type by ID
  deleteLeaveType: async (req, res) => {
    try {
      const { id } = req.params;
      const leaveType = await LeaveType.findByPk(id);

      if (!leaveType) {
        return res.status(404).json({ error: "Leave Type not found" });
      }

      await leaveType.destroy();
      res.status(200).json({ message: "✅ Leave Type deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete leave type" });
    }
  },
};

module.exports = leaveTypeController;
