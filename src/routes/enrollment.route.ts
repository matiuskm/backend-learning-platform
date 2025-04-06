import { enrollmentCourseHandler, getAllEnrollmentsHandler, getMyEnrollmentsHandler } from "@/controllers/enrollment.controller";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { Router } from "express";

const enrollementRouter = Router()

enrollementRouter.post("/", authMiddleware as any, enrollmentCourseHandler)
enrollementRouter.get("/my", authMiddleware as any, getMyEnrollmentsHandler)
enrollementRouter.get("/", authMiddleware as any, requireRole(Role.ADMIN) as any, getAllEnrollmentsHandler)
enrollementRouter.get("/course/:courseId", authMiddleware as any, requireRole(Role.ADMIN, Role.CREATOR) as any, getAllEnrollmentsHandler)

export default enrollementRouter