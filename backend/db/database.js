import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'products.json');

// Ensure database file exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '[]', 'utf8');
}

// Read all products
export const getAllProducts = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

// Get single product by ID
export const getProductById = (id) => {
  const products = getAllProducts();
  return products.find(p => p.id === id);
};

// Create product
export const createProduct = (productData) => {
  const products = getAllProducts();
  
  // Check if product with same ID or SKU exists
  const exists = products.some(p => p.id === productData.id || p.sku === productData.sku);
  if (exists) {
    throw new Error('Product with this ID or SKU already exists');
  }
  
  const newProduct = {
    ...productData,
    _id: Date.now().toString(), // Generate unique ID
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  products.push(newProduct);
  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf8');
  
  return newProduct;
};

// Update product
export const updateProduct = (id, updates) => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date()
  };
  
  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf8');
  
  return products[index];
};

// Delete product
export const deleteProduct = (id) => {
  const products = getAllProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) {
    return false; // Product not found
  }
  
  fs.writeFileSync(dbPath, JSON.stringify(filtered, null, 2), 'utf8');
  return true;
};

// Generate SKU
export const generateSKU = (category) => {
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
    throw new Error('Invalid category');
  }
  
  const products = getAllProducts();
  
  // Find all SKUs that start with this prefix
  const categorySkus = products
    .filter(p => p.sku && p.sku.startsWith(prefix))
    .map(p => {
      const num = parseInt(p.sku.replace(prefix, ''));
      return isNaN(num) ? 0 : num;
    });
  
  // Find the highest number
  let nextNumber = 1;
  if (categorySkus.length > 0) {
    nextNumber = Math.max(...categorySkus) + 1;
  }
  
  return `${prefix}${String(nextNumber).padStart(2, '0')}`;
};

console.log('✅ Local JSON database initialized');
