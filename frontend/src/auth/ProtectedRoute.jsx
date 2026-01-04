import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  console.log(`masuk ke protectedroute`);

  const { isAuthenticated, loading } = useAuth();

  console.log(`isauthenticated: ${isAuthenticated}`);
  console.log(`loading: ${loading}`);

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    console.log(`belum auth, ke login`);
    return <Navigate to='/login' replace />;
  }

  console.log(`sudah lewat protect!`);

  return children;
}
