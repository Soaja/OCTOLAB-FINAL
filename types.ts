export interface Product {
  id: string;
  slug: string; // SEO friendly URL part (e.g., 'bpc-157')
  name: string;
  subtitle: string;
  price: number;
  volume: string;
  dosage: string;
  category: string;
  image: string;
  description: string;
  coaAvailable: boolean;
  inStock: boolean;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum PageView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  PRODUCT = 'PRODUCT',
  CART = 'CART',
  QUALITY = 'QUALITY',
  ABOUT = 'ABOUT',
  INFO = 'INFO',
  CONTACT = 'CONTACT'
}