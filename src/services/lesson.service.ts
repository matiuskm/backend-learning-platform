import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createLesson = async (data: any) => {
    return await prisma.lesson.create({ data })
}

export const getLessonById = async (id: string) => {
    return await prisma.lesson.findUnique({
        where: { id },
    })
}

export const getLessonsByModule = async (moduleId: string) => {
    return await prisma.lesson.findMany({
        where: { moduleId },
        orderBy: { order: "asc" },
    })
}

export const updateLesson = async (id: string, data: any) => {
    return await prisma.lesson.update({
        where: { id },
        data,
    })
}

export const deleteLesson = async (id: string) => {
    return await prisma.lesson.delete({
        where: { id },
    })
}