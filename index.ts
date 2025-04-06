import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import authRoutes from './src/routes/auth.route';
import courseRouter from './src/routes/course.route';
import moduleRouter from './src/routes/module.route';
import lessonRouter from './src/routes/lesson.route';
import enrollementRouter from './src/routes/enrollment.route';
import lessonProgressRouter from './src/routes/lessonProgress.route';

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/courses', courseRouter)
app.use('/modules', moduleRouter);
app.use('/lessons', lessonRouter);
app.use('/enroll', enrollementRouter);
app.use('/progress', lessonProgressRouter);

app.get('/', (_, res) => {
    res.send('Learning Platform API 🚀')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Learning Platform API 🚀')
    console.log(`Server is running on port ${PORT}`)
})