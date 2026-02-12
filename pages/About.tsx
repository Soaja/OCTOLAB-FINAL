import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Truck, Microscope, FileText, ArrowRight, Factory, PackageCheck, AlertTriangle, CheckCircle2, Lock, Target, Fingerprint, Zap, Crosshair, BarChart3, ThermometerSnowflake, Scale } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

// --- LOCAL COMPONENTS ---

const ModernDisclaimer = () => (
  <div className="w-full bg-amber-50/80 border-y border-amber-100/80 py-3 flex justify-center items-center relative z-20 overflow-hidden group backdrop-blur-sm">
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

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-12 md:mb-16">
        {subtitle && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 block">
                {subtitle}
            </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0C] tracking-tight leading-[1.1]">
            {title}
        </h2>
    </div>
);

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 overflow-hidden">
      <SEO 
        title="O Nama | OCTOLAB - Laboratorijski Standard"
        description="OCTOLAB je specijalizovani dobavljač research peptida u Srbiji. Fokus na HPLC verifikaciji, hladnom lancu i stabilnosti materijala."
      />
      
      {/* 1. HERO SECTION - HIGH TECH LAB AESTHETIC */}
      <section className="relative py-24 md:py-32 px-6 border-b border-neutral-100 overflow-hidden">
          {/* Technical Grid Background (CSS Only - Ultra Fast) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />
          
          {/* Corner Markers */}
          <div className="absolute top-0 left-0 p-8 opacity-20 hidden md:block"><Crosshair size={24} /></div>
          <div className="absolute bottom-0 right-0 p-8 opacity-20 hidden md:block"><Crosshair size={24} /></div>

          {/* Glowing Center Orb (CSS Gradient - Zero Load Time) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-neutral-100 to-transparent rounded-full blur-[80px] -z-10 opacity-60 pointer-events-none" />

          <div className="max-w-[1200px] mx-auto relative z-10">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="flex flex-col items-center text-center"
              >
                  {/* System Status Badge */}
                  <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-sm shadow-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-600">
                          Sistem Aktivan
                      </span>
                  </div>

                  {/* Main Headline - Massive & Precise */}
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#0B0B0C] leading-[0.85] mb-8">
                      ARHITEKTURA <br/>
                      <span className="text-neutral-400">ISTRAŽIVANJA.</span>
                  </h1>

                  {/* Divider Line */}
                  <div className="w-24 h-px bg-neutral-200 my-4" />

                  {/* Description */}
                  <p className="text-lg md:text-2xl text-neutral-700 font-light max-w-3xl leading-relaxed mt-4">
                      OCTOLAB je specijalizovani distributer peptidnih jedinjenja visoke čistoće. <br className="hidden md:block"/>
                      Naš fokus je isključivo na integritetu supstance i profesionalnoj podršci naučnoj zajednici u Srbiji.
                  </p>

                  {/* Technical Specs Row */}
                  <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
                      <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Lokacija</span>
                          <span className="font-mono text-sm font-bold text-black">BEOGRAD, RS</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Tip</span>
                          <span className="font-mono text-sm font-bold text-black">RESEARCH ONLY</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Standard</span>
                          <span className="font-mono text-sm font-bold text-black">ISO/HPLC</span>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      <ModernDisclaimer />

      {/* 2. MISIJA (REDESIGNED) */}
      <section className="py-24 bg-[#F5F5F7] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  
                  {/* Left Card: The Manifesto */}
                  <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-neutral-100 flex flex-col justify-between"
                  >
                      <div>
                          <div className="flex items-center gap-3 mb-8">
                             <span className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-neutral-200">
                                <Target size={20} />
                             </span>
                             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                Naša Misija
                             </span>
                          </div>
                          
                          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-[0.9]">
                              ISTINA U <br/>
                              <span className="text-neutral-400">PODACIMA.</span>
                          </h2>
                          
                          <p className="text-lg text-neutral-600 font-medium leading-relaxed mb-8">
                              Nauka ne trpi neizvesnost. Naša misija je eliminacija varijabilnosti iz vašeg istraživačkog lanca snabdevanja. Pružamo apsolutnu transparentnost sastava, jer verujemo da precizni podaci zahtevaju precizne inpute.
                          </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral-100">
                          <div>
                              <span className="block text-3xl font-bold text-black mb-1">100%</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Sledljivost Serije</span>
                          </div>
                          <div>
                              <span className="block text-3xl font-bold text-black mb-1">0%</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Skrivenih Filera</span>
                          </div>
                      </div>
                  </motion.div>

                  {/* Right Card: The Abstract Machine */}
                  <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="bg-[#0B0B0C] rounded-[2.5rem] p-12 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center"
                  >
                      {/* Background Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
                      
                      {/* Animated Concentric Rings (The Centrifuge) */}
                      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                          <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-0 border border-dashed border-neutral-700 rounded-full"
                          />
                          <motion.div 
                             animate={{ rotate: -360 }}
                             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-4 border border-neutral-600 rounded-full opacity-40"
                          />
                          <motion.div 
                             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                             className="absolute inset-12 border-2 border-white rounded-full"
                          />
                          {/* Center Core */}
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10">
                              <Fingerprint size={32} className="text-black" />
                          </div>
                      </div>

                      <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-4">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sistem Stabilan</span>
                          </div>
                          <h3 className="text-white font-bold text-xl mb-2">Eliminacija Šuma</h3>
                          <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                              Naš protokol filtrira svaku varijablu koja nije čista supstanca.
                          </p>
                      </div>
                  </motion.div>

              </div>
          </div>
      </section>

      <ModernDisclaimer />

      {/* 3. PROCES RADA (KAKO RADIMO) */}
      <section className="py-24 bg-[#0B0B0C] text-white relative">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
           
           <div className="max-w-[1400px] mx-auto px-6 relative z-10">
               <div className="mb-16 text-center md:text-left">
                   <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Naš Proces</h2>
                   <p className="text-neutral-400 max-w-xl">Rigorozan lanac kontrole od sinteze do vaše laboratorije.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10 -z-10" />
                    
                    {[
                        { title: "Sinteza", desc: "Automatizovana solid-phase sinteza.", icon: <Factory size={20}/> },
                        { title: "Analiza", desc: "HPLC & MS verifikacija čistoće.", icon: <Microscope size={20}/> },
                        { title: "Pakovanje", desc: "Sterilno punjenje u inertnoj atmosferi.", icon: <PackageCheck size={20}/> },
                        { title: "Logistika", desc: "Skladištenje na -20°C (Hladni Lanac).", icon: <Activity size={20}/> },
                        { title: "Isporuka", desc: "Ekspresna dostava unutar 24h.", icon: <Truck size={20}/> },
                    ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
                             <div className="w-24 h-24 rounded-2xl bg-[#1C1C1E] border border-white/10 flex items-center justify-center mb-6 text-neutral-400 group-hover:text-white group-hover:border-white/30 transition-all shadow-lg">
                                 {step.icon}
                             </div>
                             <div className="text-xs font-mono font-bold text-neutral-500 mb-2">0{i+1}</div>
                             <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                             <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
               </div>
           </div>
      </section>

      <ModernDisclaimer />

      {/* 4. STANDARDI KVALITETA (REDESIGNED: TECH SPEC SHEET) */}
      <section className="py-24 bg-white relative">
          <div className="max-w-[1200px] mx-auto px-6">
              <SectionHeading title="Specifikacija Kvaliteta" subtitle="Tehnički Parametri" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Card 1: HPLC */}
                  <div className="bg-white border border-neutral-200 rounded-[2rem] p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group overflow-hidden relative">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                             <Activity size={20} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Čistoća</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">HPLC Analiza</h3>
                      <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                          Hromatografska verifikacija osigurava eliminaciju svih sporednih proizvoda sinteze.
                      </p>

                      {/* Visual: Simulated HPLC Graph */}
                      <div className="h-32 bg-[#F9F9FB] rounded-xl relative overflow-hidden border border-neutral-100 flex items-end px-4 pb-4 gap-1">
                           <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-green-600">PASS</div>
                           {/* Simulated Peaks */}
                           <motion.div initial={{ height: 0 }} whileInView={{ height: '10%' }} className="w-2 bg-neutral-200 rounded-t-sm" />
                           <motion.div initial={{ height: 0 }} whileInView={{ height: '5%' }} className="w-2 bg-neutral-200 rounded-t-sm" />
                           <div className="flex-1" />
                           <motion.div initial={{ height: 0 }} whileInView={{ height: '80%' }} transition={{ delay: 0.2 }} className="w-16 bg-blue-500 rounded-t-md mx-auto relative group-hover:bg-blue-600 transition-colors">
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  99.9% Purity
                              </div>
                           </motion.div>
                           <div className="flex-1" />
                           <motion.div initial={{ height: 0 }} whileInView={{ height: '8%' }} className="w-2 bg-neutral-200 rounded-t-sm" />
                      </div>
                  </div>

                  {/* Card 2: Mass Spec */}
                  <div className="bg-white border border-neutral-200 rounded-[2rem] p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                             <Scale size={20} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Identitet</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">Masena Spektrometrija</h3>
                      <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                          Potvrda tačne molekularne mase i atomske strukture peptida.
                      </p>

                       {/* Visual: Spec Data */}
                      <div className="bg-[#F9F9FB] rounded-xl p-4 border border-neutral-100 font-mono text-xs space-y-2">
                           <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                               <span className="text-neutral-500">Očekivano:</span>
                               <span className="font-bold">1419.5 Da</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                               <span className="text-neutral-500">Izmereno:</span>
                               <span className="font-bold text-black">1419.4 Da</span>
                           </div>
                           <div className="flex justify-between items-center pt-1 text-green-600 font-bold">
                               <span>Delta:</span>
                               <span>0.1 Da (OK)</span>
                           </div>
                      </div>
                  </div>

                  {/* Card 3: Stability */}
                  <div className="bg-white border border-neutral-200 rounded-[2rem] p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                             <ThermometerSnowflake size={20} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Integritet</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">Stabilnost</h3>
                      <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                          Liofilizacija u vakuumu osigurava stabilnost supstance godinama.
                      </p>

                       {/* Visual: Temperature Gauge */}
                      <div className="h-32 bg-[#F9F9FB] rounded-xl border border-neutral-100 relative flex items-center justify-center overflow-hidden">
                           <div className="w-full h-1 bg-neutral-200 absolute" />
                           <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: '40%' }} 
                              className="h-1 bg-blue-500 absolute left-0" 
                           />
                           <div className="absolute left-[40%] w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-sm z-10" />
                           <div className="absolute bottom-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                               <span className="text-blue-600">-20°C</span> Optimalno
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <ModernDisclaimer />

      {/* 5. ZAŠTO OCTOLAB (REDESIGNED: DARK BENTO GRID) */}
      <section className="py-24 bg-[#0B0B0C] text-white">
          <div className="max-w-[1200px] mx-auto px-6">
               <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                   <div>
                       <span className="text-green-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Prednost</span>
                       <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Zašto OCTOLAB?</h2>
                   </div>
                   <p className="text-neutral-400 max-w-md leading-relaxed">
                       Infrastruktura izgrađena za naučnu tačnost, brzinu i apsolutnu diskreciju.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   {[
                       {
                           title: "Verifikovano",
                           subtitle: "Laboratorijski Testirano",
                           icon: <ShieldCheck className="text-green-500" />,
                           bg: "bg-neutral-900",
                           detail: "Svaka serija."
                       },
                       {
                           title: "Hladni Lanac",
                           subtitle: "Termo-Pakovanje",
                           icon: <ThermometerSnowflake className="text-blue-500" />,
                           bg: "bg-neutral-900",
                           detail: "-20°C Skladištenje."
                       },
                       {
                           title: "Ekspres",
                           subtitle: "Isporuka 24h",
                           icon: <Zap className="text-yellow-500" />,
                           bg: "bg-neutral-900",
                           detail: "Srbija (Post Express)."
                       },
                       {
                           title: "Anonimnost",
                           subtitle: "Diskretna Dostava",
                           icon: <Lock className="text-neutral-500" />,
                           bg: "bg-neutral-900",
                           detail: "Bez oznaka sadržaja."
                       }
                   ].map((item, i) => (
                       <motion.div 
                          key={i}
                          whileHover={{ y: -5 }}
                          className={`${item.bg} border border-white/10 p-6 rounded-2xl flex flex-col justify-between min-h-[180px] group cursor-default relative overflow-hidden`}
                       >
                           {/* Hover Glow */}
                           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                           
                           <div className="flex justify-between items-start mb-4">
                               <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                   {item.icon}
                               </div>
                               <span className="text-[10px] font-mono text-neutral-600">0{i+1}</span>
                           </div>
                           
                           <div>
                               <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                               <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">{item.subtitle}</p>
                               <div className="h-px w-full bg-white/10 my-3" />
                               <p className="text-[10px] text-neutral-500 font-mono">{item.detail}</p>
                           </div>
                       </motion.div>
                   ))}
               </div>
          </div>
      </section>

      {/* 6. PRAVNA I ETIČKA NAPOMENA */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
          <div className="max-w-[1000px] mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-xs font-bold uppercase tracking-widest">
                  <AlertTriangle size={14} />
                  <span>Važna Napomena</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-950 mb-4">
                  Isključivo za Istraživačke Svrhe
              </h2>
              <p className="text-amber-800 leading-relaxed max-w-3xl mx-auto font-medium">
                  Svi proizvodi dostupni na OCTOLAB platformi su hemijska jedinjenja namenjena striktno za in-vitro laboratorijska istraživanja i analize. 
                  Ovi proizvodi <strong>nisu</strong> namenjeni za ljudsku ili veterinarsku upotrebu, dijagnostiku, niti kao dodaci ishrani. 
                  Kupovinom potvrđujete da ste upoznati sa prirodom ovih jedinjenja.
              </p>
          </div>
      </section>

      {/* 7. ZAVRŠNI CTA */}
      <section className="py-24 bg-white text-center">
          <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0C] mb-8">
                  Spremni za istraživanje?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={() => navigate('/peptidi-srbija')} 
                    size="lg" 
                    className="bg-[#0B0B0C] text-white hover:bg-neutral-800 rounded-full px-12 h-16 text-lg shadow-xl"
                  >
                      Pregledaj Peptidni Katalog
                  </Button>
                  <Button 
                    onClick={() => navigate('/kontakt')} 
                    variant="outline"
                    size="lg" 
                    className="border-neutral-200 text-neutral-900 rounded-full px-12 h-16 text-lg hover:bg-neutral-50"
                  >
                      Kontaktirajte Nas
                  </Button>
              </div>
          </div>
      </section>

    </div>
  );
};