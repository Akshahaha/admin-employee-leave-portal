const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Employees", // Matches actual table name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
  Employee.associate = (models) => {
    Employee.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE", // If the user is deleted, delete also the profile
    });
  };


module.exports = Employee;
