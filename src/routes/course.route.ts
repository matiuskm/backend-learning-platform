import { createCourseHandler, deleteCourse, getCourseByIdHandler, getCourses, getCoursesByCreator, getMyCourses, updateCourse } from "@/controllers/course.controller";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { Router } from "express";

const courseRouter = Router()

courseRouter.post("/", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, createCourseHandler)
courseRouter.get("/", getCourses)
courseRouter.get("/mine", authMiddleware as any, getMyCourses)
courseRouter.get("/creator/:creatorId", getCoursesByCreator)
courseRouter.get("/:id", getCourseByIdHandler as any)
courseRouter.patch("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, updateCourse as any)
courseRouter.delete("/:id", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, deleteCourse as any)

export default courseRouter