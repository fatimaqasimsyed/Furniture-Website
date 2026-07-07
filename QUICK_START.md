# 🚀 Quick Start Guide - Admin Panel

## ⚡ 3-Step Setup (5 minutes)

### Step 1: Install Backend Dependencies
Open terminal in project root:
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
Keep that terminal open and run:
```bash
npm start
```

✅ You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
```

### Step 3: Start Frontend (New Terminal)
Open a NEW terminal in project root:
```bash
npm run dev
```

✅ You should see:
```
Local: http://localhost:5173/
```

---

## 🎯 Access Admin Panel

1. Open browser: **http://localhost:5173/#/admin**

2. Login with:
   - **Email**: `tfgallery0@gmail.com`
   - **Password**: `TFG@2026Secure`

3. Click **"Add Product"** and start managing your furniture!

---

## 🖼️ Adding Your First Product

1. Click **"Add Product"** button
2. Select category: **"Bed Sets"**
3. Click **"Auto"** button (generates SKU: BS01)
4. Enter name: **"Luxury King Bed"**
5. Write description: **"Premium quality king-size bed with elegant headboard"**
6. Click on **"Click to upload main image"** → Select image from computer
7. Wait for upload (shows "Uploading...")
8. Check **"Feature on homepage"** if you want
9. Click **"Add Product"**

✅ **Done!** Your product is now live on the website!

---

## 🧪 Testing

### Test on Customer Side:
1. Go to: http://localhost:5173/
2. Click "Shop" → See your product
3. Click product → See details
4. Add to cart → Works!

### Test Search:
1. Go to Shop page
2. Search for "BS01" → Finds your product
3. Search for "Luxury" → Finds your product

---

## ❓ Troubleshooting

### Backend Error: "Cannot find module"
```bash
cd backend
npm install
```

### Frontend Error: Can't connect to server
- Make sure backend is running (Step 2)
- Check: http://localhost:3000/api/health
- Should show: `{"status":"OK"}`

### Can't Login:
- Email: `tfgallery0@gmail.com` (exactly)
- Password: `TFG@2026Secure` (exactly)
- Backend must be running

### Image Upload Fails:
- Check Cloudinary credentials in `backend/.env`
- Make sure internet is connected

---

## 📝 What You Built

✅ Professional admin panel  
✅ MongoDB database (cloud hosted)  
✅ Cloudinary image storage (cloud hosted)  
✅ Secure authentication  
✅ Auto SKU generation  
✅ Drag & drop image upload  
✅ Full CRUD operations  

---

## 🔄 Daily Usage

**To start working:**
```bash
# Terminal 1:
cd backend
npm start

# Terminal 2:
npm run dev
```

**To access admin:**
- Go to: http://localhost:5173/#/admin
- Login and manage products!

---

## 🎓 For Your Client

Give them:
1. **URL**: (your deployed website URL)
2. **Admin URL**: (your-site.com/#/admin)
3. **Email**: tfgallery0@gmail.com
4. **Password**: TFG@2026Secure
5. **Guide**: Show them ADMIN_SETUP_GUIDE.md

They can add/edit/delete products anytime!

---

## 🚀 Next: Deployment

Ready to make it live? See **ADMIN_SETUP_GUIDE.md** for:
- Deploying backend to Render/Railway (FREE)
- Connecting everything
- Making it accessible from internet

---

**Everything is ready! Start adding products now!** 🎉
