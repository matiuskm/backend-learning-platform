import { comparePassword, hashPassword } from '@/utils/hash';
import { signJwt } from '@/utils/jwt';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(input: {
    name: string;
    email: string;
    password: string;
}) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } })
    if (existing) throw new Error('User already registered')

    const hashed = await hashPassword(input.password)

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashed,
            role: Role.STUDENT
        },
    })

    return { ...user, password: undefined }
}

export async function loginUser(input: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) throw new Error('Invalid credentials')

    const isValid = await comparePassword(input.password, user.password)
    if (!isValid) throw new Error('Invalid credentials')
    
    const token = signJwt({ userId: user.id, role: user.role })

    return { token, ...user, password: undefined }
}