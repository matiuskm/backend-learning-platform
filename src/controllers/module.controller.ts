import { createModuleSchema, updateModuleSchema } from "@/schemas/module.schema";
import { createModule, deleteModule, getModulesByCourse, updateModule } from "@/services/module.service";
import { Request, Response } from "express";

export async function createModuleHandler(req: Request, res: Response) {
    try {
        const validated = createModuleSchema.parse(req.body);
        const module = await createModule(validated);
        return res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getModulesByCourseHandler(req: Request, res: Response) {
    try {
        const { courseId } = req.params;
        const modules = await getModulesByCourse(courseId);
        res.json(modules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateModuleHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const validated = updateModuleSchema.parse(req.body);
        const updatedModule = await updateModule(id, validated);
        res.json(updatedModule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteModuleHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await deleteModule(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}