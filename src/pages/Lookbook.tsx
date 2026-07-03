import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lookbook.css';

const BASE = import.meta.env.BASE_URL;

const LOOKBOOK_ITEMS = [
  { id: 1, title: 'Royal Classic Living', category: 'Living Room', image: `${BASE}images/look1.jpg`, products: ['Royal Carved Sofa Set', 'Gold & Silver Coffee Table', 'Classic Armchairs'], slug: 'sofa-sets' },
  { id: 2, title: 'Heritage Bedroom Suite', category: 'Bedroom', image: `${BASE}images/look2.jpg`, products: ['Carved Solid Wood Bed', 'Matching Nightstand', 'Bedside Table Lamp'], slug: 'beds' },
  { id: 3, title: 'Victorian Living Room', category: 'Living Room', image: `${BASE}images/look3.jpg`, products: ['Blue Velvet Sofa Set', 'Gold Marble Coffee Table', 'Ornate Armchair'], slug: 'sofa-sets' },
  { id: 4, title: 'Dark Wood Bedroom', category: 'Bedroom', image: `${BASE}images/look4.jpg`, products: ['Dark Sleigh Bed Frame', 'Matching Bedside Drawers', 'Classic Dresser'], slug: 'beds' },
  { id: 5, title: 'Royal Dressing Corner', category: 'Bedroom', image: `${BASE}images/look5.jpg`, products: ['Gold Carved Dressing Table', 'Triple Mirror Panel', 'Ornate Storage Drawers'], slug: 'storage' },
  { id: 6, title: 'Grand Majlis Lounge', category: 'Living Room', image: `${BASE}images/look6.jpg`, products: ['Royal Blue Carved Sofa', 'Gold Trim Armchairs', 'Ornate Coffee Table'], slug: 'sofa-sets' },
  { id: 7, title: 'Silver & Ivory Bedroom', category: 'Bedroom', image: `${BASE}images/look7.jpg`, products: ['Silver Carved Bed Frame', 'Matching Dressing Table', 'Carved Nightstands'], slug: 'beds' },
  { id: 8, title: 'Classic Cream Lounge', category: 'Living Room', image: `${BASE}images/look8.jpg`, products: ['Cream Carved Sofa Set', 'Decorative Coffee Table', 'Classic Armchairs'], slug: 'sofa-sets' },
  { id: 9, title: 'Gold Royal Bedroom', category: 'Bedroom', image: `${BASE}images/look9.jpg`, products: ['Gold Carved Luxury Bed', 'Matching Bedside Tables', 'Ornate Headboard'], slug: 'beds' },
];

export default function Lookbook() {
  const [selected, setSelected] = useState<typeof LOOKBOOK_ITEMS[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(LOOKBOOK_ITEMS.map(i => i.category)))];
  const filtered = filter === 'All' ? LOOKBOOK_ITEMS : LOOKBOOK_ITEMS.filter(i => i.category === filter);

  // Lock body scroll when lightbox is open
  const openLightbox = (item: typeof LOOKBOOK_ITEMS[0]) => {
    setSelected(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelected(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="lookbook-page">
      {/* Hero */}
      <div className="lookbook-hero">
        <img src={`${import.meta.env.BASE_URL}images/about-cta.jpg`} alt="Lookbook hero" />
        <div className="lookbook-hero__overlay" />
        <motion.div
          className="lookbook-hero__content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="lookbook-hero__eyebrow">2026 Collection</span>
          <h1>The Lookbook</h1>
          <p>Discover how our pieces come together to create beautiful, liveable spaces.</p>
        </motion.div>
      </div>

      <div className="container">
        {/* Filter */}
        <div className="lookbook-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`lookbook-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div className="lookbook-grid" layout>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className={`lookbook-item ${i % 5 === 0 ? 'lookbook-item--tall' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';
                  }}
                />
                <div className="lookbook-item__overlay">
                  <span className="lookbook-item__category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="lookbook-item__cta">View Room <ArrowRight size={14} /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="lookbook-lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeLightbox()}
            />
            <motion.div
              className="lookbook-lightbox"
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            >
              <button className="lookbook-lightbox__close" onClick={() => closeLightbox()} aria-label="Close">
                <X size={20} />
              </button>
              <div className="lookbook-lightbox__img">
                <img src={selected.image} alt={selected.title} />
              </div>
              <div className="lookbook-lightbox__info">
                <span className="lookbook-lightbox__category">{selected.category}</span>
                <h2>{selected.title}</h2>
                <p>Featured in this room:</p>
                <ul>
                  {selected.products.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to={`/shop?category=${selected.slug}`} className="btn-primary" onClick={() => closeLightbox()}>
                  Shop This Look <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


