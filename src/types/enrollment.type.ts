import { createEnrollmentSchema, enrollmentIdParamSchema } from "@/schemas/enrollment.schema";
import { z } from "zod";

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
export type EnrollmentIdParam = z.infer<typeof enrollmentIdParamSchema>;