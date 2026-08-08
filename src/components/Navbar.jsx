import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else if (href === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
    closeMenu();
  };

  const isHomePage = location.pathname === '/';

  const navLinks = isHomePage ? [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Why Us', href: '#why' },
  ] : [
    { label: 'Home', href: '/' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={(e) => handleNavClick(e, '/')}>
          <img src="/mercionen.png" alt="Mercion Logo" className="nav-brand-img" />
          <span className="nav-brand-text">MERCION</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}><Link to={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</Link></li>
          ))}
          <li><Link to={isHomePage ? "#contact" : "/contact"} className="nav-link-auth" onClick={(e) => isHomePage ? handleNavClick(e, '#contact') : undefined}>Contact Us</Link></li>
          {isAuthenticated ? (
            <>
              <li><span className="nav-link-auth" style={{ opacity: 0.85 }}>{user?.name?.split(' ')[0] || 'Account'}</span></li>
              <li>
                <button type="button" className="nav-cta" onClick={() => { logout(); closeMenu(); }}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signin" className="nav-cta" onClick={closeMenu}>Sign In</Link></li>
              <li><Link to="/signup" className="nav-link-auth nav-link-auth-primary" onClick={closeMenu}>Sign Up</Link></li>
            </>
          )}
        </ul>

        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="nav-overlay-bg"></div>
        <div className="nav-overlay-content">
          <ul className="nav-overlay-links">
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${i * 60}ms` }}>
                <Link to={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  <span className="nav-overlay-num">0{i + 1}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ animationDelay: `${navLinks.length * 60}ms` }}>
              <Link to={isHomePage ? "#contact" : "/contact"} onClick={(e) => isHomePage ? handleNavClick(e, '#contact') : closeMenu()}>
                <span className="nav-overlay-num">0{navLinks.length + 1}</span>
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav-overlay-auth">
            {isAuthenticated ? (
              <button type="button" className="nav-overlay-cta" onClick={() => { logout(); closeMenu(); }}>
                Sign Out ({user?.name?.split(' ')[0] || 'Account'})
              </button>
            ) : (
              <>
                <Link to="/signin" className="nav-overlay-cta" onClick={closeMenu}>
                  Sign In
                </Link>
                <Link to="/signup" className="nav-overlay-auth-link" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
