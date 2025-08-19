# Todo App

A full-stack Todo application built with React (Frontend) and Node.js/Express (Backend).

## Features

- User authentication (Login/Register)
- CRUD operations for todos
- Responsive Material-UI design
- JWT-based authentication
- MongoDB database

## Project Structure

```
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Backend Setup

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

### Frontend Setup

1. Navigate to client directory:

   ```bash
   cd client
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

## Deployment

### Backend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Environment Variables

### Backend

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### Frontend

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name

## Technologies Used

- **Frontend**: React, Vite, Material-UI, React Router
- **Backend**: Node.js, Express, MongoDB, JWT
- **Deployment**: Vercel
