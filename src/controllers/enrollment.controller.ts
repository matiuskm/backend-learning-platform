import { createEnrollmentSchema } from "@/schemas/enrollment.schema";
import { getCourseById } from "@/services/course.service";
import { enrollUserToCourse, getAllEnrollments, getEnrollmentByCourseId, getEnrollmentsByUser } from "@/services/enrollment.service";
import { Role } from "@prisma/client";
import { Request, Response } from "express";

export const enrollmentCourseHandler = async (req: Request, res: Response) => {
    try {
        const validated = createEnrollmentSchema.parse(req.body)
        const userId = (req as any).user.id

        const enrollment = await enrollUserToCourse(userId, validated)
        res.status(201).json(enrollment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getMyEnrollmentsHandler = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const enrollments = await getEnrollmentsByUser(userId)
        res.status(200).json(enrollments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getAllEnrollmentsHandler = async (req: Request, res: Response) => {
    try {
        const enrollments = await getAllEnrollments()
        res.status(200).json(enrollments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getEnrollmentByCourseIdHandler = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params
        const user = (req as any).user

        if (user.role === Role.CREATOR) {
            const course = await getCourseById(courseId)

            if (!course || course.createdBy !== user.id) {
                return res.status(403).json({ message: "You are not authorized to view this enrollment" })
            }
        }

        const enrollments = await getEnrollmentByCourseId(courseId)
        res.json(enrollments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}