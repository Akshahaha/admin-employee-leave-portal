const sequelize = require("../config/database");

// Import models
const User = require("./User");
const Department = require("./Department");
const LeaveType = require("./LeaveType");
const LeaveApplication = require("./LeaveApplication");
const Employee = require("./Employee"); // ✅ Ensure correct case

// ✅ Define Associations

// Employee - Department Relationship
// Employee.belongsTo(Department, {
//   foreignKey: "departmentId",
//   as: "department",
// });
// Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });

// User - Department Relationship
User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

// LeaveApplication - User Relationship (Applicant & Approver)
LeaveApplication.belongsTo(User, { foreignKey: "userId", as: "applicant" });
LeaveApplication.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });

// LeaveApplication - LeaveType Relationship
// LeaveApplication.belongsTo(LeaveType, {
//   foreignKey: "leaveTypeId",
//   as: "leaveType",
// });

// ✅ User - LeaveApplications Relationship (If a user can apply for multiple leaves)
User.hasMany(LeaveApplication, {
  foreignKey: "userId",
  as: "leaveApplications",
});

// ✅ LeaveApplication - Employee Relationship (If leave is linked to employees separately)
// LeaveApplication.belongsTo(Employee, { foreignKey: "emp_id", as: "employee" });
// Employee.hasMany(LeaveApplication, {
//   foreignKey: "emp_id",
//   as: "leaveApplications",
// });

module.exports = {
  sequelize,
  User,
  Department,
  LeaveType,
  LeaveApplication,
  Employee,
};
