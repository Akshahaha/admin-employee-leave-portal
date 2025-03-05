// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateToken = (req, res, next) => {
  console.log("🔍 Incoming Headers:", req.headers);
  console.log(
    "🔍 Received Authorization Header:",
    req.headers["authorization"]
  ); // Debugging

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    // Fetch the user from the database to ensure the user exists
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Invalid token - User not found" });
    }

    req.user = { id: user.id, role: foundUser.role }; // Add user information to the request object
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role);

    if (!req.user.role) {
      return res.status(403).json({ message: "Role not found in token" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};
module.exports = {
  authenticateToken,
  authorizeRole,
};
