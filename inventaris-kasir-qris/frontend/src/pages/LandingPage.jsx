import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ShoppingBag, Send, CheckCircle, Store, ShieldCheck, Truck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchPublicProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Gagal memuat produk katalog:', err);
      }
    };
    fetchPublicProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product_id === product.id);
    if (existingItem) {
      if (existingItem.qty >= product.stok) return alert('Stok di gudang tidak mencukupi!');
      setCart(cart.map(item => item.product_id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, {
        product_id: product.id,
        nama_produk: product.nama_produk,
        kode_barang: product.kode_barang,
        harga_jual: product.harga_jual,
        qty: 1
      }]);
    }
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.product_id !== id));
    } else {
      setCart(cart.map(item => item.product_id === id ? { ...item, qty: newQty } : item));
    }
  };

  const totalHarga = cart.reduce((sum, item) => sum + (item.harga_jual * item.qty), 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    const nomorWhatsAppToko = "6282315834210"; 
    
    let pesanNota = `*🔥 PESANAN BARU DARI WEBSITE SMARTTOKOKU 🔥*\n\n`;
    pesanNota += `Halo Admin, saya ingin memesan barang berikut melalui online order:\n`;
    pesanNota += `--------------------------------------------------\n`;
    cart.forEach((item, index) => {
      pesanNota += `${index + 1}. *${item.nama_produk}*\n   Jumlah: ${item.qty}x | Subtotal: Rp ${(item.harga_jual * item.qty).toLocaleString()}\n`;
    });
    pesanNota += `--------------------------------------------------\n`;
    pesanNota += `💰 *Total Pembayaran:* Rp ${totalHarga.toLocaleString()}\n\n`;
    pesanNota += `Mohon konfirmasi ketersediaan barang dan kirimkan metode pembayaran QRIS. Terima kasih! 🙏`;

    const urlWhatsApp = `https://whatsapp.com{nomorWhatsAppToko}&text=${encodeURIComponent(pesanNota)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* GLOBAL MINI-NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-2 font-black text-xl text-indigo-600 tracking-tight">
          <Store className="w-6 h-6" /> SmartTokoku
        </div>
        <div className="flex items-center gap-6">
          <a href="#katalog" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">Katalog</a>
          <Link to="/admin-login" className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg font-bold transition">Portal Pegawai 🔒</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-100">
            <CheckCircle className="w-3.5 h-3.5" /> Sistem Belanja Online & Instan
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Belanja Harian Lebih Praktis & <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Modern</span>
          </h1>
          <p className="text-slate-500 text-base max-w-lg leading-relaxed">
            Pilih kebutuhan rumah tangga Anda langsung melalui katalog digital kami. Pesanan terkirim otomatis dengan format nota rapi menuju WhatsApp Toko.
          </p>
          <div className="pt-2">
            <a href="#katalog" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5">
              Mulai Belanja Sekarang
            </a>
          </div>
        </motion.div>

        {/* VISUAL KANAN HERO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full md:w-auto h-72 md:h-96 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative shadow-indigo-100 border border-indigo-400"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="flex justify-between items-start">
            <div className="bg-white/20 backdrop-blur p-3 rounded-2xl font-black text-lg">🏪 ST</div>
            <span className="text-xs font-bold uppercase bg-emerald-500 text-white px-2.5 py-1 rounded-full">Open Order</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-indigo-100">E-Katalog Resmi</p>
            <p className="text-2xl md:text-3xl font-black leading-tight">Terintegrasi Sistem Stok Gudang Utama</p>
          </div>
        </motion.div>
      </header>

      {/* BENEFIT CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition">
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl"><ShieldCheck /></div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Jaminan Produk Asli</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Semua barang diambil langsung dari produsen terpercaya dan terdaftar.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Truck /></div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Pengambilan Cepat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Pesan online sekarang, ambil barang di toko tanpa perlu antre panjang.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><Send /></div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Respon WA Instan</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Nota pesanan langsung diproses cepat oleh admin toko via WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* KATALOG PRODUK UTAMA */}
      <section id="katalog" className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShoppingBag className="text-indigo-600" /> Katalog Belanja Toko
            </h2>
            <p className="text-sm text-slate-500">Harga terbaik dengan ketersediaan stok yang selalu terupdate</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 text-slate-400 font-medium">
            Katalog produk sedang diperbarui oleh admin. Silakan berkunjung beberapa saat lagi!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div className="p-4 bg-slate-100/60 h-40 flex items-center justify-center font-bold text-slate-400 group-hover:scale-105 transition duration-300">
                  📦 {product.nama_produk.slice(0, 2).toUpperCase()}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-1.5 ${product.stok <= 3 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                      Stok: {product.stok} pcs
                    </span>
                    </div>
                    </div>
                    </motion.div>
            ))}
                    </div>)}
                    </section>
        </div>)}
  

                    
