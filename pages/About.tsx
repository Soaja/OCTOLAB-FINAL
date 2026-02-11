import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Users, Microscope, FileJson, Award, ArrowRight, Binary, FlaskConical } from 'lucide-react';
import { SEO } from '../components/SEO';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="pt-32 min-h-screen bg-white relative overflow-hidden">
      <SEO 
        title="O Nama | OCTOLAB - Precision Research Engineering"
        description="OCTOLAB je specijalizovani kolektiv biohemičara. Saznajte više o našoj misiji, kontroli kvaliteta i HPLC verifikaciji peptida."
      />
      
      {/* Background elements similar to Home */}
      <div className="absolute inset-0 pointer-events-none -z-10">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_6rem]" />
         <motion.div 
           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
           transition={{ duration: 10, repeat: Infinity }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-neutral-50/80 rounded-full blur-[100px]" 
         />
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center mb-20 relative">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="relative z-10"
           >
             <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-[1px] w-8 bg-neutral-300"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500">Osn. 2020</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
             </div>
             
             <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter text-black mb-8 leading-[0.85]">
               Izvan <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-100">Analize.</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
               Osnovali smo Octolab da bismo rešili krizu poverenja. <br/>
               <span className="text-black font-medium">Ne isporučujemo samo peptide; mi isporučujemo podatke.</span>
             </p>
           </motion.div>

           {/* Abstract Decorative Elements */}
           <motion.div 
             style={{ y }}
             className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-20 pointer-events-none"
           >
              <FlaskConical size={400} strokeWidth={0.5} />
           </motion.div>
        </section>

        {/* RESULTS VISUAL BREAKER */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="w-full h-[6