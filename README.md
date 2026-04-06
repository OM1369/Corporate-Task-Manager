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

<img width="857" height="825" alt="Screenshot 2026-04-06 200007" src="https://github.com/user-attachments/assets/14f45062-23d1-40d9-a81c-47fbd15378b1" />
<img width="1885" height="810" alt="Screenshot 2026-04-06 195930" src="https://github.com/user-attachments/assets/6c129585-7415-4082-9819-f35c68e277b6" />
<img width="1890" height="831" alt="Screenshot 2026-04-06 195830" src="https://github.com/user-attachments/assets/32112468-fbd4-4752-b7da-b54ef8382769" />
<img width="1910" height="798" alt="Screenshot 2026-04-06 200118" src="https://github.com/user-attachments/assets/3ac8794c-c8a2-46c4-8e36-0f7e432429d7" />


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
