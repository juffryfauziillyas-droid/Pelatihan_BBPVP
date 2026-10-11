import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section / Banner Utama */}
      <Hero />

      {/* Placeholder Bagian Berikutnya */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-400">
          Bagian Fitur, Katalog Produk, dan Footer akan segera menyusul di bawah
          ini...
        </p>
      </div>
    </div>
  );
}
