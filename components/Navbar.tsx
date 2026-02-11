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
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-[1000px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition-all">
            
            <Link 
                to="/" 
                className="flex items-center gap-2.5 group shrink-0"
            >
                <div className="relative flex items-center justify-center">
                    <Aperture className="w-6 h-6 text-neutral-900 stroke-[1.5px] group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
                    <div className="absolute w-1 h-1 bg-black rounded-full" />
                </div>
                <div className="flex flex-col items-start leading-none flex">
                  <span className="text-lg font-bold tracking-tight text-[#0B0B0C] font-manrope">
                    OCTOLAB
                  </span>
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {navLinks.map((link) => (
                <Link
                    key={link.label}
                    to={link.path}
                    className={`text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 ${
                    isActive(link.path)
                        ? 'text-black' 
                        : 'text-neutral-500 hover:text-black hover:tracking-wider'
                    }`}
                >
                    {link.label}
                </Link>
                ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button 
                    onClick={onOpenCart}
                    className="relative group bg-neutral-100/50 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all p-2.5 rounded-full active:scale-95"
                >
                    <ShoppingBag size={18} strokeWidth={1.5} className="text-neutral-700 group-hover:text-black transition-colors" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white font-bold ring-2 ring-white">
                        {cartCount}
                        </span>
                    )}
                </button>
                <button 
                    className="md:hidden text-[#1C1C1E] p-2.5 bg-neutral-100/50 rounded-full active:scale-95 transition-transform"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl px-6 md:hidden flex flex-col justify-center"
          >
            <nav className="flex flex-col gap-6 items-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  // Using motion component for animation inside link would require converting Link to motion.a or similar, 
                  // but keeping it simple with inline styles for now or wrapping
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                        className={`text-4xl font-light tracking-tight block ${isActive(link.path) ? 'text-black font-medium' : 'text-neutral-500'}`}
                    >
                        {link.label}
                    </motion.span>
                </Link>
              ))}
            </nav>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 text-xs text-neutral-400 font-bold uppercase tracking-widest"
            >
                <button>Prijava</button>
                <button>Podrška</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};