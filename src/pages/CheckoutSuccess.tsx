import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Phone, MessageCircle, Mail, Copy, Package } from 'lucide-react';
import { useState } from 'react';
import './Checkout.css';

export default function CheckoutSuccess() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Redirect if no order data
  if (!location.state) {
    return <Navigate to="/cart" replace />;
  }

  const { orderRef, formData, products, productNotes, whatsappMessage } = location.state;

  // Copy order reference
  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/923218991429?text=${whatsappMessage}`;

  return (
    <div className="checkout-success-page">
      <div className="container">
        <div className="checkout-success-content">
          {/* Success Icon and Header */}
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Order Inquiry Submitted Successfully!</h1>
            <p className="success-subtitle">Thank you for choosing The Furniture Gallery</p>
          </div>

          {/* Order Reference */}
          <div className="order-reference-card">
            <span className="order-reference-label">Your Order Reference</span>
            <div className="order-reference-number">
              <span>{orderRef}</span>
              <button 
                onClick={copyOrderRef} 
                className="copy-btn"
                title="Copy reference number"
              >
                <Copy size={18} />
                {copied && <span className="copied-tooltip">Copied!</span>}
              </button>
            </div>
            <p className="order-reference-note">Please save this reference number for future communication</p>
          </div>

          {/* Customer Details Summary */}
          <div className="success-section">
            <h3>Your Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{formData.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{formData.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{formData.city}</span>
              </div>
            </div>
          </div>

          {/* Products Summary */}
          <div className="success-section">
            <h3>
              <Package size={20} />
              Your Selected Items ({products.length})
            </h3>
            <div className="success-products-list">
              {products.map((item: any) => (
                <div key={item.product.id} className="success-product-item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="success-product-info">
                    <h4>{item.product.name}</h4>
                    <p className="product-sku-display">SKU: {item.product.sku}</p>
                    <p>Quantity: {item.quantity}</p>
                    {productNotes[item.product.id] && (
                      <p className="product-note-display">
                        Note: {productNotes[item.product.id]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="success-section next-steps-section">
            <h3>What Happens Next?</h3>
            <div className="next-steps-timeline">
              <div className="timeline-item">
                <div className="timeline-number">1</div>
                <div className="timeline-content">
                  <h4>We Review Your Inquiry</h4>
                  <p>Our team will review your order within 24 hours</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-number">2</div>
                <div className="timeline-content">
                  <h4>You Receive a Quote</h4>
                  <p>We'll contact you with a detailed quote including delivery charges to {formData.city}</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-number">3</div>
                <div className="timeline-content">
                  <h4>50% Advance Payment</h4>
                  <p>Once approved, 50% advance payment starts production</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-number">4</div>
                <div className="timeline-content">
                  <h4>Delivery with 50% COD</h4>
                  <p>Your furniture is delivered with remaining 50% payment on delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="success-section contact-options-section">
            <h3>Need Immediate Assistance?</h3>
            <p className="contact-intro">You can also reach us directly through:</p>
            
            <div className="quick-contact-buttons">
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary contact-btn whatsapp-btn"
              >
                <MessageCircle size={20} />
                WhatsApp (Pre-filled Message)
              </a>
              
              <a 
                href="tel:+923218991429" 
                className="btn-outline contact-btn phone-btn"
              >
                <Phone size={20} />
                <span>Call Now: 0321 8991429</span>
              </a>
              
              <a 
                href="mailto:tfgallery0@gmail.com" 
                className="btn-outline contact-btn email-btn"
              >
                <Mail size={20} />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="success-actions">
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline">
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Email Confirmation Note */}
          <div className="email-confirmation-note">
            <Mail size={16} />
            <p>
              A confirmation email has been sent to <strong>{formData.email}</strong> with all your order details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
