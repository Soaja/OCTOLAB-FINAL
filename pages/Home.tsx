import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Activity, FlaskConical, Microscope, Truck, Package, AlertTriangle, Plus, Minus, CheckCircle2, FileText, Thermometer, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

// --- COMPONENTS ---

const DisclaimerBar = () => (
  <div className="w-full bg-amber-50/60 border-y border-amber-100/50 py-3 flex justify-center items-center relative z-30 backdrop-blur-md">
      <div className="flex items-center gap-2 text-amber-900 px-4 text-center">
          <AlertTriangle size={12} className="stroke-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
            Samo Za Istraživačke Svrhe
          </span>
      </div>
  </div>
);

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string, subtitle?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} max-w-4xl mx-auto`}>
    {subtitle && (
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            {subtitle}
        </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0C] tracking-tight leading-[1.1]">
      {title}
    </h2>
  </div>
);

// 1. HERO SECTION (Preserved & Optimized)
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden">
            <div className="absolute inset-0 hero-glow -z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-30 -z-10 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-700">Prodaja Peptida u Srbiji</span>
                    </span>
                </motion.div>

                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-[#0B0B0C] leading-[0.95] md:leading-[0.9] mb-8 max-w-4xl mx-auto">
                    JASNOĆA<br/>
                    U SVAKOM<br/>
                    <span className="text-neutral-500">MOLEKULU.</span>
                </h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-700 max-w-2xl leading-relaxed mb-10 font-medium"
                >
                    Peptidi za istraživanja dostupni u Srbiji. <br className="hidden md:block" />
                    Laboratorijski testirana jedinjenja dizajnirana za savremena istraživanja.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Button 
                        onClick={() => navigate('/peptidi-srbija')} 
                        size="lg" 
                        className="bg-[#0B0B0C] text-white hover:bg-neutral-800 px-10 h-14 rounded-full shadow-xl shadow-neutral-200 text-sm tracking-wide font-bold"
                    >
                        Istraži Peptide
                    </Button>
                    <Button 
                        onClick={() => navigate('/laboratorijski-standard')} 
                        variant="outline"
                        size="lg" 
                        className="bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50 px-10 h-14 rounded-full text-sm tracking-wide font-bold"
                    >
                        Protokoli Kvaliteta
                    </Button>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-neutral-600 tracking-wide"
                >
                    <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /><span>HPLC/MS testirano</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /><span>&gt;99% čistoća</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /><span>Brza isporuka u Srbiji</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /><span>Hladni lanac</span></div>
                </motion.div>
            </div>
        </section>
    );
};

// 2. INTRO / SEO BLOCK (MODERNIZED)
const OctolabIntro = () => (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                
                {/* Left Side: Headline & Lead */}
                <div className="lg:col-span-5 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                         <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">O Octolabu</span>
                         </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#0B0B0C] mb-6 leading-[1.05]">
                            Peptidi za istraživanje <br/>
                            <span className="text-neutral-400">u Srbiji.</span>
                        </h2>
                        
                        <div className="w-12 h-1 bg-black mb-8" />

                        <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                            OCTOLAB postavlja novi standard za nabavku laboratorijskih peptida na domaćem tržištu.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Detailed Grid */}
                <div className="lg:col-span-7">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-600 leading-relaxed mb-12 text-lg"
                    >
                         Specijalizovani smo za sintezu i distribuciju visoko-čistih jedinjenja namenjenih isključivo kvalifikovanim istraživačima i naučnim institucijama. Eliminišemo rizike uvoza i garantujemo kvalitet.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Lokalna Dostupnost",
                                desc: "Bez carine i čekanja. Isporuka iz Beograda u roku od 24h."
                            },
                            {
                                title: "Hladni Lanac",
                                desc: "Skladištenje na -20°C. Transport u termo-izolovanoj ambalaži."
                            },
                             {
                                title: "HPLC Verifikacija",
                                desc: "Svaka serija testirana. Čistoća >99% garantovana sertifikatom."
                            },
                             {
                                title: "Pravna Sigurnost",
                                desc: "Usklađeno sa regulativom. Isključivo za in-vitro istraživanja."
                            }
                        ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="group bg-[#F9F9FB] p-6 rounded-2xl border border-transparent hover:border-neutral-200 hover:bg-white hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-300"
                            >
                                <div className="mb-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold border border-neutral-100 group-hover:bg-black group-hover:text-white transition-colors">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-[#0B0B0C] mb-2 text-lg">{item.title}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </section>
);

// Helper Component for Product Grid
const ProductCard: React.FC<{ product: Product, onClick: () => void, className?: string, isHorizontal?: boolean }> = ({ product, onClick, className = "", isHorizontal = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`group bg-white rounded-[2rem] p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex ${isHorizontal ? 'flex-col md:flex-row gap-8 items-center' : 'flex-col'} ${className} cursor-pointer`}
            onClick={onClick}
        >
            <div className={`${isHorizontal ? 'w-full md:w-1/2 aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-square w-full'} bg-[#F9F9FB] rounded-3xl relative overflow-hidden flex items-center justify-center p-8`}>
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-100 shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className={`${isHorizontal ? 'w-full md:w-1/2 py-4 pr-4' : 'pt-6'} flex flex-col h-full w-full text-left`}>
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#0B0B0C] mb-1">{product.name}</h3>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.subtitle}</p>
                </div>

                <p className="text-sm text-neutral-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 w-full">
                    <span className="text-lg font-bold text-[#0B0B0C]">${product.price.toFixed(2)}</span>
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// 3. PRODUCT GRID (Selling Section)
const ProductGrid = () => {
    const navigate = useNavigate();
    
    // 1. Define the 4 grid products (excluding TB-500)
    const gridSlugs = [
        'bpc-157-peptid-srbija',
        'ghk-cu-peptid-srbija',
        'retatrutide-peptid-srbija',
        'semax-peptid-srbija'
    ];

    // 2. Define the bottom product
    const waterSlug = 'bacteriostatic-water-srbija';

    const gridProducts = PRODUCTS.filter(p => gridSlugs.includes(p.slug));
    const waterProduct = PRODUCTS.find(p => p.slug === waterSlug);

    return (
        <section className="py-24 bg-[#F5F5F7]">
            <div className="max-w-[1200px] mx-auto px-6">
                <SectionHeading title="Najtraženiji Molekuli" subtitle="Istraživački Katalog" />
                
                {/* 2x2 Grid for Peptides */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {gridProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            onClick={() => navigate(`/${product.slug}`)}
                        />
                    ))}
                </div>
                
                {/* Full width card for Water */}
                {waterProduct && (
                    <ProductCard 
                        product={waterProduct}
                        onClick={() => navigate(`/${waterProduct.slug}`)}
                        isHorizontal={true}
                    />
                )}
                
                <div className="mt-16 text-center">
                    <Button onClick={() => navigate('/peptidi-srbija')} variant="outline" className="bg-white border-neutral-200">
                        Pregledaj Ceo Katalog
                    </Button>
                </div>
            </div>
        </section>
    );
};

