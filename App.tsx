import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Info } from './pages/Info'; // Imported new component
import { CartItem, PageView, Product } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigateTo = (page: PageView) => {
    if (page === PageView.CART) {
      setIsCartOpen(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage(page);
      setIsCartOpen(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo(PageView.PRODUCT);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <HashRouter>
      <div className="bg-white min-h-screen font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
        
        <Navbar 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          onNavigate={navigateTo}
          currentPage={currentPage}
        />

        <main className="min-h-screen relative">
          <AnimatePresence mode="wait">
            {currentPage === PageView.HOME && (
              <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <Home onNavigate={navigateTo} />
              </motion.div>
            )}
            
            {currentPage === PageView.SHOP && (
              <motion.div key="shop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <Shop onProductClick={handleProductClick} />
              </motion.div>
            )}

            {currentPage === PageView.PRODUCT && selectedProduct && (
              <motion.div key="product" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <ProductDetail 
                  product={selectedProduct} 
                  onBack={() => navigateTo(PageView.SHOP)}
                  onAddToCart={addToCart}
                />
              </motion.div>
            )}

            {/* ABOUT US PAGE */}
            {currentPage === PageView.ABOUT && (
               <motion.div key="about" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                 <About />
               </motion.div>
            )}

            {/* INFO PAGE - UPDATED */}
            {currentPage === PageView.INFO && (
               <motion.div key="info" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                 <Info />
               </motion.div>
            )}

            {/* CONTACT PAGE */}
            {currentPage === PageView.CONTACT && (
               <motion.div key="contact" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                 <Contact />
               </motion.div>
            )}

            {/* Legacy Quality Page Fallback */}
            {currentPage === PageView.QUALITY && (
               <div className="pt-32 text-center h-[60vh]">
                 <h1 className="text-3xl font-bold">Kontrola Kvaliteta</h1>
                 <p className="mt-4 text-neutral-500">Preusmeravanje na Info...</p>
               </div>
            )}
          </AnimatePresence>
        </main>

        <Footer />

        {/* CART SIDEBAR - REDESIGNED */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-[60]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-[70] flex flex-col border-l border-neutral-100"
              >
                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-center bg-white z-10">
                  <div className="flex items-baseline gap-3">
                     <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0C] leading-none">Izbor</h2>
                     <span className="text-neutral-400 font-mono text-sm">({cart.reduce((a,c) => a + c.quantity, 0)} Stavki)</span>
                  </div>
                  <button 
                     onClick={() => setIsCartOpen(false)} 
                     className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                  >
                     <X size={20} />
                  </button>
                </div>

                {/* Scrollable Items */}
                <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-6">
                  {cart.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <ShoppingBag size={48} className="mb-4" strokeWidth={1} />
                        <p className="text-lg font-medium">Vaša korpa je prazna.</p>
                        <p className="text-sm">Započnite svoju istraživačku biblioteku.</p>
                     </div>
                  ) : (
                    cart.map(item => (
                      <motion.div 
                         layout
                         key={item.id} 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="flex gap-6 group"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-[#F5F5F7] rounded-2xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0 border border-transparent group-hover:border-neutral-200 transition-colors">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-bold text-[#0B0B0C] leading-none mb-1">{item.name}</h4>
                                <span className="font-bold text-[#0B0B0C]">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">{item.volume} • {item.dosage}</p>
                          </div>

                          <div className="flex justify-between items-end">
                             {/* Qty Controls */}
                             <div className="flex items-center gap-3 bg-neutral-50 rounded-full p-1 border border-neutral-100">
                                <button 
                                   onClick={() => updateQuantity(item.id, -1)}
                                   className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-600 hover:text-black disabled:opacity-50"
                                   disabled={item.quantity <= 1}
                                >
                                   <Minus size={12} />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                <button 
                                   onClick={() => updateQuantity(item.id, 1)}
                                   className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-600 hover:text-black"
                                >
                                   <Plus size={12} />
                                </button>
                             </div>

                             <button 
                                onClick={() => removeFromCart(item.id)} 
                                className="text-neutral-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                             >
                                <Trash2 size={12} /> Ukloni
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-[#FAFAFA] border-t border-neutral-200 space-y-4">
                   {cart.length > 0 && (
                     <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm text-neutral-500">
                           <span>Međuzbir</span>
                           <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-500">
                           <span>Dostava (Hladni Lanac)</span>
                           <span>Obračunava se sledeće</span>
                        </div>
                     </div>
                   )}
                   
                   <div className="flex justify-between items-end mb-6">
                      <div>
                          <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Ukupno Procenjeno</span>
                          <div className="text-3xl font-bold text-[#0B0B0C]">${cartTotal.toFixed(2)}</div>
                      </div>
                   </div>

                   <button className="w-full bg-[#0B0B0C] text-white h-16 rounded-full font-bold text-lg hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group">
                      <span>Bezbedno Plaćanje</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   
                   <p className="text-center text-[10px] text-neutral-400 uppercase tracking-widest mt-4">
                      Samo Za Istraživačku Upotrebu • Nije Za Ljudsku Upotrebu
                   </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </HashRouter>
  );
};

export default App;