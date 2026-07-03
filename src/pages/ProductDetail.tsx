import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Share2, Truck, RefreshCw, Shield, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { formatPKR, toPKR } from '../utils/currency';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast, addRecentlyViewed, state } = useApp();

  const product = products.find(p => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImg(0);
    setQty(1);
    if (product) {
      addRecentlyViewed(product);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const getImgSrc = (index: number) =>
    imgErrors[index]
      ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop'
      : product.images[index];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'info');
  };

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.categorySlug}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail__grid">
          {/* Gallery */}
          <div className="product-detail__gallery">
            <div className="product-detail__thumbs">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`product-detail__thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={getImgSrc(i)}
                    alt=""
                    onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
                  />
                </button>
              ))}
            </div>

            <div className="product-detail__main-img">
              <motion.img
                key={activeImg}
                src={getImgSrc(activeImg)}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onError={() => setImgErrors(e => ({ ...e, [activeImg]: true }))}
              />

              {product.badge && (
                <span className={`product-detail__badge product-detail__badge--${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}

              <button
                className="product-detail__nav product-detail__nav--prev"
                onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="product-detail__nav product-detail__nav--next"
                onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="product-detail__info">
            <p className="product-detail__category">{product.category}</p>
            <h1 className="product-detail__name">{product.name}</h1>

            {/* Price */}
            <div className="product-detail__price-row">
              <span className="product-detail__made-to-order">Made to Order</span>
              <p className="product-detail__contact-note">Contact us for pricing and customization options</p>
            </div>

            <p className="product-detail__desc">{product.description}</p>

            {/* Specs */}
            <div className="product-detail__specs">
              <div className="product-detail__spec">
                <span>Material</span>
                <strong>{product.material}</strong>
              </div>
              <div className="product-detail__spec">
                <span>Dimensions</span>
                <strong>{product.dimensions}</strong>
              </div>
              <div className="product-detail__spec">
                <span>Availability</span>
                <strong className="on-order">
                  ✓ On Order
                </strong>
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-detail__colors">
                <p>Color: <strong>{selectedColor}</strong></p>
                <div className="product-detail__color-swatches">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`product-detail__color-swatch ${selectedColor === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-detail__qty-row">
              <div className="product-detail__qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-detail__actions">
              <button
                className="btn-primary product-detail__add-btn"
                onClick={() => addToCart(product, qty, selectedColor)}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                className={`product-detail__wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button
                className="product-detail__share-btn"
                onClick={handleShare}
                aria-label="Share product"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="product-detail__tags">
                {product.tags.map(tag => (
                  <span key={tag} className="product-detail__tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="product-detail__related">
            <h2>You May Also Like</h2>
            <div className="product-detail__related-grid">
              {related.map((p: Product) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {(() => {
          const recentlyViewed = state.recentlyViewed.filter(p => p.id !== product.id).slice(0, 4);
          return recentlyViewed.length > 0 ? (
            <section className="product-detail__related">
              <h2>Recently Viewed</h2>
              <div className="product-detail__related-grid">
                {recentlyViewed.map((p: Product) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : null;
        })()}
      </div>
    </div>
  );
}
