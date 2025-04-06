import { CreateModuleInput, UpdateModuleInput } from "@/types/module.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createModule = async (data: CreateModuleInput) => {
    return await prisma.module.create({ data })
}

export const getModulesByCourse = async (courseId: string) => {
    return await prisma.module.findMany({
        where: { courseId },
        orderBy: { order: "asc" },
    })
}

export const updateModule = async (id: string, data: Partial<UpdateModuleInput>) => {
    return await prisma.module.update({
        where: { id },
        data,
    })
}

export const deleteModule = async (id: string) => {
    return await prisma.module.delete({
        where: { id },
    })
}