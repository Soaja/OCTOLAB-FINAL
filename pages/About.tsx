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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">Osn. 2020</span>
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
           className="w-full h-[60vh] rounded-[2.5rem] overflow-hidden relative mb-32 bg-[#0B0B0C] group border border-neutral-800"
        >
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

           {/* Animated Graph Line (Chromatogram) */}
           <div className="absolute inset-0 flex items-end px-4 md:px-16 pb-32 opacity-80">
              <svg className="w-full h-64 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 300">
                 <motion.path
                   d="M0,250 L200,250 L300,250 L400,240 C450,230 480,20 500,10 C520,20 550,230 600,240 L800,250 L1200,250"
                   fill="none"
                   stroke="url(#gradient)"
                   strokeWidth="3"
                   initial={{ pathLength: 0, opacity: 0 }}
                   whileInView={{ pathLength: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                 />
                 <defs>
                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                     <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.5" />
                     <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                     <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.5" />
                     <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 
                 {/* Area under curve */}
                 <motion.path
                   d="M0,250 L200,250 L300,250 L400,240 C450,230 480,20 500,10 C520,20 550,230 600,240 L800,250 L1200,250 L1200,300 L0,300 Z"
                   fill="url(#fillGradient)"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 0.2 }}
                   viewport={{ once: true }}
                   transition={{ delay: 1, duration: 1 }}
                 />
                 <defs>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                       <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                 </defs>
              </svg>
           </div>
           
           {/* Data Point Overlay */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5 }}
             className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl text-center shadow-2xl"
           >
              <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">Ciljni Pik</div>
              <div className="text-4xl font-bold text-white tracking-tight">99.92%</div>
              <div className="text-xs text-neutral-400 mt-1">Vreme Zadržavanja: 4.2m</div>
           </motion.div>

           {/* Bottom Text */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8 md:p-16 pointer-events-none">
              <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
                 <div className="text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 mb-4">
                        <Activity size={12} className="text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Metrika Performansi</span>
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight mb-2">Naši Rezultati</h3>
                    <p className="text-white/60 font-mono text-sm max-w-lg leading-relaxed">
                      Svaka serija se kvantifikuje. Održavamo statističku stopu odbijanja od 12% kako bismo osigurali da samo jedinjenja najviše čistoće stignu do vaše laboratorije.
                    </p>
                 </div>
                 
                 <div className="flex gap-8">
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white font-mono">0.05%</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Max Nečistoća</div>
                    </div>
                    <div className="w-[1px] h-12 bg-white/20"></div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white font-mono">&lt;24h</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Vreme Analize</div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* THE PILLARS (3-Column Grid) */}
        <section className="mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
              <h2 className="text-4xl font-bold tracking-tighter">Octolab Standard</h2>
              <p className="text-neutral-500 max-w-sm text-right hidden md:block">
                 Izgrađen na tri nepromenljiva principa biohemijskog inženjeringa.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { 
                 title: "Radikalna Transparentnost", 
                 desc: "Objavljujemo sirove spektralne podatke za svaku seriju. Ne samo sertifikat prolaz/pad, već kompletan hromatogram.", 
                 icon: <FileJson size={24}/>,
                 color: "bg-blue-50 text-blue-600"
               },
               { 
                 title: "Logika Hladnog Lanca", 
                 desc: "Od sinteze do vašeg praga, naš inventar je pod kontrolisanom temperaturom kako bi se sprečila degradacija.", 
                 icon: <Activity size={24}/>,
                 color: "bg-purple-50 text-purple-600"
               },
               { 
                 title: "Akademske Cene", 
                 desc: "Direktna partnerstva sa univerzitetima nam omogućavaju da ponudimo institucionalne stope bez kompromisa u kvalitetu.", 
                 icon: <Award size={24}/>,
                 color: "bg-orange-50 text-orange-600"
               }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-10 rounded-[2rem] bg-[#F5F5F7] hover:bg-white hover:shadow-2xl hover:shadow-black/5 border border-transparent hover:border-neutral-100 transition-all duration-300 group"
               >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
               </motion.div>
             ))}
           </div>
        </section>

        {/* STATS ROW (Minimal) */}
        <section className="border-y border-neutral-100 py-24 mb-32 relative overflow-hidden">
           {/* Background number watermark */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-black/[0.02] pointer-events-none select-none">
              99.9%
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              {[
                { label: "Aktivnih Citata", value: "450+" },
                { label: "Snabdevenih Lab.", value: "1,200" },
                { label: "Prosek Čistoće", value: "99.8%" },
                { label: "Godina Rada", value: "04" },
              ].map((stat, i) => (
                <div key={i}>
                   <div className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-2">{stat.value}</div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
                </div>
              ))}
           </div>
        </section>

        {/* IDENTITY & WHY US (Split Section) */}
        <section className="max-w-[1400px] mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Who We Are */}
            <div>
                <div className="flex items-center gap-2 mb-6 text-neutral-400">
                    <Globe size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Naš Identitet</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
                    Arhitekte <br/>
                    <span className="text-neutral-400">Doslednosti.</span>
                </h2>
                <div className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed space-y-6">
                    <p>
                        Octolab je specijalizovani kolektiv biohemičara i inženjera podataka osnovan na jednoj premisi: da ponovljivost naučnog istraživanja nikada ne sme biti ugrožena kvalitetom njegovih inputa.
                    </p>
                    <p>
                        Nastali smo iz frustracije akademskim istraživanjem, gde je "varijansa serije" bila konstantna, tiha promenljiva koja je uništavala mesece rada. Odlučili smo da izgradimo dobavljača kakvog smo želeli da imamo — onog koji ne tretira reagense kao robu, već kao kritične tačke podataka. Mi smo zaštitni zid između prljave sinteze i vašeg otkrića.
                    </p>
                </div>
            </div>

            {/* Right: Why Us - REDESIGNED (Holographic Edition) */}
            <div className="relative rounded-[2.5rem] bg-[#0B0B0C] p-10 md:p-14 overflow-hidden shadow-2xl group/card">
                {/* Background Effects - Noise & Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
                
                {/* Holographic Sheen Animation (Blob) */}
                <motion.div 
                   animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 right-0 w-[35rem] h-[35rem] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
                   style={{
                     background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.05) 0deg, rgba(165, 243, 252, 0.1) 120deg, rgba(232, 121, 249, 0.1) 240deg, rgba(255,255,255,0.05) 360deg)'
                   }}
                />

                <div className="relative z-10">
                   <h3 className="text-3xl md:text-4xl font-bold mb-10 text-white tracking-tight">
                      Octolab <br/>
                      <motion.span 
                         className="inline-block bg-[linear-gradient(110deg,#ffffff_20%,#38bdf8_30%,#c084fc_40%,#ffffff_50%)] bg-[length:200%_100%] bg-clip-text text-transparent"
                         animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
                         transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      >
                        Prednost.
                      </motion.span>
                   </h3>
                   
                   <div className="space-y-10">
                      {[
                          { title: "Verifikacija, ne Poverenje", desc: "Ne tražimo slepo poverenje. Pružamo sirove HPLC i MS podatke za svaku seriju, omogućavajući vam da nezavisno verifikujete čistoću." },
                          { title: "Domaći Integritet", desc: "Nula drop-shippinga. Nula misterioznog porekla. Svaka bočica se sintetiše, testira i šalje iz našeg postrojenja." },
                          { title: "Razlika od 1%", desc: "Industrijski standard je 98%. Mi odbijamo sve ispod 99.5%. U osetljivim metaboličkim istraživanjima, taj jaz od 1.5% je razlika između podataka i šuma." }
                      ].map((item, i) => (
                          <div key={i} className="group">
                             <div className="flex items-baseline gap-4 mb-3">
                                <span className="text-xs font-mono font-bold text-white/30 group-hover:text-white transition-colors duration-300">0{i + 1}</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">{item.title}</h4>
                             </div>
                             <div className="relative pl-8 border-l border-white/10 group-hover:border-white/40 transition-colors duration-500">
                                {/* Holographic accent on hover */}
                                <div className="absolute left-[-1px] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                   {item.desc}
                                </p>
                             </div>
                          </div>
                      ))}
                   </div>
                </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};