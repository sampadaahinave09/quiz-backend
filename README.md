# 🎯 Quiz Backend API

A simple backend API for a quiz application built using **Node.js** and **Express.js**.  
It allows creating quizzes, adding questions, and fetching quiz data.

---

## 🚀 1. Project Description

This project is a backend API that supports:
- Creating a quiz with a title.
- Adding questions to quizzes (with multiple options and one correct answer).
- Fetching all quizzes or the questions for a specific quiz.

The project is designed to demonstrate basic **CRUD operations**, **RESTful API design**, and **Express routing**.

---

## 🛠️ 2. Setup and Run Locally

### **Prerequisites**
- Node.js (v16 or later)
- npm (comes with Node.js)
- MongoDB (installed and running locally or use MongoDB Atlas)

### **Steps**
```bash
# 1. Clone the repository
git clone https://github.com/sampadaahinave09/quiz-backend.git

# 2. Go into the project folder
cd quiz-backend

# 3. Install dependencies
npm install

# 4. Start MongoDB (if local)
mongod

# 5. Run the server
node server.js
