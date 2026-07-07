import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Image as ImageIcon, X } from 'lucide-react';
import './AdminDashboard.css';

interface Product {
  _id: string;
  id: string;
  sku: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  featured: boolean;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'Beds', 'Single Sofas', 'Sofa Sets', 'Tables',
    'Bedside Tables', 'Consoles', 'Racks', 'Decor', 'Office', 'Storage'
  ];

  const [formData, setFormData] = useState({
    id: '',
    sku: '',
    name: '',
    category: categories[0],
    image: '',
    images: [''],
    description: '',
    featured: false
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://furniture-website-production.up.railway.app/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin');
  };

  const generateSKU = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://furniture-website-production.up.railway.app/api/products/generate-sku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ category: formData.category })
      });
      const data = await response.json();
      setFormData({ ...formData, sku: data.sku, id: data.sku.toLowerCase() });
    } catch (error) {
      console.error('Error generating SKU:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch('https://furniture-website-production.up.railway.app/api/products/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      const data = await response.json();
      
      if (data.success) {
        if (index !== undefined) {
          const newImages = [...formData.images];
          newImages[index] = data.url;
          setFormData({ ...formData, images: newImages });
        } else {
          setFormData({ ...formData, image: data.url, images: [data.url, ...formData.images.slice(1)] });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingProduct 
        ? `https://furniture-website-production.up.railway.app/api/products/${editingProduct.id}`
        : 'https://furniture-website-production.up.railway.app/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter(img => img !== '')
        })
      });

      if (response.ok) {
        setShowAddModal(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://furniture-website-production.up.railway.app/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category,
      image: product.image,
      images: product.images.length > 0 ? product.images : [''],
      description: product.description,
      featured: product.featured
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      sku: '',
      name: '',
      category: categories[0],
      image: '',
      images: [''],
      description: '',
      featured: false
    });
  };

  const addImageSlot = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>TFG Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="content-header">
          <h2>Products ({products.length})</h2>
          <button 
            onClick={() => { resetForm(); setShowAddModal(true); setEditingProduct(null); }} 
            className="btn-add"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card-admin">
              <div className="product-image-admin">
                <img src={product.image} alt={product.name} />
                {product.featured && <span className="badge-featured">Featured</span>}
              </div>
              <div className="product-info-admin">
                <span className="product-sku">{product.sku}</span>
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-desc">{product.description.substring(0, 80)}...</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEdit(product)} className="btn-edit">
                  <Edit2 size={16} />
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="btn-delete">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setEditingProduct(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="btn-close">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>SKU Code *</label>
                  <div className="sku-input">
                    <input 
                      type="text" 
                      value={formData.sku} 
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="BS01"
                      required
                      disabled={editingProduct !== null}
                    />
                    {!editingProduct && (
                      <button type="button" onClick={generateSKU} className="btn-generate">
                        Auto
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Luxury King Bed"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the product..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label>Main Image * {uploading && <span className="uploading-text">Uploading...</span>}</label>
                <div className="image-upload-box">
                  {formData.image ? (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" />
                      <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="btn-remove-image">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="upload-label">
                      <ImageIcon size={32} />
                      <span>Click to upload main image</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Additional Images</label>
                <div className="additional-images">
                  {formData.images.slice(1).map((img, idx) => (
                    <div key={idx} className="image-upload-box-small">
                      {img ? (
                        <div className="image-preview-small">
                          <img src={img} alt={`Additional ${idx + 1}`} />
                          <button 
                            type="button" 
                            onClick={() => {
                              const newImages = [...formData.images];
                              newImages[idx + 1] = '';
                              setFormData({ ...formData, images: newImages });
                            }} 
                            className="btn-remove-image-small"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="upload-label-small">
                          <ImageIcon size={20} />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, idx + 1)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addImageSlot} className="btn-add-image-slot">
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Feature this product on homepage</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={uploading || !formData.image}>
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
