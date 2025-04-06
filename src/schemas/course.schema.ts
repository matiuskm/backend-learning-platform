import { z } from "zod";

export const createCourseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().default(""),
    thumbnail: z.string().default(""),
    isPublished: z.boolean().default(false),
})

export const updateCourseSchema = createCourseSchema.partial();