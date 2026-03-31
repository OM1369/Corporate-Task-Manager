const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../middleware/validationMiddleware");
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/employees", verifyToken, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;