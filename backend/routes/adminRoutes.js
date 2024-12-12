const express = require("express");
const { protectRoute } = require("../controllers/authController");
const router = express.Router();

// Example of a protected route (Admin can access these)
router.get("/admin-dashboard", protectRoute, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access only" });
  }
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
