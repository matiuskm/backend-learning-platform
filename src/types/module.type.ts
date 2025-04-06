import { createModuleSchema, updateModuleSchema } from "@/schemas/module.schema"
import { z } from "zod"

export type CreateModuleInput = z.infer<typeof createModuleSchema>
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>