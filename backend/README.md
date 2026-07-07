# TFG Backend API

Backend API for The Furniture Gallery admin panel.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

## Running Locally

```bash
npm start
```

Server will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Products (Admin Only - Requires Auth Token)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/upload-image` - Upload image to Cloudinary
- `POST /api/products/generate-sku` - Generate SKU code

### Health Check
- `GET /api/health` - Check server status

## Deployment

This backend can be deployed to:
- Render.com (Free tier)
- Railway.app (Free tier)
- Heroku
- DigitalOcean
- AWS/Azure/GCP

See ADMIN_SETUP_GUIDE.md for detailed deployment instructions.
