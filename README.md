# The Furniture Gallery - Website

A modern, responsive furniture e-commerce website built for The Furniture Gallery (TFG), Karachi, Pakistan.

## 🏢 About

The Furniture Gallery is a trusted furniture business located at Seher Commercial in Karachi. This website serves as a digital catalog and inquiry platform for customers to browse products and request custom quotes.

## ✨ Features

### Business Model
- **Made-to-Order**: All furniture is custom-made according to customer requirements
- **Contact-Based Pricing**: Customers contact for personalized quotes
- **Custom Orders**: Support for customization requests and specifications

### Core Features
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Framer Motion animations
- 🛍️ Product catalog with categories and filtering
- 🔍 Search functionality
- ❤️ Wishlist system
- 🛒 Selection cart (inquiry-based, not checkout)
- 📸 Image galleries and lookbook
- 📞 Multiple contact methods (Phone, WhatsApp, Contact Form)
- 🌙 Dark mode support

### Product Categories
- Beds & Bedroom Sets
- Sofa Sets
- Single Sofas
- Bedside Tables
- Dressing Tables & Storage
- Dining Tables
- Office Furniture
- Chairs
- Consoles & Racks
- Decor Items

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: CSS Modules
- **State Management**: React Context API

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── context/          # React Context (App state, cart, wishlist)
├── data/             # Product data and categories
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── styles/           # Global styles and animations
```

## 📞 Contact Information

**The Furniture Gallery**
- 📍 Location: Seher Commercial, Karachi, Pakistan 72500
- 📱 Phone: 0321 8991429
- 📧 Email: tfgallery0@gmail.com
- 🌐 WhatsApp: +923218991429
- 📘 Facebook: [thefurnituregallerykarachi](https://www.facebook.com/thefurnituregallerykarachi/)
- 📷 Instagram: [thefurnituregallerykarachi](https://www.instagram.com/thefurnituregallerykarachi/)

## 🎯 Key Business Features

### No Direct Pricing
- Products display "Made to Order" instead of prices
- Customers contact for personalized quotes
- Supports custom requirements and variations

### Payment Process
- 50% advance payment
- 50% cash on delivery
- Payment arranged after quote confirmation

### Delivery
- Professional delivery in Karachi
- Nationwide delivery available
- Charges vary by location and distance
- Contact for delivery quotes

### Product Information
- High-quality product images
- Detailed descriptions
- Material and dimension specifications
- Availability: All items "On Order"

## 📧 Contact Form Setup

The contact form uses **Formspree** to send inquiries directly to the client's email.

### Setup Steps:

**For Client (5 minutes):**
1. Go to https://formspree.io/ and sign up with **tfgallery0@gmail.com**
2. Click "New Form" and name it "The Furniture Gallery Contact Form"
3. Copy the form ID (example: `xanyolwp`)
4. Send you the form ID

**For Developer (30 seconds):**
1. Open the `.env` file in project root
2. Replace `your_form_id_here` with the client's form ID:
   ```
   VITE_FORMSPREE_FORM_ID=xanyolwp
   ```
3. Rebuild: `npm run build`
4. Done! ✅

**What You Need:**
- ✅ Just the Formspree form ID from client
- ❌ No email password or account access needed

**Files:**
- `.env` - Configuration file (NOT in git)
- `.env.example` - Template (in git)

## 🚀 Deployment

### Build & Deploy:
```bash
npm run build
```
Build output is in the `dist/` folder.

### Platform Configuration:

**For Netlify / Vercel / GitHub Pages:**
1. Add environment variable in platform dashboard
2. Variable name: `VITE_FORMSPREE_FORM_ID`
3. Variable value: `the_form_id_from_client`

### Supported Platforms:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📝 Notes

- All products are custom-made to order
- No online checkout or payment processing
- Inquiry-based system with contact for quotes
- Optimized for Pakistani market
- Mobile-first responsive design

## 👨‍💻 Development

**Design & Development**: [Pioneer Developer](https://pioneerdeveloper.com/)
**Year**: 2026

## 📄 License

Proprietary - The Furniture Gallery © 2026

---

For support or inquiries, contact The Furniture Gallery at 0321 8991429 or tfgallery0@gmail.com
