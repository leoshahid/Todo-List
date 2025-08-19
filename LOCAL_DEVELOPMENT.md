# 🏠 Local Development Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB running locally or MongoDB Atlas connection

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Set Up Environment Variables

#### Backend (.env file in server directory)

```bash
cd server
# Create .env file with:
PORT=5001
MONGO_URI=mongodb+srv://munirrajpoot1012:codavium123@cluster0.ur4pgrf.mongodb.net/codaviumTech?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-local-jwt-secret
NODE_ENV=development
```

#### Frontend (env.local file in client directory)

```bash
cd client
# Copy env.local.example to .env.local:
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=Todo App (Local)
```

### 3. Start Development Servers

#### Option A: Run Both Together (Recommended)

```bash
# From root directory
npm run dev
```

#### Option B: Run Separately

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## 📁 Project Structure

```
todo-app/
├── package.json          # Root monorepo config
├── vercel.json          # Vercel deployment config
├── server/              # Backend API
│   ├── package.json
│   ├── server.js
│   └── ...
├── client/              # React frontend
│   ├── package.json
│   ├── src/
│   └── ...
└── README.md
```

## 🔧 Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both frontend and backend
- `npm run install:all` - Install dependencies for all workspaces

### Backend (server/)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production mode
- `npm run build` - Build backend

### Frontend (client/)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Endpoints**: http://localhost:5001/api/\*

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process using port 5001
lsof -ti:5001 | xargs kill -9

# Or change port in server/.env
PORT=5002
```

### Frontend Can't Connect to Backend

- Check if backend is running on correct port
- Verify VITE_API_URL in client environment
- Check CORS configuration in server

### MongoDB Connection Issues

- Verify MongoDB is running
- Check connection string in server/.env
- Ensure network access for MongoDB Atlas

## 🔄 Development Workflow

1. **Start development**: `npm run dev`
2. **Make changes** to frontend or backend
3. **Auto-reload** - both servers will restart automatically
4. **Test changes** in browser
5. **Commit changes** when ready

## 📦 Production Build

```bash
# Build both frontend and backend
npm run build

# Start production server
npm start
```

## 🚀 Deployment

After testing locally, deploy to Vercel:

1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Check deployment logs for any issues

## 🎯 Tips

- Use `npm run dev` for development - it runs both servers
- Backend changes auto-reload with nodemon
- Frontend changes auto-reload with Vite
- Check terminal output for any errors
- Use browser dev tools to debug frontend issues
- Use Postman/Insomnia to test API endpoints
