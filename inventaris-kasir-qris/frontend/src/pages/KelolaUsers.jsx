import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function KelolaUsers() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("kasir");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // PERBAIKAN 1: Membungkus config di dalam useMemo atau langsung dipasang di axios agar tidak memicu re-render berlebih
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // PERBAIKAN 2: Menggunakan useCallback agar fungsi tidak dibuat ulang setiap render, menghilangkan error di useEffect
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error(err); // Membaca variabel err agar disukai linter
      setError("Gagal memuat data pegawai.");
    }
  }, []);

  // GANTI FUNGSI FETCHUSERS DAN USEEFFECT LAMA ANDA DENGAN BLOK INI:
  useEffect(() => {
    let isMounted = true; // Flag untuk memastikan komponen masih aktif

    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Hanya ubah state jika komponen belum dibongkar (mencegah cascading renders)
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Gagal memuat data pegawai.");
        }
      }
    };

    loadUsers();

    // Fungsi pembersih otomatis saat komponen berganti halaman
    return () => {
      isMounted = false;
    };
  }, []); // Array dependensi kosong aman karena tidak memakai fungsi luar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/users/${editingId}`,
          { username, email, role, password },
          config,
        );
        setMessage("Data pegawai berhasil diperbarui!");
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          { username, email, password, role },
          config,
        );
        setMessage("Pegawai baru berhasil didaftarkan!");
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("kasir");
      fetchUsers();
    } catch (err) {
      console.error(err); // Membaca variabel err agar disukai linter
      setError(err.response?.data?.message || "Terjadi kesalahan sistem.");
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setPassword("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus akun pegawai ini?"))
      return;
    setError("");
    setMessage("");
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, config);
      setMessage("Akun pegawai berhasil dihapus.");
      fetchUsers();
    } catch (err) {
      console.error(err); // Membaca variabel err agar disukai linter
      setError("Gagal menghapus data.");
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen flex flex-col lg:flex-row gap-6">
      {/* FORM INPUT USER */}
      <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {editingId ? "✏️ Edit Akun Pegawai" : "➕ Tambah Akun Pegawai"}
        </h2>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-xs rounded-lg mb-3 font-medium text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 bg-emerald-100 text-emerald-700 text-xs rounded-lg mb-3 font-medium text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">
              Nama Pegawai
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contoh: Azka"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">
              Email Sistem
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="nama@toko.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">
              {editingId
                ? "Password Baru (Kosongkan jika tidak diubah)"
                : "Password Awal"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!editingId}
              className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">
              Hak Akses (Role)
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="kasir">Kasir / Pelayan Toko</option>
              <option value="kepala_toko">Kepala Toko / Kontrol Stok</option>
              <option value="admin">Admin Utama</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded shadow transition"
            >
              {editingId ? "Simpan Perubahan" : "Daftarkan Pegawai"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setUsername("");
                  setEmail("");
                  setRole("kasir");
                }}
                className="p-2.5 bg-slate-200 text-slate-600 text-sm font-bold rounded"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABEL USER */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          👥 Daftar Akun Pegawai Aktif
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-3">Nama Pegawai</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Hak Akses / Role</th>
                <th className="p-3 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-slate-700">
              {users.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    {item.username}
                  </td>
                  <td className="p-3 text-slate-500">{item.email}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                      ${item.role === "admin" ? "bg-purple-100 text-purple-700" : ""}
                      ${item.role === "kepala_toko" ? "bg-blue-100 text-blue-700" : ""}
                      ${item.role === "kasir" ? "bg-emerald-100 text-emerald-700" : ""}
                    `}
                    >
                      {item.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-2.5 py-1.5 rounded font-bold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-2.5 py-1.5 rounded font-bold transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
