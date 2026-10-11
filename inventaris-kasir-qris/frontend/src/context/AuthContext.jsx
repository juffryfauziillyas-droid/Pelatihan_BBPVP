/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. Ambil data awal langsung dari localStorage agar tidak perlu useEffect bawaan linter
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Karena data diambil langsung di atas, status loading bisa langsung diset false
  const [loading] = useState(false);

  const loginUser = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
