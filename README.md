<div align="center">

<img src="https://img.shields.io/badge/3W-Social-6366f1?style=for-the-badge&labelColor=0b0e1a&color=6366f1" alt="3W Social" height="40"/>

# 3W Social — Mini Social Post App

**A full-stack MERN social media platform built for the 3W Business Private Limited internship assignment.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-3w--social--six.vercel.app-22d3ee?style=for-the-badge&labelColor=0b0e1a)](https://3w-social-six.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙️_Backend_API-Render-6366f1?style=for-the-badge&labelColor=0b0e1a)](https://threew-social-5wme.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Md--Aman45-white?style=for-the-badge&logo=github&labelColor=0b0e1a)](https://github.com/Md-Aman45)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=1a1a1a)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white&labelColor=1a1a1a)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a1a)
![MUI](https://img.shields.io/badge/MUI-v5-007FFF?style=flat-square&logo=mui&logoColor=white&labelColor=1a1a1a)
![JWT](https://img.shields.io/badge/JWT-Auth-pink?style=flat-square&logo=jsonwebtokens&labelColor=1a1a1a)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Signup & login with JWT + bcrypt-hashed passwords |
| 📝 **Create Posts** | Text, image (base64), or both — neither is mandatory alone |
| 📰 **Public Feed** | Paginated feed (10/page), newest first — All Posts & Promotions tabs |
| ❤️ **Like Toggle** | Like/unlike instantly, usernames of likers stored in DB |
| 💬 **Comments** | Collapsible comment section, username stored per comment |
| 🔗 **Share** | Copies post link to clipboard + increments share count in DB |
| 📢 **Promote** | Mark posts as promotions, filter via Promotions tab |
| 😊 **Emoji Picker** | Tap emoji panel to insert into post text |
| 👤 **Follow Button** | Follow/unfollow UI on every post card |
| 🗄️ **2 Collections** | Only `users` and `posts` in MongoDB (as required) |

---

## 🛠️ Tech Stack

```
Frontend   →  React 18 (Vite) + Material UI v5 + React Router v6
Backend    →  Node.js + Express.js
Database   →  MongoDB + Mongoose (hosted on MongoDB Atlas)
Auth       →  JSON Web Tokens (JWT) + bcryptjs
Hosting    →  Vercel (frontend) · Render (backend) · MongoDB Atlas (DB)
```

---

## 📁 Project Structure

```
3w-social/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT protect middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Post.js             # Post schema (likes + comments embedded)
│   ├── routes/
│   │   ├── auth.js             # POST /signup, /login
│   │   └── posts.js            # GET/POST posts, like, comment, share
│   ├── seed.js                 # DB seeder with real images
│   ├── server.js               # Express app entry
│   └── .env.example
│
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js        # Axios instance with JWT interceptor
        ├── components/
        │   ├── AuthLayout.jsx  # Split-screen auth layout
        │   ├── CreatePost.jsx  # Post creator with emoji + promote
        │   ├── Navbar.jsx      # Top navigation bar
        │   └── PostCard.jsx    # Feed post card with all interactions
        ├── context/
        │   └── AuthContext.jsx # Global auth state (login/logout)
        ├── pages/
        │   ├── Feed.jsx        # Main social feed page
        │   ├── Login.jsx       # Login page
        │   └── Signup.jsx      # Signup page
        ├── App.jsx             # Routes + protected route wrapper
        ├── main.jsx            # MUI ThemeProvider + BrowserRouter
        └── theme.js            # Custom dark/light MUI theme
```

---

## 🚀 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Md-Aman45/3w-social.git
cd 3w-social
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev        # runs on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm run dev        # runs on http://localhost:5173
```

### 4. Seed the database (optional — adds real posts + images)

```bash
cd backend
node seed.js
```

---

## 🌐 Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://3w-social-six.vercel.app |
| Backend | Render | https://threew-social-5wme.onrender.com |
| Database | MongoDB Atlas | `3w-social-cluster` |

> ⚠️ Render free tier sleeps after 15 min of inactivity. First request may take ~30 seconds to wake up — this is normal.

---

## 🔑 Environment Variables

**Backend** (`backend/.env`):
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/3w-social
JWT_SECRET=your_secret_key
PORT=5000
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=https://threew-social-5wme.onrender.com/api
```

---

## 🧪 Test Accounts

Pre-seeded accounts (run `node seed.js` first):

| Username | Email | Password |
|---|---|---|
| Rahul_Dev | rahul@example.com | password123 |
| Priya_Singh | priya@example.com | password123 |
| Amit_Kumar | amit@example.com | password123 |
| Sneha_Sharma | sneha@example.com | password123 |
| Vikram_Joshi | vikram@example.com | password123 |

---

## 📡 API Endpoints

### Auth
```
POST   /api/auth/signup       # Register new user
POST   /api/auth/login        # Login and get JWT token
```

### Posts (🔒 = requires Bearer token)
```
GET    /api/posts             # Get paginated feed (?page=1&limit=10&promoted=true)
POST   /api/posts          🔒 # Create new post (text, image, isPromoted)
PUT    /api/posts/:id/like  🔒 # Toggle like on a post
POST   /api/posts/:id/comment 🔒 # Add comment to a post
PUT    /api/posts/:id/share 🔒 # Increment share count
```

---

## 👨‍💻 Author

**Md Aman** — Backend & Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-md--aman-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/md-aman-7941a0355/)
[![GitHub](https://img.shields.io/badge/GitHub-Md--Aman45-181717?style=flat-square&logo=github)](https://github.com/md-aman45)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-6366f1?style=flat-square)](https://md-aman45.github.io/)
[![LeetCode](https://img.shields.io/badge/LeetCode-AmanOps-FFA116?style=flat-square&logo=leetcode&logoColor=white)](https://leetcode.com/u/AmanOps/)

---

<div align="center">
  Built with ❤️ for 3W Business Private Limited — Round 1 Internship Task
</div>

<div align="center">
  ❤️ Thank You
</div>
