# SevaDaan - Vercel Deployment Guide

## 📋 Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas already configured ✅

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub

```powershell
# Navigate to project root
cd D:\Sevadaan

# Initialize git (if not already done)
git init

# Create .gitignore if not exists
# Add node_modules, .env, dist to .gitignore

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub (github.com/new)
# Then connect and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sevadaan.git
git push -u origin main
```

### Step 2: Deploy Backend to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `Backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=mongodb+srv://anushkajain:anushka123@sevadaan.4zuhxtc.mongodb.net/sevadaan?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

6. Click "Deploy"

7. **Copy your backend URL**: e.g., `https://sevadaan-backend.vercel.app`

**Option B: Via CLI**

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy Backend
cd D:\Sevadaan\Backend
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: sevadaan-backend
# - Directory: ./
# - Override settings? No

# Set environment variables
vercel env add MONGODB_URI
# Paste: mongodb+srv://anushkajain:anushka123@sevadaan.4zuhxtc.mongodb.net/sevadaan

vercel env add JWT_SECRET
# Paste: your-secret-key

vercel env add NODE_ENV
# Paste: production

# Deploy to production
vercel --prod
```

### Step 3: Deploy Frontend to Vercel

1. **Update Frontend .env.production**:
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app
   ```

2. **Via Vercel Dashboard**:
   - Click "Add New" → "Project"
   - Import same GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `Frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   
   - **Add Environment Variables**:
     ```
     VITE_API_URL=https://your-backend.vercel.app
     ```
   
   - Click "Deploy"

3. **Via CLI**:
   ```powershell
   cd D:\Sevadaan\Frontend
   
   # Create .env.production with backend URL
   # Then deploy
   vercel --prod
   ```

### Step 4: Update CORS in Backend

After deployment, update Backend CORS configuration:

**File**: `Backend/src/index.ts` or `Backend/src/app.ts`

```typescript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://your-frontend.vercel.app',
    'https://*.vercel.app' // Allow Vercel preview deployments
  ],
  credentials: true
}));
```

Push changes and redeploy:
```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Vercel will auto-deploy on push!

### Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test login with demo credentials
3. Check browser console for API errors
4. Verify MongoDB connection in Vercel logs

## 🔧 Troubleshooting

### Backend Issues

**Check Vercel Logs**:
```powershell
vercel logs https://your-backend.vercel.app
```

**Common Issues**:
- ❌ Module not found: Check `package.json` dependencies
- ❌ MongoDB connection failed: Verify MONGODB_URI env variable
- ❌ Serverless function timeout: Backend routes must respond in <10s

### Frontend Issues

**Check Build Logs in Vercel Dashboard**

**Common Issues**:
- ❌ API calls failing: Check VITE_API_URL in env variables
- ❌ CORS errors: Update backend CORS configuration
- ❌ 404 on refresh: Vercel should auto-handle SPA routing

## 📝 Environment Variables Summary

### Backend Environment Variables
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://anushkajain:anushka123@sevadaan.4zuhxtc.mongodb.net/sevadaan
JWT_SECRET=generate-a-strong-secret-key-here
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend.vercel.app
```

## 🎯 URLs After Deployment

- **Frontend**: https://sevadaan.vercel.app
- **Backend**: https://sevadaan-backend.vercel.app
- **MongoDB**: mongodb+srv://sevadaan.4zuhxtc.mongodb.net (already configured ✅)

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- `main` branch → Production
- Other branches → Preview deployments

## 💰 Cost

**FREE** tier includes:
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Global CDN

Perfect for SevaDaan! 🎉
