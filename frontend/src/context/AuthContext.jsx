import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// membuat context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  console.log(`Masuk ke AuthContext`);
  // ambil token sekali saja
  const [token, setToken] = useState(localStorage.getItem(`accessToken`));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  // cek token saat reload
  useEffect(() => {
    if (!token) {
      console.log(`Token tidak ada`);
      return;
    }
    console.log(`Cek token di AuthContext: ${token}`);
    setLoading(true);

    // ambil data user dari backend
    fetch("http://localhost:5001/me", {
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
        console.log(`set user ${JSON.stringify(data)}`);
        setUser(data.username);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  // LOGIN
  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setLoading(true);
    setToken(accessToken);
    console.log(`sudah ke dashboard`);
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
