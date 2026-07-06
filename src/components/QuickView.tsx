import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../utils/currency';
import type { Product } from '../types';
import './QuickView.css';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const prevImg = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setActiveImg(i => (i + 1) % product.images.length);

  return (
    <>
      <div className="quickview-overlay" onClick={onClose} />
      <div className="quickview" role="dialog" aria-modal="true" aria-label={product.name}>
        <button className="quickview__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="quickview__content">
          {/* Images */}
          <div className="quickview__gallery">
            <div className="quickview__main-img">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';
                }}
              />
              {product.images.length > 1 && (
                <>
                  <button className="quickview__nav quickview__nav--prev" onClick={prevImg} aria-label="Previous image">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="quickview__nav quickview__nav--next" onClick={nextImg} aria-label="Next image">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <div className="quickview__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`quickview__thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="quickview__info">
            <p className="quickview__category">{product.category}</p>
            <h2 className="quickview__name">{product.name}</h2>
            <p className="quickview__sku">SKU: {product.sku}</p>

            <div className="quickview__price">
              <span className="quickview__made-to-order">Made to Order</span>
            </div>

            <p className="quickview__desc">{product.description}</p>

            <div className="quickview__meta">
              <div><strong>Material:</strong> {product.material}</div>
              <div><strong>Dimensions:</strong> {product.dimensions}</div>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="quickview__colors">
                <p>Colors</p>
                <div className="quickview__color-swatches">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className="quickview__color-swatch"
                      style={{ background: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="quickview__qty">
              <p>Quantity</p>
              <div className="quickview__qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Increase">+</button>
              </div>
            </div>

            <div className="quickview__actions">
              <button
                className="btn-primary quickview__add-btn"
                onClick={() => { addToCart(product, qty); onClose(); }}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                className={`quickview__wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link to={`/product/${product.id}`} className="quickview__full-link" onClick={onClose}>
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
