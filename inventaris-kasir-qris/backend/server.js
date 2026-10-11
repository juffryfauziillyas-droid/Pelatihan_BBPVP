// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./config/database");

// Import Semua Model
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Transaction = require("./models/TransactionModel");

// Import Semua Route API
const AuthRoute = require("./routes/AuthRoute");
const ProductRoute = require("./routes/ProductRoute");
const TransactionRoute = require("./routes/TransactionRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

// Daftarkan Semua Route API ke Express
app.use("/api", AuthRoute);
app.use("/api", ProductRoute);
app.use("/api", TransactionRoute);

// Sinkronisasi Database MySQL (Otomatis membuat tabel users, products, transactions)
db.sync()
  .then(() =>
    console.log("⚡ Database & Semua Tabel Hak Akses Berhasil Disinkronkan."),
  )
  .catch((err) => console.error("❌ Gagal sinkronisasi database:", err));

app.get("/", (req, res) => {
  res.send("API Server Toko dengan Sistem Hak Akses Aktif!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});
