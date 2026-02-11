import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { ChevronLeft, FileText, Plus, Minus, ShieldCheck, Thermometer, Scale, Dna, Activity, Zap, CheckCircle2, ArrowRight, Droplets, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
  // product is no longer passed directly, it's resolved from URL
}

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

export const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'handling'>('overview');
  
  // Bundle Logic State
  const [isBundleSelected, setIsBundleSelected] = useState(false);

  useEffect(() => {
    if (slug) {
        const found = PRODUCTS.find(p => p.slug === slug);
        setProduct(found);
        // Reset bundle state when product changes
        setIsBundleSelected(false);
    }
  }, [slug]);

  if (!product) {
      return <div className="min-h-screen pt-32 flex items-center justify-center">Učitavanje...</div>;
  }

  // --- BUNDLE LOGIC (Specific for GHK-Cu or others requiring water) ---
  const waterProduct = PRODUCTS.find(p => p.slug === 'bacteriostatic-water-srbija');
  // Define which products trigger the bundle offer. Currently GHK-Cu as requested.
  const isBundleEligible = (product.slug === 'ghk-cu-peptid-srbija' || product.slug === 'tb-500-peptid-srbija' || product.slug === 'bpc-157-peptid-srbija') && !!waterProduct;

  const currentPrice = isBundleSelected && waterProduct 
    ? product.price + waterProduct.price 
    : product.price;

  // Filter related products (exclude current, take 3)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
        // Add main product
        onAddToCart(product);
        
        // Add water if bundle selected
        if (isBundleEligible && isBundleSelected && waterProduct) {
            onAddToCart(waterProduct);
        }
    }
  };

  const handleRelatedClick = (slug: string) => {
    navigate(`/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-transparent relative">
      <SEO 
        title={`${product.name} Peptid - Research Grade | OCTOLAB Srbija`}
        description={`Kupite ${product.name} (${product.subtitle}) u Srbiji. ${product.description.substring(0, 100)}... Visoka čistoća, laboratorijski testirano.`}
      />

      <ModernBackground />
      
      {/* NAVIGATION HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
         <button 
           onClick={() => navigate('/peptidi-srbija')}
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

             {/* BUNDLE SELECTOR (If Eligible) */}
             {isBundleEligible && waterProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-1 bg-[#F5F5F7] rounded-[1.5rem] inline-flex flex-col sm:flex-row gap-1 w-full md:w-auto"
                >
                   <button 
                     onClick={() => setIsBundleSelected(false)}
                     className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-[1.2rem] transition-all duration-300 border ${!isBundleSelected ? 'bg-white shadow-lg text-black border-neutral-100' : 'bg-transparent text-neutral-500 border-transparent hover:text-black'}`}
                   >
                      <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center bg-[#F9F9FB]">
                         <Dna size={14} />
                      </div>
                      <div className="text-left">
                         <div className="text-xs font-bold uppercase tracking-wider">Samo Peptid</div>
                         <div className="text-sm font-medium opacity-60">Liofilizovan</div>
                      </div>
                   </button>
                   
                   <button 
                     onClick={() => setIsBundleSelected(true)}
                     className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-[1.2rem] transition-all duration-300 border ${isBundleSelected ? 'bg-black shadow-lg text-white border-black' : 'bg-transparent text-neutral-500 border-transparent hover:bg-white/50'}`}
                   >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBundleSelected ? 'bg-white/20 text-white' : 'bg-white border border-neutral-200 text-neutral-400'}`}>
                         <Droplets size={14} />
                      </div>
                      <div className="text-left">
                         <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            Kompletan Set
                            <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">Preporuka</span>
                         </div>
                         <div className="text-sm font-medium opacity-80">+ Bakteriostatska Voda</div>
                      </div>
                   </button>
                </motion.div>
             )}

             {isBundleEligible && !isBundleSelected && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-amber-600 text-xs font-medium mb-8 bg-amber-50 px-4 py-2 rounded-lg self-start border border-amber-100">
                   <Info size={14} />
                   <span>Napomena: Za rekonstituciju ovog peptida neophodna je Bakteriostatska voda.</span>
                </motion.div>
             )}

             {/* Controls Box */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-xl shadow-neutral-100/50 mb-12"
             >
                <div className="flex flex-col md:flex-row items-center gap-6">
                   <div className="flex flex-col items-start mr-auto w-full md:w-auto">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                        {isBundleSelected ? 'Cena Seta' : 'Cena po jedinici'}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span 
                            key={currentPrice}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-[#0B0B0C] tracking-tight"
                        >
                            ${currentPrice.toFixed(2)}
                        </motion.span>
                      </AnimatePresence>
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
                     <span>{isBundleSelected ? 'Dodaj Set' : 'Dodaj u Korpu'}</span>
                     <span className="w-px h-4 bg-white/20"></span>
                     <span>${(currentPrice * quantity).toFixed(2)}</span>
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
                         <strong>Važno Obaveštenje:</strong> Proizvodi su namenjeni isključivo za laboratorijska istraživanja. Nisu za ljudsku ili veterinarsku upotrebu. (Products are intended strictly for laboratory research purposes only. Not for human or veterinary use.)
                      </div>
                    </div>
                  )}
                </div>
             </motion.div>

             {/* RELATED PRODUCTS SECTION - INTERNAL LINKING */}
             <div className="mt-24 border-t border-neutral-100 pt-16">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                     <div>
                         <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block">Istražite Dalje</span>
                         <h2 className="text-3xl md:text-4xl font-bold text-[#0B0B0C] tracking-tight">Često Istraživano Zajedno</h2>
                     </div>
                     <Button variant="ghost" onClick={() => navigate('/peptidi-srbija')} className="hidden md:flex">
                         Vidi Sve <ArrowRight size={18} />
                     </Button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {relatedProducts.map((item) => (
                         <motion.div 
                             key={item.id}
                             whileHover={{ y: -5 }}
                             onClick={() => handleRelatedClick(item.slug)}
                             className="group cursor-pointer"
                         >
                             <div className="bg-[#F5F5F7] rounded-[2rem] aspect-square p-8 mb-6 flex items-center justify-center relative overflow-hidden">
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/50 backdrop-blur-md rounded-full border border-white/20">
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{item.category}</span>
                                  </div>
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-[#0B0B0C] mb-1 group-hover:underline decoration-1 underline-offset-4">{item.name}</h3>
                                 <p className="text-sm text-neutral-500 font-mono">{item.subtitle}</p>
                                 <div className="mt-3 font-medium text-neutral-900">${item.price.toFixed(2)}</div>
                             </div>
                         </motion.div>
                     ))}
                 </div>
                 
                 <div className="mt-8 flex md:hidden justify-center">
                    <Button variant="ghost" onClick={() => navigate('/peptidi-srbija')}>
                         Vidi Sve <ArrowRight size={18} />
                    </Button>
                 </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};