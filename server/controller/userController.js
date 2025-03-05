const { User, Employee } = require("../models"); // Import both models
// Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d", //
  });
};

const userController = {
  register: async (req, res) => {
    try {
      let { first_name, last_name, email, password, role, departmentId } =
        req.body;
      email = email.toLowerCase();

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Do NOT hash the password here; let the model hook handle it
      const user = await User.create({
        first_name,
        last_name,
        email,
        password, // Pass the plain password
        role,
        departmentId,
      });

      const token = generateToken(user);

      res.status(201).json({
        message: "User created successfully",
        user: { id: user.id, first_name, last_name, email, role, departmentId },
        token,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email.trim().toLowerCase();

      const userDetails = await User.findOne({ where: { email } });

      if (!userDetails) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await userDetails.verifyPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(userDetails);

      // Fetch or create the employee profile
      let employeeProfile = await Employee.findOne({
        where: { email: userDetails.email },
      });

      if (employeeProfile) {
        if (!employeeProfile.user_id) {
          await Employee.update(
            { user_id: userDetails.id },
            { where: { email: userDetails.email } }
          );
          employeeProfile.user_id = userDetails.id; // Ensure local object is updated
        }
      } else {
        employeeProfile = await Employee.create({
          user_id: User.id,
          name: `${userDetails.first_name} ${userDetails.last_name}`,
          email: userDetails.email,
          job_position: "New Employee",
          phone_number: "",
          qualification: "",
        });
      }

      res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: userDetails.id,
          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          email: userDetails.email,
          role: userDetails.role,
        },
        token,
        employeeProfile: employeeProfile
          ? {
              // id: employeeProfile.id,
              name: employeeProfile.name,
              email: employeeProfile.email,
              job_position: employeeProfile.job_position,
              phone_number: employeeProfile.phone_number,
              qualification: employeeProfile.qualification,
              id: employeeProfile.user_id, // This should match user.id
            }
          : null,
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  },
  // verifyPassword: async (password) => {
  //   if (!password) {
  //     return false;
  //   }
  //   return await bcrypt.compare(this.password, password);
  // },

  getProfile: async (req, res) => {
    try {
      const user = await User.scope("withoutPassword").findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error getting user profile", error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { first_name, last_name, email, password, departmentId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update fields
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email ? email.toLowerCase() : user.email;
      user.departmentId = departmentId || user.departmentId;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      res.status(200).json({
        message: "User updated successfully",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          departmentId: user.departmentId,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating profile", error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] }, // Exclude passwords from the result
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error getting users", error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.scope("withoutPassword").findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error getting user", error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        first_name,
        last_name,
        email,
        role,
        departmentId,
        status,
        password,
      } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (email) user.email = email.toLowerCase();
      if (role) user.role = role;
      if (departmentId) user.departmentId = departmentId;
      if (status) user.status = status;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      res.status(200).json({
        message: "User updated successfully",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          departmentId: user.departmentId,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  },
};

module.exports = userController;
