import express from 'express';
import Product from '../models/Product.js';
import { authenticateAdmin } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
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

    // Check if product with same ID or SKU exists
    const existing = await Product.findOne({ $or: [{ sku }] });
    if (existing) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    // Generate categorySlug from category
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    
    // Generate numeric ID
    const numericId = Date.now();

    const product = new Product({
      id: numericId,
      sku,
      name,
      price: 0,
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

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Update product (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, image, images, description, featured, sku } = req.body;

    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (image) product.image = image;
    if (images) product.images = images;
    if (description) product.description = description;
    if (typeof featured !== 'undefined') product.featured = featured;
    if (sku) product.sku = sku;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Optionally delete images from Cloudinary here
    // This requires storing Cloudinary public IDs in the database

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

    // Category prefix mapping
    const prefixes = {
      'Bed Sets': 'BS',
      'Single Sofas': 'SS',
      'Sofa Sets': 'SF',
      'Dressing Tables': 'DT',
      'Tables': 'TB',
      'Bedside Tables': 'BT',
      'Consoles': 'CS',
      'Racks': 'RK',
      'Decor': 'DC',
      'Office': 'OF',
      'Wardrobes': 'WR'
    };

    const prefix = prefixes[category];
    if (!prefix) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Find the highest number for this prefix
    const products = await Product.find({ sku: new RegExp(`^${prefix}`) }).sort({ sku: -1 }).limit(1);
    
    let nextNumber = 1;
    if (products.length > 0) {
      const lastSku = products[0].sku;
      const lastNumber = parseInt(lastSku.replace(prefix, ''));
      nextNumber = lastNumber + 1;
    }

    const sku = `${prefix}${String(nextNumber).padStart(2, '0')}`;
    res.json({ sku });
  } catch (error) {
    console.error('Error generating SKU:', error);
    res.status(500).json({ message: 'Failed to generate SKU' });
  }
});

export default router;
