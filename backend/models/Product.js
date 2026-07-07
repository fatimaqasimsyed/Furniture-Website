import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Bed Sets',
      'Single Sofas',
      'Sofa Sets',
      'Dressing Tables',
      'Tables',
      'Bedside Tables',
      'Consoles',
      'Racks',
      'Decor',
      'Office',
      'Wardrobes'
    ]
  },
  categorySlug: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  material: {
    type: String,
    default: 'Premium Quality Materials'
  },
  dimensions: {
    type: String,
    default: 'Custom Sizes Available'
  },
  rating: {
    type: Number,
    default: 5.0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  badge: {
    type: String,
    enum: ['New', 'Bestseller', 'Limited', null],
    default: 'New'
  },
  tags: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Product', productSchema);
