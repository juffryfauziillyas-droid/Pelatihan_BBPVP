import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Inventaris from "./pages/Inventaris";
import Kasir from "./pages/Kasir";
import Login from "./pages/Login";
import KelolaUsers from "./pages/KelolaUsers";

function AppContent() {
  const { user, token, loading, logoutUser } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-slate-600">
        Memuat Sistem...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* NAVBAR PEGAWAI (Hanya muncul jika pegawai sudah login resmi) */}
        {token && (
          <nav className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
            <div className="font-bold text-xl flex items-center gap-2">
              🏪 SmartTokoku{" "}
              <span className="text-xs bg-indigo-800 px-2 py-1 rounded-full uppercase tracking-wider">
                {user?.role}
              </span>
            </div>
            <div className="flex gap-6 font-medium items-center">
              {user?.role === "admin" && (
                <Link to="/users" className="hover:text-indigo-200 transition">
                  👥 Kelola Pegawai
                </Link>
              )}
              {(user?.role === "admin" || user?.role === "kepala_toko") && (
                <Link
                  to="/inventaris"
                  className="hover:text-indigo-200 transition"
                >
                  📦 Inventaris
                </Link>
              )}
              {(user?.role === "admin" || user?.role === "kasir") && (
                <Link to="/kasir" className="hover:text-indigo-200 transition">
                  🖥️ Mesin Kasir
                </Link>
              )}
              {/* Tombol kembali ke landing page publik untuk simulasi */}
              <Link
                to="/"
                className="text-xs bg-indigo-700 hover:bg-indigo-800 px-2.5 py-1.5 rounded transition"
              >
                🌐 Lihat Web
              </Link>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm font-bold transition shadow"
              >
                Keluar
              </button>
            </div>
          </nav>
        )}

        {/* ATURAN JALUR NAVIGASI SISTEM */}
        <main className="flex-1">
          <Routes>
            {/* 1. RUTE PUBLIK: Siapa saja boleh buka tanpa perlu token login */}
            <Route path="/" element={<LandingPage />} />

            {/* 2. RUTE LOGIN: Jika sudah login, lempar pegawai langsung ke halaman utama mereka */}
            <Route
              path="/admin-login"
              element={
                !token ? (
                  <Login />
                ) : user?.role === "kasir" ? (
                  <Navigate to="/kasir" replace />
                ) : (
                  <Navigate to="/inventaris" replace />
                )
              }
            />

            {/* 3. RUTE INTERNAL PEGAWAI: Dikunci ketat wajib memiliki token valid */}
            <Route
              path="/users"
              element={
                token && user?.role === "admin" ? (
                  <KelolaUsers />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />
            <Route
              path="/inventaris"
              element={
                token &&
                (user?.role === "admin" || user?.role === "kepala_toko") ? (
                  <Inventaris />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />
            <Route
              path="/kasir"
              element={
                token && (user?.role === "admin" || user?.role === "kasir") ? (
                  <Kasir />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />

            {/* Jika alamat URL ngawur, kembalikan ke landing page utama */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
