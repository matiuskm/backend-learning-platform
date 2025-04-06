import { createLessonSchema, updateLessonSchema } from "@/schemas/lesson.schema";
import { z } from "zod";

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;