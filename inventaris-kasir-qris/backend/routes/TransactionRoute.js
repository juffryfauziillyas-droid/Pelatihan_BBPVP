// backend/routes/TransactionRoute.js
const express = require("express");
const router = express.Router();
const {
  createTransaction,
  confirmPayment,
} = require("../controllers/TransactionController");
const { verifyToken, restrictTo } = require("../middleware/AuthMiddleware");

// KASIR & ADMIN yang bisa input transaksi. KEPALA TOKO tidak bisa input.
router.post(
  "/transactions",
  verifyToken,
  restrictTo("admin", "kasir"),
  createTransaction,
);
router.put(
  "/transactions/:id/pay",
  verifyToken,
  restrictTo("admin", "kasir"),
  confirmPayment,
);

// BARIS DI BAWAH INI YANG SUDAH DIPERBAIKI
module.exports = router;
