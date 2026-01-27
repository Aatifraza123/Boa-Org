# 🌐 Vercel Deployment - Correct Setup

## ⚠️ Important: Root Directory Configuration

Vercel ko **UI mein** configure karna hai, vercel.json file se nahi!

---

## ✅ Correct Steps for Vercel Deployment

### Step 1: Import Project

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `Aatifraza123/Boa-Org`
4. Click "Import"

### Step 2: Configure Project Settings

**⚠️ CRITICAL: Set Root Directory FIRST!**

1. **Root Directory:**
   - Click "Edit" button next to Root Directory
   - Select: `boa-connect`
   - Click "Continue"

2. **Framework Preset:**
   - Should auto-detect: `Vite`
   - If not, select it manually

3. **Build Settings** (Auto-filled):
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:**
   - Click "Add" under Environment Variables
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com
     ```
   - Select: Production, Preview, Development (all three)

### Step 3: Deploy

1. Click "Deploy" button
2. Wait 2-5 minutes
3. Done! ✅

---

## 🐛 Common Errors & Solutions

### Error: "No such file or directory: boa-connect"

**Cause:** Root Directory not set in Vercel UI

**Solution:**
1. Go to Project Settings
2. General → Root Directory
3. Set to: `boa-connect`
4. Redeploy

### Error: "Build failed"

**Cause:** Environment variable missing

**Solution:**
1. Settings → Environment Variables
2. Add `VITE_API_URL`
3. Redeploy

### Error: "API calls failing"

**Cause:** Wrong backend URL

**Solution:**
1. Check Render backend URL
2. Update `VITE_API_URL` in Vercel
3. Redeploy

---

## 📋 Deployment Checklist

Before deploying:
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Root Directory will be set to `boa-connect`
- [ ] Environment variable ready

During deployment:
- [ ] Root Directory = `boa-connect`
- [ ] Framework = Vite
- [ ] VITE_API_URL added
- [ ] All environments selected

After deployment:
- [ ] Site loads without errors
- [ ] API calls working
- [ ] No console errors

---

## 🎯 Quick Reference

**Root Directory:** `boa-connect` (Set in Vercel UI)

**Environment Variable:**
```
VITE_API_URL=https://boa-backend-xxxx.onrender.com
```

**Build Command:** `npm run build` (Auto)

**Output Directory:** `dist` (Auto)

---

## 💡 Pro Tip

If you already created the project with wrong settings:

1. Go to Project Settings
2. General → Root Directory
3. Change to `boa-connect`
4. Go to Deployments
5. Click "..." on latest deployment
6. Click "Redeploy"

---

**Ready to deploy? Follow the steps above carefully!** 🚀
