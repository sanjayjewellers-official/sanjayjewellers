export type Language = 'en' | 'hi' | 'or';
export type Theme = 'light' | 'dark';

export type MainCategory = 
  | 'sir_matha'
  | 'kaan'
  | 'gala'
  | 'haath_kalaai'
  | 'ungliyan'
  | 'kamar'
  | 'pairon_chandi';

export type SubCategory = 
  | 'maang_tikka'
  | 'shephool'
  | 'jhumka'
  | 'karnfool'
  | 'bali'
  | 'haar'
  | 'mangalsutra'
  | 'choker'
  | 'hansli'
  | 'kangan'
  | 'bajuvaand'
  | 'haath_phool'
  | 'angoothi'
  | 'kardhani'
  | 'payal'
  | 'bichhiya';

export type MetalType = 'gold' | 'silver' | 'polki_kundan';

export interface Product {
  id: string;
  name: {
    en: string;
    hi: string;
    or: string;
  };
  subtitle: {
    en: string;
    hi: string;
    or: string;
  };
  description: {
    en: string;
    hi: string;
    or: string;
  };
  category: 'necklace' | 'earrings' | 'bangles' | 'rings' | 'bridal' | 'headwear' | 'waistwear' | 'anklets';
  mainCategory: MainCategory;
  subCategory: SubCategory;
  metalType: MetalType;
  price: number; // in INR
  goldWeightGrams: number;
  purity: '24K 999' | '22K 916' | '18K 750' | '999 Silver' | '925 Silver';
  isPrimeCollection?: boolean;
  image: string;
  secondaryImages?: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  hallmarkCode: string;
  makingChargesPercent: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface MetalRate {
  gold24k: number; // rate per gram in INR
  gold22k: number;
  gold18k: number;
  silver999: number;
  lastUpdated: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: {
    en: string;
    hi: string;
    or: string;
  };
  verifiedBuyer: boolean;
  productName?: string;
  avatar?: string;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  preferredCity: string;
  serviceType: 'store_visit' | 'home_trial' | 'video_call';
  date: string;
  timeSlot: string;
  notes?: string;
}
