// backend/controllers/AuthController.js
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. REGISTRASI / TAMBAH USER BARU
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Cek apakah email sudah terdaftar
    const userExist = await User.findOne({ where: { email } });
    if (userExist)
      return res.status(400).json({ message: "Email sudah terdaftar!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User berhasil didaftarkan!", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Gagal registrasi", error: error.message });
  }
};

// 2. LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Email tidak terdaftar!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah!" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login berhasil!",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal login", error: error.message });
  }
};

// 3. GET ALL USERS (Melihat Semua Data Pegawai)
const getAllUsers = async (req, res) => {
  try {
    // Mengambil semua user kecuali password-nya demi keamanan
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data user", error: error.message });
  }
};

// 4. UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    let updatedData = { username, email, role };

    // Jika admin juga menginput password baru, enkripsi ulang
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updatedData);
    res.status(200).json({ message: "Data user berhasil diperbarui!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui user", error: error.message });
  }
};

// 5. HAPUS USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await user.destroy();
    res.status(200).json({ message: "User berhasil dihapus!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus user", error: error.message });
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };
