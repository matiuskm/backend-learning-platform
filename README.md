# 📘 Modular Learning Platform – Backend

A simple and modular backend API for a learning platform. Built with TypeScript, Express, and Prisma using SQLite for development.

---

## 🔧 Stack

- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **SQLite** (development) – can be swapped for PostgreSQL
- **Zod** (input validation)
- **JWT Authentication**

---

## 🚀 Features

- User authentication (Register, Login, Me)
- Role-based access (STUDENT, CREATOR, ADMIN)
- Course, Module, Lesson management
- Enrollment system (student enroll, admin control)

---

## 📁 Project Structure

```
src/
├── controllers/
├── routes/
├── services/
├── schemas/
├── middlewares/
├── utils/
├── types/
└── config/
```

---

## ⚙️ Setup

### Install dependencies:

```bash
pnpm install
```

### Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

### Prisma setup:

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

### Run the server:

```bash
pnpm run dev
```

---

## 🔐 Auth Endpoints

- **POST** `/auth/register`
- **POST** `/auth/login`
- **GET** `/auth/me`

---

## 📚 Courses

- **GET** `/courses` – List all published courses
- **GET** `/courses/:id` – Course details
- **GET** `/courses/creator/:id` – Courses by creator
- **POST** `/courses` – Create (CREATOR/ADMIN)
- **PUT** `/courses/:id` – Update (CREATOR/ADMIN)
- **DELETE** `/courses/:id` – Delete (CREATOR/ADMIN)

---

## 📦 Modules & Lessons

- **POST** `/courses/:courseId/modules` – Add module
- **PUT** `/modules/:id`
- **DELETE** `/modules/:id`
- **POST** `/modules/:moduleId/lessons` – Add lesson
- **PUT** `/lessons/:id`
- **DELETE** `/lessons/:id`

---

## ✅ Enrollments

- **POST** `/enroll` – Enroll in a course (STUDENT)
- **GET** `/enroll/my` – My enrollments (STUDENT)
- **GET** `/enroll` – All enrollments (ADMIN)
- **GET** `/enroll/course/:courseId` – Enrolled users (CREATOR/ADMIN)

---

## 🧑 Roles

| **Role**   | **Access**                          |
|------------|-------------------------------------|
| STUDENT    | View & enroll                       |
| CREATOR    | Manage courses, modules, lessons    |
| ADMIN      | Full access                         |

---

## 🧪 API Testing

Use **Postman** or **Hoppscotch**. For auth-required routes, include:

```
Authorization: Bearer <token>
```

---

Made with 💻 + ☕️ by Lazy Coder.