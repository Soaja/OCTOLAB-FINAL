import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { FlaskConical, Microscope, ArrowRight, Activity, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopProps {
  onProductClick: (product: Product) => void;
}

// Premium Background with slight variation for the clean look
const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
      {/* Very subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      
      {/* Soft gradient orb */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-blue-50/40 to-transparent rounded-full blur-[120px]" 
      />
    </div>
  );
};

export const Shop: React.FC<ShopProps> = ({ onProductClick }) => {
  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-transparent relative">
      <ModernBackground />

      {/* HEADER SECTION - REIMAGINED */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24 md:mb-40 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
           {/* Minimal Badge */}
           <span className="mb-8 px-5 py-2 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-md text-xs font-mono font-medium uppercase tracking-widest text-neutral-500 shadow-sm">
              The Collection
           </span>

           {/* Massive Editorial Title */}
           <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-[0.85]">
             Research <br/>
             <span className="text-neutral-300">Library.</span>
           </h1>
           
           <p className="text-lg md:text-2xl text-neutral-500 font-light max-w-xl leading-relaxed mt-4">
             Precision-engineered compounds. <br/>
             Verified for biological consistency.
           </p>
        </motion.div>
      </div>

      {/* PRODUCT SHOWCASE - NO FILTERS, PURE CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 pb-32 relative z-10 flex flex-col gap-32 md:gap-40">
          {PRODUCTS.map((product, index) => {
             const isEven = index % 2 === 0;
             return (
              <motion.section 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group"
              >
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                   
                   {/* IMAGE SIDE - Clean & Object-focused */}
                   <div 
                     onClick={() => onProductClick(product)}
                     className="flex-1 w-full relative cursor-pointer group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                   >
                      <div className="aspect-square relative rounded-[2.5rem] md:rounded-[3rem] bg-[#F5F5F7] overflow-hidden flex items-center justify-center p-12 md:p-16 shadow-inner">
                         {/* Subtle internal glow */}
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         
                         <motion.img 
                           src={product.image} 
                           alt={product.name} 
                           className="relative z-10 w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                           whileHover={{ y: -10, scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                         />

                         {/* Minimal Floating Category Tag */}
                         <div className="absolute top-6 left-6 md:top-10 md:left-10">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                               {product.category} Series
                            </span>
                         </div>
                      </div>
                   </div>

                   {/* CONTENT SIDE - Editorial Typography */}
                   <div className="flex-1 w-full flex flex-col items-start text-left">
                      
                      {/* Status Line */}
                      <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <div className={`px-3 py-1 rounded-full border ${product.inStock ? 'border-green-200 bg-green-50 text-green-700' : 'border-neutral-200 bg-neutral-50 text-neutral-500'} flex items-center gap-2`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-600 animate-pulse' : 'bg-neutral-400'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {product.inStock ? 'In Stock' : 'Sold Out'}
                            </span>
                        </div>
                        {product.coaAvailable && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                <Sparkles size={12} />
                                <span>COA Verified</span>
                            </div>
                        )}
                      </div>
                      
                      {/* Title - Massive & Bold */}
                      <h2 
                        onClick={() => onProductClick(product)}
                        className="text-5xl md:text-8xl font-bold text-[#0B0B0C] tracking-tighter mb-4 md:mb-6 cursor-pointer hover:text-neutral-700 transition-colors leading-[0.9]"
                      >
                        {product.name}
                      </h2>
                      
                      {/* Subtitle / Chem Name */}
                      <p className="text-lg md:text-xl font-mono text-neutral-400 mb-6 md:mb-8 tracking-tight">
                        {product.subtitle}
                      </p>
                      
                      {/* Description */}
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-md mb-8 md:mb-12 font-medium">
                        {product.description}
                      </p>

                      {/* Specs Grid - Minimalist */}
                      <div className="grid grid-cols-2 gap-y-6 gap-x-8 md:gap-y-8 md:gap-x-12 mb-10 md:mb-14 w-full max-w-md border-t border-neutral-100 pt-8">
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Volume</span>
                            <span className="text-lg md:text-xl font-medium text-neutral-900">{product.volume}</span>
                         </div>
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Purity (HPLC)</span>
                            <span className="text-lg md:text-xl font-medium text-neutral-900">&gt;99.9%</span>
                         </div>
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Dosage</span>
                            <span className="text-lg md:text-xl font-medium text-neutral-900">{product.dosage}</span>
                         </div>
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Temp</span>
                            <span className="text-lg md:text-xl font-medium text-neutral-900">-20°C</span>
                         </div>
                      </div>

                      {/* Action Area - Beautiful Price + Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8 w-full">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Price</span>
                            <span className="text-4xl md:text-5xl font-light tracking-tight text-[#0B0B0C]">
                                ${product.price.toFixed(2)}
                            </span>
                         </div>
                         
                         <div className="h-px w-12 bg-neutral-200 hidden sm:block"></div>

                         <Button 
                           onClick={() => onProductClick(product)}
                           className="flex-1 bg-[#0B0B0C] text-white hover:bg-neutral-800 h-14 md:h-16 rounded-full text-lg shadow-2xl shadow-neutral-200 group relative overflow-hidden"
                         >
                           <span className="relative z-10 flex items-center gap-2">
                             Analysis & Purchase <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                           </span>
                         </Button>
                      </div>

                   </div>
                </div>
              </motion.section>
             );
          })}
      </div>
    </div>
  );
};