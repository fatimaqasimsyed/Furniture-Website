import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Package, RefreshCw, Truck, Shield } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { products, categories } from '../data/products';
import { formatPKR } from '../utils/currency';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import type { Product } from '../types';
import './Home.css';

const BASE = import.meta.env.BASE_URL;

const HERO_IMAGES = [
  `${BASE}images/hero/hero_1.png`,
  `${BASE}Minimal Furniture.png`,
  `${BASE}Minimal Furniture (1).png`,
];

const TESTIMONIALS = [
  { name: 'Ahmed K.', location: 'Karachi', rating: 5, text: 'Excellent quality furniture at reasonable prices. The delivery was prompt and the staff was very helpful. Highly recommend The Furniture Gallery!' },
  { name: 'Fatima S.', location: 'Hyderabad', rating: 5, text: 'Beautiful sofa set that transformed our living room. The craftsmanship is outstanding and the price was very competitive.' },
  { name: 'Muhammad R.', location: 'Lahore', rating: 5, text: 'Best furniture shop in the area! Great selection and the owner is very accommodating. Will definitely buy again.' },
  { name: 'Zainab M.', location: 'Karachi', rating: 4, text: 'Very satisfied with our dining table purchase. Good quality wood and beautiful finish. Great local business!' },
];

const CATEGORY_IMAGES: Record<string, string> = {
  'sofa-sets':       `${BASE}images/cat-sofa-sets.png`,
  'single-sofas':    `${BASE}images/cat-single-sofas.png`,
  'bedside-tables':  `${BASE}images/cat-bedside-tables.png`,
  sofas:             `${BASE}images/cat-sofas.jpg`,
  beds:              `${BASE}images/cat-beds.jpg`,
  tables:            `${BASE}images/cat-tables.png`,
  storage:           `${BASE}images/cat-storage.jpg`,
  consoles:          `${BASE}images/cat-consoles.png`,
  racks:             `${BASE}images/cat-racks.png`,
  decor:             `${BASE}images/cat-chairs.png`,
  dining:            `${BASE}images/cat-dining.jpg`,
  office:            `${BASE}images/cat-office.jpg`,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Preload hero images
  useEffect(() => {
    HERO_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bestSellers = products.filter(p => p.badge === 'Bestseller' || p.rating >= 4.8).slice(0, 8);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero">
        <div className="hero__slider">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`hero__slide ${i === heroIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Hero ${i + 1}`} className="hero__image" />
              <div className="hero__gradient" />
            </div>
          ))}
        </div>

        <div className="hero__content-wrapper">
          <div className="container">
            <div className="hero__content">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero__text"
              >
                <span className="hero__eyebrow">The Furniture Gallery</span>
                <h1 className="hero__title">
                  Premium Furniture<br />
                  <em>For Every Space</em>
                </h1>
                <p className="hero__subtitle">Affordable. Reliable. Quality Craftsmanship.</p>
                <div className="hero__ctas">
                  <Link to="/shop" className="btn-primary hero__cta-primary">
                    Shop Collection <ArrowRight size={18} />
                  </Link>
                  <Link to="/lookbook" className="btn-outline-white">
                    Explore Gallery
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hero__controls">
          <button
            className="hero__nav hero__nav--prev"
            onClick={() => setHeroIndex(i => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="hero__indicators">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`hero__indicator ${i === heroIndex ? 'active' : ''}`}
                onClick={() => setHeroIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="hero__nav hero__nav--next"
            onClick={() => setHeroIndex(i => (i + 1) % HERO_IMAGES.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['Quality Furniture', 'Competitive Prices', 'Custom Orders Available', 'Nationwide Delivery', 'Expert Craftsmanship', 'Seher Commercial Karachi', 'Quality Furniture', 'Competitive Prices', 'Custom Orders Available', 'Nationwide Delivery', 'Expert Craftsmanship', 'Seher Commercial Karachi'].map((text, i) => (
            <span key={i}>{text} <span className="marquee-dot">✦</span></span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="section categories-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated furniture collections</p>
          </motion.div>

          <motion.div
            className="categories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {categories.map(cat => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link to={`/shop?category=${cat.slug}`} className="category-card">
                  <div className="category-card__img-wrap">
                    <img
                      src={CATEGORY_IMAGES[cat.slug]}
                      alt={cat.name}
                      loading="lazy"
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/600/450';
                      }}
                    />
                    <div className="category-card__overlay" />
                  </div>
                  <div className="category-card__info">
                    <span className="category-card__icon">{cat.icon}</span>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    <span className="category-card__link">Shop Now <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="section bestsellers-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header section-header--flex"
          >
            <div>
              <h2 className="section-title bestsellers-title">Best Sellers</h2>
              <p className="section-subtitle">Our most loved pieces</p>
            </div>
            <Link to="/shop" className="btn-outline">View All <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            className="products-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {bestSellers.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LIFESTYLE BANNER ===== */}
      <section className="lifestyle-banner">
        <div className="lifestyle-banner__img">
          <img src={`${import.meta.env.BASE_URL}images/lifestyle.jpg`} alt="Luxury living room interior" loading="lazy" />
          <div className="lifestyle-banner__overlay" />
        </div>
        <motion.div
          className="lifestyle-banner__content container"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="lifestyle-banner__eyebrow">The Furniture Gallery</span>
          <h2>Premium Quality<br /><em>Affordable Prices</em></h2>
          <p>Every piece in our collection is crafted with care to bring comfort, style, and durability to your living spaces. Quality furniture for every home.</p>
          <Link to="/lookbook" className="btn-primary">
            View Gallery <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header section-header--flex"
          >
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh designs just landed</p>
            </div>
            <Link to="/shop?badge=new" className="btn-outline">See All New <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            className="products-grid products-grid--4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {newArrivals.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section why-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">Why Choose The Furniture Gallery</h2>
            <p className="section-subtitle">Your trusted furniture destination in Karachi</p>
          </motion.div>

          <motion.div
            className="why-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: <Package size={28} />, title: 'Quality Materials', desc: 'High-quality wood and premium fabrics that ensure durability and comfort for years to come.' },
              { icon: <Star size={28} />, title: 'Beautiful Designs', desc: 'Wide range of modern and classic furniture designs to match your home décor perfectly.' },
              { icon: <Truck size={28} />, title: 'Delivery Service', desc: 'FREE delivery in Karachi with our own service. Lahore, Islamabad, and other major cities available with additional charges.' },
              { icon: <RefreshCw size={28} />, title: 'Customer Satisfaction', desc: 'We stand behind our products and ensure every customer is completely satisfied.' },
              { icon: <Shield size={28} />, title: 'Quality Assurance', desc: 'Every piece is carefully inspected to meet our high standards of craftsmanship.' },
              { icon: <span style={{ fontSize: '1.5rem' }}>💰</span>, title: 'Best Prices', desc: 'Competitive pricing without compromising on quality. Great value for your money.' },
            ].map((item, i) => (
              <motion.div key={i} className="why-card" variants={fadeUp}>
                <div className="why-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CUSTOM FURNITURE ===== */}
      <section className="custom-furniture-section">
        <div className="container">
          <div className="custom-furniture-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="custom-furniture-text"
            >
              <span className="custom-furniture-eyebrow">Tailored For You</span>
              <h2>Custom Furniture<br /><em>Made to Order</em></h2>
              <p>Have a unique vision for your space? We specialize in custom furniture design and manufacturing. From custom dimensions to personalized finishes, we bring your ideas to life with expert craftsmanship.</p>
              <ul className="custom-furniture-features">
                <li>✓ Custom sizes and dimensions</li>
                <li>✓ Choice of materials and finishes</li>
                <li>✓ Personalized design consultation</li>
                <li>✓ Expert craftsmanship guaranteed</li>
              </ul>
              <Link to="/contact" className="btn-primary">
                Request Custom Design <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="custom-furniture-image"
            >
              <img src={`${import.meta.env.BASE_URL}images/sofas/sofa_set_6.png`} alt="Custom furniture design" loading="lazy" />
              <div className="custom-furniture-badge">
                <span className="custom-furniture-badge-icon">🎨</span>
                <span>Custom Made</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real stories from real homes</p>
          </motion.div>

          <div className="testimonials-slider">
            <div className="testimonials-track" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-card__stars">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#C8A96A" stroke="#C8A96A" />
                    ))}
                  </div>
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonials-controls">
              <button
                onClick={() => setTestimonialIndex(i => Math.max(0, i - 1))}
                disabled={testimonialIndex === 0}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="testimonials-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials-dot ${i === testimonialIndex ? 'active' : ''}`}
                    onClick={() => setTestimonialIndex(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex(i => Math.min(TESTIMONIALS.length - 1, i + 1))}
                disabled={testimonialIndex === TESTIMONIALS.length - 1}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-section__bg">
        <img src={`${import.meta.env.BASE_URL}images/newsletter.jpg`} alt="" aria-hidden="true" />
        <div className="newsletter-section__overlay" />
      </div>
      <motion.div
        className="newsletter-section__content container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="newsletter-section__eyebrow">Stay Connected</span>
        <h2>Get Special Offers & Updates</h2>
        <p>Subscribe for exclusive deals, new arrivals, and special promotions from The Furniture Gallery.</p>
        {submitted ? (
          <div className="newsletter-section__success">
            <span>✓</span> Welcome to The Furniture Gallery! Check your inbox for updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-section__form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        )}
        <p className="newsletter-section__privacy">We respect your privacy. Unsubscribe at any time.</p>
      </motion.div>
    </section>
  );
}



