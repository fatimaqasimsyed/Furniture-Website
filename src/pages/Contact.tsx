import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formspreeId || formspreeId === 'your_form_id_here') {
      setError('Contact form is not configured yet. Please contact us directly at tfgallery0@gmail.com or call 0321 8991429.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _replyto: form.email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again or contact us directly.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="contact-eyebrow">Get in Touch</span>
            <h1>We'd Love to Hear From You</h1>
            <p>Have a question about a product, need design advice, or want to track your order? We're here to help.</p>
          </motion.div>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Reach out through any of these channels and we'll get back to you within 24 hours.</p>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <div className="contact-info__icon"><Phone size={20} /></div>
              <div>
                <strong>Call Us</strong>
                <a href="tel:+923218991429">0321 8991429</a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Mail size={20} /></div>
              <div>
                <strong>Email Us</strong>
                <a href="mailto:tfgallery0@gmail.com">tfgallery0@gmail.com</a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><MapPin size={20} /></div>
              <div>
                <strong>Visit Our Showroom</strong>
                <span>Seher Commercial, Karachi</span>
                <span>Pakistan 72500</span>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Clock size={20} /></div>
              <div>
                <strong>Business Hours</strong>
                <span>Mon–Sat: 9am–8pm</span>
                <span>Sunday: Closed</span>
              </div>
            </div>
          </div>

          <div className="contact-info__faq">
            <h3>Frequently Asked Questions</h3>
            <div className="contact-info__faq-scroll">
              {[
                { q: 'What makes The Furniture Gallery different?', a: 'We are a trusted local business with over 10 years of experience. We offer quality furniture at competitive prices with excellent customer service.' },
                { q: 'Do you have luxury furniture options?', a: 'Yes, we carry premium furniture pieces including luxury bedroom sets, designer sofas, and elegant dining furniture.' },
                { q: 'Is your furniture affordable?', a: 'Absolutely! We offer furniture for every budget while maintaining high quality standards.' },
                { q: 'Do you sell sofa sets?', a: 'Yes, we have a wide variety of sofa sets in different styles, fabrics, and sizes to suit your living room.' },
                { q: 'What bedroom furniture do you have?', a: 'We carry beds, wardrobes, dressing tables, side tables, and complete bedroom sets including bridal furniture.' },
                { q: 'Can I order custom furniture?', a: 'Yes, we can customize certain furniture items according to your requirements. Contact us for details.' },
                { q: 'What materials do you use?', a: 'We work with quality wood, engineered wood, and premium fabrics depending on the product and your preference.' },
                { q: 'How does delivery work?', a: 'We provide professional delivery services in Karachi with our own team. For Lahore, Islamabad, and other major cities, delivery is available. Charges vary by location and distance - contact us for exact rates.' },
                { q: 'Do you deliver nationwide?', a: 'Yes, we deliver to Karachi, Lahore, Islamabad, and other major cities across Pakistan. Delivery charges vary by location and distance - contact us for a quote.' },
                { q: 'Do you offer assembly services?', a: 'Yes, our team will deliver and assemble the furniture at your location in Karachi.' },
                { q: 'What is your return policy?', a: 'We accept returns or exchanges only if items are damaged or broken during delivery. Please inspect your furniture upon delivery and report any issues immediately.' },
                { q: 'Can I visit your showroom?', a: 'Yes! Visit us at Seher Commercial, Karachi to see our complete furniture collection.' },
                { q: 'How do I maintain wooden furniture?', a: 'Clean with a soft dry cloth regularly. Avoid direct sunlight and moisture. Use wood polish occasionally.' },
              ].map((faq, i) => (
                <div key={i} className="contact-faq-item">
                  <strong>{faq.q}</strong>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={48} />
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </motion.div>
          ) : (
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Send a Message</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <select value={form.subject} onChange={e => update('subject', e.target.value)} required>
                  <option value="">Select a topic...</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Returns & Exchanges</option>
                  <option>Design Consultation</option>
                  <option>Wholesale Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                />
              </div>
              {error && (
                <div className="contact-form-error">
                  {error}
                </div>
              )}
              <button type="submit" className="btn-primary contact-submit-btn" disabled={isSubmitting}>
                <Send size={16} /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          )}

          {/* Delivery Quote Card */}
          <motion.div
            className="delivery-quote-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="delivery-quote-card__icon">
              🚚
            </div>
            <h3>Need a Delivery Quote?</h3>
            <p>Delivery charges vary by location and distance. Contact us to get an accurate quote for your area.</p>
            <div className="delivery-quote-card__info">
              <div className="delivery-info-item">
                <strong>Karachi:</strong>
                <span>Professional delivery with installation</span>
              </div>
              <div className="delivery-info-item">
                <strong>Other Cities:</strong>
                <span>Lahore, Islamabad, Hyderabad & more</span>
              </div>
            </div>
            <a href="tel:+923218991429" className="btn-primary">
              <Phone size={16} /> <span>Call for Quote</span>
            </a>
            <a href="/#/shipping-policies" className="btn-outline">
              <span>View Shipping Details</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

