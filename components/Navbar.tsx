import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
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
    { label: 'Početna',        path: '/' },
    { label: 'O Nama',         path: '/o-nama' },
    { label: 'Katalog',        path: '/peptidi-srbija' },
    { label: 'Research Centar',path: '/research-centar' },
    { label: 'Kontakt',        path: '/kontakt' },
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
            #bfdbfe, #c4b5fd, #f9a8d4, #fde68a,
            #c4b5fd, #bfdbfe, #f9a8d4, #fde68a, #bfdbfe
          );
          background-size: 300% 100%;
          animation: iridescent-flow 4s linear infinite;
        }
        .nav-link-active::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #bfdbfe, #c4b5fd, #f9a8d4, #fde68a);
          background-size: 300% 100%;
          animation: iridescent-flow 4s linear infinite;
        }
      `}</style>

      {/* ── Floating island navbar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1200px] mx-auto pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#080e1a]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            {/* Subtle ambient glow top edge */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.3), rgba(249,168,212,0.3), transparent)',
              }}
            />

            <div className="px-6 md:px-10 h-[62px] flex items-center justify-between gap-8">

              {/* Logo */}
              <Link to="/" className="shrink-0 group">
                <span
                  className="text-[18px] font-semibold iridescent-line"
                  style={{
                    letterSpacing: '0.14em',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  OCTOLAB
                </span>
              </Link>

              {/* Center nav */}
              <nav className="hidden md:flex items-center gap-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative text-[13.5px] font-medium tracking-wide transition-all duration-200 pb-0.5 ${
                      isActive(link.path)
                        ? 'text-white nav-link-active'
                        : 'text-white/40 hover:text-white/80'
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
                  className="relative group p-2 rounded-xl hover:bg-white/8 transition-colors active:scale-95"
                >
                  <ShoppingBag
                    size={19}
                    strokeWidth={1.6}
                    className="text-white/60 group-hover:text-white transition-colors"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white text-[8px] text-[#080e1a] font-black">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  className="md:hidden p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-colors active:scale-95"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                >
                  {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
                </button>
              </div>
            </div>

            {/* Iridescent shimmer line bottom */}
            <div className="iridescent-line h-[2px] w-full" />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#080e1a] md:hidden flex flex-col pt-28 px-8"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`py-5 text-[30px] font-black tracking-tight border-b border-white/[0.06] transition-colors ${
                      isActive(link.path) ? 'text-white' : 'text-white/25 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </nav>

            <div className="iridescent-line mt-auto mb-10 h-[2px] rounded-full opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
