import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../utils/currency';
import type { Product } from '../types';
import './ProductCard.css';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const imgSrc = imgError
    ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop'
    : product.images[hovered && product.images[1] ? 1 : 0];

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="product-card__img-wrap">
        {!imgLoaded && <div className="skeleton product-card__skeleton" />}
        <img
          src={imgSrc}
          alt={product.name}
          className={`product-card__img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card__badges">
          {product.badge && (
            <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase()}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="product-card__hover-actions">
          <button
            className={`product-card__wishlist ${inWishlist ? 'active' : ''}`}
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          {onQuickView && (
            <button
              className="product-card__quickview"
              onClick={e => { e.preventDefault(); onQuickView(product); }}
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          )}
        </div>

        {/* Add to Cart Overlay */}
        <button
          className="product-card__add-overlay"
          onClick={e => { e.preventDefault(); addToCart(product); }}
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <Link to={`/product/${product.id}`} className="product-card__info">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__sku">SKU: {product.sku}</p>
        <div className="product-card__price-row">
          <span className="product-card__made-to-order">Made to Order</span>
        </div>
      </Link>
    </div>
  );
}
