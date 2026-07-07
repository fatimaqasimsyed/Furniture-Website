import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  generateSKU
} from '../db/database.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Upload image to Cloudinary
router.post('/upload-image', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'tfg-products',
      resource_type: 'auto'
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

// Create product (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { id, sku, name, category, image, images, description, featured } = req.body;

    // Generate categorySlug from category
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    
    // Generate numeric ID
    const numericId = Date.now();

    // Create product with all required fields matching the Product type
    const product = createProduct({
      id: numericId, // Numeric ID for compatibility
      sku,
      name,
      price: 0, // Made to order - no price
      category,
      categorySlug,
      description,
      material: 'Premium Quality Materials',
      dimensions: 'Custom Sizes Available',
      rating: 5.0,
      reviewCount: 0,
      image,
      images: images && images.length > 0 ? images.filter(img => img) : [image],
      tags: [category.toLowerCase(), ...name.toLowerCase().split(' ').filter(word => word.length > 2).slice(0, 2)],
      inStock: true,
      badge: 'New',
      featured: featured || false
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message || 'Failed to create product' });
  }
});

// Update product (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, image, images, description, featured, sku } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (category) updates.category = category;
    if (image) updates.image = image;
    if (images) updates.images = images;
    if (description) updates.description = description;
    if (typeof featured !== 'undefined') updates.featured = featured;
    if (sku) updates.sku = sku;

    const product = updateProduct(req.params.id, updates);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const deleted = deleteProduct(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// Generate SKU (admin only)
router.post('/generate-sku', authenticateAdmin, async (req, res) => {
  try {
    const { category } = req.body;
    const sku = generateSKU(category);
    res.json({ sku });
  } catch (error) {
    console.error('Error generating SKU:', error);
    res.status(500).json({ message: error.message || 'Failed to generate SKU' });
  }
});

export default router;
