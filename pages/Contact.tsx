import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Building2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

// Reusing the modern background style
const ModernBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
    <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_6rem]" />
    <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-100 rounded-full blur-[100px]" 
      />
  </div>
);

export const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <SEO 
        title="Kontakt & Podrška | OCTOLAB Srbija"
        description="Kontaktirajte OCTOLAB za veleprodaju, tehničku podršku i informacije o porudžbinama. Radno vreme: Pon-Pet 09-17h."
      />

      <ModernBackground />
      
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
           <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest uppercase"
           >
              Podrška i Upiti
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-bold tracking-tighter text-[#0B0B0C] mb-8"
           >
             Započnimo <br/>
             <span className="text-neutral-500">razgovor.</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-neutral-600 font-light max-w-xl leading-relaxed"
           >
             Bilo da su vam potrebni tehnički listovi, veleprodajne cene ili informacije o isporuci, naš tim je spreman da pomogne.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
           {/* Contact Info Cards */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col gap-6"
           >
              {[
                { 
                  icon: <MessageSquare size={20}/>, 
                  title: "Opšta Podrška", 
                  email: "research@octolab.com", 
                  desc: "Za status porudžbina i opšta pitanja." 
                },
                { 
                  icon: <Building2 size={20}/>, 
                  title: "Veleprodaja & Partnerstva", 
                  email: "partners@octolab.com", 
                  desc: "Za komercijalna i laboratorijska partnerstva." 
                },
                { 
                  icon: <Clock size={20}/>, 
                  title: "Radno Vreme", 
                  email: "Pon-Pet, 09:00 - 17:00", 
                  desc: "Vreme odgovora obično ispod 24 sata." 
                }
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-300">
                   <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors">
                      {item.icon}
                   </div>
                   <h3 className="text-lg font-bold text-[#0B0B0C] mb-1">{item.title}</h3>
                   <p className="text-neutral-900 font-medium mb-2">{item.email}</p>
                   <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
              ))}
           </motion.div>

           {/* Form Section */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-[#F5F5F7] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
           >
              {/* Decorative gradient blob inside form card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"/>

              <h3 className="text-2xl font-bold text-[#0B0B0C] mb-8 relative z-10">Pošalji poruku</h3>
              
              <form className="flex flex-col gap-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-2">Ime</label>
                       <input type="text" className="w-full bg-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/5 transition-all text-neutral-900 placeholder:text-neutral-500" placeholder="Jane" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-2">Prezime</label>
                       <input type="text" className="w-full bg-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/5 transition-all text-neutral-900 placeholder:text-neutral-500" placeholder="Doe" />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-2">Email Adresa</label>
                    <input type="email" className="w-full bg-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/5 transition-all text-neutral-900 placeholder:text-neutral-500" placeholder="jane@institute.edu" />
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-2">Tema</label>
                    <div className="relative">
                      <select className="w-full bg-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/5 transition-all text-neutral-900 appearance-none cursor-pointer">
                        <option>Opšti Upit</option>
                        <option>Podrška za Porudžbine</option>
                        <option>Veleprodaja i Istraživanje</option>
                        <option>Podaci Kontrole Kvaliteta</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 ml-2">Poruka</label>
                    <textarea rows={4} className="w-full bg-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/5 transition-all text-neutral-900 placeholder:text-neutral-500 resize-none" placeholder="Kako možemo pomoći vašem istraživanju?" />
                 </div>

                 <Button className="mt-4 w-full bg-[#0B0B0C] text-white hover:bg-neutral-800 py-5 rounded-xl text-base shadow-xl">
                    Pošalji Poruku
                 </Button>
              </form>
           </motion.div>
        </div>
      </div>
    </div>
  );
};