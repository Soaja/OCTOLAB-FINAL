import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { ChevronLeft, FileText, Plus, Minus, ShieldCheck, Thermometer, Scale, Dna, Activity, Zap, CheckCircle2, ArrowRight, Droplets, Info, Truck, Package, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
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
  
  // Hooks must be unconditional
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isBundleSelected, setIsBundleSelected] = useState(false);

  useEffect(() => {
    if (slug) {
        const found = PRODUCTS.find(p => p.slug === slug);
        setProduct(found);
        setIsBundleSelected(false);
        setQuantity(1); 
    }
  }, [slug]);

  const waterProduct = PRODUCTS.find(p => p.slug === 'bacteriostatic-water-srbija');
  
  const isBundleEligible = product && waterProduct ? (
      product.slug === 'ghk-cu-peptid-srbija' || 
      product.slug === 'tb-500-peptid-srbija' || 
      product.slug === 'bpc-157-peptid-srbija'
  ) : false;

  const currentPrice = (product && isBundleSelected && waterProduct) 
    ? product.price + waterProduct.price 
    : (product ? product.price : 0);

  const relatedProducts = product ? PRODUCTS.filter(p => p.id !== product.id).slice(0, 3) : [];

  const handleQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    for(let i=0; i<quantity; i++) {
        onAddToCart(product);
        if (isBundleEligible && isBundleSelected && waterProduct) {
            onAddToCart(waterProduct);
        }
    }
  };

  const handleRelatedClick = (slug: string) => {
    navigate(`/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTitle = product ? `${product.name} Peptid - Research Grade | OCTOLAB Srbija` : 'Učitavanje... | OCTOLAB';
  const pageDesc = product ? `Kupite ${product.name} (${product.subtitle}) u Srbiji.` : 'Detalji proizvoda...';

  // Render
  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-transparent relative">
      <SEO 
        title={pageTitle}
        description={pageDesc}
      />

      <ModernBackground />
      
      {/* NAVIGATION HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
         <button 
           onClick={() => navigate('/peptidi-srbija')}
           className="group flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-neutral-700 hover:text-black transition-colors"
         >
           <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-black transition-colors bg-white">
             <ChevronLeft size={14} />
           </div>
           Nazad u Biblioteku
         </button>
      </div>

      {!product ? (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-neutral-200 border-t-black rounded-full animate-spin"></div>
                <span className="text-xl font-medium text-neutral-600">Učitavanje...</span>
            </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: PRODUCT IMAGE & VISUALS */}
            <div className="lg:col-span-5 relative lg:sticky lg:top-32">
                <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="aspect-square w-full rounded-[2.5rem] bg-[#F5F5F7] overflow-hidden relative flex items-center justify-center p-12 shadow-inner"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent_70%)] opacity-70" />
                    
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
                    
                    <div className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">HPLC Verifikovano</span>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: DETAILS & CONTROLS */}
            <div className="lg:col-span-7 flex flex-col pt-2">
                
                {/* 1. Header Information */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                            {product.category}
                        </span>
                        {product.inStock ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Dostupno odmah
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Rasprodato</span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-[#0B0B0C] tracking-tighter mb-2 leading-[0.9]">
                        {product.name}
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium mb-6 font-mono">
                        {product.subtitle}
                    </p>
                </motion.div>

                {/* 2. Bundle Selector (Condensed) */}
                {isBundleEligible && waterProduct && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="grid grid-cols-2 gap-2">
                             <button 
                                onClick={() => setIsBundleSelected(false)}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${!isBundleSelected ? 'border-black bg-neutral-50 text-black' : 'border-transparent bg-neutral-100 text-neutral-500'}`}
                             >
                                <span className="text-xs font-bold uppercase tracking-wider">Samo Peptid</span>
                             </button>
                             <button 
                                onClick={() => setIsBundleSelected(true)}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${isBundleSelected ? 'border-black bg-neutral-50 text-black' : 'border-transparent bg-neutral-100 text-neutral-500'}`}
                             >
                                <span className="text-xs font-bold uppercase tracking-wider">+ Bakteriostatska Voda</span>
                             </button>
                        </div>
                    </motion.div>
                )}

                {/* 3. Pricing & Cart Action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-stretch gap-4 mb-10"
                >
                    <div className="bg-[#F5F5F7] rounded-2xl px-6 py-4 flex flex-col justify-center min-w-[140px]">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Cena</span>
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={currentPrice}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-bold text-[#0B0B0C] tracking-tight"
                            >
                                ${currentPrice.toFixed(2)}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center bg-[#F5F5F7] rounded-2xl p-2 px-4 gap-4">
                        <button 
                            onClick={() => handleQuantity(-1)}
                            className="w-10 h-10 rounded-xl bg-white text-black shadow-sm flex items-center justify-center hover:scale-95 transition-transform"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold font-mono w-6 text-center">{quantity}</span>
                        <button 
                            onClick={() => handleQuantity(1)}
                            className="w-10 h-10 rounded-xl bg-white text-black shadow-sm flex items-center justify-center hover:scale-95 transition-transform"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <Button 
                        onClick={handleAddToCart}
                        className="flex-1 h-auto bg-[#0B0B0C] text-white rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 py-4 md:py-0"
                        disabled={!product.inStock}
                    >
                        <span>Dodaj u Korpu</span>
                        <ArrowRight size={18} />
                    </Button>
                </motion.div>

                {/* 4. THE "TRUST BLOCK" - Immediate Answers */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-2xl shadow-neutral-100/50 space-y-6"
                >
                    {/* What do I get? */}
                    <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Package size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-black uppercase tracking-wide mb-1">Sadržaj Paketa</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                1x {product.name} ({product.volume}) u formatu liofilizovanog praha (Cake). 
                                {isBundleSelected && " + 1x 30mL Bakteriostatska voda (USP)."}
                            </p>
                        </div>
                    </div>

                    {/* Purity & Analysis */}
                    <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-black uppercase tracking-wide mb-1">Čistoća i Analiza</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Garantovana čistoća {'>'}99% verifikovana HPLC metodom. <br/>
                                <span className="underline decoration-neutral-300 underline-offset-4 cursor-pointer hover:text-black transition-colors">Pogledaj COA (Sertifikat Analize)</span>
                            </p>
                        </div>
                    </div>

                    {/* Delivery & Packing */}
                    <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                            <Truck size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-black uppercase tracking-wide mb-1">Isporuka Srbija (24h)</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Šaljemo Post Express-om (Danas za Sutra).
                                Pakovano u diskretnu termo-izolovanu ambalažu (Hladni Lanac) radi očuvanja stabilnosti.
                            </p>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs font-medium text-amber-800 leading-relaxed">
                            <span className="font-bold uppercase">Samo za Istraživačke Svrhe.</span><br/>
                            Ovaj proizvod nije namenjen za ljudsku upotrebu, dijagnostiku ili lečenje. Kupovinom potvrđujete da ste istraživačka institucija ili kvalifikovani pojedinac.
                        </p>
                    </div>
                </motion.div>

                {/* 5. Minimal Specs List (Secondary Info) */}
                <div className="mt-12 grid grid-cols-2 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F9FB]">
                        <Dna size={16} className="text-neutral-500"/>
                        <div>
                            <div className="text-[9px] uppercase font-bold text-neutral-500">Sekvenca</div>
                            <div className="text-xs font-bold">15 Aminokiselina</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F9FB]">
                        <Thermometer size={16} className="text-neutral-500"/>
                        <div>
                            <div className="text-[9px] uppercase font-bold text-neutral-500">Skladištenje</div>
                            <div className="text-xs font-bold">-20°C (Dugoročno)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F9FB]">
                        <Scale size={16} className="text-neutral-500"/>
                        <div>
                            <div className="text-[9px] uppercase font-bold text-neutral-500">Molarna Masa</div>
                            <div className="text-xs font-bold">1419 g/mol</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F9FB]">
                        <FileText size={16} className="text-neutral-500"/>
                        <div>
                            <div className="text-[9px] uppercase font-bold text-neutral-500">CAS Broj</div>
                            <div className="text-xs font-bold">137-00-1</div>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS (Simplified for brevity) */}
                <div className="mt-16 pt-8 border-t border-neutral-100">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-6">Često Istraživano Zajedno</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {relatedProducts.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => handleRelatedClick(item.slug)}
                                className="group cursor-pointer bg-[#F5F5F7] rounded-2xl p-4 text-center hover:bg-neutral-200 transition-colors"
                            >
                                <img src={item.image} alt={item.name} className="w-12 h-12 mx-auto mb-2 object-contain mix-blend-multiply" />
                                <div className="text-xs font-bold text-black">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            </div>
        </div>
      )}
    </div>
  );
};