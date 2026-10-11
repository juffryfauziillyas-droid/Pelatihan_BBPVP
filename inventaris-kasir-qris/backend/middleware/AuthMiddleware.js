// backend/middleware/AuthMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware untuk memeriksa apakah user sudah login (punya token)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Akses ditolak! Anda belum login." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token tidak valid atau kadaluwarsa." });
    req.user = decoded; // Menyimpan data token (id dan role) ke dalam request
    next();
  });
};

// Middleware khusus untuk menyaring role pengguna
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Jika role user tidak ada dalam daftar yang diizinkan
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki hak akses untuk fitur ini!" });
    }
    next();
  };
};

module.exports = { verifyToken, restrictTo };
