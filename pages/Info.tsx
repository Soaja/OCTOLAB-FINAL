import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, FileText, Microscope, Thermometer, ShieldCheck, Activity, Database, Scale, FlaskConical } from 'lucide-react';

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
    category: 'Protocol',
    title: 'Standard Reconstitution Protocols',
    readTime: '4 min read',
    icon: <FlaskConical size={24} />,
    color: 'bg-blue-50 text-blue-600',
    summary: 'The definitive guide to mixing lyophilized peptides with bacteriostatic water for maximum stability.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Correct reconstitution is critical. Improper handling can degrade peptide chains within minutes, rendering high-purity compounds useless.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">The Golden Rules</h3>
        <ul className="list-disc pl-5 space-y-3 text-neutral-600 mb-8 marker:text-black">
          <li><strong>Sterility First:</strong> Always wipe the vial stopper with an alcohol prep pad before insertion.</li>
          <li><strong>Angle the Needle:</strong> Inject bacteriostatic water slowly against the glass wall of the vial, not directly onto the powder. This prevents damage to the peptide structure.</li>
          <li><strong>Do Not Shake:</strong> Never shake the vial. Roll it gently between your palms until the powder is fully dissolved.</li>
        </ul>
        <h3 className="text-2xl font-bold mb-4 text-black">Storage Post-Mixing</h3>
        <p className="text-neutral-600 mb-4">
          Once reconstituted, peptides are fragile. They must be stored at 2-8°C (refrigerated) and typically have a shelf life of 14-21 days depending on the specific amino acid sequence.
        </p>
      </>
    )
  },
  {
    id: 'art-2',
    category: 'Analysis',
    title: 'Understanding HPLC Purity Reports',
    readTime: '6 min read',
    icon: <Activity size={24} />,
    color: 'bg-green-50 text-green-600',
    summary: 'How to read a chromatogram and distinguish between a 98% and a 99.9% pure compound.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          A Certificate of Analysis (CoA) is only as good as your ability to read it. At Octolab, we provide raw data files, not just summaries.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Key Metrics</h3>
        <p className="text-neutral-600 mb-6">
          <strong>Retention Time:</strong> The specific time it takes for the target molecule to pass through the column. This identifies the compound.
        </p>
        <p className="text-neutral-600 mb-6">
          <strong>Area Under Curve (AUC):</strong> The area under the main peak represents the purity. If the main peak is 99.8% of the total area, the purity is 99.8%. Small bumps near the baseline are impurities.
        </p>
        <div className="bg-neutral-100 p-6 rounded-2xl mb-6">
           <h4 className="font-bold mb-2">Why >99% Matters</h4>
           <p className="text-sm text-neutral-600">In metabolic research, even 1% impurity (often trifluoroacetic acid salts or truncated sequences) can introduce statistical noise or immunogenic reactions in test subjects.</p>
        </div>
      </>
    )
  },
  {
    id: 'art-3',
    category: 'Logistics',
    title: 'The Cold Chain Standard',
    readTime: '3 min read',
    icon: <Thermometer size={24} />,
    color: 'bg-indigo-50 text-indigo-600',
    summary: 'Why temperature control from synthesis to delivery is non-negotiable for research integrity.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          Heat is the enemy of peptide bonds. Octolab employs a strict cold-chain logistics network to ensure degradation does not occur during transit.
        </p>
        <p className="text-neutral-600 mb-6">
          From the moment our peptides leave the lyophilizer, they are stored at -20°C. During shipping, we utilize medical-grade thermal packaging that maintains a stable internal environment for up to 72 hours, protecting against ambient temperature spikes.
        </p>
      </>
    )
  },
  {
    id: 'art-4',
    category: 'Methodology',
    title: 'Lyophilization vs. Raw Powder',
    readTime: '5 min read',
    icon: <Microscope size={24} />,
    color: 'bg-purple-50 text-purple-600',
    summary: 'The difference between freeze-dried pucks and loose powder, and why it matters for dosing.',
    content: (
      <>
        <p className="lead text-xl font-light text-neutral-600 mb-8">
          You may notice Octolab peptides come as a solid "puck" at the bottom of the vial. This is the result of lyophilization.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">The Process</h3>
        <p className="text-neutral-600 mb-6">
          Lyophilization (freeze-drying) involves freezing the peptide solution and then reducing the surrounding pressure to allow the frozen water in the material to sublime directly from the solid phase to the gas phase.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-black">Why We Do It</h3>
        <p className="text-neutral-600 mb-6">
          This process creates a stable crystal lattice structure that protects the peptide from hydrolysis and oxidation, extending shelf life from weeks to years. Raw powder, while cheaper to produce, degrades rapidly.
        </p>
      </>
    )
  },
  {
    id: 'art-5',
    category: 'Verification',
    title: 'Mass Spectrometry Explained',
    readTime: '7 min read',
    icon: <Database size={24} />,
    color: 'bg-red-50 text-red-600',
    summary: 'How we verify the exact molecular weight and atomic composition of every batch.',
    content: (
      <>
         <p className="text-neutral-600 mb-6">
           While HPLC confirms purity, Mass Spectrometry (MS) confirms identity. It measures the mass-to-charge ratio of ions.
         </p>
         <p className="text-neutral-600 mb-6">
           If a peptide is missing a single amino acid, the molecular weight will be off by a specific amount. MS is the only way to catch "truncated sequences" – peptides that stopped synthesizing halfway through. Octolab rejects any batch with detectable truncation.
         </p>
      </>
    )
  },
  {
    id: 'art-6',
    category: 'Storage',
    title: 'Long-term Storage Data',
    readTime: '4 min read',
    icon: <ShieldCheck size={24} />,
    color: 'bg-orange-50 text-orange-600',
    summary: 'Best practices for banking peptides for future research phases.',
    content: (
      <>
         <ul className="list-disc pl-5 space-y-4 text-neutral-600">
            <li><strong>Lyophilized (Powder):</strong> Stable at room temperature for 2-3 months. Stable at -20°C for 24+ months.</li>
            <li><strong>Reconstituted (Liquid):</strong> Stable at 4°C for 2-4 weeks. Do not freeze reconstituted peptides as ice crystal formation can shear the molecular bonds.</li>
            <li><strong>Light Exposure:</strong> UV light can break peptide bonds. Always store vials in the provided dark-box or foil.</li>
         </ul>
      </>
    )
  },
  {
    id: 'art-7',
    category: 'Science',
    title: 'Mechanism: BPC-157',
    readTime: '8 min read',
    icon: <Scale size={24} />,
    color: 'bg-cyan-50 text-cyan-600',
    summary: 'A deep dive into the angiogenic and fibroblast-recruiting properties of the Body Protection Compound.',
    content: (
      <>
        <p className="text-neutral-600 mb-6">
          BPC-157 acts primarily by upregulating the expression of the Growth Hormone Receptor in tendon fibroblasts. This leads to increased cell proliferation and the production of collagen.
        </p>
        <p className="text-neutral-600">
          Additionally, studies suggest it modulates the VEGFR2 pathway, promoting angiogenesis (new blood vessel formation) in damaged tissues, which is the rate-limiting step in healing avascular tissues like ligaments.
        </p>
      </>
    )
  },
  {
    id: 'art-8',
    category: 'Science',
    title: 'Mechanism: GHK-Cu',
    readTime: '6 min read',
    icon: <FlaskConical size={24} />,
    color: 'bg-teal-50 text-teal-600',
    summary: 'The role of copper peptides in resetting gene expression to a healthier state.',
    content: (
      <>
        <p className="text-neutral-600 mb-6">
          GHK-Cu is unique because it affects gene expression. Broad Institute connectivity map data shows GHK-Cu reverses the gene expression signature of aging skin.
        </p>
        <p className="text-neutral-600">
           It stimulates the synthesis of Decorin (a proteoglycan involved in collagen regulation) and downregulates pro-inflammatory cytokines like IL-6.
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
                    Close Article
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
              Knowledge Base
           </span>
           <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#0B0B0C] mb-6">
             Research <span className="text-neutral-300">Insights.</span>
           </h1>
           <p className="text-xl text-neutral-500 font-light leading-relaxed">
             Essential documentation, scientific methodology, and protocols for the modern laboratory.
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