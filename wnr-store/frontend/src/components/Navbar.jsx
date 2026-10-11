import React, { useState, useEffect } from "react";
import {
  Store,
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const jumlahKeranjang = 2; // Contoh dummy jumlah barang di keranjang

  // Cek preferensi tema saat pertama kali halaman dimuat
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Fungsi untuk mengubah tema (Dark/Light)
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 1. Logo & Nama Toko */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md shadow-blue-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                WNR_STORE
              </h1>
              <span className="hidden sm:inline-block bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                ● Buka
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Toko Offline & Pesanan Online
            </p>
          </div>
        </div>

        {/* 2. Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a
            href="#beranda"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Beranda
          </a>
          <a
            href="#fitur"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Layanan
          </a>
          <a
            href="#katalog"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Katalog Produk
          </a>
          <a
            href="#kontak"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Lokasi Toko
          </a>
        </nav>

        {/* 3. Aksi Kanan (Toggle Tema, Keranjang, & Kontak WA) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Tombol Dark/Light Mode */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition border border-gray-200 dark:border-gray-700"
            title="Ubah Tema Tampilan"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Tombol Keranjang */}
          <button
            onClick={() => alert("Buka keranjang belanja")}
            className="relative p-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition border border-gray-200 dark:border-gray-700"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {jumlahKeranjang > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {jumlahKeranjang}
              </span>
            )}
          </button>

          {/* Tombol WhatsApp */}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-emerald-500/20 transition flex items-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Chat WA</span>
          </a>
        </div>

        {/* 4. Tombol Mobile (Toggle Tema & Hamburger Menu) */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 space-y-3 transition-colors">
          <a
            href="#beranda"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 dark:text-gray-300 font-medium py-1"
          >
            Beranda
          </a>
          <a
            href="#fitur"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 dark:text-gray-300 font-medium py-1"
          >
            Layanan
          </a>
          <a
            href="#katalog"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 dark:text-gray-300 font-medium py-1"
          >
            Katalog Produk
          </a>
          <a
            href="#kontak"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 dark:text-gray-300 font-medium py-1"
          >
            Lokasi Toko
          </a>
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Keranjang: {jumlahKeranjang} item
            </span>
            <a
              href="https://wa.me/6281234567890"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Chat WA
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
