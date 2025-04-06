import { getMeHandler, loginHandler, registerHandler } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const authRoutes = Router()

authRoutes.post("/register", registerHandler)
authRoutes.post("/login", loginHandler)
authRoutes.get("/me", authMiddleware as any, getMeHandler)

export default authRoutes