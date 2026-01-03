// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiFetch } from "../api/apiFetch";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  // const [user, setUser] = useState(null);

  // const navigate = useNavigate();

  //   useEffect(() => {
  //     // buat async function
  //     async function fetchDashboard() {
  //       // ambil token dari lokal storage
  //       const token = localStorage.getItem("token");

  //       // minta pakai await agar ditunggu sampai selesai
  //       const res = await fetch(`http://localhost:5001/dashboard`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // setalah selesai cek apakah responnya bener/ valid
  //       if (!res.ok) {
  //         // jika gak bener seperti token palsu, expired, dihapus manual maka
  //         localStorage.removeItem(`token`); // hapus tokennya
  //         console.log(`hapus token`);
  //         navigate(`/login`); // paksa kembali ke login
  //         return; // keluar dari function ini agar code dibawahnya tidak dijalankan
  //       }

  //       // sampai sini pakai await lagi karena parsing data butuh waktu
  //       const data = await res.json();
  //       console.log(data);
  //     }

  //     fetchDashboard(); // jalankan function
  //   }, []); // diberi array kosong supaya hanya dijalankan sekali saat pertama kali dibuka

  // useEffect(() => {
  //   async function loadData() {
  //     const res = await apiFetch(`http://localhost:5001/dashboard`);
  //     const data = await res.json();
  //     setUser(data.user.username);
  //   }
  //   loadData();
  // }, []);

  // useEffect(() => {
  //   async function fetchDashboard() {
  //     try {
  //       const res = await apiFetch("http://localhost:5001/dashboard");

  //       const data = await res.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.log("Gagal akses dashboard:", err.message);
  //       navigate("/login");
  //     }
  //   }

  //   fetchDashboard();
  // }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={`grid place-items-center w-full h-52 font-samsung  `}>
      <h1 className={`text-6xl`}>Hello {user}</h1>
      <button
        className={`py-3 px-10 rounded-md bg-[#512da8] text-white`}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
