import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { toPKR } from '../utils/currency';
import './Cart.css';

const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  TFG20: 20,
  FURNITURE15: 15,
};

export default function Cart() {
  const { state, dispatch, cartTotal, removeFromCart } = useApp();
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const pkrTotal = toPKR(cartTotal);
  const discountAmount = appliedPromo ? Math.round(pkrTotal * appliedPromo.discount / 100) : 0;
  const discountedTotal = pkrTotal - discountAmount;
  const shipping = discountedTotal >= 50000 ? 0 : 500;
  const tax = Math.round(discountedTotal * 0.17);
  const total = discountedTotal + shipping + tax;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, discount: PROMO_CODES[code] });
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10, TFG20, or FURNITURE15.');
      setAppliedPromo(null);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cart-empty-page__content"
        >
          <ShoppingBag size={64} strokeWidth={1} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Explore our beautiful furniture collection.</p>
          <Link to="/shop" className="btn-primary">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">Your Selections</h1>
        <p className="cart-page__count">{state.cart.reduce((s, i) => s + i.quantity, 0)} items selected</p>
        
        <div className="cart-page__inquiry-notice">
          <h3>📋 Products are Made to Order</h3>
          <p>All our furniture is custom-made according to your requirements. Please contact us with your selections to get a personalized quote and discuss customization options.</p>
          <div className="cart-page__inquiry-actions">
            <a href="tel:+923218991429" className="btn-primary">Call for Quote</a>
            <a href="https://wa.me/923218991429" target="_blank" rel="noopener noreferrer" className="btn-outline"><span>WhatsApp Us</span></a>
          </div>
        </div>

        <div className="cart-page__layout">
          {/* Items */}
          <div className="cart-page__items">
            <div className="cart-page__items-header">
              <span>Product</span>
              <span>Quantity</span>
            </div>

            <AnimatePresence>
              {state.cart.map(item => (
                <motion.div
                  key={item.product.id}
                  className="cart-page__item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="cart-page__item-product">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={e => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80';
                        }}
                      />
                    </Link>
                    <div className="cart-page__item-info">
                      <Link to={`/product/${item.product.id}`}>
                        <h3>{item.product.name}</h3>
                      </Link>
                      <p className="cart-page__item-sku">SKU: {item.product.sku}</p>
                      <p>{item.product.category}</p>
                      <p className="cart-page__item-material">{item.product.material}</p>
                      {item.selectedColor && (
                        <span
                          className="cart-page__item-color"
                          style={{ background: item.selectedColor }}
                          title={`Color: ${item.selectedColor}`}
                        />
                      )}
                      <button
                        className="cart-page__item-remove"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-page__item-qty">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity - 1 } })}
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity + 1 } })}
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="cart-page__actions">
              <Link to="/shop" className="btn-outline">
                ← Continue Shopping
              </Link>
              <button
                className="cart-page__clear"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-page__summary">
            <h2>Next Steps</h2>
            
            <div className="cart-page__contact-info">
              <p>Ready to place your order? Our team will provide you with:</p>
              <ul>
                <li>✓ Personalized pricing quote</li>
                <li>✓ Customization options</li>
                <li>✓ Production timeline</li>
                <li>✓ Delivery details</li>
              </ul>
            </div>

            <div className="cart-page__contact-buttons">
              <a href="tel:+923218991429" className="btn-primary">
                📞 Call Us
              </a>
              <a href="https://wa.me/923218991429" target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 WhatsApp
              </a>
            </div>

            <Link to="/checkout" className="btn-outline cart-page__contact-form-btn">
              <span>Fill Order Inquiry Form</span>
            </Link>

            <div className="cart-page__secure">
              🔒 Secure checkout — SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Truck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}
