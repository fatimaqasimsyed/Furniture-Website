import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        'Beds',
        'Single Sofas',
        'Sofa Sets',
        'Tables',
        'Bedside Tables',
        'Consoles',
        'Racks',
        'Decor',
        'Office',
        'Storage'
      ]]
    }
  },
  categorySlug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  material: {
    type: DataTypes.STRING,
    defaultValue: 'Premium Quality Materials'
  },
  dimensions: {
    type: DataTypes.STRING,
    defaultValue: 'Custom Sizes Available'
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  badge: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['New', 'Bestseller', 'Limited', null, '']]
    },
    defaultValue: 'New'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'products',
  timestamps: true
});

export default Product;
