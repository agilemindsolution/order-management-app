export interface ProductImage {
  image_url: string;
  is_primary: boolean;
}
export interface Product {
  product_id: string;
  product_name: string;
  product_code?: string;
  category: string;
  sub_category?: string;
  brand?: string;
  packaging_size?: string;
  quality?: string;
  unit_of_measurement?: string;
  available_quantity: number;
  min_order_quantity?: number;
  price_per_unit: number;
  description?: string;
  images?: ProductImage[];
}
