import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Share2, Truck, RefreshCw, Shield, Minus, Plus, X, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { products as localProducts } from '../data/products';
import { useApp } from '../context/AppContext';
import { formatPKR, toPKR } from '../utils/currency';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import './ProductDetail.css';

const API_URL = 'https://furniture-website-production.up.railway.app/api';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast, addRecentlyViewed, state } = useApp();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Fetch product (try API first, fallback to local)
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      // Try to find in local products first
      const localProduct = localProducts.find(p => p.id === Number(id) || p.id.toString() === id);
      
      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
        return;
      }
      
      // If not found locally, try API
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImg(0);
    setQty(1);
    if (product) {
      addRecentlyViewed(product);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-loading">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = localProducts.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const getImgSrc = (index: number) =>
    imgErrors[index]
      ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop'
      : product.images[index];

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} - The Furniture Gallery`,
      text: `Check out this ${product.category}: ${product.name} (SKU: ${product.sku})`,
      url: window.location.href
    };

    // Try native share first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share failed, show modal instead
      }
    }
    
    // Fallback to custom share modal
    setShareModalOpen(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(`${product.name} - The Furniture Gallery`);
  const shareText = encodeURIComponent(`Check out this ${product.category}: ${product.name} (SKU: ${product.sku})`);

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
            <p className="product-detail__sku">SKU: {product.sku}</p>

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

      {/* Share Modal */}
      {shareModalOpen && (
        <>
          <div className="share-modal-overlay" onClick={() => setShareModalOpen(false)} />
          <div className="share-modal">
            <div className="share-modal__header">
              <h3>Share this product</h3>
              <button 
                className="share-modal__close" 
                onClick={() => setShareModalOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="share-modal__link">
              <input 
                type="text" 
                value={window.location.href} 
                readOnly 
                onClick={(e) => e.currentTarget.select()}
              />
              <button 
                className={`share-modal__copy-btn ${linkCopied ? 'copied' : ''}`}
                onClick={copyLink}
              >
                {linkCopied ? (
                  <>
                    <CheckCircle size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="share-modal__apps">
              <h4>Share via</h4>
              <div className="share-modal__apps-grid">
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-app-btn share-app-btn--whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-app-btn share-app-btn--facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-app-btn share-app-btn--twitter"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>

                <a
                  href={`mailto:?subject=${shareTitle}&body=${shareText}%20${shareUrl}`}
                  className="share-app-btn share-app-btn--email"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email
                </a>

                <a
                  href={`https://telegram.me/share/url?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-app-btn share-app-btn--telegram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-app-btn share-app-btn--linkedin"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
