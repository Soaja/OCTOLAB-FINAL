import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Aperture } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Početna', path: '/' },
    { label: 'O Nama', path: '/o-nama' },
    { label: 'Katalog', path: '/peptidi-srbija' },
    { label: 'Research Centar', path: '/research-centar' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        @keyframes iridescent-flow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .iridescent-line {
          background: linear-gradient(
            90deg,
            #bfdbfe, #c4b5fd, #f9a8d4, #fde68a, #c4b5fd, #bfdbfe, #f9a8d4, #fde68a, #bfdbfe
          );
          background-size: 300% 100%;
          animation: iridescent-flow 4s linear infinite;
        }
      `}</style>

      {/* ── Full-width fixed header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1220]/96 backdrop-blur-md">

        <div className="max-w-[1440px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center">
              <Aperture
                className="w-[28px] h-[28px] text-white stroke-[1.5px] group-hover:rotate-90 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute w-[6px] h-[6px] bg-white rounded-full" />
            </div>
            <span className="text-[21px] font-black tracking-tight text-white">
              OCTOLAB
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label="Open cart"
              className="relative group p-2.5 rounded-full hover:bg-white/10 transition-colors active:scale-95"
            >
              <ShoppingBag
                size={21}
                strokeWidth={1.5}
                className="text-white/70 group-hover:text-white transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[9px] text-[#0c1220] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Iridescent shimmer line */}
        <div className="iridescent-line h-[3px] w-full" />
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#0c1220]/98 backdrop-blur-2xl md:hidden flex flex-col pt-20 px-8"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05 }}
                    className={`py-5 text-[32px] font-black tracking-tight border-b border-white/10 transition-colors ${
                      isActive(link.path) ? 'text-white' : 'text-white/30 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Shimmer line in mobile menu too */}
            <div className="iridescent-line mt-auto mb-12 h-[3px] rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
