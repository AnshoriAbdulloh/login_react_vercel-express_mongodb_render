import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

// REGISTER
export async function register(req, res) {
  // distructuring object dari request body
  const { username, email, password } = req.body;

  // mengecek apakah email sudah terdaftar didatabase
  const exist = await User.findOne({ email });
  if (exist) return res.status(409).json({ message: "Email already used" });

  const hash = await bcrypt.hash(password, 10); // enkripsi password

  // masukan data ke user schema
  await User.create({
    username,
    email,
    password: hash,
  });

  // kembalikan pesan ke respon
  res.json({ message: "Register success" });
}

// LOGIN
export async function login(req, res) {
  // distructuring object dari request body
  const { email, password } = req.body;

  // mengecek apakah email sudah terdaftar didatabase
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // mendeskripsi password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  // buat object payload dari user untuk daftar jwt
  const payload = {
    id: user._id,
    username: user.username,
  };

  // buat accessToken dan refreshToken ke jwt.js
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // masukan refreshToken ke cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  // kembalikan accessToken ke respon
  res.json({ accessToken });
}

// ME (ambil data user dari access token)
export async function me(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.json(decoded);
  } catch {
    res.sendStatus(401);
  }
}

export async function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ message: "Logout success" });
}
