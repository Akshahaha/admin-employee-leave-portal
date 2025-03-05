const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "Department",
  {
    deptCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "deptCode", // Explicitly mapping to match DB column
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at", // Explicitly map to `created_at`
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at", // Explicitly map to `updated_at`
    },
  },
  {
    timestamps: true, // Enables Sequelize's automatic timestamps
    sequelize,
    tableName: "Departments", // Ensure it matches your table name
  }
);

module.exports = Department;
