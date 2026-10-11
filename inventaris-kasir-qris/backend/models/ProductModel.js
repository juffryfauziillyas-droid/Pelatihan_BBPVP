
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "products",
  {
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kode_barang: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Kode barang tidak boleh ada yang kembar
    },
    harga_jual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Product;
