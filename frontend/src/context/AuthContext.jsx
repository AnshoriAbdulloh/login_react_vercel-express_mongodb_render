import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// membuat context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  console.log(`Masuk ke AuthContext`);
  // ambil token sekali saja
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token); // menggunakan 2 tanda seru agar nilai booleannya sama dengan datanya
  const navigate = useNavigate();

  // cek token saat reload
  useEffect(() => {
    if (!token) return;

    // ambil data user dari backend
    fetch("http://localhost:5001/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // LOGIN
  const login = (accessToken, userData) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
    navigate("/dashboard");
  };

  // LOGOUT
  const logout = async () => {
    await fetch("http://localhost:5001/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook helper
export const useAuth = () => useContext(AuthContext);
