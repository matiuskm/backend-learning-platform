import { createCourseSchema, updateCourseSchema } from "@/schemas/course.schema";
import { z } from "zod";

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;