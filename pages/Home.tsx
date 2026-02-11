import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Zap, Box, Activity, FlaskConical, Dna, Atom, Filter, ScanSearch, Microscope, Search, Terminal, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

const DisclaimerBar = () => (
  <div className="w-full bg-amber-50/60 border-y border-amber-100/50 py-3 flex justify-center items-center relative z-30 backdrop-blur-md">
      <div className="flex items-center gap-2 text-amber-900/70 px-4 text-center">
          <AlertTriangle size={12} className="stroke-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
            Samo Za Istraživačke Svrhe
          </span>
      </div>
  </div>
);

const ResearchInterface = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative perspective-1000 w-full max-w-sm aspect-[4/5] flex items-center justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className="relative w-full h-full bg-white rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] border border-neutral-200 overflow-hidden cursor-crosshair group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8F8FA] to-[#F1F1F4]" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
           <img 
              src="https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop" 
              alt="GHK-Cu Vial" 
              width="300"
              height="300"
              // @ts-ignore
              fetchpriority="low"
              loading="lazy"
              className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply filter contrast-105"
           />
        </div>

        {/* Data Points */}
        <motion.div style={!isMobile ? { transform: "translateZ(30px)" } : {}} className="absolute inset-0 pointer-events-none z-20">
           <div className="absolute top-8 right-8">
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-100 shadow-sm text-center">
                 <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">HPLC</div>
                 <div className="text-xs font-bold text-neutral-900 font-mono">99.8%</div>
              </div>
           </div>
           <div className="absolute bottom-20 left-8">
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-100 shadow-sm text-left">
                 <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Sekvenca</div>
                 <div className="text-xs font-bold text-neutral-900 font-mono">Gly-His-Lys</div>
              </div>
           </div>
        </motion.div>

        {!isMobile && (
            <motion.div 
                style={{ background: glareBackground, opacity: 0.3 }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-30"
            />
        )}

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-t border-neutral-100 flex items-center justify-between px-6 z-10">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">System Ready</span>
            </div>
            <Activity size={14} className="text-neutral-400" />
        </div>
      </motion.div>
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col w-full bg-white overflow-hidden relative">
      <SEO 
        title="OCTOLAB Srbija | Precision Peptides & Research Compounds"
        description="Premium istraživački peptidi. BPC-157, GHK-Cu, TB-500. Verifikovana čistoća >99%."
      />

      {/* 
        HERO SECTION - OPTIMIZED 
        - Removed heavy JS parallax
        - Removed blur filters (using radial-gradient in CSS)
        - Removed heavy SVG backgrounds
      */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden">
        
        {/* Optimized Background: CSS Class 'hero-glow' + 'bg-noise' */}
        <div className="absolute inset-0 hero-glow -z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-30 -z-10 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-600">Precizni Peptidi</span>
             </span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-[#0B0B0C] leading-[0.95] md:leading-[0.9] mb-8 max-w-4xl mx-auto">
            JASNOĆA<br/>
            U SVAKOM<br/>
            <span className="text-neutral-300">MOLEKULU.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-500 max-w-xl leading-relaxed mb-10 font-medium"
          >
            Istraživačka jedinjenja sintetizovana za apsolutnu čistoću.
            Verifikovana HPLC analizom. Dizajnirana za nauku.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
             <Button 
                onClick={() => navigate('/peptidi-srbija')} 
                size="lg" 
                className="bg-[#0B0B0C] text-white hover:bg-neutral-800 px-10 h-14 rounded-full shadow-xl shadow-neutral-200 text-sm tracking-wide font-bold"
             >
                Istraži Katalog
             </Button>
             <Button 
                onClick={() => navigate('/laboratorijski-standard')} 
                variant="outline"
                size="lg" 
                className="bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50 px-10 h-14 rounded-full text-sm tracking-wide font-bold"
             >
                Protokoli Kvaliteta
             </Button>
          </motion.div>
        </div>

        {/* Minimal Decorative Elements (CSS/SVG only, no heavy framer-motion) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none">
           <div className="flex items-center gap-4 -rotate-90">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Octolab® Srbija</span>
              <div className="w-12 h-[1px] bg-black"></div>
           </div>
        </div>
        
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none">
           <div className="flex flex-col gap-2 items-center">
              <div className="w-[1px] h-12 bg-black"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase writing-vertical-rl text-center">
                 EST. 2020
              </span>
           </div>
        </div>
      </section>

      <DisclaimerBar />

      {/* FEATURED MOLECULES */}
      <section className="py-24 bg-white relative z-20">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0C] leading-[0.95] mb-6">
                  Definisana čistoća. <br />
                  <span className="text-neutral-300">Molekul po molekul.</span>
                </h2>
                <p className="text-neutral-500">
                  Standardizovana jedinjenja za dosledne biološke ishode.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 {
                   name: "BPC-157",
                   slug: "bpc-157-peptid-srbija",
                   category: "OPORAVAK",
                   purity: "99.8%",
                   format: "Liofilizat 5mg",
                   desc: "Sistemska popravka i optimizacija zdravlja creva.",
                   img: "https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop"
                 },
                 {
                   name: "GHK-Cu",
                   slug: "ghk-cu-peptid-srbija",
                   category: "KOZMETIKA",
                   purity: "99.5%",
                   format: "Sirovi Prah 1g",
                   desc: "Bakar tripeptid kompleks za dermalno remodeliranje.",
                   img: "https://lh3.googleusercontent.com/gg-dl/ABS2GSkJPUF7zLJ_pB9VHGNo_Pvj9Kp_8xUYV9P3G4sxF5MKu0eNMjWBscCfmoMHl60qwf_rWfv3NLTyb840_uQGXm8Xcj1RqG78P_vZ7bVJG3j3uD4gEzmdDCiJdbkDnb7MbifGaoZPFt9XvmsIpiAaEy7onKy65tayQgzI-qDMd8_NSn413Q=s1024-rj?authuser=2"
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   onClick={() => navigate(`/${item.slug}`)}
                   className="group relative bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-300"
                 >
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-30">
                        <span className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 text-neutral-600">
                            {item.category}
                        </span>
                    </div>

                    <div className="aspect-[4/3] w-full flex items-center justify-center p-12 relative z-10">
                        <img 
                            src={item.img} 
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-500 group-hover:scale-105" 
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/50 backdrop-blur-xl border-t border-white/50 z-20">
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <h3 className="text-2xl font-bold text-[#0B0B0C] tracking-tight mb-1">{item.name}</h3>
                                <p className="text-xs text-neutral-500 font-mono">{item.format}</p>
                            </div>
                            
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                 </motion.div>
               ))}
            </div>
            
            <div className="mt-16 flex justify-center">
              <Button 
                onClick={() => navigate('/peptidi-srbija')} 
                variant="ghost" 
                className="text-lg group text-neutral-900 hover:text-black hover:bg-neutral-50 px-8 h-14 rounded-full border border-neutral-200 hover:border-neutral-300 transition-all"
              >
                Vidi Ceo Katalog <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>
         </div>
      </section>

      <DisclaimerBar />

      {/* PREMIUM RESEARCH INTERFACE */}
      <section className="relative py-24 md:py-40 bg-[#FBFBFD] overflow-hidden border-t border-neutral-100">
         <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24">
            
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest uppercase border border-neutral-200">
                        <Terminal size={12} />
                        <span>Laboratorijski Pristup</span>
                    </div>
                </div>

                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] mb-8 leading-[0.9]">
                  Analiziraj.<br/>
                  Optimizuj.<br/>
                  <span className="text-neutral-400">Sintetiši.</span>
                </h2>

                <p className="text-lg md:text-xl text-neutral-500 font-light mb-12 max-w-md leading-relaxed">
                  Pristupite našoj kompletnoj spektralnoj bazi podataka i verifikujte doslednost serije u realnom vremenu.
                </p>

                <div className="w-full max-w-sm">
                   <div 
                      onClick={() => navigate('/peptidi-srbija')}
                      className="group relative w-full bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-2 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                   >
                      <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white shrink-0">
                         <Search size={20} />
                      </div>
                      <div className="flex flex-col items-start flex-1">
                         <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Pretraga Baze</span>
                         <span className="text-neutral-900 font-medium text-sm md:text-base">Pronađi jedinjenje po CAS...</span>
                      </div>
                      <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                         <ArrowRight size={20} className="text-neutral-400" />
                      </div>
                   </div>
                </div>
            </div>

            <div className="flex-1 flex justify-center w-full">
                <ResearchInterface />
            </div>

         </div>
      </section>

    </div>
  );
};