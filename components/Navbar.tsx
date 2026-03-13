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
      {/* ── Full-width fixed header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/88 backdrop-blur-md">

        <div className="max-w-[1440px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center">
              <Aperture
                className="w-[28px] h-[28px] text-neutral-900 stroke-[1.5px] group-hover:rotate-90 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute w-[6px] h-[6px] bg-black rounded-full" />
            </div>
            <span className="text-[21px] font-black tracking-tight text-[#0c1220]">
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
                    ? 'text-[#0c1220]'
                    : 'text-neutral-400 hover:text-[#0c1220]'
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
              className="relative group p-2.5 rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
            >
              <ShoppingBag
                size={21}
                strokeWidth={1.5}
                className="text-neutral-600 group-hover:text-black transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0c1220] text-[9px] text-white font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2.5 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Iridescent bottom border — boje presijavanje etikete bočice */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #bfdbfe 10%, #c4b5fd 30%, #f9a8d4 52%, #fde68a 72%, #bfdbfe 90%, transparent 100%)',
            opacity: 0.9,
          }}
        />
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white/97 backdrop-blur-2xl md:hidden flex flex-col pt-20 px-8"
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
                    className={`py-5 text-[32px] font-black tracking-tight border-b border-neutral-100 transition-colors ${
                      isActive(link.path) ? 'text-[#0c1220]' : 'text-neutral-300 hover:text-[#0c1220]'
                    }`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Bottom iridescent line in mobile menu too */}
            <div
              className="mt-auto mb-12 h-[2px] rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, #bfdbfe, #c4b5fd, #f9a8d4, #fde68a)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
