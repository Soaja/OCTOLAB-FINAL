import { Product } from './types';

export interface Guide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'BPC-157',
    subtitle: 'Body Protection Compound',
    price: 55.00,
    volume: '5mL',
    dosage: '10mg',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop', // Lab vial vibe
    description: 'A synthetic peptide consisting of 15 amino acids. Renowned for its potential regenerative properties in tendon, ligament, and gut health research. Formulated for high stability.',
    coaAvailable: true,
    inStock: true,
    tags: ['Recovery', 'Gut Health', 'Joints']
  },
  {
    id: 'p2',
    name: 'TB-500',
    subtitle: 'Thymosin Beta-4 Analog',
    price: 65.00,
    volume: '2mL',
    dosage: '5mg',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop',
    description: 'Synthesized Thymosin Beta-4. Often researched for its role in cellular migration and potential to support tissue repair and reduced inflammation.',
    coaAvailable: true,
    inStock: true,
    tags: ['Mobility', 'Inflammation', 'Repair']
  },
  {
    id: 'p3',
    name: 'GHK-Cu',
    subtitle: 'Copper Tripeptide-1',
    price: 45.00,
    volume: '10mL',
    dosage: '50mg',
    category: 'Cosmetic',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000&auto=format&fit=crop',
    description: 'A naturally occurring copper complex. Extensively studied for its ability to stimulate collagen and elastin production in dermal research models.',
    coaAvailable: true,
    inStock: true,
    tags: ['Skin', 'Hair', 'Anti-Aging']
  },
  {
    id: 'p4',
    name: 'CJC-1295',
    subtitle: 'GHRH Analog (No DAC)',
    price: 58.00,
    volume: '2mL',
    dosage: '2mg',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop',
    description: 'A tetrasubstituted 30-amino acid peptide hormone, primarily functioning as a GHRH analog. Modified for research stability.',
    coaAvailable: true,
    inStock: false,
    tags: ['Performance', 'Growth', 'Metabolism']
  },
];

export const GUIDES: Guide[] = [
  {
    id: 'g1',
    title: 'Understanding Peptide Purity Analysis',
    category: 'Education',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'g2',
    title: 'Proper Reconstitution Protocols',
    category: 'Handling',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'g3',
    title: 'The Cold Chain Logistics Standard',
    category: 'Quality',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary focus of your research?",
    options: [
      { value: 'recovery', label: 'Tissue Regeneration & Recovery' },
      { value: 'anti-aging', label: 'Anti-Aging & Cosmetic' },
      { value: 'performance', label: 'Physical Performance & Metabolism' },
      { value: 'cognitive', label: 'Cognitive Function' }
    ]
  },
  {
    id: 2,
    question: "Which biological mechanism are you investigating?",
    options: [
      { value: 'inflammation', label: 'Inflammation Reduction' },
      { value: 'collagen', label: 'Collagen Synthesis' },
      { value: 'gh', label: 'Growth Hormone Secretion' },
      { value: 'mitochondria', label: 'Mitochondrial Health' }
    ]
  },
  {
    id: 3,
    question: "What is your preferred research format?",
    options: [
      { value: 'vial', label: 'Lyophilized Vial (Reconstitution Required)' },
      { value: 'topical', label: 'Topical Solution' },
      { value: 'capsule', label: 'Oral Capsule' }
    ]
  }
];