import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Activity, FlaskConical, Microscope, Truck, Package, AlertTriangle, Plus, Minus, CheckCircle2, FileText, Thermometer, Zap, Droplets, FileSearch, Lock, ThermometerSnowflake, BoxSelect, ScanSearch, Factory, Snowflake, PackageCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

// --- COMPONENTS ---

const ModernDisclaimer = () => (
  <div className="w-full bg-amber-50/80 border-y border-amber-100/80 py-3 flex justify-center items-center relative z-20 overflow-hidden group backdrop-blur-sm">
      {/* Subtle diagonal pattern for technical feel - tinted amber */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(45deg,#F59E0B_25%,transparent_25%,transparent_50%,#F59E0B_50%,#F59E0B_75%,transparent_75%,transparent)] bg-[size:8px_8px] pointer-events-none" />
      
      <div className="flex items-center gap-3 px-4 relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <AlertTriangle size={11} className="stroke-2 text-amber-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900">
            ROU • Nije za ljudsku i veterinarsku upotrebu
          </span>
          <AlertTriangle size={11} className="stroke-2 text-amber-600" />
      </div>
  </div>
);

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string, subtitle?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} max-w-4xl mx-auto`}>
    {subtitle && (
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            {subtitle}
        </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0C] tracking-tight leading-[1.1]">
      {title}
    </h2>
  </div>
);

// 1. HERO SECTION (Updated Scale)
// Iridescent gradient — boje sa etikete bočice
const IRIDESCENT = 'linear-gradient(90deg, #bfdbfe 0%, #c4b5fd 30%, #f9a8d4 58%, #fde68a 85%, #bfdbfe 100%)';

const Hero = () => {
    const navigate = useNavigate();

    const pills = [
        { label: 'RETATRUTIDE', dot: '#3b82f6' },
        { label: 'BPC-157',     dot: '#ef4444' },
        { label: 'GHK-CU',     dot: '#6b7280' },
        { label: 'SEMAX',      dot: '#3b82f6' },
    ];

    const trustItems = [
        'HPLC/MS testirano',
        '>99% čistoća',
        'Brza isporuka u Srbiji',
        'Hladni lanac',
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{
                minHeight: '100vh',
                backgroundImage: "url('/images/background.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* ── Two-column grid, full viewport height ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">

                {/* ══════════════ LEFT COLUMN ══════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 pb-12 lg:py-16"
                >
                    {/* Eyebrow label */}
                    <div className="flex items-center gap-2.5 mb-7">
                        <div
                            className="h-[2px] w-8 rounded-full"
                            style={{ background: IRIDESCENT }}
                        />
                        <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-400">
                            Research Grade · Srbija
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1
                        className="font-black text-[#0c1220] leading-[0.88] tracking-tight mb-6"
                        style={{ fontSize: 'clamp(48px, 6vw, 82px)' }}
                    >
                        PEPTIDI ZA<br />
                        ISTRAŽIVANJE<br />
                        U SRBIJI.
                    </h1>

                    {/* Iridescent accent bar */}
                    <div
                        className="h-[3px] w-24 rounded-full mb-7"
                        style={{ background: IRIDESCENT }}
                    />

                    {/* Subtext */}
                    <p className="text-[15px] text-neutral-500 leading-relaxed mb-9 max-w-[340px]">
                        Laboratorijski testirani peptidi čistoće preko 99%.<br />
                        Brza isporuka hladnim lancem na teritoriji Srbije.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        <button
                            onClick={() => navigate('/peptidi-srbija')}
                            className="group relative flex items-center gap-2 bg-[#0c1220] text-white rounded-full px-7 py-3.5 text-[13px] font-semibold overflow-hidden hover:bg-[#1a2440] transition-colors active:scale-[0.97] shadow-lg shadow-neutral-900/10"
                        >
                            {/* Iridescent shimmer on hover */}
                            <span
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"
                                style={{ background: IRIDESCENT }}
                            />
                            Istraži Peptide
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <button
                            onClick={() => navigate('/laboratorijski-standard')}
                            className="flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold text-neutral-700 bg-white/60 border border-neutral-200 backdrop-blur-sm hover:bg-white hover:border-neutral-300 transition-all active:scale-[0.97]"
                        >
                            Protokoli Kvaliteta
                        </button>
                    </div>

                    {/* Trust items — horizontal row */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                        {trustItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 size={13} className="text-neutral-400 shrink-0" />
                                <span className="text-[12px] font-medium text-neutral-500">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ══════════════ RIGHT COLUMN ══════════════ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="relative flex flex-col items-center justify-center min-h-[440px] lg:min-h-0 py-8 lg:py-16"
                >
                    {/* Product name pill badges — float above image */}
                    <div className="hidden md:flex items-end gap-2.5 mb-5 z-20 relative">
                        {pills.map((pill, i) => (
                            <motion.div
                                key={pill.label}
                                initial={{ opacity: 0, y: -14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                                style={{ transform: `translateY(${i * -8}px)` }}
                                className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/65 backdrop-blur-md px-3.5 py-[6px] shadow-sm"
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: pill.dot }}
                                />
                                <span className="text-[9.5px] font-black uppercase tracking-[0.14em] text-[#1e2a40]">
                                    {pill.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Product image — bottom-aligned, sits on background glow rings */}
                    <motion.img
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        src="/images/peptidi4.png"
                        alt="OCTOLAB istraživački peptidi — Retatrutide, GHK-Cu, BPC-157, Semax"
                        className="object-contain object-bottom w-full z-10"
                        style={{ maxWidth: '740px', maxHeight: '80vh' }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

// 2. INTRO / SEO BLOCK (MODERNIZED & SCALED UP)
const OctolabIntro = () => (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                
                {/* Left Side: Headline & Lead - NOW STICKY & LARGER */}
                <div className="lg:col-span-5 lg:sticky top-32 mb-12 lg:mb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                         <div className="flex items-center gap-3 mb-8">
                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">O Octolabu</span>
                         </div>

                        {/* Scaled Up Typography to Match TrustBlock */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#0B0B0C] leading-[0.9] mb-8 break-words overflow-hidden">
                            Zašto kupiti  <br/> PEPTIDE od OCTOLAB-A <br/>
                            <span className="text-neutral-400">u Srbiji.</span>
                        </h2>
                        
                        <div className="w-12 h-1 bg-black mb-8" />

                        <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                            OCTOLAB je vodeći dobavljač istraživačkih peptida u Srbiji. Garantujemo čistoću preko 99%, HPLC sertifikat analize i dostavu hladnim lancem na teritoriji cele Srbije.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Detailed Grid */}
                <div className="lg:col-span-7 flex flex-col gap-12">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-600 leading-relaxed text-lg font-medium"
                    >
                         Specijalizovani smo za prodaju istraživačkih peptida u Srbiji — BPC-157, TB-500, GHK-Cu, CJC-1295, Retatrutide i Semax. Bez rizika uvoza, bez carine. Naručite peptide online i primite ih sutra na kućnu adresu.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Lokalna Dostupnost",
                                desc: "Bez carine i čekanja. Isporuka iz Beograda u roku od 24h."
                            },
                            {
                                title: "Hladni Lanac",
                                desc: "Skladištenje na -20°C. Transport u termo-izolovanoj ambalaži."
                            },
                             {
                                title: "HPLC Verifikacija",
                                desc: "Svaka serija testirana. Čistoća >99% garantovana sertifikatom."
                            },
                             {
                                title: "Pravna Sigurnost",
                                desc: "Usklađeno sa regulativom. Isključivo za in-vitro istraživanja."
                            }
                        ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="group bg-[#F9F9FB] p-6 rounded-2xl border border-transparent hover:border-neutral-200 hover:bg-white hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-300"
                            >
                                <div className="mb-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold border border-neutral-100 group-hover:bg-black group-hover:text-white transition-colors">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-[#0B0B0C] mb-2 text-lg">{item.title}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </section>
);

// Helper Component for Product Grid
const ProductCard: React.FC<{ product: Product, onClick: () => void, className?: string }> = ({ product, onClick, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className={`group bg-white rounded-[2.5rem] p-5 md:p-6 border border-transparent hover:border-neutral-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-full cursor-pointer ${className}`}
            onClick={onClick}
        >
            {/* Square Image Placeholder */}
            <div className="aspect-square w-full bg-[#F5F5F7] rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden mb-6 md:mb-8">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-100 shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-grow px-1">
                <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0B0B0C] mb-2 tracking-tight">{product.name}</h3>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.subtitle}</p>
                </div>

                <p className="text-sm text-neutral-600 line-clamp-3 mb-8 leading-relaxed font-medium">
                    {product.description}
                </p>

                {/* Footer: Price and Details */}
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-neutral-100/80">
                    <span className="text-2xl font-bold text-[#0B0B0C] tracking-tight">€{product.price.toFixed(2)}</span>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B0B0C] group-hover:text-neutral-600 transition-colors">
                        Detaljnije <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// 3. PRODUCT GRID (Selling Section)
const ProductGrid = () => {
    const navigate = useNavigate();
    
    // 1. Define the 2x2 Grid Items (TB-500 removed)
    const gridSlugs = [
        'bpc-157-peptid-srbija',
        'ghk-cu-peptid-srbija',
        'retatrutide-peptid-srbija',
        'semax-peptid-srbija'
    ];

    // 2. Define the Bottom Water Item
    const waterSlug = 'bacteriostatic-water-srbija';

    const gridProducts = PRODUCTS.filter(p => gridSlugs.includes(p.slug));
    const waterProduct = PRODUCTS.find(p => p.slug === waterSlug);

    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
            {/* Subtle Gradient to give depth behind the white cards */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-white to-transparent opacity-60 -z-10 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-4 md:px-6">

                {/* --- CUSTOM HEADER FOR PRODUCT GRID --- */}
                <div className="mb-24 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start"
                    >
                        <div className="flex items-center gap-3 mb-6 px-4 py-2 bg-white rounded-full border border-neutral-100 shadow-sm">
                            <Activity size={14} className="text-[#0B0B0C]" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-600">Visoka Potražnja</span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#0B0B0C] leading-[0.85] mb-8 break-words overflow-hidden">
                            NAJPRODAVANIJI <br/>
                            <span className="text-neutral-400">PEPTIDI U SRBIJI.</span>
                        </h2>

                        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 border-t border-neutral-200 pt-8">
                            <p className="text-lg text-neutral-600 max-w-lg leading-relaxed">
                                Najpopularniji istraživački peptidi dostupni u Srbiji. BPC-157 za oporavak, GHK-Cu za kožu, Retatrutide za metabolizam i Semax za kognitivne funkcije. Svi sa HPLC sertifikatom čistoće preko 99%.
.
                            </p>
                            <div className="hidden md:block">
                                 <Button onClick={() => navigate('/peptidi-srbija')} variant="ghost" className="hover:bg-neutral-100 rounded-full px-8">
                                    Pregledaj Katalog <ArrowRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* --- END CUSTOM HEADER --- */}
                
                {/* 2x2 Peptide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                    {gridProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            onClick={() => navigate(`/${product.slug}`)}
                        />
                    ))}
                </div>

                {/* Wide Water Card - Horizontal Layout on Desktop */}
                {waterProduct && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => navigate(`/${waterProduct.slug}`)}
                        className="group bg-white rounded-[2.5rem] p-6 md:p-8 border border-transparent hover:border-neutral-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center gap-8 md:gap-12"
                    >
                         {/* Image Left */}
                         <div className="w-full md:w-1/3 shrink-0">
                            <div className="aspect-[4/3] md:aspect-square bg-[#F5F5F7] rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden">
                                <motion.img
                                    src={waterProduct.image}
                                    alt={waterProduct.name}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-100 shadow-sm flex items-center gap-2">
                                        <Droplets size={12} className="text-blue-500" />
                                        Oprema
                                    </span>
                                </div>
                            </div>
                         </div>

                         {/* Content Right */}
                         <div className="flex-1 text-center md:text-left">
                             <h3 className="text-2xl md:text-4xl font-bold text-[#0B0B0C] mb-2 tracking-tight">{waterProduct.name}</h3>
                             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">{waterProduct.subtitle}</p>
                             
                             <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8 max-w-xl">
                                 {waterProduct.description} Neophodna komponenta za sigurnu i sterilnu rekonstituciju liofilizovanih peptida. Sadrži 0.9% benzil alkohola.
                             </p>

                             <div className="flex items-center justify-between md:justify-start gap-8 pt-6 border-t border-neutral-100/80 md:border-t-0 md:pt-0">
                                <span className="text-3xl font-bold text-[#0B0B0C] tracking-tight">€{waterProduct.price.toFixed(2)}</span>
                                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-black px-6 py-3 rounded-full group-hover:bg-neutral-800 transition-colors shadow-lg">
                                    Dodaj u Laboratoriju <ArrowRight size={14} />
                                </button>
                             </div>
                         </div>
                    </motion.div>
                )}
                
                <div className="mt-20 text-center md:hidden">
                    <Button onClick={() => navigate('/peptidi-srbija')} variant="outline" size="lg" className="bg-white border-neutral-200 hover:bg-neutral-50 px-12">
                        Pregledaj Ceo Katalog
                    </Button>
                </div>
            </div>
        </section>
    );
};

// 4. WHY US (Trust Block)
const TrustBlock = () => (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                {/* LEFT: Manifesto Title */}
                <div className="lg:col-span-5 lg:sticky top-32 mb-12 lg:mb-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                             <div className="h-px w-12 bg-black"></div>
                             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Naš Standard</span>
                        </div>

                        {/* Optimized Typography for Responsive Layouts */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#0B0B0C] leading-[0.9] mb-8 w-full break-words overflow-hidden">
                              GARANTOVANI KVALITET <br/>
                            <span className="text-neutral-400">PEPTIDA.</span>
                        </h2>

                        <p className="text-lg text-neutral-600 font-medium leading-relaxed mb-12 max-w-sm">
                            Svaki peptid koji prodajemo u Srbiji prolazi dvostruku laboratorijsku verifikaciju — HPLC hromatografiju za čistoću i masenu spektrometriju za identitet. Nula filera, nula kompromisa.
                        </p>

                        <div className="hidden lg:block">
                            <div className="inline-flex flex-col gap-2">
                                <span className="text-[10px] font-mono uppercase text-neutral-400">Verifikacioni Kod</span>
                                <span className="text-3xl font-mono font-bold text-neutral-200">OCT-2024-V1</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Technical Spec List */}
                <div className="lg:col-span-7 flex flex-col gap-0">
                    {[
                        { 
                            id: "01",
                            title: "Laboratorijska Analiza", 
                            subtitle: "Dvostruka Verifikacija",
                            desc: "Svaka serija prolazi HPLC (Hromatografija) za čistoću i MS (Masena Spektrometrija) za potvrdu identiteta.",
                            icon: <FileSearch size={28} />
                        },
                        { 
                            id: "02",
                            title: "API Grade Čistoća", 
                            subtitle: ">99% Garantovano",
                            desc: "Bez filera, bez manitola niske čistoće. Samo aktivna farmaceutska supstanca za precizno doziranje.",
                            icon: <FlaskConical size={28} />
                        },
                        { 
                            id: "03",
                            title: "Hladni Lanac", 
                            subtitle: "Termalni Integritet",
                            desc: "Skladištenje na -20°C od trenutka sinteze. Isporuka u termo-izolovanoj ambalaži za očuvanje peptidnih veza.",
                            icon: <ThermometerSnowflake size={28} />
                        },
                        { 
                            id: "04",
                            title: "Diskrecija & Sigurnost", 
                            subtitle: "Anonimna Logistika",
                            desc: "Neutralno pakovanje bez oznaka brenda. Podaci klijenata su kriptovani i nikada se ne dele.",
                            icon: <Lock size={28} />
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="group relative py-10 border-t border-neutral-100 last:border-b hover:border-black/10 transition-colors duration-500"
                        >
                            <div className="flex flex-col md:flex-row gap-8 md:items-start relative z-10">
                                {/* Number */}
                                <span className="text-xs font-mono font-bold text-neutral-300 group-hover:text-black transition-colors pt-2">
                                    {item.id}
                                </span>

                                {/* Icon Box */}
                                <div className="w-16 h-16 rounded-2xl bg-[#F9F9FB] border border-transparent group-hover:border-neutral-200 group-hover:bg-white flex items-center justify-center text-neutral-400 group-hover:text-black transition-all duration-500 shrink-0">
                                    {item.icon}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-2xl font-bold text-[#0B0B0C] tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-green-600 transition-colors">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed font-medium max-w-xl group-hover:text-neutral-900 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    </section>
);

// 5. QUALITY PROCESS (Visual Flow) - NEW REDESIGN
const ProcessFlow = () => (
    <section className="py-32 bg-[#050505] text-white relative overflow-hidden">
        {/* Abstract Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[200px] bg-green-900/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-24">
                <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-green-500 mb-6 backdrop-blur-md">
                    Octolab Pipeline
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-4">
                    Proces Verifikacije
                </h2>
                <p className="text-neutral-500 max-w-xl mx-auto text-lg font-light">
                    Rigorozan lanac kontrole od sinteze do vaše laboratorije.
                </p>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {[
                        { id: '01', title: 'Peptidna Sinteza', desc: 'Solid-phase automatizovana sinteza.', icon: <Factory size={20} /> },
                        { id: '02', title: 'HPLC & MS Analiza', desc: 'Dvostruka verifikacija čistoće i mase.', icon: <ScanSearch size={20} /> },
                        { id: '03', title: 'Liofilizacija', desc: 'Stabilizacija u vakuumskom okruženju.', icon: <Snowflake size={20} /> },
                        { id: '04', title: 'Termalno Pakovanje', desc: 'Izolacija za transport hladnog lanca.', icon: <PackageCheck size={20} /> },
                        { id: '05', title: 'Ekspres Isporuka', desc: 'Dostava na adresu unutar 24h.', icon: <Truck size={20} /> },
                    ].map((step, i) => (
                        <div key={i} className="group relative z-10 flex flex-col items-center text-center">
                            
                            {/* Card Wrapper */}
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="w-full bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                            >
                                {/* Background Number */}
                                <span className="absolute -right-4 -bottom-8 text-[8rem] font-bold text-white/5 pointer-events-none select-none font-mono">
                                    {step.id}
                                </span>

                                {/* Icon Container */}
                                <div className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-white mb-6 mx-auto relative group-hover:border-green-500/50 transition-colors shadow-lg shadow-black/50">
                                    {step.icon}
                                    {/* Pulse Effect */}
                                    <div className="absolute inset-0 rounded-full border border-green-500/30 scale-110 opacity-0 group-hover:animate-ping" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-neutral-400 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>

                            {/* Mobile Connector */}
                            {i < 4 && (
                                <div className="md:hidden h-8 w-px bg-white/10 my-2" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// 6. FAQ (Optimized - Modern & Clean)
const FAQ = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
    const questions = [
      {
        question: "Šta su research peptidi?",
        answer: "Research peptidi su hemijska jedinjenja namenjena isključivo za in vitro laboratorijska istraživanja. Koriste se za proučavanje bioloških mehanizama, signalnih puteva i ćelijskih reakcija. Nisu namenjeni za ljudsku upotrebu."
      },
      {
        question: "Kako se proizvodi transportuju?",
        answer: "Koristimo specijalizovano termalno pakovanje (Hladni Lanac) kako bismo zaštitili peptide od temperaturnih oscilacija. Isporuka se vrši brzom kurirskom službom (Post Express) po principu 'danas za sutra'."
      },
      {
        question: "Kako se čuvaju peptidi?",
        answer: "Liofilizovani prah treba čuvati u zamrzivaču na -20°C gde ostaje stabilan godinama. Nakon rekonstitucije sa bakteriostatskom vodom, obavezno čuvati u frižideru na +4°C i iskoristiti u roku od nekoliko nedelja."
      },
      {
        question: "Koliko traje dostava u Srbiji?",
        answer: "Porudžbine kreirane radnim danima do 15h šalju se istog dana. Očekivano vreme isporuke na vašu adresu je 24 sata (sledeći radni dan)."
      },
      {
        question: "Da li imate sertifikate analize?",
        answer: "Da, za svaku seriju posedujemo HPLC (test čistoće) i MS (masena spektrometrija) izveštaje od nezavisnih laboratorija. Ovi podaci su dostupni na zahtev ili na stranici proizvoda."
      },
      {
        question: "Koliko koštaju peptidi u Srbiji?",
        answer: "Cene istraživačkih peptida na OCTOLAB-u kreću se od 5€ za bakteriostatsku vodu do 100€ za napredna jedinjenja poput Retatrutida. Većina popularnih peptida kao BPC-157, TB-500, GHK-Cu i Semax košta 50€. Dostava je 5€ za hladni lanac transport. Plaćanje je pouzećem."
      },
      {
        question: "Da li je kupovina peptida legalna u Srbiji?",
        answer: "Da, kupovina peptida za istraživačke svrhe je legalna u Srbiji. Svi naši proizvodi su namenjeni isključivo za in-vitro laboratorijska istraživanja i nisu namenjeni za ljudsku upotrebu. OCTOLAB posluje u skladu sa svim važećim regulativama."
      }
    ];
  
    return (
      <section className="py-32 bg-white overflow-hidden relative">
        {/* Subtle Background Blob */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-neutral-100 rounded-full blur-[120px] -z-10 pointer-events-none opacity-60" />

        <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-10">
            {/* Custom Header for FAQ */}
            <div className="mb-24 text-center max-w-3xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-6"
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F5F7] border border-neutral-200/60">
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                         </span>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Baza Znanja</span>
                    </div>
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#0B0B0C] mb-6 leading-[0.9]"
                >
                    Najčešća Pitanja o <br/>
                    <span className="text-neutral-400">Peptidima u Srbiji.</span>
                </motion.h2>

                <motion.p
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="text-neutral-600 text-lg max-w-xl mx-auto leading-relaxed"
                >
                    Odgovori na najčešća pitanja o kupovini peptida u Srbiji — šta su research peptidi, kako se čuvaju, koliko traje dostava i da li imamo sertifikate analize.

                </motion.p>
            </div>
          
            <div className="flex flex-col gap-4">
                {questions.map((q, i) => (
                    <motion.div 
                        key={i}
                        layout
                        initial={false}
                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                        className={`group cursor-pointer rounded-3xl p-6 md:p-8 transition-all duration-500 border ${activeIndex === i ? 'bg-[#F9F9FB] border-neutral-200 shadow-xl shadow-neutral-100/50' : 'bg-transparent border-transparent hover:bg-white hover:border-neutral-100'}`}
                    >
                        <motion.div layout className="flex justify-between items-start gap-6">
                            <div className="flex items-start gap-4 md:gap-6">
                                {/* Numbering */}
                                <span className={`text-xs font-mono font-bold mt-1.5 transition-colors ${activeIndex === i ? 'text-black' : 'text-neutral-300'}`}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                
                                {/* Question Title */}
                                <h3 className={`text-xl md:text-2xl font-bold transition-colors leading-tight ${activeIndex === i ? 'text-black' : 'text-neutral-500 group-hover:text-black'}`}>
                                    {q.question}
                                </h3>
                            </div>

                            {/* Animated Toggle Icon */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${activeIndex === i ? 'bg-black text-white rotate-90' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-black'}`}>
                               {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {activeIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 pl-10 md:pl-16 pr-4 md:pr-12">
                                        <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                                            {q.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-16 text-center">
                <p className="text-neutral-500 mb-4">Niste našli odgovor?</p>
                <button 
                    onClick={() => navigate('/kontakt')}
                    className="text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-neutral-600 hover:border-neutral-300 transition-all"
                >
                    Kontaktirajte Podršku
                </button>
            </div>
        </div>
      </section>
    );
};

// 7. RESEARCH / EDUCATION PREVIEW (Modern Dark Theme)
const ResearchPreview = () => {
    const navigate = useNavigate();
    return (
        <section className="py-32 bg-[#0B0B0C] text-white relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div>
                        <span className="text-green-500 font-mono text-xs uppercase tracking-widest mb-4 block">
                            Research Centar
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
                            Metodologija <br/>
                            <span className="text-neutral-500">& Edukacija.</span>
                        </h2>
                    </div>
                    <Button 
                        onClick={() => navigate('/research-centar')} 
                        variant="outline" 
                        className="border-neutral-700 text-white hover:bg-white hover:text-black hidden md:flex"
                    >
                        Pristupi Bazi Znanja
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { 
                            title: "Vodič za Rekonstituciju", 
                            desc: "Korak-po-korak protokol za mešanje i čuvanje.",
                            icon: <FlaskConical className="w-6 h-6" /> 
                        },
                        { 
                            title: "Tumačenje HPLC", 
                            desc: "Kako čitati hromatograme i razumeti čistoću.",
                            icon: <Activity className="w-6 h-6" /> 
                        },
                        { 
                            title: "Podaci o Stabilnosti", 
                            desc: "Termalna degradacija i rokovi trajanja.",
                            icon: <Thermometer className="w-6 h-6" /> 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
                            onClick={() => navigate('/research-centar')}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-between items-start mb-12">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <ArrowRight className="text-neutral-500 group-hover:text-white group-hover:-rotate-45 transition-all" />
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-8 md:hidden">
                     <Button 
                        onClick={() => navigate('/research-centar')} 
                        variant="outline" 
                        className="w-full border-neutral-700 text-white hover:bg-white hover:text-black"
                    >
                        Pristupi Bazi Znanja
                    </Button>
                </div>
            </div>
        </section>
    );
};

// 8. FINAL CTA (Modern Large Scale)
const FinalCTA = () => {
    const navigate = useNavigate();
    return (
        <section className="py-32 md:py-48 bg-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neutral-100 rounded-full blur-[120px] -z-10" />
             
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-[0.85] break-words overflow-hidden">
                        OCTOLAB
                    </h2>
                    <p className="text-xl md:text-3xl text-neutral-500 font-light mb-12 max-w-2xl mx-auto">
                        Standard za precizna biohemijska istraživanja u Srbiji.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button 
                            onClick={() => navigate('/peptidi-srbija')} 
                            size="lg" 
                            className="bg-[#0B0B0C] text-white hover:bg-neutral-800 px-12 h-16 rounded-full text-lg shadow-2xl shadow-neutral-200 min-w-[200px]"
                        >
                            Katalog
                        </Button>
                        <Button 
                            onClick={() => navigate('/kontakt')} 
                            variant="outline"
                            size="lg" 
                            className="bg-white text-black border-neutral-200 hover:bg-neutral-50 px-12 h-16 rounded-full text-lg min-w-[200px]"
                        >
                            Kontakt
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export const Home: React.FC = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Šta su research peptidi?",
          "acceptedAnswer": { "@type": "Answer", "text": "Research peptidi su hemijska jedinjenja namenjena isključivo za in vitro laboratorijska istraživanja. Koriste se za proučavanje bioloških mehanizama, signalnih puteva i ćelijskih reakcija. Nisu namenjeni za ljudsku upotrebu." }
        },
        {
          "@type": "Question",
          "name": "Kako se proizvodi transportuju?",
          "acceptedAnswer": { "@type": "Answer", "text": "Koristimo specijalizovano termalno pakovanje (Hladni Lanac) kako bismo zaštitili peptide od temperaturnih oscilacija. Isporuka se vrši brzom kurirskom službom (Post Express) po principu 'danas za sutra'." }
        },
        {
          "@type": "Question",
          "name": "Kako se čuvaju peptidi?",
          "acceptedAnswer": { "@type": "Answer", "text": "Liofilizovani prah treba čuvati u zamrzivaču na -20°C gde ostaje stabilan godinama. Nakon rekonstitucije sa bakteriostatskom vodom, obavezno čuvati u frižideru na +4°C i iskoristiti u roku od nekoliko nedelja." }
        },
        {
          "@type": "Question",
          "name": "Koliko traje dostava u Srbiji?",
          "acceptedAnswer": { "@type": "Answer", "text": "Porudžbine kreirane radnim danima do 15h šalju se istog dana. Očekivano vreme isporuke na vašu adresu je 24 sata (sledeći radni dan)." }
        },
        {
          "@type": "Question",
          "name": "Da li imate sertifikate analize?",
          "acceptedAnswer": { "@type": "Answer", "text": "Da, za svaku seriju posedujemo HPLC (test čistoće) i MS (masena spektrometrija) izveštaje od nezavisnih laboratorija. Ovi podaci su dostupni na zahtev ili na stranici proizvoda." }
        },
        {
          "@type": "Question",
          "name": "Koliko koštaju peptidi u Srbiji?",
          "acceptedAnswer": { "@type": "Answer", "text": "Cene istraživačkih peptida na OCTOLAB-u kreću se od 5€ za bakteriostatsku vodu do 100€ za napredna jedinjenja poput Retatrutida. Većina popularnih peptida kao BPC-157, TB-500, GHK-Cu i Semax košta 50€. Dostava je 5€ za hladni lanac transport. Plaćanje je pouzećem." }
        },
        {
          "@type": "Question",
          "name": "Da li je kupovina peptida legalna u Srbiji?",
          "acceptedAnswer": { "@type": "Answer", "text": "Da, kupovina peptida za istraživačke svrhe je legalna u Srbiji. Svi naši proizvodi su namenjeni isključivo za in-vitro laboratorijska istraživanja i nisu namenjeni za ljudsku upotrebu. OCTOLAB posluje u skladu sa svim važećim regulativama." }
        }
      ]
    };
    const scriptId = 'faq-schema';
    let el = document.getElementById(scriptId) as HTMLScriptElement;
    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { document.getElementById(scriptId)?.remove(); };
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden relative">
      <SEO
        title="OCTOLAB Srbija | Research Peptidi i Laboratorijska Oprema"
        description="Vodeći dobavljač research peptida u Srbiji. BPC-157, GHK-Cu, TB-500 visoke čistoće (>99%). HPLC sertifikovani, brza isporuka, hladni lanac."
        canonical="https://www.octolab.rs/"
      />

      <Hero />
      <ModernDisclaimer />
      <OctolabIntro />
      <ModernDisclaimer />
      <ProductGrid />
      <ModernDisclaimer />
      <TrustBlock />
      <ModernDisclaimer />
      <ProcessFlow />
      <ModernDisclaimer />
      <FAQ />
      <ModernDisclaimer />
      <ResearchPreview />
      <ModernDisclaimer />
      <FinalCTA />
    </div>
  );
};
