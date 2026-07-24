# Student Course API

## Problem this project solves
Many educational platforms need a simple way to manage course access, enrollment, and role-based operations. This backend API solves that problem by providing a structured system where:

- students can register and log in securely
- teachers can create and manage courses
- enrollment is handled through an API workflow
- the platform keeps student and teacher access separated by role

In short, the project turns the core business flow of a course platform into a working backend service.

---

## What the system does
This API supports the main operations of a learning platform:

- user registration and authentication
- role-based access control
- teacher-only course management
- student enrollment in available courses
- retrieving the courses a student has enrolled in

---

## Key features
- JWT authentication
- Student and teacher role separation
- Teacher-only course creation, update, and deletion
- Student-only enrollment process
- MongoDB data storage with Mongoose models

---

## Tech stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## API overview

### Authentication
- POST /user/register
- POST /user/login

### Courses
- GET /courses
- POST /courses/create (Teacher only)
- PUT /courses/:id (Teacher only)
- DELETE /courses/:id (Teacher only)

### Enrollment
- POST /enroll (Student only)
- GET /mycourse (Student only)

---

## Example authorization header

```http
Authorization: Bearer <your_jwt_token>
```

---

## Why this project matters
This project solves the real-world need of managing a course platform's backend operations without needing a full frontend first. It provides the foundation for:

- secure authentication
- course publishing and maintenance
- student course enrollment
- organized role-based access control

---

## Setup

1. Clone the repository
2. Install dependencies
3. Add a `.env` file with your MongoDB URI and JWT secret
4. Run the app

```bash
git clone <repo-link>
cd student-course-api
npm install
node index.js
```

---

## Notes
This project is a backend API focused on the core business problems of course management and enrollment.
