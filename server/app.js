// server/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const db = require("./models");
const { authenticateToken } = require("./middleware/authMiddleware"); // Import the models

// Middleware

app.use(express.json()); // ✅ Built-in JSON parsing
app.use(express.urlencoded({ extended: true })); // ✅ Parse JSON bodies

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to match frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"], // 🔥 Ensure Authorization is allowed
  })
);
// Routes
const userRoutes = require("./routes/users");
const departmentRoutes = require("./routes/department");
const leaveTypeRoutes = require("./routes/leavetypes");
const leaveApplicationRoutes = require("./routes/leaveApplication");
const employeeRoutes = require("./routes/employee");

app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/leave-types", authenticateToken, leaveTypeRoutes);
app.use("/api/leave-applications", authenticateToken, leaveApplicationRoutes);
app.use("/api/employees", authenticateToken, employeeRoutes);

app.get("/api/employees", authenticateToken, (req, res) => {
  console.log("Received Headers:", req.headers);
  res.json({ message: "Employees data" });
});
app.get("/api/employees/profile/:id", authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Now correctly fetching ID from URL
  if (!userId) {
    return res.status(400).json({ message: "Invalid or missing user ID" });
  }

  try {
    const employee = await db.Employee.findOne({ where: { id: userId } }); // Access the model from the db object
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ✅ Secure: Use token authentication instead of user_id query parameter
app.get(
  "/api/leave-applications/history",
  authenticateToken,
  async (req, res) => {
    const empId = req.user.id; // Extract employee ID from token
    console.log(`Fetching leave history for emp_id: ${empId}`);

    try {
      const query = "SELECT * FROM leave_applications WHERE emp_id = ?";
      pool.query(query, [empId], (err, results) => {
        if (err) {
          console.error("Error fetching leave history:", err.message);
          return res.status(500).json({ error: "Database error" });
        }
        console.log("Results from database: ", results);
        res.json(results);
      });
    } catch (error) {
      console.error("Server error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
app.put("/api/leave-applications/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("Received Request to Update Status");
  console.log("Leave ID:", id);
  console.log("New Status:", status);

  const validStatuses = ["Pending", "Approved", "Rejected"];
  if (!validStatuses.includes(status)) {
    console.log("Invalid status received:", status);
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    console.log("Checking if leave application exists...");
    const leaveApplication = await db.LeaveApplication.findByPk(id);

    if (!leaveApplication) {
      console.log("Leave application not found for ID:", id);
      return res.status(404).json({ error: "Leave application not found" });
    }

    console.log("Current Leave Application Data:", leaveApplication.dataValues);
    leaveApplication.status = status;
    await leaveApplication.save();

    console.log("Status updated successfully for ID:", id);
    res.json({ message: "Status updated successfully", leaveApplication });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ Validate inputs before inserting into DB
app.post(
  "/api/leave-applications/apply",
  authenticateToken,
  async (req, res) => {
    console.log("Received Headers:", req.headers);

    const { emp_id, userId, description, from_date, to_date } = req.body;
    const user_id = req.user.id; // Extract from token

    if (!userId || !from_date || !to_date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Create a new leave application using Sequelize
      const leave = await LeaveApplication.create({
        emp_id: emp_id || user_id, // Use emp_id from body or authenticated user_id as fallback
        userId: userId, // Use the userId from the request body (should match authenticated user_id)
        description, // Reason for leave
        from_date, // Start date of leave
        to_date, // End date of leave
        status: "Pending", // Default status
      });

      res.status(201).json({ message: "Leave applied successfully", leave });
    } catch (error) {
      console.error("Error applying leave:", error);
      res.status(500).json({ error: "Error applying for leave" });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Leave Management System API");
});







//Sync the database
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
