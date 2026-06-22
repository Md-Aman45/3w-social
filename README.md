# 3W Social — Mini Social Post App

A full-stack social feed app built for the 3W Business internship Round 1 task. Users can sign up, log in, create posts (text and/or image), view a public feed, like posts, and comment.

**Stack:** React.js (Vite) + MUI · Node.js + Express · MongoDB

## Project structure
```
3w-social/
├── backend/   → Express API (auth, posts, likes, comments)
└── frontend/  → React app (Vite + MUI, dark theme)
```

## 1. Run locally

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev             # starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5000/api
npm run dev              # starts on http://localhost:5173
```

## 2. MongoDB Atlas setup
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user and allow network access from anywhere (0.0.0.0/0) for deployment.
3. Copy the connection string into `MONGO_URI` in `backend/.env`.

## 3. Deploy

### Backend → Render
1. Push this repo to GitHub.
2. On render.com, create a **New Web Service**, point it at the `backend` folder (root directory: `backend`).
3. Build command: `npm install` · Start command: `npm start`
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`.
5. Deploy — note the live URL, e.g. `https://3w-social-backend.onrender.com`.

### Frontend → Vercel
1. Import the repo on vercel.com, set **root directory** to `frontend`.
2. Add environment variable: `VITE_API_URL=https://3w-social-backend.onrender.com/api`
3. Deploy.

## Features implemented
- Signup/login with bcrypt-hashed passwords + JWT auth
- Create post (text and/or image — neither mandatory alone)
- Public feed, paginated, newest first
- Like (toggle) and comment, with usernames stored per like/comment
- Instant UI updates on like/comment
- Two MongoDB collections only: `users`, `posts` (comments/likes embedded in posts)
- Dark, modern MUI UI (no Tailwind), responsive layout

## Notes
- Images are stored as base64 data URLs directly in MongoDB to avoid needing a separate file-storage service — simplest path for a quick, dependency-free deploy. For production scale, swap this for Cloudinary/S3.
