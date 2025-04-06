import { z } from "zod";

export const createModuleSchema = z.object({
    title: z.string(),
    content: z.string(),
    order: z.number().nonnegative(),
    courseId: z.string(),
})

export const updateModuleSchema = createModuleSchema.partial()
