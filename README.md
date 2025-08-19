# Todo App

A full-stack Todo application built with React (Frontend) and Node.js/Express (Backend) in a monorepo structure.

## Features

- User authentication (Login/Register)
- CRUD operations for todos
- Responsive Material-UI design
- JWT-based authentication
- MongoDB database
- Monorepo structure for easy development and deployment

## Project Structure

```
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root monorepo config
├── vercel.json      # Vercel deployment config
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Local Development

1. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**

   - Backend: Create `.env` file in `server/` directory
   - Frontend: Create `.env.local` file in `client/` directory

3. **Start development servers:**

   ```bash
   npm run dev
   ```

4. **Access your app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Manual Setup

#### Backend Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file based on `env.example`

4. Start development server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file based on `env.example`

4. Start development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Monorepo Deployment (Recommended)

Deploy both frontend and backend together in one Vercel project:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables

#### Backend

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

#### Frontend

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name

## 🔧 Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both frontend and backend
- `npm run install:all` - Install dependencies for all workspaces

### Backend (server/)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production mode

### Frontend (client/)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production

## Technologies Used

- **Frontend**: React, Vite, Material-UI, React Router
- **Backend**: Node.js, Express, MongoDB, JWT
- **Deployment**: Vercel
- **Monorepo**: npm workspaces with concurrent development

## 📚 Documentation

- [Local Development Guide](./LOCAL_DEVELOPMENT.md) - Run the app locally
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel

## 🎯 Benefits of Monorepo

- ✅ Single repository for frontend and backend
- ✅ Shared dependencies and tooling
- ✅ Easier deployment and CI/CD
- ✅ Better code organization
- ✅ Simplified development workflow
