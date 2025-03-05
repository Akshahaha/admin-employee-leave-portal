const { LeaveApplication, User } = require("../models");

const leaveApplicationController = {
  createLeaveApplication: async (req, res) => {
    try {
      const {
        emp_id,
        userId, // ✅ Matches the table column name
        from_date, // ✅ Matches the table column name
        to_date, // ✅ Matches the table column name
        description, // ✅ Matches the table column name
      } = req.body;

      if (!userId || !from_date || !to_date || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const leave = await LeaveApplication.create({
        emp_id,
        userId, // ✅ Corrected field name// ✅ Corrected field name
        description, // ✅ Corrected field name
        from_date, // ✅ Corrected field name
        to_date, // ✅ Corrected field name
        status: "Pending", // ✅ Default status
      });

      res.status(201).json({ message: "Leave application submitted", leave });
    } catch (error) {
      console.error("Error applying for leave:", error);
      res.status(500).json({ error: "Error applying for leave" });
    }
  },
  getAllLeaveApplications: async (req, res) => {
    try {
      const leaves = await LeaveApplication.findAll({
        attributes: [
          "id",
          "emp_id",
          "description",
          "from_date",
          "to_date",
          "status",
          "userId",
          "approvedBy",
          "createdAt",
          "updatedAt",
        ],
        order: [
          ["status", "ASC"],
          ["createdAt", "DESC"], // Corrected 'created_at' to 'createdAt'
        ],
      });

      res.status(200).json(leaves);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      res.status(500).json({ error: "Error fetching leave applications" });
    }
  },
  getLeaveApplicationById: async (req, res) => {
    try {
      const leaveApplicationId = req.params.id;
      const leaveApplication = await LeaveApplication.findByPk(
        leaveApplicationId,
        {
          include: [
            {
              model: User,
              as: "employee",
              attributes: ["id", "firstName", "lastName", "email"],
            },
          ],
        }
      );

      if (!leaveApplication) {
        return res.status(404).json({ message: "Leave application not found" });
      }

      res.status(200).json(leaveApplication);
    } catch (error) {
      console.error("Error in getLeaveApplicationById:", error.stack);
      res.status(500).json({
        message: "Error getting leave application",
        error: error.message,
      });
    }
  },
 updateLeaveStatus : async (req, res) => {
  try {
    const { leaveId } = req.params; // Get leaveId from URL
    const { status } = req.body; // Get new status from request body

    // Validate status
    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Update leave status in MySQL using Sequelize
    const [updatedRows] = await LeaveApplication.update(
      { status: status }, // Update this field
      { where: { id: leaveId } } // Condition
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: "Leave status updated successfully" });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
},

  updateLeaveApplication: async (req, res) => {
    try {
      const leaveApplicationId = req.params.id;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status update" });
      }

      const leaveApplication = await LeaveApplication.findByPk(
        leaveApplicationId
      );
      if (!leaveApplication) {
        return res.status(404).json({ message: "Leave application not found" });
      }

      leaveApplication.status = status;
      await leaveApplication.save();

      res.status(200).json({
        message: "Leave application updated successfully",
        leaveApplication,
      });
    } catch (error) {
      console.error("Error in updateLeaveApplication:", error.stack);
      res.status(500).json({
        message: "Error updating leave application",
        error: error.message,
      });
    }
  },

  getEmployeeLeaveHistory: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Missing user ID" });
      }

      const emp_id = req.user.id; // Get emp_id from token
      console.log(`Fetching leave history for emp_id: ${emp_id}`);

      const leaveApplications = await LeaveApplication.findAll({
        where: { emp_id }, // Ensure emp_id exists in table
        attributes: ["id", "from_date", "to_date", "status", "description"],
      });

      if (!leaveApplications.length) {
        return res
          .status(404)
          .json({ message: "No leave history found for this employee" });
      }

      res.status(200).json(leaveApplications);
    } catch (error) {
      console.error("Error in getEmployeeLeaveHistory:", error.message);
      res
        .status(500)
        .json({ message: "Error getting leave history", error: error.message });
    }
  },
};

module.exports = leaveApplicationController;
