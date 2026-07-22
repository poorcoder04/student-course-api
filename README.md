# Student Course API

## 📌 Overview
A backend API built using Node.js, Express, and MongoDB that allows students to register, login,view all courses and enroll in their needed courses.Teachers can create and manage their own courses, while students can enroll and view their enrolled courses.

---

## 🚀 Features

- User Authentication (JWT)
- Role-based Authorization (Student / Teacher)
- Course CRUD (Teacher only)
- Enrollment System
- View Enrolled Courses

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 🔐 Authentication

Uses JWT token.

Example header:

Authorization: Bearer TOKEN

---

## 📌 API Endpoints

### Auth
- POST /user/register
- POST /user/login

### Courses
- GET /courses
- POST /courses/create (Teacher only)
- PUT /courses/:id (Teacher only)
- DELETE /courses/:id (Teacher only)

### Enrollment
- POST /enroll (Student only)
- GET /enroll/my-courses

---

## ⚙️ Installation

```bash
git clone <repo-link>
cd student-course-api
npm install
npm run dev
