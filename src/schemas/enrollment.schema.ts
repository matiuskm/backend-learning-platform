import { z } from "zod";

export const createEnrollmentSchema = z.object({
    courseId: z.string().uuid(),
})

export const enrollmentIdParamSchema = z.object({
    id: z.string().uuid(),
})