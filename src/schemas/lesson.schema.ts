import { z } from "zod";

export const createLessonSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    videoUrl: z.string().url().optional(),
    order: z.number().int().nonnegative(),
    moduleId: z.string().uuid(),
})

export const updateLessonSchema = createLessonSchema.partial()