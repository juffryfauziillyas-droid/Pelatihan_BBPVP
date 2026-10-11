// backend/controllers/TransactionController.js
const Transaction = require("../models/TransactionModel");
const Product = require("../models/ProductModel");

// 1. MEMBUAT TRANSAKSI KASIR BARU (POST)
const createTransaction = async (req, res) => {
  try {
    const { detail_barang, total_harga } = req.body;

    if (!detail_barang || detail_barang.length === 0) {
      return res
        .status(400)
        .json({ message: "Keranjang belanja masih kosong!" });
    }

    // VALIDASI LOGIKA: Cek kecukupan stok sebelum memproses transaksi
    for (const item of detail_barang) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return res
          .status(404)
          .json({
            message: `Produk dengan ID ${item.product_id} tidak ditemukan`,
          });
      }
      if (product.stok < item.qty) {
        return res
          .status(400)
          .json({
            message: `Stok produk [${product.nama_produk}] tidak mencukupi! Sisa: ${product.stok}`,
          });
      }
    }

    // PROSES POTONG STOK: Kurangi stok di database secara real-time
    for (const item of detail_barang) {
      const product = await Product.findByPk(item.product_id);
      await product.update({ stok: product.stok - item.qty });
    }

    // SIMPAN NOTA TRANSAKSI DENGAN STATUS PENDING
    const newTransaction = await Transaction.create({
      total_harga,
      detail_barang,
      status_pembayaran: "PENDING",
    });

    // SIMULASI QRIS INTERNAL: Mengembalikan URL QRIS statis dari server kita sendiri
    const qris_url = `http://localhost:${process.env.PORT || 5000}/public/qris-stub.png`;

    res.status(201).json({
      message: "Transaksi berhasil dibuat! Silakan scan QRIS untuk membayar.",
      transaction: newTransaction,
      qris_url: qris_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memproses transaksi", error: error.message });
  }
};

// 2. KONFIRMASI PEMBAYARAN QRIS (PUT) -> Dipicu tombol sakti di React nanti
const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    if (transaction.status_pembayaran === "SUCCESS") {
      return res.status(400).json({ message: "Transaksi ini sudah lunas!" });
    }

    // Ubah status pembayaran menjadi lunas
    await transaction.update({ status_pembayaran: "SUCCESS" });

    res.status(200).json({
      message: "Pembayaran QRIS Berhasil Dikonfirmasi! Status: LUNAS",
      transaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal mengonfirmasi pembayaran",
        error: error.message,
      });
  }
};

module.exports = { createTransaction, confirmPayment };
