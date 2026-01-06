import express from "express";
import { register, login, me, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// setiap route akan menjalankan fungsi dari controllers
router.post("/register", register);
router.post("/login", login);
router.post(`/logout`, logout);
router.get("/me", me);

export default router;
