# Corporate Task Manager

A full-stack web application designed to streamline task management within an organization.
The system allows employers to assign and track tasks while employees can view, manage, and update their assigned work through an intuitive dashboard.

This project demonstrates a complete **MERN stack implementation** with authentication, protected routes, and a structured API architecture.

---

## 🚀 Features

* 🔐 User Authentication (Login system)
* 👨‍💼 Employer Dashboard
* 👨‍💻 Employee Dashboard
* 📋 Task creation and assignment
* ✅ Task status tracking
* 🔒 Protected routes with authentication middleware
* ⚡ REST API for task management
* 🎨 Modern UI built with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 📂 Project Structure

```
Corporate-Task-Manager
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   └── server.js
│
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── context
    │   ├── pages
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── vite.config.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/OM1369/Corporate-Task-Manager.git
```

---

### 2️⃣ Install Backend Dependencies

```
cd backend
npm install
```

---

### 3️⃣ Install Frontend Dependencies

```
cd ../frontend
npm install
```

---

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the backend folder:


### 5️⃣ Run Backend Server

```
cd backend
npm start
```

---

### 6️⃣ Run Frontend

```
cd frontend
npm run dev
```

The application will start locally.

---

## 📸 Screenshots

Login Page
Employer Dashboard
Employee Dashboard
Task Management Panel

---

## 📌 Future Improvements

* Task priority levels
* Real-time notifications
* Team collaboration features
* File attachments for tasks
* Deployment with cloud database

---

## 👨‍💻 Author

Om Kadam

---

## ⭐ If you like this project

Give it a **star on GitHub** and feel free to contribute.
