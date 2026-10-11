-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Okt 2026 pada 17.43
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `wnr_store_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Makanan'),
(2, 'Minuman'),
(3, 'Baby & Kids'),
(4, 'Perawatan & Kesehatan'),
(5, 'Tembakau');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemasok`
--

CREATE TABLE `pemasok` (
  `id_pemasok` int(11) NOT NULL,
  `nama_pemasok` varchar(100) NOT NULL,
  `nomor_telepon` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `id_pembelian` int(11) NOT NULL,
  `id_pemasok` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_biaya` decimal(12,2) NOT NULL,
  `tanggal_pembelian` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `nama_pengguna` varchar(50) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `peran` enum('kasir','kepala','owner') NOT NULL,
  `dibuat_pada` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama_lengkap`, `nama_pengguna`, `kata_sandi`, `peran`, `dibuat_pada`) VALUES
(1, 'Budi Santoso', 'kasir1', 'password123', 'kasir', '2026-10-11 04:14:56'),
(2, 'Siti Rahma', 'kepala1', 'password123', 'kepala', '2026-10-11 04:14:56'),
(3, 'Ahmad Wijaya', 'owner1', 'password123', 'owner', '2026-10-11 04:14:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan`
--

CREATE TABLE `penjualan` (
  `id_penjualan` int(11) NOT NULL,
  `id_pengguna` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(12,2) NOT NULL,
  `tanggal_penjualan` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `kode_sku` varchar(50) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `harga_beli` decimal(12,2) NOT NULL,
  `harga_jual` decimal(12,2) NOT NULL,
  `stok` int(11) DEFAULT 0,
  `foto_produk` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id_produk`, `id_kategori`, `kode_sku`, `nama_produk`, `harga_beli`, `harga_jual`, `stok`, `foto_produk`) VALUES
(1, 1, 'MKN-001', 'Indomie Goreng Original 85g', 2800.00, 3500.00, 100, 'indomie-goreng.jpg'),
(2, 1, 'MKN-002', 'Roti Tawar Kupas Sari Roti', 13000.00, 16000.00, 30, 'roti-tawar.jpg'),
(3, 1, 'MKN-003', 'Minyak Goreng Bimoli 2 Litras', 32000.00, 38000.00, 50, 'bimoli-2l.jpg'),
(4, 1, 'MKN-004', 'Biskuit Khong Guan 650g', 48000.00, 55000.00, 20, 'khong-guan.jpg'),
(5, 1, 'MKN-005', 'Beras Putih Premium 5kg', 65000.00, 75000.00, 40, 'beras-5kg.jpg'),
(6, 2, 'MNM-001', 'Air Mineral Le Minerale 600ml', 2500.00, 3500.00, 120, 'le-minerale-600.jpg'),
(7, 2, 'MNM-002', 'Teh Pucuk Harum 350ml', 3000.00, 4000.00, 90, 'teh-pucuk.jpg'),
(8, 2, 'MNM-003', 'Kopi Kapal Api Grande 20g', 1200.00, 2000.00, 200, 'kapal-api.jpg'),
(9, 2, 'MNM-004', 'Susu UHT Ultra Milk Cokelat 250ml', 5500.00, 7000.00, 60, 'ultramilk-cokelat.jpg'),
(10, 2, 'MNM-005', 'Pocari Sweat 500ml', 6500.00, 8500.00, 45, 'pocari-sweat.jpg'),
(11, 3, 'BBK-001', 'Popok MamyPoko Pants M34', 52000.00, 62000.00, 25, 'mamypoko-m34.jpg'),
(12, 3, 'BBK-002', 'Minyak Telon Lang 100ml', 28000.00, 34000.00, 35, 'telon-lang.jpg'),
(13, 3, 'BBK-003', 'Shampoo Baby Cussons 100ml', 11000.00, 15000.00, 30, 'cussons-shampoo.jpg'),
(14, 3, 'BBK-004', 'Susu SGM Eksplor 1+ 400g', 38000.00, 45000.00, 20, 'sgm-1plus.jpg'),
(15, 3, 'BBK-005', 'Tisu Basah Mitu Baby 50s', 12000.00, 16000.00, 50, 'mitu-baby.jpg'),
(16, 4, 'PRW-001', 'Sabun Mandi Lifebuoy Red 110g', 4000.00, 5500.00, 80, 'lifebuoy-red.jpg'),
(17, 4, 'PRW-002', 'Shampoo Pantene Anti Dandruff 160ml', 21000.00, 26000.00, 40, 'pantene-160ml.jpg'),
(18, 4, 'PRW-003', 'Pasta Gigi Pepsodent 190g', 10000.00, 13500.00, 65, 'pepsodent-190g.jpg'),
(19, 4, 'PRW-004', 'Tolaking Herbal 15ml (5 sachet)', 15000.00, 19000.00, 50, 'tolak-angin.jpg'),
(20, 4, 'PRW-005', 'Plaster Hansaplast Pack (10 lembar)', 5000.00, 7500.00, 70, 'hansaplast.jpg'),
(21, 5, 'TBK-001', 'Rokok Sampoerna A Mild 16', 31000.00, 35000.00, 100, 'sampoerna-amild.jpg'),
(22, 5, 'TBK-002', 'Rokok Gudang Garam Filter 12', 23000.00, 26000.00, 80, 'gg-filter.jpg'),
(23, 5, 'TBK-003', 'Rokok Djarum Super 12', 22000.00, 25000.00, 75, 'djarum-super.jpg'),
(24, 5, 'TBK-004', 'Rokok Marlboro Red 20', 38000.00, 43000.00, 50, 'marlboro-red.jpg'),
(25, 5, 'TBK-005', 'Tembakau Mole Premium 50g', 15000.00, 20000.00, 30, 'tembakau-mole.jpg');

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `pemasok`
--
ALTER TABLE `pemasok`
  ADD PRIMARY KEY (`id_pemasok`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id_pembelian`),
  ADD KEY `id_pemasok` (`id_pemasok`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `nama_pengguna` (`nama_pengguna`);

--
-- Indeks untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id_penjualan`),
  ADD KEY `id_pengguna` (`id_pengguna`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD UNIQUE KEY `kode_sku` (`kode_sku`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pemasok`
--
ALTER TABLE `pemasok`
  MODIFY `id_pemasok` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id_pembelian` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `id_penjualan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`id_pemasok`) REFERENCES `pemasok` (`id_pemasok`) ON DELETE CASCADE,
  ADD CONSTRAINT `pembelian_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE CASCADE,
  ADD CONSTRAINT `penjualan_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
