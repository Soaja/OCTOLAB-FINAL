import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Aperture, ArrowRight, Github, Twitter, Linkedin, ShieldCheck, ArrowUp, Globe, Clock, Activity, Send, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

// --- SUB-COMPONENTS ---

// 1. Magnetic Button Wrapper
const Magnetic = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1);
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// 2. Live UTC Clock
const LiveClock = () => {
  const [time, setTime] = useState<string>("");
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].split('.')[0] + " UTC");
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return <span className="font-mono tabular-nums">{time}</span>;
};

// --- MAIN FOOTER COMPONENT ---

export const Footer: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="bg-[#0B0B0C] text-white pt-32 pb-8 relative overflow-hidden rounded-t-[3rem] mt-12">
        
        {/* Background Grid (Dark Mode) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">

            {/* 1. MASSIVE CTA SECTION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-b border-white/10 pb-24 mb-24">
                <div className="max-w-2xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">Sistem Spreman</span>
                    </motion.div>
                    
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                        Opremite svoju <br/>
                        <span className="text-neutral-500">laboratoriju.</span>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Magnetic>
                            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden flex items-center gap-3">
                                <span className="relative z-10">Započni Porudžbinu</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </Magnetic>
                        <button className="px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-neutral-300">
                            Kontaktirajte Prodaju
                        </button>
                    </div>
                </div>

                {/* Abstract Data Visual */}
                <div className="hidden lg:block relative w-64 h-64">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-white/20 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-white/10 rounded-full"
                    />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Aperture size={48} className="text-white/80" />
                     </div>
                </div>
            </div>

            {/* 2. NAVIGATION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-24">
                
                {/* Brand & Newsletter (5 Cols) */}
                <div className="md:col-span-5 flex flex-col justify-between">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <Aperture className="w-6 h-6" />
                            <span className="text-xl font-bold tracking-tight">OCTOLAB</span>
                        </div>
                        <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
                            Unapređenje biohemijskih istraživanja kroz apsolutnu transparentnost i precizni inženjering.
                        </p>
                    </div>

                    {/* Terminal Style Input */}
                    <div className="w-full">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 block">
                            Prijavite se na Data Feed
                        </label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-mono text-sm">{'>'}</span>
                            <input 
                                type="email" 
                                placeholder="unesite_email_adresu" 
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-8 pr-12 text-sm font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-white transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Links (7 Cols) */}
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {[
                        { title: "Indeks", links: ["Katalog", "Novi Proizvodi", "Najprodavanije", "Oprema"] },
                        { title: "Protokol", links: ["Kontrola Kvaliteta", "Metodologija", "Podaci o Skladištenju", "Bezbednosni Listovi"] },
                        { title: "Mreža", links: ["O Octolabu", "Karijera", "Globalni Partneri", "Kontakt"] },
                    ].map((col, i) => (
                        <div key={i}>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">{col.title}</h4>
                            <ul className="space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-white/0 rounded-full group-hover:bg-white transition-colors" />
                                            <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. LEGAL DISCLAIMER (NEW) */}
            <div className="border-t border-white/10 py-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-white/5 mb-6">
                     <AlertTriangle size={14} className="text-amber-500" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Važno Pravno Obaveštenje</span>
                </div>
                <p className="text-neutral-400 text-sm font-medium max-w-4xl mx-auto leading-relaxed uppercase tracking-wide">
                    Proizvodi su namenjeni isključivo za laboratorijska istraživanja. <br className="hidden md:block"/>
                    Nisu za ljudsku ili veterinarsku upotrebu.
                </p>
                <p className="text-neutral-600 text-xs mt-4 font-mono font-medium">
                    Products are intended strictly for laboratory research purposes only. Not for human or veterinary use.
                </p>
            </div>

            {/* 4. SYSTEM STATUS BAR (Bottom) */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                
                <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                    <div className="flex items-center gap-2">
                        <Globe size={12} />
                        <span>Beograd, SRB</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <LiveClock />
                    </div>
                    <div className="flex items-center gap-2 text-green-500/80">
                        <Activity size={12} />
                        <span>Laboratorija Aktivna</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                     <a href="#" className="hover:text-white transition-colors">Privatnost</a>
                     <a href="#" className="hover:text-white transition-colors">Uslovi</a>
                     <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors group">
                        Vrh <ArrowUp size={10} className="group-hover:-translate-y-0.5 transition-transform" />
                     </button>
                </div>
            </div>

            {/* 5. GIANT ANCHOR TEXT (Parallax) */}
            <motion.div 
                style={{ y, opacity }}
                className="w-full text-center mt-24 pointer-events-none select-none overflow-hidden"
            >
                <h1 className="text-[14vw] md:text-[18vw] leading-[0.75] font-bold tracking-tighter text-white/5 mix-blend-overlay">
                    OCTOLAB
                </h1>
            </motion.div>

        </div>
    </footer>
  );
};