export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export type OrderItem = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
};

export type Order = {
  id: string;
  email: string;
  totalCents: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
};

// storage simples em memória para demo
export const ordersDb: Order[] = [];

/** gera um id curto */
export function uid(prefix = "ord"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}
