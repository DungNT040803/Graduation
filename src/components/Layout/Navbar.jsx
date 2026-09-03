import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/navbar.css';

const navItems = [
  { path: '/', label: 'Trang chủ', emoji: '🏠' },
  { path: '/about', label: 'Về tôi', emoji: '👤' },
  { path: '/wishes', label: 'Lời chúc', emoji: '💌' },
  { path: '/event', label: 'Sự kiện', emoji: '🎉' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-emoji">🎓</span>
          Graduation Party
        </NavLink>

        <ul className={`navbar__links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                <span className="navbar__link-emoji">{item.emoji}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`navbar__mobile-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
