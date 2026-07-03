import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { state, dispatch, cartCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdown, setShopDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopCategories = [
    { name: 'Sofas', slug: 'sofas' },
    { name: 'Beds', slug: 'beds' },
    { name: 'Dining', slug: 'dining' },
    { name: 'Office', slug: 'office' },
    { name: 'Storage', slug: 'storage' },
    { name: 'Decor', slug: 'decor' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${mobileOpen ? 'navbar--open' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src={`${import.meta.env.BASE_URL}images 2/tfg_logo.png`} alt="The Furniture Gallery" className="navbar__logo-img" />
            <div>
              <span className="navbar__logo-name">The Furniture Gallery</span>
              <span className="navbar__logo-tagline">Karachi</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li
              className="navbar__dropdown-trigger"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <Link to="/shop" className={location.pathname.startsWith('/shop') ? 'active' : ''}>
                Shop <ChevronDown size={14} />
              </Link>
              {shopDropdown && (
                <div className="navbar__dropdown">
                  <Link to="/shop" className="navbar__dropdown-all">All Products</Link>
                  {shopCategories.map(cat => (
                    <Link key={cat.slug} to={`/shop?category=${cat.slug}`}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </li>
            <li><Link to="/collections" className={location.pathname === '/collections' ? 'active' : ''}>Collections</Link></li>
            <li><Link to="/lookbook" className={location.pathname === '/lookbook' ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="navbar__icon-btn"
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              aria-label="Toggle theme"
            >
              {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {state.wishlist.length > 0 && (
                <span className="navbar__badge">{state.wishlist.length}</span>
              )}
            </Link>
            <button
              className="navbar__icon-btn navbar__cart-btn"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
            </button>
            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="navbar__search">
            <form onSubmit={handleSearch} className="container">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search furniture, styles, materials..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
              <button type="button" onClick={() => setSearchOpen(false)}><X size={18} /></button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="navbar__mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/shop">All Products</Link>
            {shopCategories.map(cat => (
              <Link key={cat.slug} to={`/shop?category=${cat.slug}`} className="navbar__mobile-sub">
                {cat.name}
              </Link>
            ))}
            <Link to="/collections">Collections</Link>
            <Link to="/lookbook">Gallery</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        )}
      </nav>
      <div className="navbar__spacer" />
    </>
  );
}

