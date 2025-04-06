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

Made with 💻 + ☕️ by Lazy Coder.