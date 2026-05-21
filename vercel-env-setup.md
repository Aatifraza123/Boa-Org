# Vercel Environment Variable Setup

## Steps to Fix the API Connection Issue:

### 1. Set Environment Variable in Vercel
Go to your Vercel dashboard:
1. Open your project (boa-connect)
2. Go to Settings → Environment Variables
3. Add this variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `http://api.boabihar.org`
   - **Environment**: Production

### 2. Redeploy the Project
After adding the environment variable:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

### 3. Verify the Setup
After redeployment, check:
- The website should load gallery images in the hero carousel
- API calls should work without timeout errors
- Check browser console for any remaining errors

## Current Status:
- ✅ DNS records are correctly configured
- ✅ Backend is running on VPS (72.61.251.120:5000)
- ✅ Nginx reverse proxy is configured
- ❌ Frontend environment variable needs to be set in Vercel

## Expected Result:
Once the environment variable is set and the project is redeployed, your website should connect to the backend API successfully.