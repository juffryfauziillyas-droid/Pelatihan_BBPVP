// backend/routes/ProductRoute.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { verifyToken, restrictTo } = require("../middleware/AuthMiddleware");

// Kunci Perubahan di baris ini: Hapus verifyToken agar pelanggan web umum bisa melihat katalog produk
router.get("/products", getAllProducts);

// Rute manajemen tetap dikunci aman khusus internal toko
router.post(
  "/products",
  verifyToken,
  restrictTo("admin", "kepala_toko"),
  createProduct,
);
router.put(
  "/products/:id",
  verifyToken,
  restrictTo("admin", "kepala_toko"),
  updateProduct,
);
router.delete("/products/:id", verifyToken, restrictTo("admin"), deleteProduct);

module.exports = router;
