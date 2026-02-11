import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, FileText, Microscope, Thermometer, ShieldCheck, Activity, Database, Scale, FlaskConical } from 'lucide-react';
import { SEO } from '../components/SEO';

// --- TYPES ---
interface Article {
  id: string;
  category: string;
  title: string;
  readTime: string;
  icon: React.ReactNode;
  color: string;
  summary: string;
  content: React.ReactNode;
}

// --- DATA: THE 8 ARTICLES ---
const ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'Protokol',
    title: 'Standardni Protokoli Rekonstitucije',
    readTime: '4 min čitanja',
    icon: <FlaskConical size={24} />,
    color: 'bg-blue-50 text-blue-600',
    summary: 'Definitivni vodič za mešanje liofilizovanih peptida sa bakteriostatskom vodom za maksimalnu stabilnost.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Ispravna rekonstitucija je kritična. Nepravilno rukovanje može degradirati peptidne lance u roku od nekoliko minuta, čineći jedinjenja visoke čistoće beskorisnim.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Zlatna Pravila</h3>
        <ul className="list-disc pl-5 space-y-3 text-neutral-600 mb-8 marker:text-black">
          <li><strong>Sterilnost na Prvom Mestu:</strong> Uvek prebrišite čep bočice alkoholnim tuferom pre umetanja igle.</li>
          <li><strong>Ugao Igle:</strong> Ubrizgajte bakteriostatsku vodu polako uz stakleni zid bočice, ne direktno na prah. Ovo sprečava oštećenje peptidne strukture.</li>
          <li><strong>Ne Mućkati:</strong> Nikada ne mućkajte bočicu. Lagano je rolajte između dlanova dok se prah potpuno ne rastvori.</li>
        </ul>
        <h3 className="text-2xl font-bold mb-4 text-black">Skladištenje Nakon Mešanja</h3>
        <p className="text-neutral-600 mb-4">
          Jednom rekonstituisani, peptidi su krhki. Moraju se čuvati na 2-8°C (u frižideru) i obično imaju rok trajanja od 14-21 dana u zavisnosti od specifične sekvence aminokiselina.
        </p>
      </>
    )
  },
  {
    id: 'art-2',
    category: 'Analiza',
    title: 'Razumevanje HPLC Izveštaja Čistoće',
    readTime: '6 min čitanja',
    icon: <Activity size={24} />,
    color: 'bg-green-50 text-green-600',
    summary: 'Kako čitati hromatogram i razlikovati jedinjenje čistoće 98% od onog sa 99.9%.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Sertifikat analize (CoA) je dobar onoliko koliko je dobra vaša sposobnost da ga pročitate. U Octolabu pružamo sirove datoteke podataka, a ne samo sažetke.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Ključne Metrike</h3>
        <p className="text-neutral-600 mb-6">
          <strong>Vreme Zadržavanja (Retention Time):</strong> Specifično vreme koje je potrebno ciljnom molekulu da prođe kroz kolonu. Ovo identifikuje jedinjenje.
        </p>
        <p className="text-neutral-600 mb-6">
          <strong>Površina Ispod Krive (AUC):</strong> Površina ispod glavnog pika predstavlja čistoću. Ako je glavni pik 99.8% ukupne površine, čistoća je 99.8%. Male izbočine blizu osnovne linije su nečistoće.
        </p>
        <div className="bg-neutral-100 p-6 rounded-2xl mb-6">
           <h4 className="font-bold mb-2">Zašto je &gt;99% Važno</h4>
           <p className="text-sm text-neutral-600">U metaboličkim istraživanjima, čak i 1% nečistoće (često soli trifluorosirćetne kiseline ili skraćene sekvence) može uvesti statistički šum ili imunogene reakcije kod test subjekata.</p>
        </div>
      </>
    )
  },
  {
    id: 'art-3',
    category: 'Logistika',
    title: 'Standard Hladnog Lanca',
    readTime: '3 min čitanja',
    icon: <Thermometer size={24} />,
    color: 'bg-indigo-50 text-indigo-600',
    summary: 'Zašto je kontrola temperature od sinteze do isporuke neophodna za integritet istraživanja.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Toplota je neprijatelj peptidnih veza. Octolab koristi strogu logističku mrežu hladnog lanca kako bi osigurao da do degradacije ne dođe tokom transporta.
        </p>
        <p className="text-neutral-600 mb-6">
          Od trenutka kada naši peptidi napuste liofilizator, čuvaju se na -20°C. Tokom transporta koristimo medicinsko termalno pakovanje koje održava stabilno unutrašnje okruženje do 72 sata, štiteći od skokova ambijentalne temperature.
        </p>
      </>
    )
  },
  {
    id: 'art-4',
    category: 'Metodologija',
    title: 'Liofilizacija vs. Sirovi Prah',
    readTime: '5 min čitanja',
    icon: <Microscope size={24} />,
    color: 'bg-purple-50 text-purple-600',
    summary: 'Razlika između liofilizovanog "diska" i rasutog praha, i zašto je to važno za doziranje.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Možda ćete primetiti da Octolab peptidi dolaze kao čvrst "disk" na dnu bočice. To je rezultat liofilizacije.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Proces</h3>
        <p className="text-neutral-600 mb-6">
          Liofilizacija (sušenje smrzavanjem) podrazumeva zamrzavanje rastvora peptida i zatim smanjenje okolnog pritiska kako bi se omogućilo da zamrznuta voda u materijalu sublimira direktno iz čvrste faze u gasnu fazu.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Zašto To Radimo</h3>
        <p className="text-neutral-600 mb-6">
          Ovaj proces stvara stabilnu kristalnu rešetkastu strukturu koja štiti peptid od hidrolize i oksidacije, produžavajući rok trajanja sa nedelja na godine. Sirovi prah, iako jeftiniji za proizvodnju, brzo degradira.
        </p>
      </>
    )
  },
  {
    id: 'art-5',
    category: 'Verifikacija',
    title: 'Objašnjenje Masene Spektrometrije',
    readTime: '7 min čitanja',
    icon: <Database size={24} />,
    color: 'bg-red-50 text-red-600',
    summary: 'Kako verifikujemo tačnu molekularnu težinu i atomski sastav svake serije.',
    content: (
      <>
         <p className="text-neutral-600 mb-6">
           Dok HPLC potvrđuje čistoću, Masena Spektrometrija (MS) potvrđuje identitet. Ona meri odnos mase i naelektrisanja jona.
         </p>
         <p className="text-neutral-600 mb-6">
           Ako peptidu nedostaje jedna aminokiselina, molekularna težina će odstupati za određeni iznos. MS je jedini način da se uhvate "skraćene sekvence" – peptidi koji su prestali da se sintetišu na pola puta. Octolab odbija svaku seriju sa detektovanim skraćenjem.
         </p>
      </>
    )
  },
  {
    id: 'art-6',
    category: 'Skladištenje',
    title: 'Podaci o Dugoročnom Skladištenju',
    readTime: '4 min čitanja',
    icon: <ShieldCheck size={24} />,
    color: 'bg-orange-50 text-orange-600',
    summary: 'Najbolje prakse za čuvanje peptida za buduće faze istraživanja.',
    content: (
      <>
         <ul className="list-disc pl-5 space-y-4 text-neutral-600">
            <li><strong>Liofilizovano (Prah):</strong> Stabilno na sobnoj temperaturi 2-3 meseca. Stabilno na -20°C preko 24 meseca.</li>
            <li><strong>Rekonstituisano (Tečnost):</strong> Stabilno na 4°C 2-4 nedelje. Ne zamrzavati rekonstituisane peptide jer formiranje kristala leda može preseći molekularne veze.</li>
            <li><strong>Izloženost Svetlosti:</strong> UV svetlost može razbiti peptidne veze. Uvek čuvajte bočice u priloženoj tamnoj kutiji ili foliji.</li>
         </ul>
      </>
    )
  },
  {
    id: 'art-7',
    category: 'Nauka',
    title: 'Mehanizam: BPC-157',
    readTime: '8 min čitanja',
    icon: <Scale size={24} />,
    color: 'bg-cyan-50 text-cyan-600',
    summary: 'Dubinska analiza angiogenih svojstava jedinjenja za zaštitu tela.',
    content: (
      <>
        <p className="text-neutral-600 mb-6">
          BPC-157 primarno deluje tako što pojačava ekspresiju receptora hormona rasta u fibroblastima tetiva. Ovo dovodi do povećane proliferacije ćelija i proizvodnje kolagena.
        </p>
        <p className="text-neutral-600">
          Pored toga, studije sugerišu da modulira VEGFR2 put, promovišući angiogenezu (formiranje novih krvnih sudova) u oštećenim tkivima, što je korak koji ograničava brzinu zarastanja avaskularnih tkiva poput ligamenata.
        </p>
      </>
    )
  },
  {
    id: 'art-8',
    category: 'Nauka',
    title: 'Mehanizam: GHK-Cu',
    readTime: '6 min čitanja',
    icon: <FlaskConical size={24} />,
    color: 'bg-teal-50 text-teal-600',
    summary: 'Uloga bakarnih peptida u resetovanju ekspresije gena na zdravije stanje.',
    content: (
      <>
        <p className="text-neutral-600 mb-6">
          GHK-Cu je jedinstven jer utiče na ekspresiju gena. Podaci Broad Institute connectivity map pokazuju da GHK-Cu preokreće potpis ekspresije gena starenja kože.
        </p>
        <p className="text-neutral-600">
           Stimuliše sintezu Dekorina (proteoglikan uključen u regulaciju kolagena) i smanjuje pro-inflamatorne citokine poput IL-6.
        </p>
      </>
    )
  }
];

