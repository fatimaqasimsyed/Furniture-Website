import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Collections.css';

const BASE = import.meta.env.BASE_URL;

const COLLECTIONS = [
  { id: 1, name: 'Royal Sofa Sets', subtitle: 'Carved & Upholstered Living Rooms', desc: 'Discover our stunning range of hand-carved sofa sets with gold frames, velvet upholstery and matching center tables. Perfect for every drawing room.', image: `${BASE}images/col1.jpg`, tag: 'New Collection', color: '#D4C5A9', slug: 'sofa-sets' },
  { id: 2, name: 'Luxury Bedroom Sets', subtitle: 'Complete Bedroom Collections', desc: 'Transform your bedroom with our premium hand-crafted beds, complete with matching dressing tables, nightstands and side tables.', image: `${BASE}images/col2.jpg`, tag: 'Bestseller', color: '#C8A96A', slug: 'beds' },
  { id: 3, name: 'Classic Living Rooms', subtitle: 'Timeless Elegance', desc: 'Explore our complete living room collections featuring royal sofa sets, carved armchairs and beautifully crafted center tables for every style.', image: `${BASE}images/col3.jpg`, tag: 'Featured', color: '#92400E', slug: 'sofa-sets' },
  { id: 4, name: 'Dressing & Storage', subtitle: 'Ornate Dressing Tables', desc: 'Explore our exquisite dressing tables with triple mirrors, gold carved frames and crystal details — the perfect finishing touch for any bedroom.', image: `${BASE}images/col4.jpg`, tag: 'Trending', color: '#1F2937', slug: 'storage' },
  { id: 5, name: 'Bedside Tables', subtitle: 'Nightstands & Side Tables', desc: 'Complete your bedroom with our elegant bedside tables and nightstands. Choose from classic, modern, and designer styles with storage drawers.', image: `${BASE}images/cat-bedside-tables.png`, tag: 'Essential', color: '#065F46', slug: 'bedside-tables' },
  { id: 6, name: 'Gold & Silver Sets', subtitle: 'Premium Carved Luxury', desc: 'Our finest gold and silver carved furniture sets — handcrafted with ornate details, crystal accents and premium upholstery for discerning homes.', image: `${BASE}images/col6.jpg`, tag: 'Limited Edition', color: '#111111', slug: 'beds' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Collections() {
  return (
    <div className="collections-page">
      {/* Hero */}
      <div className="collections-hero">
        <div className="collections-hero__bg">
          <img src={`${import.meta.env.BASE_URL}images/col-hero.jpg`} alt="" />
          <div className="collections-hero__overlay" />
        </div>
        <div className="collections-hero__content container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="collections-hero__eyebrow">Curated for You</span>
            <h1>Our Collections</h1>
            <p>Thoughtfully curated furniture stories for every style and space.</p>
          </motion.div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container collections-grid">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.id}
            className={`collection-card`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <div className="collection-card__img">
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';
                }}
              />
              <div className="collection-card__overlay" />
            </div>
            <div className="collection-card__content">
              <span className="collection-card__tag" style={{ background: col.color }}>{col.tag}</span>
              <h2>{col.name}</h2>
              <p className="collection-card__subtitle">{col.subtitle}</p>
              <p className="collection-card__desc">{col.desc}</p>
              <Link to={`/shop?category=${col.slug}`} className="collection-card__cta">
                Shop Collection <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


