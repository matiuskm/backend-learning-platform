import { verifyJwt } from "@/utils/jwt";
import { sanitizeUser } from "@/utils/sanitize";
import { PrismaClient, Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient()

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyJwt<{ userId: string }>(token)


    if (!payload) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId }
    })

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    (req as any).user = sanitizeUser(user)
    next()
}

export function requireRole(...roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRole = (req as any).user.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    };
  }