// --- COMPONENTS ---

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <motion.div
      layoutId={`card-container-${article.id}`}
      onClick={onClick}
      className="group relative bg-[#F5F5F7] rounded-[2.5rem] p-8 cursor-pointer hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 border border-transparent hover:border-neutral-100 overflow-hidden flex flex-col h-[320px]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-neutral-200/50 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-auto relative z-10">
         <motion.div 
           layoutId={`icon-${article.id}`}
           className={`w-12 h-12 rounded-2xl ${article.color} flex items-center justify-center`}
         >
            {article.icon}
         </motion.div>
         <motion.span 
            layoutId={`category-${article.id}`}
            className="px-3 py-1 bg-white/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200"
         >
            {article.category}
         </motion.span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6">
         <motion.h3 
           layoutId={`title-${article.id}`}
           className="text-2xl font-bold text-neutral-900 leading-tight mb-3 group-hover:text-black transition-colors"
         >
           {article.title}
         </motion.h3>
         <motion.p 
           layoutId={`summary-${article.id}`}
           className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-6 group-hover:text-neutral-600 transition-colors"
         >
           {article.summary}
         </motion.p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-200/50 relative z-10">
         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{article.readTime}</span>
         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight size={14} />
         </div>
      </div>
    </motion.div>
  );
};

