import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, Lock, MapPin, User, Mail, Phone, CheckCircle2, Wallet, Package, ArrowRight, Loader2, ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onClearCart: () => void;
}

const ModernBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
    <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_6rem]" />
  </div>
);

export const Checkout: React.FC<CheckoutProps> = ({ cart, total, onClearCart }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
        navigate('/peptidi-srbija');
    }
  }, [cart, navigate, isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Extract data
    const orderData = {
        customer_email: formData.get('email'),
        customer_phone: formData.get('phone'),
        customer_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        shipping_address: {
            street: formData.get('address'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName')
        },
        cart_items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            sku: item.slug
        })),
        total_amount: total + 5, // Including shipping
        payment_method: 'pouzece', // Hardcoded for now based on UI
        status: 'pending'
    };

    try {
        const { error } = await supabase
            .from('orders')
            .insert([orderData]);

        if (error) throw error;

        // Success simulation delay for UX
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            onClearCart();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1000);

    } catch (error: any) {
        console.error('Error saving order:', error);
        // Show specific error message from Supabase if available
        const message = error.message || 'Došlo je do greške prilikom čuvanja porudžbine. Molimo pokušajte ponovo.';
        setErrorMsg(message);
        setIsSubmitting(false);
    }
  };

  if (isSuccess) {
      return (
        <div className="min-h-screen pt-32 bg-white relative flex items-center justify-center">
            <SEO title="Porudžbina Uspešna | OCTOLAB" description="Hvala na kupovini." />
            <ModernBackground />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full px-6 text-center"
            >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                    <CheckCircle2 size={48} strokeWidth={3} />
                </div>
                <h1 className="text-4xl font-bold text-[#0B0B0C] mb-4 tracking-tight">Porudžbina Potvrđena</h1>
                <p className="text-neutral-500 text-lg mb-8 leading-relaxed">
                    Hvala vam na poverenju. Vaš paket je u pripremi.<br/>
                    Potvrda je poslata na vašu email adresu.
                </p>
                <div className="bg-[#F9F9FB] rounded-2xl p-6 mb-8 text-left border border-neutral-100">
                    <div className="flex items-center gap-3 mb-2">
                        <Truck size={18} className="text-neutral-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Isporuka</span>
                    </div>
                    <p className="font-bold text-black">Očekivana dostava: Sutra do 19h</p>
                </div>
                <Button onClick={() => navigate('/')} className="w-full h-14 rounded-full bg-black text-white shadow-xl">
                    Povratak na Početnu
                </Button>
            </motion.div>
        </div>
      );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-transparent relative">
      <SEO 
        title="Bezbedno Plaćanje | OCTOLAB Srbija"
        description="Završite svoju porudžbinu. Plaćanje pouzećem, diskretna isporuka, SSL enkripcija."
      />
      <ModernBackground />

      <div className="max-w-[1200px] mx-auto px-6 pb-24 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black mb-6 transition-colors"
            >
                <ChevronLeft size={14} /> Nazad
            </button>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0C]">
                Finalizacija <span className="text-neutral-400">Porudžbine.</span>
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-7">
                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8"
                >
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 border border-red-100">
                            <AlertCircle size={20} />
                            <p className="text-sm font-medium">{errorMsg}</p>
                        </div>
                    )}

                    {/* Section 1: Contact */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                                <User size={16} />
                            </div>
                            <h3 className="text-lg font-bold">Kontakt Informacije</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email</label>
                                <input required name="email" type="email" placeholder="vas@email.com" className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Telefon</label>
                                <input required name="phone" type="tel" placeholder="+381 6..." className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Shipping */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                                <MapPin size={16} />
                            </div>
                            <h3 className="text-lg font-bold">Adresa za Dostavu</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Ime</label>
                                <input required name="firstName" type="text" placeholder="Vaše Ime" className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Prezime</label>
                                <input required name="lastName" type="text" placeholder="Vaše Prezime" className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Ulica i Broj</label>
                            <input required name="address" type="text" placeholder="Bulevar..." className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Poštanski Broj</label>
                                <input required name="zip" type="text" placeholder="11000" className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Grad</label>
                                <input required name="city" type="text" placeholder="Beograd" className="w-full bg-[#F9F9FB] border-transparent focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-neutral-100 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Payment */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                                <Wallet size={16} />
                            </div>
                            <h3 className="text-lg font-bold">Način Plaćanja</h3>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-neutral-50 p-6 flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0B0B0C] text-lg">Plaćanje Pouzećem (Keš)</h4>
                                <p className="text-neutral-600 text-sm mt-1 leading-relaxed">
                                    Plaćate kuriru prilikom preuzimanja paketa. Najsigurniji način kupovine.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-20 rounded-3xl bg-[#0B0B0C] text-white shadow-2xl hover:bg-neutral-800 text-xl font-bold flex items-center justify-center gap-3 mt-4"
                    >
                        {isSubmitting ? (
                            <>Procesiranje... <Loader2 className="animate-spin" /></>
                        ) : (
                            <>Potvrdite Porudžbinu <ArrowRight /></>
                        )}
                    </Button>
                    
                    <div className="flex justify-center items-center gap-6 text-neutral-400 grayscale opacity-60">
                         <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Lock size={12}/> 256-bit SSL Secure</div>
                         <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ShieldCheck size={12}/> Privacy Guaranteed</div>
                    </div>

                </motion.form>
            </div>

            {/* RIGHT COLUMN: SUMMARY (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#FAFAFA] border border-neutral-200 rounded-[2.5rem] p-8 overflow-hidden relative"
                >
                    <h3 className="text-xl font-bold text-[#0B0B0C] mb-8">Pregled Korpe</h3>

                    <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-white rounded-xl p-2 border border-neutral-100 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-[#0B0B0C] truncate pr-2">{item.name}</h4>
                                        <span className="font-mono text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 font-mono mt-0.5">Količina: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-6 space-y-3">
                        <div className="flex justify-between text-sm text-neutral-600">
                            <span>Međuzbir</span>
                            <span className="font-mono">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-600">
                            <span>Dostava (Hladni Lanac)</span>
                            <span className="font-mono">$5.00</span>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-neutral-200 mt-4">
                            <span className="text-base font-bold text-[#0B0B0C]">Ukupno za plaćanje</span>
                            <span className="text-3xl font-bold text-[#0B0B0C] tracking-tight">${(total + 5).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 p-4 rounded-2xl flex items-start gap-3">
                        <Package size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-800 mb-1">Diskretno Pakovanje</h4>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                Paket ne sadrži oznake brenda niti sadržaja. Spolja izgleda kao standardna dokumentacija.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};