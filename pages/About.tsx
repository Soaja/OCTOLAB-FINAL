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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-600">Osn. 2020</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
             </div>
             
             <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter text-black mb-8 leading-[0.85]">
               Izvan <br/>
               <span className="text-neutral-500">Analize.</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-neutral-700 font-light max-w-2xl mx-auto leading-relaxed">
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
           className="w-full h-[600px] bg-[#F5F5F7] rounded-[3rem] relative overflow-hidden mb-32 flex items-center justify-center"
        >
             <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                {[
                    { label: "Verifikovanih Serija", val: "142+" },
                    { label: "Partner Laboratorija", val: "12" },
                    { label: "Prosečna Čistoća", val: "99.8%" },
                    { label: "Godina Rada", val: "4" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0B0B0C] mb-2">{stat.val}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">{stat.label}</span>
                    </div>
                ))}
             </div>
        </motion.div>

        {/* MISSION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32 items-center">
            <div>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-none">
                  Inženjering <br/>
                  <span className="text-neutral-500">Transparentnosti.</span>
               </h2>
               <div className="space-y-6 text-lg text-neutral-700 leading-relaxed font-light">
                  <p>
                     Tržište istraživačkih hemikalija je dugo bilo definisano neprozirnošću. Uvoznici bez lica, generički sertifikati analize i sumnjiva čistoća.
                  </p>
                  <p>
                     Octolab operiše drugačije. Svaka bočica koju prodamo ima jedinstveni serijski ID koji se može pratiti do njenog HPLC i MS izveštaja. Ne testiramo samo nasumične uzorke; održavamo rigorozan lanac nadzora od sinteze do skladištenja u hladnom lancu.
                  </p>
               </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
               {[
                  { icon: <ShieldCheck size={24} />, title: "Verifikacija Treće Strane", desc: "Sve serije se šalju u nezavisne laboratorije (npr. Janoshik) na slepo testiranje." },
                  { icon: <Binary size={24} />, title: "Sirovi Podaci", desc: "Pružamo kompletne hromatografske datoteke podataka, ne samo PDF sažetke." },
                  { icon: <Award size={24} />, title: "ISO 9001 Skladištenje", desc: "Objekti sa kontrolisanom temperaturom i vlažnošću." }
               ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-xl shadow-neutral-100/50 hover:border-neutral-200 transition-colors">
                      <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center shrink-0 text-neutral-900">
                         {item.icon}
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-[#0B0B0C] mb-2">{item.title}</h3>
                         <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                  </div>
               ))}
            </div>
        </div>

      </div>
    </div>
  );
};