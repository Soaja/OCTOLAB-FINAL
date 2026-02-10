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
    category: 'Oporavak',
    image: 'https://images.unsplash.com/photo-1624638765416-faed240b9049?q=80&w=1000&auto=format&fit=crop', // Lab vial vibe
    description: 'Sintetički peptid koji se sastoji od 15 aminokiselina. Poznat po svom potencijalu u istraživanju regeneracije tetiva, ligamenata i zdravlja creva. Formulisan za visoku stabilnost.',
    coaAvailable: true,
    inStock: true,
    tags: ['Oporavak', 'Zdravlje Creva', 'Zglobovi']
  },
  {
    id: 'p2',
    name: 'TB-500',
    subtitle: 'Thymosin Beta-4 Analog',
    price: 65.00,
    volume: '2mL',
    dosage: '5mg',
    category: 'Oporavak',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop',
    description: 'Sintetizovani Timozin Beta-4. Često se istražuje zbog njegove uloge u ćelijskoj migraciji i potencijala da podrži popravku tkiva i smanjenje upale.',
    coaAvailable: true,
    inStock: true,
    tags: ['Mobilnost', 'Upala', 'Popravka']
  },
  {
    id: 'p3',
    name: 'GHK-Cu',
    subtitle: 'Bakar Tripeptid-1',
    price: 45.00,
    volume: '10mL',
    dosage: '50mg',
    category: 'Kozmetika',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000&auto=format&fit=crop',
    description: 'Prirodni kompleks bakra. Opsežno proučavan zbog sposobnosti da stimuliše proizvodnju kolagena i elastina u modelima istraživanja kože.',
    coaAvailable: true,
    inStock: true,
    tags: ['Koža', 'Kosa', 'Anti-Aging']
  },
  {
    id: 'p4',
    name: 'CJC-1295',
    subtitle: 'GHRH Analog (Bez DAC)',
    price: 58.00,
    volume: '2mL',
    dosage: '2mg',
    category: 'Performanse',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop',
    description: 'Tetrasupstituisani peptidni hormon od 30 aminokiselina, primarno funkcioniše kao GHRH analog. Modifikovan za istraživačku stabilnost.',
    coaAvailable: true,
    inStock: false,
    tags: ['Performanse', 'Rast', 'Metabolizam']
  },
];

export const GUIDES: Guide[] = [
  {
    id: 'g1',
    title: 'Razumevanje Analize Čistoće Peptida',
    category: 'Edukacija',
    readTime: '4 min čitanja',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'g2',
    title: 'Protokoli Pravilne Rekonstitucije',
    category: 'Rukovanje',
    readTime: '3 min čitanja',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'g3',
    title: 'Standard Logistike Hladnog Lanca',
    category: 'Kvalitet',
    readTime: '5 min čitanja',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Koji je primarni fokus vašeg istraživanja?",
    options: [
      { value: 'recovery', label: 'Regeneracija Tkiva i Oporavak' },
      { value: 'anti-aging', label: 'Anti-Aging i Kozmetika' },
      { value: 'performance', label: 'Fizičke Performanse i Metabolizam' },
      { value: 'cognitive', label: 'Kognitivne Funkcije' }
    ]
  },
  {
    id: 2,
    question: "Koji biološki mehanizam istražujete?",
    options: [
      { value: 'inflammation', label: 'Smanjenje Upale' },
      { value: 'collagen', label: 'Sinteza Kolagena' },
      { value: 'gh', label: 'Lučenje Hormona Rasta' },
      { value: 'mitochondria', label: 'Zdravlje Mitohondrija' }
    ]
  },
  {
    id: 3,
    question: "Koji je vaš preferirani format istraživanja?",
    options: [
      { value: 'vial', label: 'Liofilizovana Bočica (Potrebna Rekonstitucija)' },
      { value: 'topical', label: 'Topikalni Rastvor' },
      { value: 'capsule', label: 'Oralna Kapsula' }
    ]
  }
];