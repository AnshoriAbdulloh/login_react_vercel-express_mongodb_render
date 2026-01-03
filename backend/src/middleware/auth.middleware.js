import jwt from "jsonwebtoken";

// MIDDLEWARE CEK TOKEN
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // simpan hasil decode
    next(); // lanjut ke route
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
}
