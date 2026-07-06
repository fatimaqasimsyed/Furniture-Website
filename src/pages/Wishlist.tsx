import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../utils/currency';
import './Wishlist.css';

export default function Wishlist() {
  const { state, toggleWishlist, addToCart } = useApp();

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-page__header">
          <h1>My Wishlist</h1>
          <p>{state.wishlist.length} {state.wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        {state.wishlist.length === 0 ? (
          <motion.div
            className="wishlist-empty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart size={64} strokeWidth={1} />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by clicking the heart icon on any product.</p>
            <Link to="/shop" className="btn-primary">Explore Products</Link>
          </motion.div>
        ) : (
          <div className="wishlist-grid">
            <AnimatePresence>
              {state.wishlist.map(({ product }) => (
                <motion.div
                  key={product.id}
                  className="wishlist-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <Link to={`/product/${product.id}`} className="wishlist-card__img">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';
                      }}
                    />
                    {product.badge && (
                      <span className={`wishlist-card__badge wishlist-card__badge--${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                    )}
                  </Link>
                  <div className="wishlist-card__info">
                    <p className="wishlist-card__category">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3>{product.name}</h3>
                    </Link>
                    <p className="wishlist-card__sku">SKU: {product.sku}</p>
                    <p className="wishlist-card__material">{product.material}</p>
                    <div className="wishlist-card__price-row">
                      <span className="wishlist-card__made-to-order">Made to Order</span>
                    </div>
                    <div className="wishlist-card__actions">
                      <button
                        className="btn-primary wishlist-card__add"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingBag size={16} /> Add to Cart
                      </button>
                      <button
                        className="wishlist-card__remove"
                        onClick={() => toggleWishlist(product)}
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
