import {
  createCourseSchema,
  updateCourseSchema,
} from "@/schemas/course.schema";
import { createCourse, getCourseById } from "@/services/course.service";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createCourseHandler = async (req: Request, res: Response) => {
  try {
    const validated = createCourseSchema.parse(req.body);
    const creatorId = (req as any).user.id;
    const course = await createCourse(validated, creatorId);

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function getCourses(req: Request, res: Response) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    const result = courses.map(({ createdBy, ...rest }) => rest);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMyCourses(req: Request, res: Response) {
  try {
    console.log("user", (req as any).user);
    const creatorId = (req as any).user.id;
    const courses = await prisma.course.findMany({
      where: { createdBy: creatorId },
    });

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCoursesByCreator(req: Request, res: Response) {
  try {
    const { creatorId } = req.params;
    const courses = await prisma.course.findMany({
      where: {
        creator: {
          id: creatorId,
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result = courses.map(({ createdBy, ...rest }) => rest);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCourseByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const course = await getCourseById(id)

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const { createdBy, ...rest } = course;
    res.json({ rest });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validated = updateCourseSchema.parse(req.body);

    const existingCourse = await prisma.course.findUnique({
      where: {
        id,
        createdBy: (req as any).user.id,
      },
    });

    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    const course = await prisma.course.update({
      where: { id },
      data: validated,
    });

    res.json({ course });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existingCourse = await prisma.course.findUnique({
      where: {
        id,
        createdBy: (req as any).user.id,
      },
    });

    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    await prisma.course.delete({
      where: { id },
    });

    res.status(204).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
