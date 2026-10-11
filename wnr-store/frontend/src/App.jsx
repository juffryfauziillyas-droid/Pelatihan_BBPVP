import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data produk dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((response) => {
        setProdukList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setError("Gagal terhubung ke server backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Toko */}
      <header className="bg-blue-600 text-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">WNR_STORE</h1>
        <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
          Toko Offline & Online
        </span>
      </header>

      {/* Konten Utama */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Katalog Produk Tersedia</h2>

        {/* Status Loading & Error */}
        {loading && (
          <p className="text-center text-gray-500 py-10">
            Memuat produk dari database...
          </p>
        )}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {/* Grid Produk */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produkList.map((produk) => (
              <div
                key={produk.id_produk}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    {/* Placeholder gambar */}
                    Foto: {produk.foto_produk}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {produk.nama_kategori}
                    </span>
                    <h3 className="font-bold text-lg text-gray-800 mt-1">
                      {produk.nama_produk}
                    </h3>
                    <p className="text-green-600 font-bold mt-2">
                      Rp {Number(produk.harga_jual).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="text-xs text-gray-500 mb-3">
                    Stok: {produk.stok} unit
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition text-sm">
                    Beli / Pesan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
