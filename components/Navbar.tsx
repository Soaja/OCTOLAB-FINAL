import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Circle, Aperture } from 'lucide-react';
import { PageView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: PageView) => void;
  currentPage: PageView;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: PageView.HOME },
    { label: 'About Us', page: PageView.ABOUT },
    { label: 'Catalog', page: PageView.SHOP },
    { label: 'Info', page: PageView.INFO },
    { label: 'Contact Us', page: PageView.CONTACT },
  ];

  return (
    <>
      {/* 
        STATIC FLOATING HEADER 
        Fixed position, glassmorphic background, capsule shape.
        No scroll animations on width/color.
      */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-[1000px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-4 flex items-center justify-between transition-all">
            
            {/* LOGO: Modern, typographic, minimal */}
            <button 
                onClick={() => onNavigate(PageView.HOME)} 
                className="flex items-center gap-2.5 group shrink-0"
            >
                <div className="relative flex items-center justify-center">
                    {/* Abstract Aperture Logo */}
                    <Aperture className="w-6 h-6 text-neutral-900 stroke-[1.5px] group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
                    <div className="absolute w-1 h-1 bg-black rounded-full" />
                </div>
                <div className="flex flex-col items-start leading-none md:hidden lg:flex">
                  <span className="text-lg font-bold tracking-tight text-[#0B0B0C] group-hover:text-black transition-colors font-manrope">
                    OCTOLAB
                  </span>
                </div>
            </button>

            {/* Desktop Nav - Centered & Clean */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {navLinks.map((link) => (
                <button
                    key={link.label}
                    onClick={() => onNavigate(link.page)}
                    className={`text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 ${
                    currentPage === link.page 
                        ? 'text-black' 
                        : 'text-neutral-500 hover:text-black hover:tracking-wider'
                    }`}
                >
                    {link.label}
                </button>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <button 
                    onClick={() => onNavigate(PageView.CART)}
                    className="relative group bg-neutral-100/50 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all p-2.5 rounded-full"
                >
                    <ShoppingBag size={18} strokeWidth={1.5} className="text-neutral-700 group-hover:text-black transition-colors" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white font-bold ring-2 ring-white">
                        {cartCount}
                        </span>
                    )}
                </button>
                <button 
                    className="md:hidden text-[#1C1C1E] p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-32 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-4xl font-light tracking-tight text-[#0B0B0C]"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-10 right-6 p-4 text-neutral-500"
            >
                <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};