interface ExpandedArticleProps {
  article: Article;
  onClose: () => void;
}

const ExpandedArticle: React.FC<ExpandedArticleProps> = ({ article, onClose }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 cursor-pointer"
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none p-4 md:p-8">
        <motion.div
          layoutId={`card-container-${article.id}`}
          className="w-full max-w-3xl h-full max-h-[85vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col pointer-events-auto relative"
        >
           {/* Close Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); onClose(); }}
             className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-neutral-100/80 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white transition-colors"
           >
             <X size={20} />
           </button>

           {/* Header Section */}
           <div className="bg-[#F5F5F7] p-8 md:p-12 pb-8 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <motion.div 
                 layoutId={`icon-${article.id}`}
                 className={`w-16 h-16 rounded-3xl ${article.color} flex items-center justify-center mb-6 relative z-10`}
               >
                  {React.isValidElement(article.icon) ? React.cloneElement(article.icon as React.ReactElement<any>, { size: 32 }) : article.icon}
               </motion.div>
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <motion.span 
                   layoutId={`category-${article.id}`}
                   className="px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 shadow-sm"
                >
                   {article.category}
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">• {article.readTime}</span>
              </div>

              <motion.h2 
                 layoutId={`title-${article.id}`}
                 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.1] relative z-10"
              >
                 {article.title}
              </motion.h2>
           </div>

           {/* Scrollable Content */}
           <div className="overflow-y-auto flex-1 p-8 md:p-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg prose-neutral max-w-none"
              >
                 {article.content}
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="mt-16 pt-8 border-t border-neutral-100 flex justify-center"
              >
                 <button onClick={onClose} className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                    Zatvori Članak
                 </button>
              </motion.div>
           </div>

        </motion.div>
      </div>
    </>
  );
};

export const Info: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  const selectedArticle = ARTICLES.find(a => a.id === selectedId);

  return (
    <div className="pt-32 min-h-screen bg-white relative">
      <SEO 
        title="Research Centar & Laboratorijski Standardi | OCTOLAB"
        description="Baza znanja, HPLC protokoli, masena spektrometrija i vodiči za rekonstituciju. Naučni resursi za istraživače."
      />

      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none fixed" />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-24 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-20 text-center max-w-3xl mx-auto"
        >
           <span className="inline-block mb-6 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest uppercase">
              Baza Znanja
           </span>
           <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#0B0B0C] mb-6">
             Istraživački <span className="text-neutral-300">Uvidi.</span>
           </h1>
           <p className="text-xl text-neutral-500 font-light leading-relaxed">
             Osnovna dokumentacija, naučna metodologija i protokoli za modernu laboratoriju.
           </p>
        </motion.div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {ARTICLES.map((article) => (
             <ArticleCard 
               key={article.id} 
               article={article} 
               onClick={() => setSelectedId(article.id)} 
             />
           ))}
        </div>
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedId && selectedArticle && (
          <ExpandedArticle 
             article={selectedArticle} 
             onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};