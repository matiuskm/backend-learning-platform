import { createModuleHandler, deleteModuleHandler, getModulesByCourseHandler, updateModuleHandler } from "@/controllers/module.controller";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { Router } from "express";

const moduleRouter = Router()

moduleRouter.post("/", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, createModuleHandler as any)
moduleRouter.get("/:courseId", getModulesByCourseHandler)
moduleRouter.patch("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, updateModuleHandler)
moduleRouter.delete("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, deleteModuleHandler)

export default moduleRouter