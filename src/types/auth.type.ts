import { loginSchema, registrationSchema } from "@/schemas/auth.schema"
import { z } from "zod"

export type RegistrationInput = z.infer<typeof registrationSchema>
export type LoginInput = z.infer<typeof loginSchema>