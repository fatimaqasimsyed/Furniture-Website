# TFG Admin Panel Setup Guide

## 🎉 Complete Admin Panel System

Your furniture website now has a professional admin panel with:
- ✅ Product Management (Add, Edit, Delete)
- ✅ Image Upload (Drag & Drop to Cloudinary)
- ✅ Auto SKU Generation
- ✅ Login Authentication
- ✅ MongoDB Database
- ✅ Secure Admin Access

---

## 📋 Quick Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
📍 API available at http://localhost:3000/api
```

### Step 3: Start the Frontend (in a new terminal)

```bash
npm run dev
```

### Step 4: Access Admin Panel

1. Open browser: `http://localhost:5173/#/admin`
2. Login with:
   - **Email**: `tfgallery0@gmail.com`
   - **Password**: `TFG@2026Secure`

---

## 🔐 Admin Credentials

**Email**: tfgallery0@gmail.com  
**Password**: TFG@2026Secure

⚠️ **IMPORTANT**: Change the password in `backend/.env` file before deploying to production!

---

## 🎯 How to Use Admin Panel

### Adding a New Product:

1. Click **"Add Product"** button
2. Select **Category** (e.g., "Bed Sets")
3. Click **"Auto"** to generate SKU code automatically
4. Enter **Product Name**
5. Write **Description**
6. Upload **Main Image** (click or drag & drop)
7. Upload **Additional Images** (optional)
8. Check **"Feature on homepage"** if you want it featured
9. Click **"Add Product"**

✅ Product is now live on your website!

### Editing a Product:

1. Find the product in dashboard
2. Click **"Edit"** button
3. Make changes
4. Click **"Update Product"**

### Deleting a Product:

1. Find the product
2. Click **"Delete"** button
3. Confirm deletion

---

## 📁 Project Structure

```
oak-and-aura-main/
├── backend/                    # Backend API
│   ├── config/
│   │   └── cloudinary.js      # Cloudinary config
│   ├── models/
│   │   └── Product.js         # Product database schema
│   ├── routes/
│   │   ├── auth.js           # Login routes
│   │   └── products.js       # Product CRUD routes
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env                  # Backend environment variables
│
├── src/
│   ├── pages/
│   │   ├── AdminLogin.tsx    # Admin login page
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   └── ...other pages
│   └── App.tsx               # Routes (includes /admin)
│
└── .env                       # Frontend environment variables
```

---

## 🔧 Configuration Files

### Backend `.env` (backend/.env):
```env
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=df7o2wqzt
CLOUDINARY_API_KEY=974994682851815
CLOUDINARY_API_SECRET=TjLrk3MbX59hn-ZEZaOGVF69rko
ADMIN_EMAIL=tfgallery0@gmail.com
ADMIN_PASSWORD=TFG@2026Secure
JWT_SECRET=tfg_furniture_gallery_super_secret_key_2026_secure
PORT=3000
```

### Frontend `.env`:
```env
VITE_WEB3FORMS_ACCESS_KEY=8e240f24-8173-4c80-bc9a-b0d18194f037
VITE_MONGODB_URI=mongodb+srv://...
VITE_CLOUDINARY_CLOUD_NAME=df7o2wqzt
VITE_CLOUDINARY_API_KEY=974994682851815
VITE_CLOUDINARY_API_SECRET=TjLrk3MbX59hn-ZEZaOGVF69rko
VITE_ADMIN_EMAIL=tfgallery0@gmail.com
VITE_ADMIN_PASSWORD=TFG@2026Secure
```

---

## 🚀 Deployment Guide

### Option 1: Deploy Backend to Render (Free)

1. Go to: https://render.com/
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Copy from `backend/.env`
6. Click **"Create Web Service"**
7. Copy your backend URL (e.g., `https://tfg-backend.onrender.com`)

### Update Frontend API URLs:

In `AdminLogin.tsx` and `AdminDashboard.tsx`, replace:
```typescript
'http://localhost:3000/api/...'
```
with:
```typescript
'https://your-backend-url.onrender.com/api/...'
```

### Option 2: Deploy Backend to Railway (Free)

1. Go to: https://railway.app/
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables from `backend/.env`
6. Deploy!

---

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based login
2. **Password Protection**: Only admin email can access
3. **Protected Routes**: All admin routes require authentication
4. **Secure API**: CRUD operations need valid token
5. **Environment Variables**: Sensitive data in .env files

---

## 📊 SKU Code System

Products are auto-assigned SKU codes based on category:

| Category | Prefix | Example |
|----------|--------|---------|
| Bed Sets | BS | BS01, BS02 |
| Single Sofas | SS | SS01, SS02 |
| Sofa Sets | SF | SF01, SF02 |
| Dressing Tables | DT | DT01, DT02 |
| Tables | TB | TB01, TB02 |
| Bedside Tables | BT | BT01, BT02 |
| Consoles | CS | CS01, CS02 |
| Racks | RK | RK01, RK02 |
| Decor | DC | DC01, DC02 |
| Office | OF | OF01, OF02 |
| Wardrobes | WR | WR01, WR02 |

---

## 🐛 Troubleshooting

### Backend won't start:
```bash
cd backend
npm install
npm start
```

### Can't login:
- Check email: `tfgallery0@gmail.com`
- Check password: `TFG@2026Secure`
- Ensure backend is running

### Images not uploading:
- Check Cloudinary credentials in `backend/.env`
- Ensure internet connection
- Check browser console for errors

### Products not showing:
- Check MongoDB connection in backend logs
- Ensure products are added via admin panel
- Check browser console for API errors

---

## 📞 Support

For issues or questions:
- Check backend logs in terminal
- Check browser console (F12)
- Ensure all environment variables are set
- Verify MongoDB Atlas and Cloudinary accounts are active

---

## 🎓 How It Works

### When you add a product:

1. You upload images → Cloudinary stores them
2. Cloudinary returns image URLs
3. Product data + image URLs → MongoDB
4. Frontend fetches from MongoDB → Shows on website

### Security Flow:

1. Admin login → Backend verifies credentials
2. Backend generates JWT token
3. Token stored in browser
4. Every admin action sends token
5. Backend verifies token → Allows/Denies

---

## ✨ Features

### For You (Admin):
- Add products in seconds
- Drag & drop images
- Auto-generate SKU codes
- Edit any product anytime
- Delete products
- Mark products as "Featured"

### For Customers:
- Browse all products
- Search by name or SKU
- Add to cart/wishlist
- Submit order inquiries
- No prices (Made to Order)

---

## 🔄 Next Steps

1. **Test the admin panel** - Add/edit/delete products
2. **Deploy backend** - Follow deployment guide above
3. **Update API URLs** - Point frontend to deployed backend
4. **Change admin password** - Update in `backend/.env`
5. **Share with client** - Give them login credentials

---

## 📝 Notes

- Backend must be running for admin panel to work
- Free MongoDB tier: 512MB storage
- Free Cloudinary tier: 25GB storage, 25GB bandwidth/month
- Free Render/Railway tier: May sleep after inactivity (wake on request)

---

**Your admin panel is ready! Start adding products!** 🚀
