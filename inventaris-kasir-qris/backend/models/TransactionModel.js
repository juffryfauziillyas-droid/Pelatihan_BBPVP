
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Transaction = db.define(
  "transactions",
  {
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING", // Status awal saat kasir memunculkan QRIS
    },
    detail_barang: {
      type: DataTypes.JSON,
      allowNull: false,
      // Menyimpan daftar barang belanjaan berbentuk array, contoh: [{"product_id": 1, "qty": 2}]
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Transaction;
