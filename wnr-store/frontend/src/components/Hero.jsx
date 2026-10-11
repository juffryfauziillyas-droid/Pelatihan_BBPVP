import React from "react";
import {
  Store,
  QrCode,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-20 lg:py-28 transition-colors duration-200"
    >
      {/* Efek Cahaya Latar Belakang Dekoratif */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Sisi Kiri: Slogan, Judul, & Ajakan Belanja */}
        <div>
          <span className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Belanja Offline & Online Lebih Mudah</span>
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Belanja Nyaman di Toko Fisik, Praktis Pesan dari{" "}
            <span className="text-blue-600 dark:text-blue-400">Website.</span>
          </h2>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            WNR_STORE hadir memenuhi kebutuhan harian Anda. Bayar instan via
            QRIS otomatis, pesanan langsung diproses, dan konfirmasi resi
            terkirim instan ke WhatsApp.
          </p>

          {/* Tombol Aksi (CTA) */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#katalog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition flex items-center space-x-2 text-sm"
            >
              <span>Belanja Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#fitur"
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-semibold px-6 py-3.5 rounded-xl transition text-sm"
            >
              Pelajari Layanan
            </a>
          </div>

          {/* Statistik Singkat */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
            <div>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                100%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Produk Original
              </p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                QRIS
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Auto Payment
              </p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                Instant
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                WhatsApp Notif
              </p>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Kartu Fitur Interaktif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div className="bg-blue-50 dark:bg-blue-900/40 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <QrCode className="w-6 h-6" />
            </div>
            <div >
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                QRIS Otomatis
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                Scan langsung lunas. Terintegrasi dengan semua m-banking &
                e-wallet di Indonesia.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between sm:translate-y-6 transition-transform hover:-translate-y-1">
            <div className="bg-emerald-50 dark:bg-emerald-900/40 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Notifikasi WhatsApp
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                Update status pesanan dan resi pengiriman terkirim instan ke
                nomor WhatsApp Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
