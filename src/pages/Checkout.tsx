import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Checkout.css';

export default function Checkout() {
  const { state } = useApp();

  // Redirect to cart if empty
  if (state.cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before proceeding.</p>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-inquiry">
          <CheckCircle size={64} className="checkout-inquiry__icon" />
          <h1>Ready to Order?</h1>
          <p className="checkout-inquiry__desc">
            All our furniture is custom-made to order. To proceed with your purchase, 
            please contact us directly. Our team will provide you with a personalized quote, 
            discuss customization options, and arrange payment and delivery details.
          </p>
          
          <div className="checkout-inquiry__items">
            <h3>Your Selected Items ({state.cart.length})</h3>
            <div className="checkout-inquiry__items-list">
              {state.cart.map(item => (
                <div key={item.product.id} className="checkout-inquiry__item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div>
                    <h4>{item.product.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="checkout-inquiry__actions">
            <a href="tel:+923218991429" className="btn-primary">📞 Call Us Now</a>
            <a href="https://wa.me/923218991429" target="_blank" rel="noopener noreferrer" className="btn-primary">💬 WhatsApp</a>
            <Link to="/contact" className="btn-outline"><span>Contact Form</span></Link>
          </div>
          
          <Link to="/cart" className="checkout-inquiry__back">← Back to Cart</Link>
        </div>
      </div>
    </div>
  );
}
