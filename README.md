# PrepAI - Interview Preparation Platform

PrepAI is an AI-powered interview preparation platform built with the MERN stack (MongoDB, Express, React, Node.js) and integrating Google GenAI to simulate realistic interview experiences.

## 🚀 Features

- **Authentication System:** Secure user registration and login.
- **AI Mock Interviews:** Dynamic interview generation based on user profiles or resumes (PDF Parsing).
- **Resume Parsing:** Uses `pdf-parse` to extract information from uploaded resumes.
- **Modern UI:** Built with React, Vite, Framer Motion for smooth animations, and Sass for styling.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Sass, Framer Motion
- **Networking:** Axios

### Backend
- **Framework:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **AI Integration:** `@google/genai`
- **Authentication:** JWT, bcryptjs
- **Other Tools:** Puppeteer, pdf-parse, multer, zod

## 📂 Project Structure

```
Prepai/
├── Backend/        # Express & Node.js backend
│   ├── src/        # Routes, controllers, database config
│   ├── .env        # Environment variables
│   └── server.js   # Main entry point
└── Frontend/       # React & Vite frontend
    ├── public/     # Static assets
    └── src/        # React components, contexts, routing
```

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Student-Rupam/Prepai.git
   cd Prepai
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```
   - Create a `.env` file in the `Backend` directory with your database URI and API keys (e.g., `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

## 📄 License
This project is licensed under the ISC License.
