import { ProductDTO } from "./product";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  unitPriceCents: number;
  qty: number;
};

export type CartState = {
  items: CartItem[];
  add: (p: ProductDTO, qty?: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  totalCents: () => number;
};
