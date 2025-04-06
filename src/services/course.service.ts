import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface CreateCourseInput {
    title: string;
    description: string | null;
    thumbnail: string | null;
    isPublished: boolean;
}

export const createCourse = async (data: CreateCourseInput, creatorId: string) => {
    const course = await prisma.course.create({
        data: {
            title: data.title,
            description: data.description?? "",
            thumbnail: data.thumbnail?? "",
            isPublished: data.isPublished ?? false,
            creator: {
                connect: {
                    id: creatorId,
                },
            },
        }
    })

    return course
}

export const getCourseById = async (id: string) => {
    const course = await prisma.course.findUnique({
        where: {
            id,
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    })

    return course
}