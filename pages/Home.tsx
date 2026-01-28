import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Zap, Box, Activity, FlaskConical, Dna, Atom, Filter, ScanSearch, Microscope, Binary, Search, Terminal, ChevronRight } from 'lucide-react';
import { PageView } from '../types';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

// 1. MODERN GRADIENT BACKGROUND
const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white">
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      
      {/* Centered Blobs for new layout */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-50/40 rounded-full blur-[120px]" 
      />
    </div>
  );
};

// 2. NEW: SMART RESEARCH INTERFACE (Replaces DigitalVial)
const ResearchInterface = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  
  // Parallax for floating elements
  const dataX = useTransform(x, [-0.5, 0.5], [-20, 20]);
  const dataY = useTransform(y, [-0.5, 0.5], [-20, 20]);

  // Glare effect position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative perspective-1000 w-full max-w-md aspect-[4/5] flex items-center justify-center transform scale-90 md:scale-100">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden cursor-crosshair group"
      >
        {/* INNER GLASS LAYER */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8F8FA] to-[#EFF0F5] opacity-50 pointer-events-none" />

        {/* SCANNING GRID BACKGROUND (Subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

        {/* VIAL IMAGE (Floating in 3D) */}
        <motion.div 
           style={{ zIndex: 10, transform: "translateZ(40px)" }}
           className="absolute inset-0 flex items-center justify-center p-12"
        >
           {/* Using the specific GHK-Cu placeholder for realism */}
           <img 
              src="https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop" 
              alt="GHK-Cu Vial" 
              className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply filter contrast-110"
           />
        </motion.div>

        {/* FLOATING DATA TAGS (Parallax) */}
        <motion.div style={{ x: dataX, y: dataY, transform: "translateZ(60px)" }} className="absolute inset-0 pointer-events-none z-20">
           
           {/* Tag 1: Purity */}
           <div className="absolute top-20 right-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/60 shadow-sm">
                 <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Purity Analysis</div>
                 <div className="text-sm font-bold text-neutral-900 font-mono">99.8%</div>
              </div>
           </div>

           {/* Tag 2: Sequence */}
           <div className="absolute bottom-32 left-8 flex items-center gap-2">
              <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/60 shadow-sm text-right">
                 <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Sequence</div>
                 <div className="text-sm font-bold text-neutral-900 font-mono">Gly-His-Lys</div>
              </div>
              <div className="w-2 h-2 bg-neutral-900 rounded-full" />
           </div>

           {/* Tag 3: CAS */}
           <div className="absolute bottom-12 right-12">
              <div className="bg-black/90 text-white backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg">
                 <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">CAS Registry</div>
                 <div className="text-xs font-bold font-mono">49557-75-7</div>
              </div>
           </div>
        </motion.div>

        {/* INTERACTIVE SCANNING LINE */}
        <motion.div
           className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ 
             left: mouseX,
             transform: "translateZ(50px)"
           }}
        />
        
        {/* GLARE EFFECT */}
        <motion.div 
           style={{ 
             background: useMotionTemplate`radial-gradient(
               circle at ${glareX} ${glareY},
               rgba(255,255,255,0.8) 0%,
               rgba(255,255,255,0) 60%
             )`,
             opacity: 0.4,
             transform: "translateZ(1px)"
           }}
           className="absolute inset-0 pointer-events-none mix-blend-overlay"
        />

        {/* BOTTOM UI BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/50 backdrop-blur-xl border-t border-white/50 flex items-center justify-between px-6 z-10">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Live Preview</span>
            </div>
            <Activity size={14} className="text-neutral-400" />
        </div>

      </motion.div>
    </div>
  );
};


export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Hero Mouse Interaction Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden relative">
      
      {/* HERO SECTION - CENTERED LAYOUT */}
      <section 
        className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-48 overflow-hidden"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ModernBackground />

        {/* LEFT FLANK: Vertical Chromatogram Scale */}
        <div className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-30 select-none pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 [writing-mode:vertical-rl] rotate-180">
            ABSORBANCE UNITS (mAU)
          </span>
          <div className="h-64 w-[1px] bg-gradient-to-b from-transparent via-neutral-400 to-transparent relative">
            {/* Moving Scanner Line */}
            <motion.div 
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              className="absolute -left-1.5 w-4 h-[1px] bg-black"
            />
            {/* Ticks */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute w-1.5 h-[1px] bg-neutral-400 -left-[2px]" style={{ top: `${i * 10}%` }} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <FlaskConical size={16} strokeWidth={1} className="text-neutral-500" />
            <span className="text-[10px] font-mono">HPLC</span>
          </div>
        </div>

        {/* RIGHT FLANK: Vertical Peptide Chain */}
        <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-30 select-none pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <Dna size={16} strokeWidth={1} className="text-neutral-500" />
            <span className="text-[10px] font-mono">SEQ</span>
          </div>
          <div className="h-64 w-[1px] border-l border-dashed border-neutral-400 relative flex flex-col justify-between items-center py-2">
             {/* Nodes */}
             <div className="w-2 h-2 rounded-full border border-neutral-500 bg-white -ml-[4.5px]" />
             <div className="w-2 h-2 rounded-full border border-neutral-500 bg-white -ml-[4.5px]" />
             <div className="w-2 h-2 rounded-full border border-neutral-500 bg-white -ml-[4.5px]" />
             <motion.div 
               animate={{ boxShadow: ["0 0 0 0px rgba(0,0,0,0)", "0 0 0 4px rgba(0,0,0,0.1)", "0 0 0 0px rgba(0,0,0,0)"] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-2.5 h-2.5 rounded-full bg-black -ml-[4.5px]" 
             />
             <div className="w-2 h-2 rounded-full border border-neutral-500 bg-white -ml-[4.5px]" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 [writing-mode:vertical-rl]">
            MOLECULAR WEIGHT
          </span>
        </div>

        {/* CENTER CONTENT */}
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
             <span className="h-[1px] w-8 md:w-12 bg-neutral-300"></span>
             <span className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-neutral-500">Precision Peptides</span>
             <span className="h-[1px] w-8 md:w-12 bg-neutral-300"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[8.5rem] font-bold tracking-tighter text-[#0B0B0C] leading-[0.9] mb-8"
          >
            CLARITY<br/>
            IN EVERY<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500">MOLECULE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-neutral-600 max-w-2xl leading-relaxed mb-12 font-medium"
          >
            Engineered for the modern researcher. <br className="hidden md:block" />
            Lab-tested compounds synthesized for absolute purity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex w-full justify-center mb-12"
          >
             <Button onClick={() => onNavigate(PageView.SHOP)} size="lg" className="bg-[#0B0B0C] text-white hover:bg-neutral-800 px-12 h-16 text-lg rounded-full shadow-2xl shadow-black/20 hover:scale-105 transition-transform duration-300">
                Shop Catalog
             </Button>
          </motion.div>
        </div>

        {/* FLOATING TRUST DOCK (Centered at bottom) */}
        {/* Hidden on small mobile to avoid clutter, visible on lg */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-[1000px] hidden lg:block">
           <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm rounded-full px-12 py-5 flex justify-between items-center"
           >
              {[
                { label: "Purity", value: ">99.8%", icon: <ShieldCheck size={18} className="text-neutral-400"/> },
                { label: "Analysis", value: "HPLC / MS", icon: <Activity size={18} className="text-neutral-400"/> },
                { label: "Shipping", value: "Cold Chain", icon: <Box size={18} className="text-neutral-400"/> },
                { label: "Dispatch", value: "Same Day", icon: <Zap size={18} className="text-neutral-400"/> },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{stat.label}</span>
                      <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        {stat.value}
                      </span>
                   </div>
                   {i < 3 && <div className="h-6 w-[1px] bg-neutral-200 ml-8 md:ml-16"></div>}
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* 2. FEATURED MOLECULES - 2x2 GRID (REFINED 5x BETTER) */}
      <section className="py-24 bg-white relative z-20">
         <div className="max-w-[1400px] mx-auto px-6">
            
            {/* Centered Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-100/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"/>
                  Essential Research Library
                </motion.span>
                
                <motion.h2 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-5xl md:text-7xl font-semibold tracking-tighter text-[#0B0B0C] leading-[0.9] mb-6"
                >
                  Purity defined. <br />
                  <span className="text-neutral-300">Molecule by molecule.</span>
                </motion.h2>

                <motion.p
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="text-lg text-neutral-500 max-w-xl mx-auto"
                >
                  Standardized research compounds verified for &gt;99% purity.
                  Engineered for consistent biological outcomes.
                </motion.p>
            </div>
            
            {/* The 1:1 Optimized Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 {
                   name: "BPC-157",
                   category: "RECOVERY",
                   purity: "99.8%",
                   format: "Lyophilized 5mg",
                   desc: "Systemic repair and gut health optimization. Highly stable 15-amino acid sequence.",
                   img: "https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop"
                 },
                 {
                   name: "GHK-Cu",
                   category: "COSMETIC",
                   purity: "99.5%",
                   format: "Raw Powder 1g",
                   desc: "Copper tripeptide complex renowned for dermal remodeling and anti-aging properties.",
                   img: "https://lh3.googleusercontent.com/gg-dl/ABS2GSkJPUF7zLJ_pB9VHGNo_Pvj9Kp_8xUYV9P3G4sxF5MKu0eNMjWBscCfmoMHl60qwf_rWfv3NLTyb840_uQGXm8Xcj1RqG78P_vZ7bVJG3j3uD4gEzmdDCiJdbkDnb7MbifGaoZPFt9XvmsIpiAaEy7onKy65tayQgzI-qDMd8_NSn413Q=s1024-rj?authuser=2"
                 },
                 {
                   name: "TB-500",
                   category: "MOBILITY",
                   purity: "99.9%",
                   format: "Lyophilized 10mg",
                   desc: "Synthetic Thymosin Beta-4 analog designed to enhance cellular migration and tissue repair.",
                   img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop"
                 },
                 {
                   name: "CJC-1295",
                   category: "PERFORMANCE",
                   purity: "99.7%",
                   format: "Lyophilized 2mg",
                   desc: "GHRH analog modified for extended half-life. Ideal for metabolic and growth research.",
                   img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop"
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   onClick={() => onNavigate(PageView.SHOP)}
                   className="group relative bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden cursor-pointer"
                 >
                    {/* Top Row: Category & Status */}
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-30">
                        <span className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 text-neutral-600">
                            {item.category}
                        </span>
                        <span className="px-3 py-1 bg-[#0B0B0C] text-white rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-lg shadow-black/10">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
                            In Stock
                        </span>
                    </div>

                    {/* Image Container (1:1 Aspect Ratio) */}
                    <div className="aspect-square w-full flex items-center justify-center p-12 relative z-10">
                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <img 
                            src={item.img} 
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:-translate-y-4" 
                        />
                    </div>

                    {/* Bottom Info Panel with Glassmorphism */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-[#EAEAEC] via-[#F5F5F7]/95 to-transparent z-20 flex flex-col items-start">
                        
                        {/* Technical Specs Row - Visible always */}
                        <div className="flex items-center gap-4 mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                                <Microscope size={12} strokeWidth={2} />
                                <span>Purity {item.purity}</span>
                            </div>
                            <div className="w-[1px] h-3 bg-neutral-400" />
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                                <FlaskConical size={12} strokeWidth={2} />
                                <span>{item.format}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end w-full">
                            <div className="pr-4">
                                <h3 className="text-3xl font-bold text-[#0B0B0C] tracking-tight mb-1 group-hover:translate-x-1 transition-transform duration-300">{item.name}</h3>
                                <p className="text-sm text-neutral-500 max-w-xs line-clamp-1">{item.desc}</p>
                            </div>
                            
                            {/* Action Button */}
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0">
                                <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>
                 </motion.div>
               ))}
            </div>
            
            <div className="mt-16 flex justify-center">
              <Button 
                onClick={() => onNavigate(PageView.SHOP)} 
                variant="ghost" 
                className="text-lg group text-neutral-900 hover:text-black hover:bg-neutral-50 px-8 h-14 rounded-full border border-neutral-200 hover:border-neutral-300 transition-all"
              >
                View Full Catalog <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>
         </div>
      </section>

      {/* 3. HOW IT WORKS (REDESIGNED) */}
      <section className="py-24 md:py-32 bg-white relative z-10 overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
             <motion.span 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-4 block"
             >
               The Octolab Protocol
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-semibold tracking-tighter text-[#0B0B0C] mb-6 leading-tight"
             >
               Scientific rigor, <br />
               <span className="text-neutral-400">simplified.</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-lg text-neutral-500 max-w-xl mx-auto"
             >
               We engineer confidence through a transparent, three-stage verification process designed for absolute reproducibility.
             </motion.p>
          </div>

          {/* The Process Flow */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-[3.25rem] left-0 w-full h-[1px] bg-neutral-100 overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-200 to-transparent" 
                />
             </div>

             {/* Cards */}
             {[
               { 
                 step: "01",
                 title: "Synthesis", 
                 icon: <Atom size={32} strokeWidth={1} />,
                 desc: "Solid-phase peptide synthesis (SPPS) ensuring correct sequence alignment and structural integrity." 
               },
               { 
                 step: "02",
                 title: "Purification", 
                 icon: <Filter size={32} strokeWidth={1} />,
                 desc: "Preparative HPLC technology removes impurities to achieve market-leading purity levels >99%." 
               },
               { 
                 step: "03",
                 title: "Verification", 
                 icon: <ScanSearch size={32} strokeWidth={1} />,
                 desc: "Mass spectrometry and secondary HPLC analysis confirm molecular weight before lyophilization." 
               }
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="relative bg-white/60 backdrop-blur-sm p-8 rounded-[2rem] border border-neutral-100 group hover:border-neutral-300 transition-colors duration-500"
               >
                 {/* Icon Bubble */}
                 <div className="w-20 h-20 bg-white rounded-full border border-neutral-100 shadow-sm flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-neutral-400 group-hover:text-blue-600 transition-colors duration-300">
                      {item.icon}
                    </div>
                    {/* Tiny pulsing dot on active */}
                    <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                 </div>

                 <div className="flex items-baseline gap-3 mb-4">
                   <span className="text-xs font-mono font-bold text-neutral-300">0{i + 1}</span>
                   <h3 className="text-2xl font-bold text-black">{item.title}</h3>
                 </div>
                 
                 <p className="text-neutral-500 leading-relaxed font-medium text-sm">
                   {item.desc}
                 </p>
               </motion.div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" className="border-neutral-200" onClick={() => onNavigate(PageView.QUALITY)}>
               View Quality Standards <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
          </div>

        </div>
      </section>

      {/* 4. NEW: PREMIUM RESEARCH INTERFACE (NO BOX/TETRAPAK) */}
      <section 
        className="relative py-24 md:py-40 bg-[#FBFBFD] overflow-hidden border-t border-neutral-100"
      >
         <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24">
            
            {/* TEXT SIDE (Left) */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest uppercase border border-neutral-200">
                        <Terminal size={12} />
                        <span>Laboratory Access</span>
                    </div>
                </motion.div>

                <motion.h2 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="text-5xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] mb-8 leading-[0.9]"
                >
                  Analyze.<br/>
                  Optimize.<br/>
                  <span className="text-neutral-400">Synthesize.</span>
                </motion.h2>

                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-lg md:text-xl text-neutral-500 font-light mb-12 max-w-md leading-relaxed"
                >
                  Access our complete spectral database and verify batch consistency in real-time.
                </motion.p>

                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="w-full max-w-sm"
                >
                   {/* Interactive Search Bar Simulation */}
                   <div 
                      onClick={() => onNavigate(PageView.SHOP)}
                      className="group relative w-full bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-2 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                   >
                      <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white shrink-0">
                         <Search size={20} />
                      </div>
                      <div className="flex flex-col items-start flex-1">
                         <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Database Search</span>
                         <span className="text-neutral-900 font-medium text-sm md:text-base">Find compound by CAS or Name...</span>
                      </div>
                      <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                         <ArrowRight size={20} className="text-neutral-400" />
                      </div>
                   </div>
                   <p className="mt-6 text-[10px] text-neutral-400 font-mono text-center md:text-left">
                      * Resticted to laboratory professionals only.
                   </p>
                </motion.div>
            </div>

            {/* INTERACTIVE INTERFACE SIDE (Right) */}
            <div className="flex-1 flex justify-center w-full">
                <ResearchInterface />
            </div>

         </div>
      </section>

    </div>
  );
};