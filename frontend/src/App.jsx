import { AuthProvider } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <div
      className={`bg-linear-to-r from-[#e2e2e2] to-[#c9d6ff] h-dvh grid place-items-center`}
    >
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}
