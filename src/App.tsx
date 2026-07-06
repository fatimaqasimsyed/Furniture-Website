import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Wishlist from './pages/Wishlist';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import ShippingPolicies from './pages/ShippingPolicies';

// Page title map
const PAGE_TITLES: Record<string, string> = {
  '/': 'The Furniture Gallery — Quality Furniture for Every Space',
  '/shop': 'Shop | The Furniture Gallery',
  '/cart': 'Cart | The Furniture Gallery',
  '/checkout': 'Checkout | The Furniture Gallery',
  '/checkout/success': 'Order Confirmed | The Furniture Gallery',
  '/wishlist': 'Wishlist | The Furniture Gallery',
  '/lookbook': 'Gallery | The Furniture Gallery',
  '/about': 'About Us | The Furniture Gallery',
  '/contact': 'Contact | The Furniture Gallery',
  '/blog': 'Blog | The Furniture Gallery',
  '/shipping-policies': 'Shipping & Policies | The Furniture Gallery',
};

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update page title
    const base = '/' + pathname.split('/')[1];
    const title = PAGE_TITLES[base] || 'The Furniture Gallery';
    document.title = title;
  }, [pathname, search]);
  return null;
}

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <Toast />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shipping-policies" element={<ShippingPolicies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}

function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-page__icon">🛋️</span>
      <h1 className="not-found-page__code">404</h1>
      <p className="not-found-page__msg">This page seems to have wandered off.</p>
      <a href="/#/" className="btn-primary">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <LoadingScreen />
        <AppLayout />
      </AppProvider>
    </HashRouter>
  );
}

