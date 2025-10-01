export interface ProductImage {
  id: number;
  product: number;
  image: string;
  alt_text: string;
  is_main: boolean;
  thumbnail_url: string;
}

export interface Product {
  id: number;
  shop: string;
  name: string;
  slug: string;
  sku: string;
  price: string;
  stock_quantity: number;
  images: ProductImage[];
  description: string;
  category: string[];
}

export interface ProductDetailsProps {
  product: Product | null; 
}