interface Product {
  id: string;
  title: string;
  product_type: string;
  image: Record<any, any>;
  quantitySold: number;
  variants: {
    appliedDiscount: string;
    barcode: string;
    compare_at_price: string;
    price: string;
  }[];
}
