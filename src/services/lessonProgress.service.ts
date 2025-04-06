import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const markLessonAsCompleted = async (
  lessonId: string,
  userId: string
) => {
  const progress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {},
    create: {
      userId,
      lessonId,
    },
  });

  return progress;
};

export const getMyLessonProgress = async (userId: string) => {
  return await prisma.lessonProgress.findMany({
    where: { userId },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          content: true,
          videoUrl: true,
          order: true,
          module: {
            select: {
              id: true,
              title: true,
              course: {
                select: {
                  id: true,
                  title: true,
                  thumbnail: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const formatLessonProgress = (progress: any) => {
  return progress.map((p: any) => ({
    id: p.id,
    lesson: {
      id: p.lesson.id,
      title: p.lesson.title,
      module: {
        id: p.lesson.module.id,
        title: p.lesson.module.title,
        course: {
          id: p.lesson.module.course.id,
          title: p.lesson.module.course.title,
        },
      },
    },
  }));
};
