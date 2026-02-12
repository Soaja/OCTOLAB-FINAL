import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Activity, Database, Scale, FlaskConical, Share2, ChevronRight, Thermometer, Microscope } from 'lucide-react';
import { SEO } from '../components/SEO';

// --- TYPES ---
interface Article {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  icon: React.ReactNode;
  summary: string;
  content: React.ReactNode;
  featured?: boolean;
}

// --- ANIMATION CONSTANTS ---
const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1
};

const FILTER_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

// --- DATA ---
const ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'Protokol',
    title: 'Vodič za Rekonstituciju',
    readTime: '4 min',
    date: 'Oct 24, 2024',
    icon: <FlaskConical size={20} />,
    featured: true,
    summary: 'Zlatni standard za mešanje liofilizovanih peptida sa bakteriostatskom vodom. Sprečite degradaciju molekula pravilnim rukovanjem.',
    content: (
      <>
        <p className="lead text-2xl font-light text-neutral-600 mb-8 leading-relaxed">
          Ispravna rekonstitucija je kritična tačka istraživanja. Nepravilno rukovanje može degradirati peptidne lance u roku od nekoliko minuta, čineći jedinjenja visoke čistoće beskorisnim.
        </p>
        <div className="my-8 p-6 bg-neutral-50 border-l-2 border-black rounded-r-xl">
             <h4 className="font-bold text-lg mb-2">Zlatno Pravilo</h4>
             <p className="text-neutral-600">Nikada ne mućkajte bočicu. Mehanički stres kida peptidne veze. Uvek lagano rolajte.</p>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-black tracking-tight">1. Priprema Okruženja</h3>
        <ul className="list-disc pl-5 space-y-4 text-neutral-600 mb-8 marker:text-black text-lg">
          <li><strong>Sterilnost:</strong> Prebrišite gumeni čep bočice alkoholnim tuferom (70% izopropil) i sačekajte da ispari.</li>
          <li><strong>Izjednačavanje Pritiska:</strong> Pre ubrizgavanja vode, izvucite vazduh iz bočice ako je pod vakuumom (čest slučaj kod liofilizata).</li>
        </ul>
        <h3 className="text-2xl font-bold mb-4 text-black tracking-tight">2. Proces Mešanja</h3>
        <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
          Ubrizgajte bakteriostatsku vodu polako, ciljajući stakleni zid bočice, a ne direktno prah. Pustite da voda lagano klizi niz zid i natapa "kolač" (lyophilized cake).
        </p>
      </>
    )
  },
  {
    id: 'art-2',
    category: 'Analiza',
    title: 'Tumačenje HPLC Izveštaja',
    readTime: '6 min',
    date: 'Oct 22, 2024',
    icon: <Activity size={20} />,
    summary: 'Kako čitati hromatogram i razumeti razliku između površine pika i stvarne čistoće supstance.',
    content: (
      <>
        <p className="lead text-xl text-neutral-600 mb-8">
          Sertifikat analize (CoA) je dobar onoliko koliko je dobra vaša sposobnost da ga pročitate.
        </p>
        <h3 className="text-xl font-bold mb-3 text-black">Ključne Metrike</h3>
        <p className="text-neutral-600 mb-4">
          <strong>Vreme Zadržavanja (RT):</strong> Specifično vreme prolaska molekula kroz kolonu. Identifikuje supstancu.
        </p>
        <p className="text-neutral-600 mb-4">
          <strong>Površina (AUC):</strong> Površina ispod glavnog pika predstavlja čistoću. Ako je glavni pik 99.8% ukupne površine, to je čistoća.
        </p>
      </>
    )
  },
  {
    id: 'art-3',
    category: 'Logistika',
    title: 'Hladni Lanac',
    readTime: '3 min',
    date: 'Oct 20, 2024',
    icon: <Thermometer size={20} />,
    summary: 'Zašto je kontrola temperature od -20°C neophodna za očuvanje integriteta lanca.',
    content: (
      <>
        <p className="text-neutral-600 mb-6 text-lg">
          Toplota je neprijatelj peptidnih veza. Octolab koristi strogu logističku mrežu hladnog lanca.
        </p>
      </>
    )
  },
  {
    id: 'art-4',
    category: 'Metodologija',
    title: 'Liofilizacija',
    readTime: '5 min',
    date: 'Oct 18, 2024',
    icon: <Microscope size={20} />,
    summary: 'Tehnički proces uklanjanja vode sublimacijom radi dugoročne stabilnosti.',
    content: (
       <p className="text-neutral-600">Liofilizacija stvara stabilnu kristalnu rešetku koja štiti peptid od hidrolize.</p>
    )
  },
  {
    id: 'art-5',
    category: 'Verifikacija',
    title: 'Masena Spektrometrija',
    readTime: '7 min',
    date: 'Oct 15, 2024',
    icon: <Database size={20} />,
    summary: 'Potvrda identiteta merenjem tačne molekularne mase (Daltoni).',
    content: (
       <p className="text-neutral-600">Dok HPLC potvrđuje čistoću, MS potvrđuje identitet merenjem odnosa mase i naelektrisanja.</p>
    )
  },
  {
    id: 'art-7',
    category: 'Mehanizam',
    title: 'Deep Dive: BPC-157',
    readTime: '8 min',
    date: 'Oct 10, 2024',
    icon: <Scale size={20} />,
    summary: 'Analiza angiogenih svojstava i modulacija VEGFR2 signalnog puta u fibroblastima.',
    content: (
      <>
        <p className="text-xl text-neutral-600 mb-6 font-light">
          BPC-157 primarno deluje tako što pojačava ekspresiju receptora hormona rasta u fibroblastima tetiva.
        </p>
      </>
    )
  },
  {
    id: 'art-8',
    category: 'Mehanizam',
    title: 'Deep Dive: GHK-Cu',
    readTime: '6 min',
    date: 'Oct 05, 2024',
    icon: <FlaskConical size={20} />,
    summary: 'Uloga bakarnih peptida u resetovanju ekspresije gena na mlađi fenotip.',
    content: (
       <p className="text-neutral-600">Podaci pokazuju da GHK-Cu preokreće potpis ekspresije gena starenja kože.</p>
    )
  },
  {
    id: 'art-9',
    category: 'Protokol',
    title: 'Skladištenje Rastvora',
    readTime: '3 min',
    date: 'Oct 01, 2024',
    icon: <Thermometer size={20} />,
    summary: 'Koliko dugo peptid ostaje stabilan nakon mešanja sa vodom?',
    content: (
       <p className="text-neutral-600">Na +4C, većina peptida je stabilna 14-30 dana.</p>
    )
  }
];

