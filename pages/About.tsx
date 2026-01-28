import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Users, Microscope, FileJson, Award, ArrowRight, Binary, FlaskConical } from 'lucide-react';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="pt-32 min-h-screen bg-white relative overflow-hidden">
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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">Est. 2020</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
             </div>
             
             <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter text-black mb-8 leading-[0.85]">
               Beyond <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-100">Analysis.</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
               We founded Octolab to solve a crisis of confidence. <br/>
               <span className="text-black font-medium">We don't just supply peptides; we supply data.</span>
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
              <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">Target Peak</div>
              <div className="text-4xl font-bold text-white tracking-tight">99.92%</div>
              <div className="text-xs text-neutral-400 mt-1">Retention Time: 4.2m</div>
           </motion.div>

           {/* Bottom Text */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8 md:p-16 pointer-events-none">
              <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
                 <div className="text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 mb-4">
                        <Activity size={12} className="text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Performance Metrics</span>
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight mb-2">Our Results</h3>
                    <p className="text-white/60 font-mono text-sm max-w-lg leading-relaxed">
                      Every batch is quantified. We maintain a statistical rejection rate of 12% to ensure only the highest purity compounds reach your laboratory.
                    </p>
                 </div>
                 
                 <div className="flex gap-8">
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white font-mono">0.05%</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Max Impurity</div>
                    </div>
                    <div className="w-[1px] h-12 bg-white/20"></div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white font-mono">&lt;24h</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Analysis Time</div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* THE PILLARS (3-Column Grid) */}
        <section className="mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
              <h2 className="text-4xl font-bold tracking-tighter">The Octolab Standard</h2>
              <p className="text-neutral-500 max-w-sm text-right hidden md:block">
                 Built on three immutable principles of biochemical engineering.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { 
                 title: "Radical Transparency", 
                 desc: "We publish raw spectral data for every batch. Not just a pass/fail certificate, but the full chromatogram.", 
                 icon: <FileJson size={24}/>,
                 color: "bg-blue-50 text-blue-600"
               },
               { 
                 title: "Cold Chain Logic", 
                 desc: "From synthesis to your doorstep, our inventory is temperature-controlled to prevent degradation.", 
                 icon: <Activity size={24}/>,
                 color: "bg-purple-50 text-purple-600"
               },
               { 
                 title: "Academic Pricing", 
                 desc: "Direct partnerships with universities allow us to offer institutional rates without compromising quality.", 
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
                { label: "Active Citations", value: "450+" },
                { label: "Labs Supplied", value: "1,200" },
                { label: "Purity Avg", value: "99.8%" },
                { label: "Years Active", value: "04" },
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
                    <span className="text-xs font-bold uppercase tracking-widest">Our Identity</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
                    The Architects <br/>
                    <span className="text-neutral-400">of Consistency.</span>
                </h2>
                <div className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed space-y-6">
                    <p>
                        Octolab is a specialized collective of biochemists and data engineers founded on a single premise: that the reproducibility of scientific research should never be compromised by the quality of its inputs.
                    </p>
                    <p>
                        We emerged from the frustration of academic research, where "batch variance" was a constant, silent variable ruining months of work. We decided to build the supplier we wished we had—one that treats reagents not as commodities, but as critical data points. We are the firewall between dirty synthesis and your discovery.
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
                      The Octolab <br/>
                      <motion.span 
                         className="inline-block bg-[linear-gradient(110deg,#ffffff_20%,#38bdf8_30%,#c084fc_40%,#ffffff_50%)] bg-[length:200%_100%] bg-clip-text text-transparent"
                         animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
                         transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      >
                        Advantage.
                      </motion.span>
                   </h3>
                   
                   <div className="space-y-10">
                      {[
                          { title: "Verification, not Trust", desc: "We don't ask for blind faith. We provide raw HPLC & MS data for every batch, empowering you to verify purity independently." },
                          { title: "Domestic Integrity", desc: "Zero drop-shipping. Zero mystery origins. Every vial is synthesized, tested, and dispatched from our US facility." },
                          { title: "The 1% Difference", desc: "Industry standard is 98%. We reject anything under 99.5%. In sensitive metabolic research, that 1.5% gap is the difference between data and noise." }
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