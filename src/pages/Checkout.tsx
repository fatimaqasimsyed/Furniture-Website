import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Phone, Mail, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Checkout.css';

export default function Checkout() {
  const { state } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    orderNotes: '',
    preferredContact: 'whatsapp'
  });

  const [productNotes, setProductNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Generate order reference
  const generateOrderRef = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = date.getTime().toString().slice(-4);
    return `TFG-${dateStr}-${timeStr}`;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle product note changes
  const handleProductNoteChange = (productId: number, note: string) => {
    setProductNotes(prev => ({ ...prev, [productId]: note }));
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = (orderRef: string) => {
    let message = `Hello! I'd like to place an order:\n\n`;
    message += `Order Reference: ${orderRef}\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `City: ${formData.city}\n\n`;
    message += `Delivery Address:\n${formData.address}\n\n`;
    message += `Products:\n`;
    
    state.cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${item.quantity}\n`;
      if (productNotes[item.product.id]) {
        message += `   Notes: ${productNotes[item.product.id]}\n`;
      }
    });
    
    if (formData.orderNotes) {
      message += `\nAdditional Notes:\n${formData.orderNotes}\n`;
    }
    
    message += `\nPlease provide a detailed quote including delivery charges to ${formData.city}.`;
    
    return encodeURIComponent(message);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderRef = generateOrderRef();

    try {
      // Submit to Web3Forms
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (accessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Order Inquiry - ${orderRef}`,
            from_name: 'The Furniture Gallery Website',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            address: formData.address,
            preferredContact: formData.preferredContact,
            orderNotes: formData.orderNotes,
            orderReference: orderRef,
            products: state.cart.map(item => ({
              sku: item.product.sku,
              name: item.product.name,
              quantity: item.quantity,
              notes: productNotes[item.product.id] || ''
            })).map((p, i) => 
              `${i + 1}. ${p.name} (SKU: ${p.sku}) - Qty: ${p.quantity}${p.notes ? `\n   Notes: ${p.notes}` : ''}`
            ).join('\n')
          })
        });
      }

      // Navigate to success page with order data
      navigate('/checkout/success', {
        state: {
          orderRef,
          formData,
          products: state.cart,
          productNotes,
          whatsappMessage: generateWhatsAppMessage(orderRef)
        }
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try contacting us directly via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-layout">
          {/* Left Side - Form */}
          <div className="checkout-form-section">
            <div className="checkout-header">
              <h1>Complete Your Order Inquiry</h1>
              <p>Fill in your details below and we'll contact you with a personalized quote within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Customer Details */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <Package size={20} />
                  Customer Information
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XX XXXXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Complete delivery address (street, area, landmarks)"
                    rows={3}
                    required
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <MessageSquare size={20} />
                  Preferred Contact Method
                </h3>
                
                <div className="contact-method-options">
                  <label className={`contact-method-option ${formData.preferredContact === 'whatsapp' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleInputChange}
                    />
                    <span className="contact-method-icon">💬</span>
                    <span className="contact-method-text">WhatsApp</span>
                  </label>

                  <label className={`contact-method-option ${formData.preferredContact === 'phone' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleInputChange}
                    />
                    <span className="contact-method-icon">📞</span>
                    <span className="contact-method-text">Phone Call</span>
                  </label>

                  <label className={`contact-method-option ${formData.preferredContact === 'email' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                    />
                    <span className="contact-method-icon">📧</span>
                    <span className="contact-method-text">Email</span>
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <Mail size={20} />
                  Additional Notes (Optional)
                </h3>
                
                <div className="form-group">
                  <label htmlFor="orderNotes">Special Requests or Customization Details</label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements, preferred delivery time, customization requests, etc."
                    rows={4}
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary checkout-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Order Inquiry'}
                <ChevronRight size={20} />
              </button>

              <Link to="/cart" className="checkout-back-link">← Back to Cart</Link>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-summary-section">
            <div className="checkout-summary-card">
              <h3>Order Summary</h3>
              
              <div className="checkout-summary-items">
                {state.cart.map(item => (
                  <div key={item.product.id} className="checkout-summary-item">
                    <img src={item.product.images[0]} alt={item.product.name} />
                    <div className="checkout-summary-item-details">
                      <h4>{item.product.name}</h4>
                      <p className="product-sku">SKU: {item.product.sku}</p>
                      <p>Quantity: {item.quantity}</p>
                      <div className="product-note-input">
                        <input
                          type="text"
                          placeholder="Add customization notes..."
                          value={productNotes[item.product.id] || ''}
                          onChange={(e) => handleProductNoteChange(item.product.id, e.target.value)}
                          className="product-note-field"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-info">
                <div className="info-item">
                  <span>Total Items:</span>
                  <strong>{state.cart.reduce((sum, item) => sum + item.quantity, 0)}</strong>
                </div>
                <div className="info-item made-to-order">
                  <span>Status:</span>
                  <strong>Made to Order</strong>
                </div>
              </div>

              <div className="checkout-summary-notice">
                <h4>What Happens Next?</h4>
                <ul>
                  <li>We'll review your inquiry within 24 hours</li>
                  <li>You'll receive a detailed quote with delivery charges</li>
                  <li>50% advance payment to start production</li>
                  <li>Remaining 50% COD upon delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
