// const express = require("express");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const app = express();
// const cors = require("cors");
// const auth = require("./middleware/auth.middleware");
// app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // supaya bisa baca body JSON
// app.use(express.json());
// // // secret untuk tanda tangan token
// const ACCESS_SECRET = "ACCESS_SECRET";
// const REFRESH_SECRET = "REFRESH_SECRET";

// // DATA USER DUMMY (anggap ini database)
// const USER = { username: "admin", password: "12345" };
// // ROUTE LOGIN -> BUAT TOKEN
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   // cek username & password
//   if (username === USER.username && password === USER.password) {
//     // buat token
//     const accessToken = jwt.sign({ username }, ACCESS_SECRET, {
//       expiresIn: `10s`,
//     });
//     const refreshToken = jwt.sign({ username }, REFRESH_SECRET, {
//       expiresIn: `7d`,
//     });
//     res.cookie(refreshToken, refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: strict,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     return res.json({ message: "Login berhasil", accessToken });
//   }
//   res.status(401).json({ message: "Username atau password salah" });
// });
// // DASHBOARD (PROTECTED)
// app.get(`/dashboard`, auth, (req, res) => {
//   res.json({ message: `Selamat datang di dashboard`, user: req.user });
// });
// // REFRESH TOKEN ENDPOINT LOCAL STORAGE
// app.post(`/refresh`, (req, res) => {
//   const { refreshToken } = req.body; // ambil refresh token di req body
//   // cek refresh token
//   if (!refreshToken) {
//     return res.status(401).json({ message: `Refresh token tidak ada` });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
//     const newAccessToken = jwt.sign(
//       { username: decoded.username },
//       ACCESS_SECRET,
//       { expiresIn: `10s` }
//     );
//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     res.status(403).json({ message: ` Refresh token tidak valid` });
//   }
// });
// app.post(`/refresh`, (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   // ambil refresh token di httponly cookie
//   console.log(refreshToken);
//   // cek refresh token
//   if (!refreshToken) {
//     console.log(refreshToken`tidak ada`);
//     return res.status(401).json({ message: ` Refresh token tidak ada` });
//   }
//   try {
//     const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
//     const newAccessToken = jwt.sign(
//       { username: decoded.username },
//       ACCESS_SECRET,
//       { expiresIn: `10s` }
//     );
//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     res.status(403).json({ message: `Refresh token tidak valid` });
//   }
// });

// app.post(`/logout`, (req, res) => {
//   res.clearCookie(refreshToken);
//   res.json({ message: `Logout sukses` });
// });
// // server jalan
// app.listen(5001, () => {
//   console.log("Server jalan di http://localhost:5001");
// });

import dotenv from "dotenv";
dotenv.config(); // menjalankan dotenv dan memasukannya ke global object Node.js (process.env)
// sehingga bisa diakses di semua file tanpa harus import

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

// request dari frontend akan masuk kesini //
// karena disini tidak ada route, maka akan diteruskan ke app

connectDB(); // menyambungkan ke database

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
