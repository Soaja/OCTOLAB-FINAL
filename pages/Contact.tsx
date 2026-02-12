import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Building2, Clock, ArrowRight, Mail, MapPin, Phone, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

// --- VISUAL COMPONENTS ---

const ModernBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
    <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_6rem]" />
    
    {/* Animated Blobs */}
    <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-100 rounded-full blur-[100px]" 
      />
  </div>
);

const ContactMethod: React.FC<{ icon: React.ReactNode; title: string; value: string; desc: string; delay: number }> = ({ icon, title, value, desc, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="group flex items-start gap-5 p-6 rounded-3xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-300 cursor-default"
    >
        <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-neutral-600 group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-lg font-bold text-[#0B0B0C] mb-2">{value}</p>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">{desc}</p>
        </div>
    </motion.div>
);

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
        setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-transparent relative overflow-hidden">
      <SEO 
        title="Kontakt & Podrška | OCTOLAB Srbija"
        description="Kontaktirajte OCTOLAB za veleprodaju, tehničku podršku i informacije o porudžbinama. Radno vreme: Pon-Pet 09-17h."
      />

      <ModernBackground />
      
      <div className="max-w-[1400px] mx-auto px-6 pb-24 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="max-w-4xl mb-20 md:mb-32">
           <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
           >
               <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500">
                  Octolab Support
               </span>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-[0.9]"
           >
             Inicirajte <br/>
             <span className="text-neutral-400">Komunikaciju.</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-neutral-600 font-light max-w-2xl leading-relaxed"
           >
             Naš tim stručnjaka je dostupan za tehnička pitanja, konsultacije o protokolima i status porudžbina.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
           
           {/* LEFT COLUMN: CONTACT INFO & STATUS */}
           <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Live Status Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-3xl bg-[#0B0B0C] text-white flex items-center justify-between shadow-2xl shadow-neutral-200"
              >
                  <div className="flex items-center gap-4">
                      <div className="relative">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                      </div>
                      <div>
                          <p className="text-sm font-bold uppercase tracking-widest">Sistem Online</p>
                          <p className="text-xs text-neutral-500 mt-1">Prosečno vreme odgovora: &lt;2h</p>
                      </div>
                  </div>
                  <Clock className="text-neutral-600" />
              </motion.div>

              <ContactMethod 
                icon={<Mail size={20}/>}
                title="Email Podrška"
                value="research@octolab.rs"
                desc="Za tehničku dokumentaciju (COA), status porudžbine i opšta pitanja."
                delay={0.4}
              />
              
              <ContactMethod 
                icon={<Building2 size={20}/>}
                title="Veleprodaja"
                value="partners@octolab.rs"
                desc="Za laboratorije, institute i univerzitetske istraživačke grupe."
                delay={0.5}
              />

               {/* Abstract HQ Map Visualization */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.6 }}
                 className="mt-8 p-8 rounded-[2.5rem] bg-[#F5F5F7] relative overflow-hidden min-h-[250px] flex flex-col justify-end group"
               >
                   {/* Abstract Map Dots */}
                   <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neutral-800 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-neutral-400 rounded-full" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F5F5F7_100%)]" />
                   </div>
                   
                   {/* Location Pin */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                       <div className="w-4 h-4 bg-black rounded-full border-4 border-[#F5F5F7] shadow-lg relative z-10" />
                       <div className="w-24 h-24 bg-black/5 rounded-full blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                   </div>

                   <div className="relative z-10">
                       <h4 className="text-black font-bold text-lg">Centrala Beograd</h4>
                       <p className="text-neutral-500 text-sm">Bulevar Zorana Đinđića, 11070</p>
                   </div>
               </motion.div>
           </div>

           {/* RIGHT COLUMN: THE FORM */}
           <div className="lg:col-span-7">
              <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.6 }}
                 className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 relative overflow-hidden"
              >
                  <AnimatePresence mode="wait">
                      {formStatus === 'success' ? (
                          <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-[400px] flex flex-col items-center justify-center text-center py-12"
                          >
                              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 mb-8">
                                  <CheckCircle2 size={48} />
                              </div>
                              <h3 className="text-3xl font-bold text-[#0B0B0C] mb-4">Poruka Primljena</h3>
                              <p className="text-neutral-500 max-w-sm mx-auto mb-8">
                                  Vaš upit je dodeljen agentu podrške (Ticket #8920). Očekujte odgovor u roku od 2 sata na vašu email adresu.
                              </p>
                              <Button onClick={() => setFormStatus('idle')} variant="outline">Pošalji Novu Poruku</Button>
                          </motion.div>
                      ) : (
                          <motion.form 
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6 relative z-10"
                          >
                             <div className="mb-4">
                                <h3 className="text-2xl font-bold text-[#0B0B0C]">Pošalji Upit</h3>
                                <p className="text-neutral-500 text-sm mt-1">Sva polja su obavezna za bržu obradu.</p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-1">Ime</label>
                                   <input 
                                     required
                                     type="text" 
                                     className="w-full bg-[#F9F9FB] border border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 font-medium text-black placeholder:text-neutral-400"
                                     placeholder="Vaše Ime" 
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-1">Prezime</label>
                                   <input 
                                     required
                                     type="text" 
                                     className="w-full bg-[#F9F9FB] border border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 font-medium text-black placeholder:text-neutral-400"
                                     placeholder="Vaše Prezime" 
                                   />
                                </div>
                             </div>

                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-1">Email Adresa</label>
                                <input 
                                  required
                                  type="email" 
                                  className="w-full bg-[#F9F9FB] border border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 font-medium text-black placeholder:text-neutral-400"
                                  placeholder="name@institute.edu" 
                                />
                             </div>

                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-1">Tema</label>
                                <div className="relative">
                                  <select className="w-full bg-[#F9F9FB] border border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 font-medium text-black appearance-none cursor-pointer">
                                    <option>Status Porudžbine</option>
                                    <option>Tehnička Podrška (Research)</option>
                                    <option>Veleprodaja</option>
                                    <option>Reklamacije</option>
                                  </select>
                                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                    <ArrowRight size={16} className="rotate-90" />
                                  </div>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-1">Poruka</label>
                                <textarea 
                                  required
                                  rows={4} 
                                  className="w-full bg-[#F9F9FB] border border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 font-medium text-black placeholder:text-neutral-400 resize-none"
                                  placeholder="Detaljno opišite vaš zahtev..." 
                                />
                             </div>

                             <Button 
                                type="submit" 
                                disabled={formStatus === 'submitting'}
                                className="mt-4 w-full bg-[#0B0B0C] text-white hover:bg-neutral-800 py-5 rounded-2xl text-base font-bold shadow-xl shadow-neutral-200 flex items-center justify-center gap-2"
                             >
                                {formStatus === 'submitting' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Slanje...
                                    </>
                                ) : (
                                    <>
                                        Pošalji Upit <Send size={18} />
                                    </>
                                )}
                             </Button>
                          </motion.form>
                      )}
                  </AnimatePresence>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
};