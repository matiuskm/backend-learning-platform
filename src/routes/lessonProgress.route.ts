import { getMyLessonProgressHandler, markLessonAsCompletedHandler } from "@/controllers/lessonProgress.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const lessonProgressRouter = Router()

lessonProgressRouter.post("/", authMiddleware as any, markLessonAsCompletedHandler as any)
lessonProgressRouter.get("/mine", authMiddleware as any, getMyLessonProgressHandler)

export default lessonProgressRouter