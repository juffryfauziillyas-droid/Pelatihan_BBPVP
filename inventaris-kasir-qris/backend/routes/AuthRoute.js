// backend/routes/AuthRoute.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/AuthController");
const { verifyToken, restrictTo } = require("../middleware/AuthMiddleware");

// Route Publik
router.post("/auth/login", login);

// Route Terproteksi: Hanya boleh diakses oleh ADMIN
router.post("/auth/register", verifyToken, restrictTo("admin"), register);
router.get("/users", verifyToken, restrictTo("admin"), getAllUsers);
router.put("/users/:id", verifyToken, restrictTo("admin"), updateUser);
router.delete("/users/:id", verifyToken, restrictTo("admin"), deleteUser);

module.exports = router;
