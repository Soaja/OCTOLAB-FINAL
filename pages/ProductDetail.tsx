import React, { useState } from 'react';
import { Product } from '../types';
import { Button } from '../components/Button';
import { ChevronLeft, FileText, Plus, Minus, ShieldCheck, Thermometer, Scale, Dna, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

// Reuse the premium background
const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-blue-50/60 rounded-full blur-[120px]" 
      />
    </div>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'handling'>('overview');

  const handleQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    // In a real app, we'd pass the quantity too
    for(let i=0; i<quantity; i++) {
        onAddToCart(product);
    }
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-transparent relative">
      <ModernBackground />
      
      {/* NAVIGATION HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
         <button 
           onClick={onBack}
           className="group flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
         >
           <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-black transition-colors bg-white">
             <ChevronLeft size={14} />
           </div>
           Nazad u Biblioteku
         </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: PRODUCT IMAGE & VISUALS (5 Cols) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-32">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="aspect-square w-full rounded-[2.5rem] md:rounded-[3rem] bg-[#F5F5F7] overflow-hidden relative flex items-center justify-center p-12 shadow-inner"
             >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent_70%)] opacity-70" />
                
                {/* Rotating Ring (Decor) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-dashed border-neutral-300 rounded-full m-12 opacity-30"
                />

                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50">
                   <ShieldCheck size={16} className="text-blue-600" />
                   <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Lab Verifikovano</span>
                </div>
             </motion.div>

             {/* Thumbnail / Extra Views (Visual Only for now) */}
             <div className="grid grid-cols-3 gap-4 mt-4">
               {[1,2,3].map((_, i) => (
                 <div key={i} className={`h-24 rounded-2xl border ${i === 0 ? 'border-black bg-neutral-50' : 'border-transparent bg-[#F5F5F7]'} flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors`}>
                    <Dna size={20} className="text-neutral-400 opacity-50" />
                 </div>
               ))}
             </div>
          </div>

          {/* RIGHT: DETAILS & CONTROLS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col pt-4">
             
             {/* Header Info */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
                <div className="flex items-center gap-3 mb-6">
                   <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold tracking-widest uppercase rounded-full border border-blue-100">
                     {product.category} Serija
                   </span>
                   {product.inStock ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Na Stanju i Spremno
                      </span>
                   ) : (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Rasprodato</span>
                   )}
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-[#0B0B0C] tracking-tighter mb-4 leading-[0.9]">
                  {product.name}
                </h1>
                <p className="text-xl text-neutral-500 font-light mb-8 max-w-xl">
                  {product.subtitle} - {product.description}
                </p>
             </motion.div>

             {/* Controls Box */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-xl shadow-neutral-100/50 mb-12"
             >
                <div className="flex flex-col md:flex-row items-center gap-6">
                   <div className="flex flex-col items-start mr-auto w-full md:w-auto">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Cena po jedinici</span>
                      <span className="text-4xl font-bold text-[#0B0B0C] tracking-tight">${product.price.toFixed(2)}</span>
                   </div>

                   {/* Quantity */}
                   <div className="flex items-center bg-[#F5F5F7] rounded-full p-1.5 h-16 w-full md:w-auto justify-between md:justify-start">
                      <button 
                        onClick={() => handleQuantity(-1)}
                        className="w-12 h-full rounded-full bg-white text-black shadow-sm flex items-center justify-center hover:scale-95 transition-transform"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-16 text-center font-bold text-lg font-mono">{quantity}</span>
                      <button 
                        onClick={() => handleQuantity(1)}
                        className="w-12 h-full rounded-full bg-white text-black shadow-sm flex items-center justify-center hover:scale-95 transition-transform"
                      >
                        <Plus size={16} />
                      </button>
                   </div>

                   {/* Add Button */}
                   <Button 
                     onClick={handleAddToCart}
                     className="w-full md:w-auto h-16 px-10 bg-[#0B0B0C] text-white rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                     disabled={!product.inStock}
                   >
                     <span>Dodaj u Korpu</span>
                     <span className="w-px h-4 bg-white/20"></span>
                     <span>${(product.price * quantity).toFixed(2)}</span>
                   </Button>
                </div>
             </motion.div>

             {/* Technical Spec Grid */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="mb-12"
             >
               <h3 className="text-sm font-bold text-[#0B0B0C] uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Activity size={16} /> Tehničke Specifikacije
               </h3>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Format", value: product.volume, icon: <Dna size={16}/> },
                    { label: "Doza", value: product.dosage, icon: <Scale size={16}/> },
                    { label: "Čistoća", value: ">99.8%", icon: <ShieldCheck size={16}/> },
                    { label: "Skladištenje", value: "-20°C", icon: <Thermometer size={16}/> },
                    { label: "Sekvenca", value: "15 AA", icon: <Zap size={16}/> },
                    { label: "Molarna Masa", value: "1419 g/mol", icon: <Scale size={16}/> },
                    { label: "Rastvorljivost", value: "Voda", icon: <Activity size={16}/> },
                    { label: "CAS Br.", value: "137-00-1", icon: <FileText size={16}/> },
                  ].map((spec, i) => (
                    <div key={i} className="bg-[#F9F9FB] rounded-2xl p-4 border border-transparent hover:border-neutral-200 transition-colors">
                       <div className="text-neutral-400 mb-2">{spec.icon}</div>
                       <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">{spec.label}</div>
                       <div className="text-sm font-bold text-neutral-900">{spec.value}</div>
                    </div>
                  ))}
               </div>
             </motion.div>

             {/* Tabbed Info Section */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
             >
                <div className="flex items-center gap-8 border-b border-neutral-100 mb-6 overflow-x-auto no-scrollbar">
                   <button 
                     onClick={() => setActiveTab('overview')}
                     className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeTab === 'overview' ? 'text-black' : 'text-neutral-400 hover:text-black'}`}
                   >
                     Pregled Jedinjenja
                     {activeTab === 'overview' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                   </button>
                   <button 
                     onClick={() => setActiveTab('handling')}
                     className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeTab === 'handling' ? 'text-black' : 'text-neutral-400 hover:text-black'}`}
                   >
                     Skladištenje i Protokol
                     {activeTab === 'handling' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                   </button>
                </div>
                
                <div className="min-h-[200px] text-neutral-600 leading-relaxed font-medium">
                  {activeTab === 'overview' ? (
                    <div className="space-y-4">
                      <p>
                        Ovo jedinjenje je sintetizovano koristeći napredne protokole sinteze peptida na čvrstoj fazi (SPPS), obezbeđujući precizno poravnanje sekvenci i minimalno formiranje nečistoća. Nakon sinteze, proizvod prolazi kroz rigorozno prečišćavanje putem preparativne Tečne Hromatografije Visokih Performansi (HPLC).
                      </p>
                      <p>
                        Svaka serija se liofilizuje (suši smrzavanjem) pod kontrolisanim uslovima kako bi se maksimizirala stabilnost i rok trajanja, što rezultira kristalnim belim prahom koji je lako rastvorljiv u bakteriostatskoj vodi ili sterilnom fiziološkom rastvoru.
                      </p>
                      <div className="flex gap-4 pt-4 flex-wrap">
                         <Button variant="outline" size="sm" icon={<FileText size={14}/>}>Preuzmi COA</Button>
                         <Button variant="outline" size="sm" icon={<FileText size={14}/>}>MS Analiza</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                        <p>Čuvajte liofilizovani prah na -20°C do 24 meseca.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                        <p>Nakon rekonstitucije, čuvajte na 4°C i upotrebite u roku od 21 dana.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                        <p>Izbegavajte ponovljene cikluse smrzavanja i odmrzavanja kako biste održali integritet peptida.</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 mt-4 text-sm text-yellow-800">
                         <strong>Samo Za Istraživačku Upotrebu:</strong> Ovaj proizvod je namenjen isključivo za laboratorijska istraživanja i nije odobren za ljudsku upotrebu.
                      </div>
                    </div>
                  )}
                </div>
             </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};