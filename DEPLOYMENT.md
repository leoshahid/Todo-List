# 🚀 Deployment Guide for Todo App

## Prerequisites

- GitHub repository: [https://github.com/leoshahid/Todo-List.git](https://github.com/leoshahid/Todo-List.git)
- MongoDB Atlas connection string (already provided)
- Vercel account

## 🎯 Option 1: Monorepo Deployment (Recommended)

Deploy both frontend and backend together in one Vercel project!

### Step 1: Push Code to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Todo App with monorepo Vercel deployment"

# Add remote origin
git remote add origin https://github.com/leoshahid/Todo-List.git

# Push to main branch
git push -u origin main
```

### Step 2: Deploy to Vercel (Single Project)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**: `leoshahid/Todo-List`
4. **Configure project settings:**

   - **Framework Preset**: Other
   - **Root Directory**: Leave as `/` (root)
   - **Build Command**: Leave empty (Vercel will use root vercel.json)
   - **Output Directory**: Leave empty
   - **Install Command**: Leave empty

5. **Set Environment Variables:**

   ```
   MONGO_URI=mongodb+srv://munirrajpoot1012:codavium123@cluster0.ur4pgrf.mongodb.net/codaviumTech?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=codaviumTech2025SuperSecretKey
   NODE_ENV=production
   PORT=5000
   VITE_API_URL=/api
   VITE_APP_NAME=Todo App
   ```

6. **Click "Deploy"**

7. **Your app will be available at**: `https://your-project.vercel.app`

### How It Works:

- **Frontend**: Served from `/` (root)
- **Backend API**: Available at `/api/*`
- **Single URL**: Everything runs from one domain
- **Automatic routing**: Vercel handles frontend/backend routing

## 🌐 Option 2: Separate Deployments (Alternative)

If you prefer separate projects, follow these steps:

### Backend Deployment

1. **Create new Vercel project**
2. **Root Directory**: `server`
3. **Framework**: Node.js
4. **Environment Variables**: Same as above

### Frontend Deployment

1. **Create another Vercel project**
2. **Root Directory**: `client`
3. **Framework**: Vite
4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   VITE_APP_NAME=Todo App
   ```

## ✅ Verification

### Monorepo Deployment:

- **App URL**: `https://your-project.vercel.app`
- **Frontend**: Same URL
- **Backend API**: `https://your-project.vercel.app/api`
- **Test**: Register/login and create todos

### Separate Deployments:

- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-frontend.vercel.app`

## 🐛 Troubleshooting

### Monorepo Issues:

- Check if `vercel.json` is in root directory
- Verify build scripts in both package.json files
- Check Vercel build logs for errors

### Common Errors:

- **Build Failures**: Check Node.js version compatibility
- **Routing Issues**: Verify vercel.json configuration
- **MongoDB Connection**: Check environment variables

## 🔒 Security Notes

- **Never commit `.env` files** to GitHub
- **Use strong JWT secrets** in production
- **Enable MongoDB Atlas security features**

## 📱 Final URLs

### Monorepo (Recommended):

- **App**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api`

### Separate Deployments:

- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-frontend.vercel.app`

## 🎉 Success!

**Monorepo deployment** gives you:

- ✅ Single URL for everything
- ✅ Easier management
- ✅ Better performance
- ✅ Simpler deployment

Your Todo app is now deployed and accessible worldwide! 🚀
