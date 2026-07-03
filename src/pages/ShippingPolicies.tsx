import { Package, Truck, Shield, RefreshCw, Wrench, Clock, AlertCircle, CheckCircle, FileText, CreditCard, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import './ShippingPolicies.css';

export default function ShippingPolicies() {
  return (
    <div className="shipping-policies-page">
      {/* Hero Section */}
      <section className="shipping-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="shipping-hero__content"
          >
            <h1>Shipping & Policies</h1>
            <p>Everything you need to know about our shipping, custom orders, warranty, and policies</p>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Payment Methods Section */}
        <section className="policy-section">
          <div className="section-header">
            <CreditCard size={32} />
            <h2>Payment Methods</h2>
          </div>
          <div className="policy-card">
            <h3>50% Advance Payment (Recommended)</h3>
            <p className="highlight-box success">
              <CheckCircle size={20} />
              <span>Pay 50% advance online, remaining 50% cash on delivery</span>
            </p>
            <ul>
              <li>Pay half the order value upfront through our secure payment gateway</li>
              <li>Remaining 50% to be paid in cash when furniture is delivered to your doorstep</li>
              <li>Accepted payment methods: Debit/Credit Cards, JazzCash, EasyPaisa</li>
              <li>Most flexible and convenient option for high-value furniture purchases</li>
            </ul>
          </div>
        </section>

        {/* Shipping Details */}
        <section className="policy-section">
          <div className="section-header">
            <Truck size={32} />
            <h2>Shipping Details</h2>
          </div>
          <div className="policy-card">
            <div className="info-grid">
              <div className="info-item">
                <strong>Shipping From:</strong>
                <span>Karachi, Pakistan</span>
              </div>
              <div className="info-item">
                <strong>Lead Time:</strong>
                <span>25-30 business days for fabricated beds</span>
              </div>
              <div className="info-item">
                <strong>Product Life:</strong>
                <span>Lifetime quality</span>
              </div>
              <div className="info-item">
                <strong>Color & Size:</strong>
                <span>Selected by customers</span>
              </div>
            </div>

            <h3>Karachi Delivery</h3>
            <ul>
              <li>Our own delivery service ensures safe and timely delivery</li>
              <li>Professional installation and setup included</li>
              <li>Delivery charges calculated based on location and distance</li>
              <li>Contact us for delivery quote</li>
            </ul>

            <h3>Other Cities (Lahore, Islamabad, etc.)</h3>
            <ul>
              <li><strong>Shipping & Labor:</strong> Provided by customer</li>
              <li><strong>Shipping Charges:</strong> Calculated based on distance and weight</li>
              <li>Contact our team for shipping quotes to your city</li>
              <li>We can recommend reliable transport services</li>
              <li>Furniture will be carefully packed for safe transit</li>
            </ul>

            <div className="highlight-box warning">
              <AlertCircle size={20} />
              <div>
                <strong>Important Note:</strong>
                <p>Shipping may take longer due to weather conditions, electricity issues, labor problems, curfews, or strikes. Please consider these factors when planning your purchase and rating our services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Orders */}
        <section className="policy-section">
          <div className="section-header">
            <Wrench size={32} />
            <h2>Custom Orders</h2>
          </div>
          <div className="policy-card">
            <p className="intro-text">
              Every product on our website can be customized to your exact specifications. We manufacture each piece to order, ensuring you get exactly what you envision.
            </p>

            <h3>Customization Options</h3>
            <ul>
              <li><strong>Size:</strong> Customize dimensions to fit your space perfectly</li>
              <li><strong>Color:</strong> Choose from our wide range of colors and finishes</li>
              <li><strong>Material:</strong> Select premium wood types and fabric options</li>
              <li><strong>Design:</strong> Modify design elements to match your style</li>
            </ul>

            <h3>Custom Order Process</h3>
            <div className="process-steps">
              <div className="step">
                <span className="step-number">1</span>
                <div>
                  <strong>Consultation</strong>
                  <p>Contact our team with your requirements</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div>
                  <strong>Design Approval</strong>
                  <p>Review and approve the design specifications</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div>
                  <strong>Payment</strong>
                  <p>50% advance payment to begin production</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <div>
                  <strong>Production</strong>
                  <p>Expert craftsmen build your custom furniture</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">5</span>
                <div>
                  <strong>Delivery</strong>
                  <p>Furniture delivered and installed at your location</p>
                </div>
              </div>
            </div>

            <div className="highlight-box info">
              <AlertCircle size={20} />
              <div>
                <strong>Production Timeline:</strong>
                <p>Production starts immediately after order confirmation. Standard lead time is 25-30 business days for fabricated furniture. Custom orders may require additional time depending on complexity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty */}
        <section className="policy-section">
          <div className="section-header">
            <Shield size={32} />
            <h2>Warranty & After Sales Service</h2>
          </div>
          <div className="policy-card">
            <div className="warranty-highlight">
              <Shield size={48} />
              <div>
                <h3>1 Year Warranty</h3>
                <p>Comprehensive after-sales service coverage</p>
              </div>
            </div>

            <h3>Warranty Coverage</h3>
            <ul>
              <li>Manufacturing defects and structural issues</li>
              <li>Hardware and fitting problems</li>
              <li>Material quality issues</li>
              <li>Workmanship defects</li>
            </ul>

            <h3>Warranty Exclusions</h3>
            <ul>
              <li>Normal wear and tear from regular use</li>
              <li>Damage from misuse or improper care</li>
              <li>Modifications made by third parties</li>
              <li>Damage during customer-arranged transportation</li>
            </ul>

            <div className="highlight-box warning">
              <FileText size={20} />
              <div>
                <strong>Important Requirement:</strong>
                <p>Original invoice must be presented at the time of delivery or warranty claim. Keep your invoice safe for warranty service.</p>
              </div>
            </div>

            <h3>Quality Assurance</h3>
            <p className="quality-text">
              All products are manufactured by <strong>The Furniture Gallery (TFG)</strong> in Pakistan with the highest quality standards. Our experienced craftsmen use premium materials and time-tested techniques to ensure your furniture lasts a lifetime.
            </p>
          </div>
        </section>

        {/* Returns & Exchange */}
        <section className="policy-section">
          <div className="section-header">
            <RefreshCw size={32} />
            <h2>Returns & Exchange Policy</h2>
          </div>
          <div className="policy-card">
            <div className="highlight-box warning">
              <AlertCircle size={20} />
              <div>
                <strong>Limited Return Policy:</strong>
                <p>Returns or exchanges are only accepted for damaged or broken items received during delivery.</p>
              </div>
            </div>

            <h3>Inspection Upon Delivery</h3>
            <ul>
              <li><strong>Inspect carefully:</strong> Check all furniture pieces upon delivery</li>
              <li><strong>Report immediately:</strong> Notify delivery personnel of any damage</li>
              <li><strong>Take photos:</strong> Document any damages with clear photographs</li>
              <li><strong>Contact us:</strong> Reach out to our customer service within 24 hours</li>
            </ul>

            <h3>What We Accept</h3>
            <div className="acceptance-grid">
              <div className="accept-item valid">
                <CheckCircle size={24} />
                <span>Damaged during transit</span>
              </div>
              <div className="accept-item valid">
                <CheckCircle size={24} />
                <span>Broken parts or components</span>
              </div>
              <div className="accept-item valid">
                <CheckCircle size={24} />
                <span>Manufacturing defects</span>
              </div>
              <div className="accept-item valid">
                <CheckCircle size={24} />
                <span>Wrong item delivered</span>
              </div>
            </div>

            <h3>What We Don't Accept</h3>
            <div className="acceptance-grid">
              <div className="accept-item invalid">
                <AlertCircle size={24} />
                <span>Change of mind</span>
              </div>
              <div className="accept-item invalid">
                <AlertCircle size={24} />
                <span>Color/style preference</span>
              </div>
              <div className="accept-item invalid">
                <AlertCircle size={24} />
                <span>Size issues (after approval)</span>
              </div>
              <div className="accept-item invalid">
                <AlertCircle size={24} />
                <span>Damage after acceptance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="policy-section">
          <div className="section-header">
            <Clock size={32} />
            <h2>Cancellation Policy</h2>
          </div>
          <div className="policy-card">
            <div className="highlight-box warning">
              <AlertCircle size={20} />
              <div>
                <strong>24-Hour Cancellation Window:</strong>
                <p>Orders cannot be cancelled after 24 hours of placement as production starts immediately.</p>
              </div>
            </div>

            <h3>Why We Have This Policy</h3>
            <p>Since all our furniture is made-to-order and production begins as soon as your order is confirmed, we invest materials, labor, and resources specifically for your custom piece.</p>

            <h3>Before You Order</h3>
            <ul>
              <li>Review all specifications carefully: size, color, material, design</li>
              <li>Confirm measurements and space requirements</li>
              <li>Ask questions - our staff is here to help clarify any doubts</li>
              <li>Request samples if you're unsure about colors or materials</li>
              <li>Double-check delivery address and timeline</li>
            </ul>

            <div className="cta-box">
              <strong>Have Questions?</strong>
              <p>Call our staff with any questions before ordering. We'll ensure you get exactly what you need.</p>
              <a href="/#/contact" className="btn-primary">Contact Us</a>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="policy-section highlights-section">
          <h2 className="text-center">Key Highlights</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <Package size={32} />
              <h3>Made in Pakistan</h3>
              <p>All products manufactured by TFG with premium quality materials</p>
            </div>
            <div className="highlight-card">
              <Shield size={32} />
              <h3>1 Year Warranty</h3>
              <p>Comprehensive after-sales service and support</p>
            </div>
            <div className="highlight-card">
              <Truck size={32} />
              <h3>Professional Delivery</h3>
              <p>Karachi delivery with professional installation included</p>
            </div>
            <div className="highlight-card">
              <Wrench size={32} />
              <h3>Custom Orders</h3>
              <p>Personalize size, color, and design to your preference</p>
            </div>
            <div className="highlight-card">
              <Clock size={32} />
              <h3>Lifetime Quality</h3>
              <p>Built to last with expert craftsmanship</p>
            </div>
            <div className="highlight-card">
              <CreditCard size={32} />
              <h3>Flexible Payment</h3>
              <p>50% advance, 50% on delivery option available</p>
            </div>
            <div className="highlight-card">
              <Award size={32} />
              <h3>Premium Materials</h3>
              <p>High-quality wood, fabric, and hardware for lasting durability</p>
            </div>
            <div className="highlight-card">
              <Users size={32} />
              <h3>Expert Craftsmen</h3>
              <p>Skilled artisans with years of furniture-making experience</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="policy-cta">
          <h2>Still Have Questions?</h2>
          <p>Our customer service team is here to help you with any questions about shipping, custom orders, or our policies.</p>
          <div className="cta-buttons">
            <a href="/#/contact" className="btn-primary">Contact Us</a>
            <a href="/#/shop" className="btn-outline">Start Shopping</a>
          </div>
        </section>
      </div>
    </div>
  );
}