// --- COMPONENTS ---

const ModernBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white fixed">
    <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>
);

const ArticleModal: React.FC<{ article: Article; onClose: () => void }> = ({ article, onClose }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 cursor-pointer"
            />
            <div className="fixed inset-0 z-[60] overflow-y-auto pointer-events-none scroll-smooth">
                <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        layoutId={`card-${article.id}`}
                        transition={SPRING_TRANSITION}
                        className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl pointer-events-auto relative overflow-hidden ring-1 ring-black/5"
                    >
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 border-b border-neutral-100 bg-[#FAFAFA]">
                            <div className="flex items-center gap-3 mb-6">
                                <motion.span 
                                    layoutId={`category-${article.id}`}
                                    className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full"
                                >
                                    {article.category}
                                </motion.span>
                                <span className="text-xs font-mono text-neutral-500">{article.date}</span>
                            </div>

                            <motion.h1 
                                layoutId={`title-${article.id}`}
                                className="text-3xl md:text-5xl font-bold text-[#0B0B0C] tracking-tight mb-6 leading-tight"
                            >
                                {article.title}
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-neutral-600 leading-relaxed font-medium"
                            >
                                {article.summary}
                            </motion.p>
                        </div>

                        <div className="p-8 md:p-12 bg-white">
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-lg prose-neutral max-w-none"
                             >
                                {article.content}
                             </motion.div>

                             <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center">
                                 <div className="flex gap-4">
                                     <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black">
                                        <Share2 size={16} /> Podeli
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export const Info: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('Sve');

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedId]);

  const selectedArticle = ARTICLES.find(a => a.id === selectedId);
  const categories = ['Sve', 'Protokol', 'Analiza', 'Mehanizam', 'Logistika'];
  
  const filteredArticles = filter === 'Sve' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === filter);

  // Separate Featured article from the rest for the grid
  const featuredArticle = ARTICLES.find(a => a.featured);
  // If filter is active (not All), we treat featured article as a normal grid item
  const displayFeaturedAsHero = filter === 'Sve' && featuredArticle;
  
  const gridArticles = displayFeaturedAsHero
    ? filteredArticles.filter(a => a.id !== featuredArticle?.id)
    : filteredArticles;

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-transparent relative">
      <SEO 
        title="Research Centar | OCTOLAB Edukacija"
        description="Naučna baza znanja o peptidima, protokolima rekonstitucije i HPLC analizama."
      />
      <ModernBackground />

      {/* HEADER SECTION */}
      <div className="max-w-[1000px] mx-auto px-6 mb-16 text-center relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full mb-6 shadow-sm"
          >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                  Octolab Research Hub
              </span>
          </motion.div>
          
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0B0B0C] mb-6 leading-[0.9]"
          >
              Centar Znanja.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed"
          >
             Verifikovani protokoli, tehničke analize i naučna objašnjenja za istraživače koji zahtevaju preciznost.
          </motion.p>
      </div>

      {/* SMOOTH SLIDING FILTER TABS */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12 relative z-10 sticky top-24 pointer-events-none">
          <div className="flex justify-center pointer-events-auto">
              <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-neutral-200/60 shadow-sm inline-flex relative">
                  {categories.map((cat) => {
                      const isActive = filter === cat;
                      return (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors z-10 outline-none ${
                                isActive ? 'text-white' : 'text-neutral-500 hover:text-black'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeFilter"
                                    transition={FILTER_TRANSITION}
                                    className="absolute inset-0 bg-[#0B0B0C] rounded-full -z-10 shadow-md"
                                />
                            )}
                            {cat}
                        </button>
                      );
                  })}
              </div>
          </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1200px] mx-auto px-6 pb-24 relative z-10">
         
         {/* FEATURED ARTICLE HERO (Only when 'Sve' is selected) */}
         <AnimatePresence mode="popLayout">
            {displayFeaturedAsHero && featuredArticle && (
                <motion.div 
                    layoutId={`card-${featuredArticle.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={SPRING_TRANSITION}
                    onClick={() => setSelectedId(featuredArticle.id)}
                    className="group w-full bg-white border border-neutral-200 hover:border-neutral-300 rounded-[2.5rem] p-8 md:p-12 mb-12 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-neutral-100/50 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50/50 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <motion.span 
                                    layoutId={`category-${featuredArticle.id}`}
                                    className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100"
                                >
                                    Izdvojeno
                                </motion.span>
                            </div>
                            <motion.h2 
                                layoutId={`title-${featuredArticle.id}`}
                                className="text-3xl md:text-5xl font-bold text-[#0B0B0C] tracking-tight mb-6 leading-tight group-hover:text-neutral-700 transition-colors"
                            >
                                {featuredArticle.title}
                            </motion.h2>
                            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                                {featuredArticle.summary}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 w-max">
                                Pročitaj Protokol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                            </div>
                        </div>
                        
                        <div className="bg-[#F5F5F7] rounded-3xl h-64 w-full flex items-center justify-center text-neutral-300">
                            <FlaskConical size={64} strokeWidth={1} className="text-neutral-400" />
                        </div>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>

         {/* GRID WITH POP LAYOUT FOR SMOOTH SHUFFLING */}
         <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
         >
             <AnimatePresence mode="popLayout">
                 {gridArticles.map((article) => (
                     <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                        key={article.id}
                        layoutId={`card-${article.id}`}
                        onClick={() => setSelectedId(article.id)}
                        className="group bg-white border border-neutral-100 hover:border-neutral-300 rounded-[2rem] p-8 cursor-pointer hover:shadow-xl hover:shadow-neutral-100/50 flex flex-col h-full"
                     >
                        <div className="flex justify-between items-start mb-8">
                             <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-neutral-500 group-hover:bg-black group-hover:text-white transition-all duration-300">
                                 {article.icon}
                             </div>
                             <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md group-hover:bg-neutral-100 transition-colors">
                                 {article.readTime}
                             </span>
                        </div>

                        <div className="mb-auto">
                            <motion.span 
                                layoutId={`category-${article.id}`}
                                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 block"
                            >
                                {article.category}
                            </motion.span>
                            <motion.h3 
                                layoutId={`title-${article.id}`}
                                className="text-xl font-bold text-[#0B0B0C] leading-tight mb-4 group-hover:text-neutral-600 transition-colors"
                            >
                                {article.title}
                            </motion.h3>
                            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                                {article.summary}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-between text-neutral-400 group-hover:text-black transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Pročitaj Više</span>
                            <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-black transition-colors">
                                <ChevronRight size={14} />
                            </div>
                        </div>
                     </motion.div>
                 ))}
             </AnimatePresence>
         </motion.div>

         {gridArticles.length === 0 && (
             <div className="py-20 text-center text-neutral-400">
                 <p>Nema članaka u ovoj kategoriji.</p>
             </div>
         )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
         {selectedId && selectedArticle && (
            <ArticleModal 
                article={selectedArticle} 
                onClose={() => setSelectedId(null)} 
            />
         )}
      </AnimatePresence>

    </div>
  );
};