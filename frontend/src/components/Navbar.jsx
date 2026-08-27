import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const NAV_ITEMS = [
    { label: 'Home', action: isHome ? () => scrollTo('home') : null, to: '/' },
    { label: 'How It Works', action: isHome ? () => scrollTo('how-it-works') : null, to: '/#how-it-works' },
    { label: 'Features', action: isHome ? () => scrollTo('features') : null, to: '/#features' },
    { label: 'Analyze', to: '/analyze' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? 'bg-[var(--color-bg)]/85 backdrop-blur-2xl shadow-[0_1px_0_rgba(124,58,237,0.15)] py-2.5'
          : 'py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-[var(--font-display)] font-extrabold text-xl text-[var(--color-text-primary)] no-underline hover:text-[var(--color-text-primary)]">
          <span className="text-2xl">⚡</span>
          <span>VideoRAG</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`
          flex list-none gap-1
          max-md:fixed max-md:inset-0 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-2
          max-md:bg-[var(--color-bg)]/97 max-md:backdrop-blur-3xl max-md:transition-transform max-md:duration-400
          ${mobileOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
        `}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {item.to === '/analyze' ? (
                <Link
                  to="/analyze"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] rounded-lg transition-colors hover:text-[var(--color-text-primary)] hover:bg-[rgba(124,58,237,0.08)] max-md:text-xl max-md:px-8 max-md:py-3 no-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.to}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                    setMobileOpen(false);
                  }}
                  className="block px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] rounded-lg transition-colors hover:text-[var(--color-text-primary)] hover:bg-[rgba(124,58,237,0.08)] max-md:text-xl max-md:px-8 max-md:py-3 no-underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="/analyze"
          className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-violet)] shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 no-underline"
        >
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 z-[1001]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[2px] bg-[var(--color-text-secondary)] rounded-sm transition-transform duration-250 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--color-text-secondary)] rounded-sm transition-opacity duration-250 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--color-text-secondary)] rounded-sm transition-transform duration-250 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
    </nav>
  );
}
