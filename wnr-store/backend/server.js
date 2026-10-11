const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi Koneksi Database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Cek Koneksi Database
db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err.stack);
    return;
  }
  console.log("Berhasil terhubung ke database MySQL: wnr_store_db");
});

// --- API ROUTES ---

// 1. Endpoint Test Server
app.get("/", (req, res) => {
  res.json({ pesan: "Backend WNR_STORE berjalan dengan baik!" });
});

// 2. Endpoint Ambil Semua Produk (beserta Kategori-nya)
app.get("/api/produk", (req, res) => {
  const query = `
    SELECT produk.*, kategori.nama_kategori 
    FROM produk 
    JOIN kategori ON produk.id_kategori = kategori.id_kategori
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Gagal mengambil data produk dari database" });
    }
    res.json(results);
  });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server WNR_STORE aktif di http://localhost:${PORT}`);
});
