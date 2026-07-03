import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import './Blog.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Blog() {
  return (
    <div className="blog-page">
      {/* Hero */}
      <div className="blog-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="blog-eyebrow">Our Journal</span>
            <h1>Stories, Ideas & Inspiration</h1>
            <p>Design tips, furniture guides, and the thinking behind The Furniture Gallery.</p>
          </motion.div>
        </div>
      </div>

      <div className="container blog-layout">
        {/* Featured Article */}
        <motion.article
          className="blog-featured"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="blog-featured__img">
            <img
              src={`${import.meta.env.BASE_URL}images/sofas/sofa-set7.png`}
              alt="The Furniture Gallery showroom"
              onError={e => { (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/sofas/sofa-set1.png`; }}
            />
            <span className="blog-tag">Brand Story</span>
          </div>

          <div className="blog-featured__body">
            <div className="blog-meta">
              <span><User size={13} /> The Furniture Gallery Team</span>
              <span><Clock size={13} /> 5 min read</span>
              <span><Tag size={13} /> Design, Lifestyle</span>
            </div>

            <h2>The Furniture Gallery – Where Craftsmanship Meets Modern Living</h2>

            <p className="blog-featured__lead">
              In a world where homes are more than just living spaces, furniture plays a powerful role in defining comfort, personality, and lifestyle. The Furniture Gallery emerges as a brand that blends timeless craftsmanship with modern aesthetics, offering furniture that transforms houses into meaningful homes.
            </p>

            {/* Article sections */}
            <div className="blog-article">

              <section className="blog-section">
                <h3>The Essence of The Furniture Gallery</h3>
                <p>
                  The Furniture Gallery is built on the idea that furniture should not only serve a purpose but also tell a story. Each piece reflects a careful balance between durability and elegance. Inspired by natural materials and contemporary design trends, the brand brings together the warmth of wood and the sophistication of modern interiors.
                </p>
                <p>
                  From sleek coffee tables to luxurious sofas and elegant dining sets, The Furniture Gallery ensures that every product is crafted with attention to detail and designed to elevate everyday living.
                </p>
              </section>

              <div className="blog-pull-quote">
                "Furniture should not only serve a purpose — it should tell a story."
              </div>

              <section className="blog-section">
                <h3>Designed for Modern Homes</h3>
                <p>
                  Modern living demands versatility, and The Furniture Gallery understands that perfectly. Their collections are designed to fit seamlessly into various interior styles — whether minimalistic, classic, or contemporary.
                </p>
                <ul className="blog-list">
                  <li>Clean and elegant designs</li>
                  <li>Functional yet stylish furniture</li>
                  <li>Space-saving solutions for compact homes</li>
                  <li>Neutral tones that blend with any decor</li>
                </ul>
                <p>
                  Each item is thoughtfully created to enhance both the look and functionality of your space.
                </p>
              </section>

              <div className="blog-img-break">
                <img
                  src={`${import.meta.env.BASE_URL}images/sofas/sofa-set3.png`}
                  alt="The Furniture Gallery navy sofa set"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/sofas/sofa-set2.png`; }}
                />
              </div>

              <section className="blog-section">
                <h3>Quality You Can Trust</h3>
                <p>
                  At The Furniture Gallery, quality is not just a promise — it is a standard. Using premium materials such as solid wood, high-quality fabrics, and durable finishes, the brand ensures longevity in every product.
                </p>
                <p>
                  The craftsmanship reflects precision, care, and a deep understanding of what customers expect from high-end furniture. This commitment to quality makes The Furniture Gallery a reliable choice for long-term investment.
                </p>
              </section>

              <section className="blog-section">
                <h3>Comfort Meets Aesthetic</h3>
                <p>
                  Furniture is not just about looks — it's about how it feels. The Furniture Gallery focuses on ergonomic designs that provide maximum comfort without compromising on style.
                </p>
                <p>
                  Whether it's a cozy sofa for your living room or a sturdy bed for restful nights, every piece is designed with the user's comfort in mind.
                </p>
              </section>

              <section className="blog-section">
                <h3>A Seamless Shopping Experience</h3>
                <p>
                  The Furniture Gallery offers a smooth and user-friendly online shopping experience. With a responsive website design, customers can easily browse products, view detailed descriptions, and place orders from any device.
                </p>
                <ul className="blog-list">
                  <li>Easy navigation across all devices</li>
                  <li>Detailed product pages with dimensions and materials</li>
                  <li>Secure checkout options</li>
                  <li>Customer support for assistance</li>
                </ul>
              </section>

              <div className="blog-img-break">
                <img
                  src={`${import.meta.env.BASE_URL}images/beds/bed1.png`}
                  alt="The Furniture Gallery luxury bedroom"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/beds/bed9.png`; }}
                />
              </div>

              <section className="blog-section">
                <h3>Sustainability & Responsibility</h3>
                <p>
                  In today's world, sustainability matters. The Furniture Gallery aims to incorporate eco-friendly practices by using responsibly sourced materials and minimizing waste in production processes.
                </p>
                <p>
                  This approach ensures that customers not only invest in beautiful furniture but also contribute to a better environment.
                </p>
              </section>

              <div className="blog-closing">
                <h3>Transform Your Space with The Furniture Gallery</h3>
                <p>
                  Your home deserves furniture that reflects your style and enhances your lifestyle. The Furniture Gallery is more than just a furniture brand — it is a symbol of quality, comfort, and timeless design.
                </p>
                <p className="blog-closing__tagline">
                  <em>The Furniture Gallery – Crafted for Living, Designed for You.</em>
                </p>
                <Link to="/shop" className="btn-primary">
                  Explore the Collection <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </div>
        </motion.article>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="blog-sidebar__card">
            <h4>Browse the Shop</h4>
            <p>Discover the pieces mentioned in this article and find your perfect match.</p>
            <Link to="/shop" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Shop Now <ArrowRight size={14} />
            </Link>
          </div>

          <div className="blog-sidebar__card">
            <h4>Categories</h4>
            <ul className="blog-sidebar__cats">
              {['Design', 'Lifestyle', 'Sustainability', 'Craftsmanship', 'Home Tips'].map(cat => (
                <li key={cat}>
                  <span className="blog-sidebar__cat-dot" />
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="blog-sidebar__card blog-sidebar__card--accent">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest furniture collections and design inspiration.</p>
            <Link to="/contact" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Subscribe
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
