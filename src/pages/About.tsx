import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Award, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';

const VALUES = [
  { icon: <Award size={24} />, title: 'Quality First', desc: 'We carefully select high-quality materials and work with skilled craftsmen to ensure every piece meets our standards.' },
  { icon: <Users size={24} />, title: 'Customer Focus', desc: 'Your satisfaction is our priority. We listen to your needs and help you find the perfect furniture for your space.' },
  { icon: <Globe size={24} />, title: 'Local Service', desc: 'Conveniently located at Seher Commercial, Karachi. Serving customers across Pakistan with quality furniture and excellent service.' },
  { icon: <Leaf size={24} />, title: 'Fair Pricing', desc: 'We believe in honest pricing. Quality furniture doesn\'t have to be expensive - we offer the best value for your money.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero__bg">
          <img src={`${import.meta.env.BASE_URL}Minimal Furniture (6).png`} alt="" />
          <div className="about-hero__overlay" />
        </div>
        <motion.div
          className="about-hero__content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-hero__eyebrow">Our Story</span>
          <h1>Quality Furniture<br /><em>For Every Home</em></h1>
          <p>Located at Seher Commercial, Karachi, The Furniture Gallery has been serving customers with premium quality furniture at affordable prices.</p>
        </motion.div>
      </div>

      {/* Story */}
      <section className="about-story container">
        <motion.div
          className="about-story__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div className="about-story__text" variants={fadeUp}>
            <span className="about-eyebrow">Who We Are</span>
            <h2>Your Trusted Furniture<br />Partner in Karachi</h2>
            <p>The Furniture Gallery is a trusted furniture business located at Seher Commercial in Karachi. At TFG we are focused on helping our clients make a lovely home by offering a wide range of furniture styles, proficient advice, and service.</p>
            <p>From classic wooden furniture to modern designs, we have something for every taste and budget. Our commitment to quality and customer satisfaction has made us a trusted name in the community. Visit us or call 0321 8991429 for more information.</p>
            <Link to="/shop" className="btn-primary">
              Explore Our Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div className="about-story__img" variants={fadeUp}>
            <img
              src={`${import.meta.env.BASE_URL}images/lifestyle.jpg`}
              alt="Our workshop"
              loading="lazy"
            />
            <div className="about-story__img-badge">
              <span className="about-story__img-badge-num">10+</span>
              <span>Years of Service</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {[
            { num: '1,000+', label: 'Happy Customers' },
            { num: '100+', label: 'Products' },
            { num: '10+', label: 'Years Experience' },
            { num: '5★', label: 'Customer Rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="about-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="about-stat__num">{stat.num}</span>
              <span className="about-stat__label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="about-section-header"
        >
          <span className="about-eyebrow">What We Stand For</span>
          <h2>Our Core Values</h2>
        </motion.div>
        <div className="about-values__grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              className="about-value-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="about-value-card__icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta__bg">
          <img src={`${import.meta.env.BASE_URL}Minimal Furniture (9).png`} alt="" />
          <div className="about-cta__overlay" />
        </div>
        <motion.div
          className="about-cta__content container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Transform Your Space?</h2>
          <p>Explore our full collection and find the perfect pieces for your home.</p>
          <div className="about-cta__btns">
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}



