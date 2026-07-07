import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as localProducts, categories, MATERIALS } from '../data/products';
import { toPKR } from '../utils/currency';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import QuickView from '../components/QuickView';
import type { Product, FilterState, SortOption } from '../types';
import './Shop.css';

const PRICE_MAX = 250000;
const API_URL = 'http://localhost:3000/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || '',
    materials: [],
    sortBy: 'popular',
    search: searchParams.get('search') || '',
  });

  // Fetch products from backend API and merge with local products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          setApiProducts(data);
        }
      } catch (error) {
        console.error('Error fetching API products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Also stop loading after a brief moment for local products
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Merge local products with API products (API products take precedence if same ID)
  const allProducts = useMemo(() => {
    const merged = [...localProducts];
    
    // Add API products that don't exist in local products
    apiProducts.forEach(apiProduct => {
      const existingIndex = merged.findIndex(p => p.id === apiProduct.id);
      if (existingIndex >= 0) {
        // Replace with API version if exists
        merged[existingIndex] = apiProduct;
      } else {
        // Add new product from API
        merged.push(apiProduct);
      }
    });
    
    return merged;
  }, [apiProducts]);

  // Sync URL params to filters
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    setFilters(f => ({ ...f, category: cat, search }));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.category) {
      result = result.filter(p => p.category === filters.category || p.categorySlug === filters.category);
    }
    if (filters.search) {
      let q = filters.search.toLowerCase();
      // Strip "sku:" prefix if present to allow searching "SKU: BS01" or "sku: bs01"
      q = q.replace(/^sku:\s*/i, '');
      
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.includes(q)))
      );
    }

    if (filters.materials.length > 0) {
      result = result.filter(p =>
        p.material && filters.materials.some(m => p.material.toLowerCase().includes(m.toLowerCase()))
      );
    }

    switch (filters.sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [filters, allProducts]);

  const updateCategory = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) newParams.set('category', slug);
    else newParams.delete('category');
    setSearchParams(newParams);
    setFilters(f => ({ ...f, category: slug }));
  };

  const toggleMaterial = (mat: string) => {
    setFilters(f => ({
      ...f,
      materials: f.materials.includes(mat)
        ? f.materials.filter(m => m !== mat)
        : [...f.materials, mat],
    }));
  };

  const clearFilters = () => {
    setFilters({ category: '', materials: [], sortBy: 'popular', search: '' });
    setSearchParams({});
  };

  const activeFilterCount = (filters.category ? 1 : 0) +
    (filters.materials.length) +
    (filters.search ? 1 : 0);

  const currentCategory = categories.find(c => c.slug === filters.category);

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="container">
          <nav className="shop-header__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            {currentCategory && (
              <>
                <span>/</span>
                <span>{currentCategory.name}</span>
              </>
            )}
          </nav>
          <h1 className="shop-header__title">
            {currentCategory?.name || 'All Products'}
          </h1>
          <p className="shop-header__count">{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar */}
        <aside className={`shop-sidebar ${filtersOpen ? 'open' : ''}`}>
          <div className="shop-sidebar__header">
            <h3>Filters</h3>
            {activeFilterCount > 0 && (
              <button className="shop-sidebar__clear" onClick={clearFilters}>
                Clear all ({activeFilterCount})
              </button>
            )}
            <button className="shop-sidebar__close" onClick={() => setFiltersOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-group__title">
              Category <ChevronDown size={14} />
            </h4>
            <div className="filter-group__options">
              <button
                className={`filter-cat-btn ${!filters.category ? 'active' : ''}`}
                onClick={() => updateCategory('')}
              >
                All Products
                <span>{allProducts.length}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  className={`filter-cat-btn ${filters.category === cat.slug ? 'active' : ''}`}
                  onClick={() => updateCategory(cat.slug)}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span>{allProducts.filter(p => p.categorySlug === cat.slug).length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="filter-group">
            <h4 className="filter-group__title">
              Material <ChevronDown size={14} />
            </h4>
            <div className="filter-group__checkboxes">
              {MATERIALS.map(mat => (
                <label key={mat} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                  />
                  <span className="filter-checkbox__box" />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {filtersOpen && (
          <div className="shop-sidebar-overlay" onClick={() => setFiltersOpen(false)} />
        )}

        {/* Main Content */}
        <main className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <button
              className="shop-toolbar__filter-btn"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && <span className="shop-toolbar__filter-count">{activeFilterCount}</span>}
            </button>

            {/* Active filter tags */}
            <div className="shop-toolbar__tags">
              {filters.search && (
                <span className="filter-tag">
                  "{filters.search}"
                  <button onClick={() => setFilters(f => ({ ...f, search: '' }))}><X size={12} /></button>
                </span>
              )}
              {filters.category && (
                <span className="filter-tag">
                  {currentCategory?.name}
                  <button onClick={() => updateCategory('')}><X size={12} /></button>
                </span>
              )}
              {filters.materials.map(m => (
                <span key={m} className="filter-tag">
                  {m}
                  <button onClick={() => toggleMaterial(m)}><X size={12} /></button>
                </span>
              ))}
            </div>

            <div className="shop-toolbar__right">
              <select
                value={filters.sortBy}
                onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value as SortOption }))}
                className="shop-toolbar__sort"
                aria-label="Sort products"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
              </select>

              <div className="shop-toolbar__view">
                <button
                  className={gridView === 'grid' ? 'active' : ''}
                  onClick={() => setGridView('grid')}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  className={gridView === 'list' ? 'active' : ''}
                  onClick={() => setGridView('list')}
                  aria-label="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className={`shop-products-grid ${gridView === 'list' ? 'shop-products-grid--list' : ''}`}>
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="shop-empty">
              <span>🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filters.category}-${filters.sortBy}-${gridView}`}
                className={`shop-products-grid ${gridView === 'list' ? 'shop-products-grid--list' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <ProductCard product={product} onQuickView={setQuickViewProduct} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

