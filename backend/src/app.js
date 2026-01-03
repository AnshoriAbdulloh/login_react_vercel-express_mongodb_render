import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ijin request dari frontend
    credentials: true, // jika true menyertakan cookie
  })
);

app.use(express.json()); // mengubah json string ke json object, tanpa ini req.body undifined
app.use(cookieParser()); // buat parser cookie

app.use(authRoutes); // masuk ke authRoutes untuk menangani request

export default app;
