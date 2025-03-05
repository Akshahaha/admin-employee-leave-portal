const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LeaveApplication = sequelize.define(
  "LeaveApplication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      // ✅ Matches table column
      type: DataTypes.TEXT,
      allowNull: false,
    },
    from_date: {
      // ✅ Matches table column
      type: DataTypes.DATE,
      allowNull: false,
    },
    to_date: {
      // ✅ Matches table column
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    userId: {
      // ✅ Matches table column
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approvedBy: {
      // ✅ Matches table column
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "leaveapplications",
    timestamps: true, // ✅ Enables `createdAt` & `updatedAt`
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = LeaveApplication;
