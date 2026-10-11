import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Kasir() {
  const [barcodeInput, setBarcodeInput] = useState("");
  const [keranjang, setKeranjang] = useState([]);
  const [metodeBayar, setMetodeBayar] = useState(null); // 'qris_kasir' atau 'qris_pembeli'
  const [tokenPembeli, setTokenPembeli] = useState("");
  const [transaksiSukses, setTransaksiSukses] = useState(null);
  const [error, setError] = useState("");

  const inputBarcodeRef = useRef(null);
  const inputQrisPembeliRef = useRef(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (inputBarcodeRef.current) inputBarcodeRef.current.focus();
  }, []);

  useEffect(() => {
    if (metodeBayar === "qris_pembeli" && inputQrisPembeliRef.current) {
      inputQrisPembeliRef.current.focus();
    }
  }, [metodeBayar]);

  const handleScanProduk = async (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/products",
        config,
      );
      const produkDitemukan = response.data.find(
        (p) => p.kode_barang === barcodeInput,
      );

      if (!produkDitemukan) {
        setError(
          `Produk dengan barcode [${barcodeInput}] tidak terdaftar di gudang!`,
        );
        setBarcodeInput("");
        return;
      }

      if (produkDitemukan.stok <= 0) {
        setError(`Stok produk [${produkDitemukan.nama_produk}] sudah habis!`);
        setBarcodeInput("");
        return;
      }

      const sudahAda = keranjang.find(
        (item) => item.product_id === produkDitemukan.id,
      );

      // PERBAIKAN 1: Menghapus variabel 'alreadyExist' yang typo
      if (sudahAda) {
        if (sudahAda.qty >= produkDitemukan.stok) {
          setError(
            `Tidak bisa menambah jumlah. Stok gudang hanya sisa ${produkDitemukan.stok}!`,
          );
          setBarcodeInput("");
          return;
        }
        setKeranjang(
          keranjang.map((item) =>
            item.product_id === produkDitemukan.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        );
      } else {
        setKeranjang([
          ...keranjang,
          {
            product_id: produkDitemukan.id,
            nama_produk: produkDitemukan.nama_produk,
            kode_barang: produkDitemukan.kode_barang,
            harga_jual: produkDitemukan.harga_jual,
            qty: 1,
          },
        ]);
      }
      setBarcodeInput("");
    } catch (err) {
      // PERBAIKAN 2: Menggunakan console.error agar variabel 'err' dibaca oleh ESLint
      console.error(err);
      setError("Gagal memverifikasi produk ke server.");
    }
  };

  const totalBelanja = keranjang.reduce(
    (sum, item) => sum + item.harga_jual * item.qty,
    0,
  );

  const handleProsesTransaksi = async () => {
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        {
          detail_barang: keranjang,
          total_harga: totalBelanja,
        },
        config,
      );
      setTransaksiSukses(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal memproses transaksi.");
    }
  };

  const handleKonfirmasiBayarKasir = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/transactions/${transaksiSukses.transaction.id}/pay`,
        {},
        config,
      );
      alert(
        "🎉 Pembayaran QRIS Toko Berhasil! Status di MySQL: SUCCESS (LUNAS)",
      );
      resetMesinKasir();
    } catch (err) {
      console.error(err);
      setError("Gagal mengonfirmasi pembayaran.");
    }
  };

  const handleScanQrisPembeli = async (e) => {
    e.preventDefault();
    if (!tokenPembeli) return;

    try {
      await axios.put(
        `http://localhost:5000/api/transactions/${transaksiSukses.transaction.id}/pay`,
        { token_qris: tokenPembeli },
        config,
      );
      alert(
        `⚡ QRIS HP Pembeli Sukses Terbaca!\nToken: ${tokenPembeli}\nStatus di MySQL: SUCCESS (LUNAS)`,
      );
      resetMesinKasir();
    } catch (err) {
      console.error(err);
      setError("Gagal memverifikasi QRIS pembeli.");
    }
  };

  const resetMesinKasir = () => {
    setKeranjang([]);
    setMetodeBayar(null);
    setTokenPembeli("");
    setTransaksiSukses(null);
    if (inputBarcodeRef.current) inputBarcodeRef.current.focus();
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen flex flex-col md:flex-row gap-6">
      {/* SEKTOR KIRI: KASIR SCANNER & TABEL BELANJA */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          🖥️ Mesin Kasir Digital
        </h1>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleScanProduk} className="mb-4">
          <input
            ref={inputBarcodeRef}
            type="text"
            value={barcodeInput}
            disabled={transaksiSukses !== null}
            onChange={(e) => setBarcodeInput(e.target.value)}
            placeholder={
              transaksiSukses
                ? "Selesaikan pembayaran terlebih dahulu..."
                : "Tembak scanner ke barcode produk di sini..."
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
          />
        </form>

        <div className="h-80 border rounded-lg bg-slate-50 p-4 overflow-y-auto">
          {keranjang.length === 0 ? (
            <p className="text-center text-slate-400 mt-32">
              Keranjang Belanja Kosong
            </p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {keranjang.map((item) => (
                <li
                  key={item.product_id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.nama_produk}
                    </p>
                    <p className="text-xs text-slate-400">
                      Barcode: {item.kode_barang} | Qty: {item.qty}x
                    </p>
                  </div>
                  <p className="font-bold text-indigo-600">
                    Rp {(item.harga_jual * item.qty).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* SEKTOR KANAN: RINGKASAN TOTAL & MODUL QRIS */}
      <div className="w-full md:w-80 bg-white p-6 rounded-xl shadow border flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-2">
            Total Belanjaan
          </h2>
          <p className="text-3xl font-black text-slate-900 border-b pb-4 mb-6">
            Rp {totalBelanja.toLocaleString()}
          </p>

          {keranjang.length > 0 && !transaksiSukses && (
            <button
              onClick={handleProsesTransaksi}
              className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow"
            >
              🔒 Kunci Nota & Pilih QRIS
            </button>
          )}

          {transaksiSukses && !metodeBayar && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-slate-500 uppercase">
                Pilih Opsi Input QRIS:
              </p>
              <button
                onClick={() => setMetodeBayar("qris_kasir")}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                📱 Tampilkan QRIS di Monitor Toko
              </button>
              <button
                onClick={() => setMetodeBayar("qris_pembeli")}
                className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
              >
                🔫 Scan QR Barcode di HP Pembeli
              </button>
            </div>
          )}

          {metodeBayar === "qris_kasir" && (
            <div className="text-center p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="font-bold text-xs text-indigo-900 mb-2">
                Silakan Pembeli Scan QRIS Ini:
              </p>
              <img
                src={transaksiSukses?.qris_url}
                alt="QRIS Toko"
                className="w-40 h-40 mx-auto bg-white p-2 border rounded shadow my-2"
              />
              <button
                onClick={handleKonfirmasiBayarKasir}
                className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-bold shadow"
              >
                [ Simulasi Sukses Bayar ]
              </button>
            </div>
          )}

          {metodeBayar === "qris_pembeli" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="font-bold text-xs text-emerald-900 mb-2">
                Arahkan Scanner Fisik ke HP Pembeli:
              </p>
              <form onSubmit={handleScanQrisPembeli}>
                <input
                  ref={inputQrisPembeliRef}
                  type="text"
                  value={tokenPembeli}
                  onChange={(e) => setTokenPembeli(e.target.value)}
                  placeholder="Tembak kode QR e-wallet pembeli..."
                  className="w-full p-2 border border-emerald-300 rounded font-mono text-xs bg-white text-center focus:outline-none"
                />
              </form>
              <p className="text-[10px] text-slate-400 mt-2 text-center">
                Scanner otomatis membaca string token e-wallet pembeli lalu
                tekan enter.
              </p>
            </div>
          )}
        </div>

        {transaksiSukses && (
          <button
            onClick={resetMesinKasir}
            className="w-full mt-4 p-2 bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs font-bold rounded-lg transition"
          >
            Batal / Reset Kasir
          </button>
        )}
      </div>
    </div>
  );
}