// 4. WHY US (Trust Block)
const TrustBlock = () => (
    <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
            <SectionHeading title="Naučni Integritet" subtitle="OCTOLAB Standard" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Microscope size={24} />, title: "Laboratorijska Analiza", desc: "Svaka serija je verifikovana. HPLC (čistoća) i MS (identitet) izveštaji dostupni." },
                    { icon: <ShieldCheck size={24} />, title: "Čistoća >99%", desc: "Garantovana farmaceutska čistoća (API grade) bez filera i nečistoća." },
                    { icon: <Package size={24} />, title: "Diskretna Dostava", desc: "Neutralno pakovanje bez oznaka brenda radi privatnosti institucije." },
                    { icon: <Thermometer size={24} />, title: "Termalna Stabilnost", desc: "Skladištenje i transport u kontrolisanim temperaturnim uslovima." }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#F9F9FB] border border-neutral-100 text-center md:text-left hover:border-neutral-300 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-900 mb-4 mx-auto md:mx-0">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[#0B0B0C] mb-2">{item.title}</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 5. QUALITY PROCESS (Visual Flow)
const ProcessFlow = () => (
    <section className="py-24 bg-[#0B0B0C] text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-green-500 font-mono text-xs uppercase tracking-widest mb-2 block">Protokol Kvaliteta</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Od Sinteze do Laboratorije</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-800 -z-10" />

                {[
                    { icon: <FlaskConical />, step: "01", title: "Sinteza", desc: "Solid-phase peptidna sinteza." },
                    { icon: <Activity />, step: "02", title: "Testiranje", desc: "HPLC & MS verifikacija." },
                    { icon: <Zap />, step: "03", title: "Liofilizacija", desc: "Stabilizacija u prah formatu." },
                    { icon: <Thermometer />, step: "04", title: "Hladni Lanac", desc: "-20°C Skladištenje." },
                    { icon: <Truck />, step: "05", title: "Isporuka", desc: "Post Express 24h dostava." }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-green-400 group-hover:border-green-500/50 transition-all mb-6 relative z-10 shadow-xl">
                            {item.icon}
                            <span className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold border border-neutral-700">
                                {item.step}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-neutral-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 6. FAQ (Optimized)
const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
    const questions = [
      {
        question: "Šta su research peptidi?",
        answer: "Research peptidi su hemijska jedinjenja namenjena isključivo za in vitro laboratorijska istraživanja. Koriste se za proučavanje bioloških mehanizama, signalnih puteva i ćelijskih reakcija. Nisu namenjeni za ljudsku upotrebu."
      },
      {
        question: "Kako se proizvodi transportuju?",
        answer: "Koristimo specijalizovano termalno pakovanje kako bismo zaštitili peptide od temperaturnih oscilacija. Isporuka se vrši brzom kurirskom službom (Post Express) po principu 'danas za sutra' radi minimalnog vremena u tranzitu."
      },
      {
        question: "Kako se čuvaju peptidi?",
        answer: "Liofilizovani prah treba čuvati u zamrzivaču na -20°C gde ostaje stabilan godinama. Nakon rekonstitucije sa bakteriostatskom vodom, obavezno čuvati u frižideru na +4°C i iskoristiti u roku od nekoliko nedelja."
      },
      {
        question: "Koliko traje dostava u Srbiji?",
        answer: "Porudžbine kreirane radnim danima do 15h šalju se istog dana. Očekivano vreme isporuke na vašu adresu je 24 sata (sledeći radni dan)."
      }
    ];
  
    return (
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
            <SectionHeading title="Često Postavljana Pitanja" subtitle="Podrška Korisnicima" />
          
          <div className="flex flex-col gap-4">
              {questions.map((q, i) => (
                  <div 
                      key={i}
                      onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                      className={`group border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${activeIndex === i ? 'bg-neutral-50 border-neutral-300 shadow-sm' : 'bg-white border-neutral-100 hover:border-neutral-300'}`}
                  >
                      <div className="flex justify-between items-center gap-4">
                          <h3 className={`text-lg font-bold transition-colors ${activeIndex === i ? 'text-black' : 'text-neutral-700'}`}>
                              {q.question}
                          </h3>
                          <div className={`shrink-0 transition-transform duration-300 ${activeIndex === i ? 'rotate-180' : ''}`}>
                             {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                      </div>
                      <AnimatePresence>
                          {activeIndex === i && (
                              <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                              >
                                  <p className="pt-4 text-neutral-600 leading-relaxed font-medium">
                                      {q.answer}
                                  </p>
                              </motion.div>
                          )}
                      </AnimatePresence>
                  </div>
              ))}
          </div>
        </div>
      </section>
    );
};

// 7. RESEARCH / EDUCATION PREVIEW
const ResearchPreview = () => {
    const navigate = useNavigate();
    return (
        <section className="py-24 bg-[#F5F5F7] border-t border-neutral-200">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">Baza Znanja</span>
                        <h2 className="text-4xl font-bold text-[#0B0B0C] mb-6 tracking-tight">Edukacija & Metodologija</h2>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            Pristupite našoj biblioteci resursa o pravilnoj rekonstituciji, stabilnosti peptida i tumačenju HPLC analiza. Znanje je ključ preciznog istraživanja.
                        </p>
                        <Button onClick={() => navigate('/research-centar')} variant="outline" className="bg-white">
                            Poseti Research Centar
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <FileText className="text-neutral-400 mb-4" />
                            <div className="font-bold text-sm">Vodič za Rukovanje</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
                            <Thermometer className="text-neutral-400 mb-4" />
                            <div className="font-bold text-sm">Podaci o Stabilnosti</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 8. FINAL CTA
const FinalCTA = () => {
    const navigate = useNavigate();
    return (
        <section className="py-32 bg-white text-center">
            <div className="max-w-2xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0B0B0C] mb-8 leading-[0.9]">
                    Spremni za <br/><span className="text-neutral-500">istraživanje?</span>
                </h2>
                <p className="text-xl text-neutral-600 mb-10">
                    Opremite svoju laboratoriju najčistijim peptidima u Srbiji.
                </p>
                <Button 
                    onClick={() => navigate('/peptidi-srbija')} 
                    size="lg" 
                    className="bg-[#0B0B0C] text-white hover:bg-neutral-800 px-12 h-16 rounded-full text-lg shadow-2xl shadow-neutral-200"
                >
                    Pregledaj Katalog Peptida
                </Button>
            </div>
        </section>
    );
};

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white overflow-hidden relative">
      <SEO 
        title="OCTOLAB Srbija | Research Peptidi i Laboratorijska Oprema"
        description="Vodeći dobavljač research peptida u Srbiji. BPC-157, GHK-Cu, TB-500 visoke čistoće (>99%). HPLC sertifikovani, brza isporuka, hladni lanac."
      />

      <Hero />
      <DisclaimerBar />
      <OctolabIntro />
      <ProductGrid />
      <TrustBlock />
      <ProcessFlow />
      <FAQ />
      <ResearchPreview />
      <FinalCTA />
    </div>
  );
};