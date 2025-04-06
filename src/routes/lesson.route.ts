import { createLessonHandler, deleteLessonHandler, getLessonByIdHandler, getLessonsByModuleHandler, updateLessonHandler } from "@/controllers/lesson.controller";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { Router } from "express";

const lessonRouter = Router()

lessonRouter.post("/", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, createLessonHandler as any)
lessonRouter.get("/:id", getLessonByIdHandler as any)
lessonRouter.get("/module/:moduleId", getLessonsByModuleHandler as any)
lessonRouter.patch("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, updateLessonHandler as any)
lessonRouter.delete("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, deleteLessonHandler as any)

export default lessonRouter