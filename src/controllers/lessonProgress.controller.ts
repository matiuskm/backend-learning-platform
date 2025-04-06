import {
  getMyLessonProgress,
  markLessonAsCompleted,
} from "@/services/lessonProgress.service";
import { Request, Response } from "express";

export async function markLessonAsCompletedHandler(
  req: Request,
  res: Response
) {
  try {
    const { lessonId } = req.body;
    const userId = (req as any).user.id; // Assuming you have user ID in the request object
    const progress = await markLessonAsCompleted(lessonId, userId);
    return res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getMyLessonProgressHandler(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id; // Assuming you have user ID in the request object
    const data = await getMyLessonProgress(userId);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return undefined; // Properly handle circular references
      seen.add(value);
    }
    return value;
  };
}
