import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPKR } from '../utils/currency';
import './CartDrawer.css';

export default function CartDrawer() {
  const { state, dispatch, cartTotal, removeFromCart } = useApp();

  useEffect(() => {
    if (state.isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state.isCartOpen]);

  if (!state.isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={20} />
            <span>Your Cart</span>
            {state.cart.length > 0 && (
              <span className="cart-drawer__count">{state.cart.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button
            className="cart-drawer__close"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {state.cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <h3>Your cart is empty</h3>
            <p>Discover our beautiful furniture collection</p>
            <Link
              to="/shop"
              className="btn-primary"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {state.cart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="cart-item__img"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80';
                    }}
                  />
                  <div className="cart-item__info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item__sku">SKU: {item.product.sku}</p>
                    <p className="cart-item__category">{item.product.category}</p>
                    {item.selectedColor && (
                      <span
                        className="cart-item__color"
                        style={{ background: item.selectedColor }}
                      />
                    )}
                    <div className="cart-item__bottom">
                      <div className="cart-item__qty">
                        <button
                          onClick={() => dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.product.id, quantity: item.quantity - 1 }
                          })}
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.product.id, quantity: item.quantity + 1 }
                          })}
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-item__made-to-order-badge">Made to Order</span>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span className="cart-drawer__made-to-order">Made to Order</span>
              </div>
              <p className="cart-drawer__shipping">Contact us for pricing and customization</p>
              <Link
                to="/checkout"
                className="btn-primary cart-drawer__checkout"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                className="cart-drawer__view-cart"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
