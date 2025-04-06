import { updateCourseSchema } from "@/schemas/course.schema";
import { createLessonSchema } from "@/schemas/lesson.schema";
import { createLesson, deleteLesson, getLessonById, getLessonsByModule, updateLesson } from "@/services/lesson.service";
import { Request, Response } from "express";

export async function createLessonHandler(req: Request, res: Response) {
    try {
        const validated = createLessonSchema.parse(req.body);
        const lesson = await createLesson(validated);
        return res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getLessonByIdHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const lesson = await getLessonById(id);
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getLessonsByModuleHandler(req: Request, res: Response) {
    try {
        const { moduleId } = req.params;
        const lessons = await getLessonsByModule(moduleId);
        res.json(lessons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateLessonHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const validated = updateCourseSchema.parse(req.body);
        const updatedLesson = await updateLesson(id, validated);
        res.json(updatedLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteLessonHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await deleteLesson(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}