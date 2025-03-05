// server/models/LeaveType.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LeaveType = sequelize.define(
  "LeaveType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "leave_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = LeaveType;
