import { CreateEnrollmentInput } from "@/types/enrollment.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const enrollUserToCourse = async (
  userId: string,
  input: CreateEnrollmentInput
) => {
  const existing = await prisma.enrollment.findFirst({
    where: {
      userId,
      courseId: input.courseId,
    },
  });

  if (existing) {
    throw new Error("You are already enrolled in this course");
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId: input.courseId,
    },
  });

  return enrollment;
};

export const getEnrollmentsByUser = async (userId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return enrollments;
};

export const getAllEnrollments = async () => {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return enrollments;
};

export const getEnrollmentByCourseId = async (courseId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      courseId,
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return enrollments;
};
