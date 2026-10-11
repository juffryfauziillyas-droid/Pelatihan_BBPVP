const Product = require("../models/ProductModel");

// 1. TAMBAH PRODUK BARU (Create)
const createProduct = async (req, res) => {
  try {
    const { nama_produk, kode_barang, harga_jual, stok } = req.body;

    // Validasi input dasar (Kriteria Validasi Data)
    if (!nama_produk || !kode_barang || !harga_jual) {
      return res.status(400).json({ message: "Semua data wajib diisi!" });
    }

    const newProduct = await Product.create({
      nama_produk,
      kode_barang,
      harga_jual,
      stok,
    });
    res
      .status(201)
      .json({ message: "Produk berhasil ditambahkan!", data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambah produk", error: error.message });
  }
};

// 2. LIHAT SEMUA PRODUK (Read)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data produk", error: error.message });
  }
};

// 3. UBAH DATA PRODUK (Update)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, kode_barang, harga_jual, stok } = req.body;

    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    await product.update({ nama_produk, kode_barang, harga_jual, stok });
    res
      .status(200)
      .json({ message: "Produk berhasil diperbarui!", data: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui produk", error: error.message });
  }
};

// 4. HAPUS PRODUK (Delete)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    await product.destroy();
    res
      .status(200)
      .json({ message: "Produk berhasil dihapus dari inventaris!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus produk", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
