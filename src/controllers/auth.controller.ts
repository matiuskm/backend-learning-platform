import { loginSchema, registrationSchema } from "@/schemas/auth.schema"
import { loginUser, registerUser } from "@/services/auth.service"
import { Request, Response } from "express"

export async function registerHandler(req: Request, res: Response) {
    try {
        const data = registrationSchema.parse(req.body)
        const user = await registerUser(data)
        res.status(201).json(user)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export async function loginHandler(req: Request, res: Response) {
    try {
        const data = loginSchema.parse(req.body)
        const result = await loginUser(data)
        res.json(result)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export async function getMeHandler(req: Request, res: Response) {
    const user = (req as any).user
    res.json(user)
}