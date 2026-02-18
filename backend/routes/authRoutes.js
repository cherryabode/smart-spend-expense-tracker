const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ===== Public Routes =====
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

