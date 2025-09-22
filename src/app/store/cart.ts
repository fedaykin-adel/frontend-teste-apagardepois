"use client";
import { Product } from "@/generated/prisma";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
};
export async function isLoggedIn(): Promise<boolean> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  try {
    const res = await fetch(`${base}/api/auth/me`, {
      cache: "no-store",
      credentials: "include",
    });
    const data = await res.json();
    return Boolean(data?.user);
  } catch {
    return false;
  }
}
export type CartState = {
  items: CartItem[];
  /** Retorna total em centavos */
  getTotalCents: () => number;
  /** Retorna quantidade total de itens (soma das quantidades) */
  getCount: () => number;
  /** Adiciona um item ao carrinho (incrementa se já existir) */
  addItem: (product: Product, qty?: number) => void;
  /** Define a quantidade exata de um item; remove se qty <= 0 */
  setQty: (productId: string, qty: number) => void;
  /** Remove um item do carrinho */
  removeItem: (productId: string) => void;
  /** Limpa todo o carrinho */
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      getTotalCents: () =>
        get().items.reduce((acc, i) => acc + i.priceCents * i.quantity, 0),
      getCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      addItem: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                imageUrl: product.imageUrl,
                quantity: qty,
              },
            ],
          };
        }),
      setQty: (productId, qty) =>
        set((state) => {
          if (qty <= 0)
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity: qty } : i
            ),
          };
        }),
      removeItem: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.productId !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "mini-ecommerce-cart" }
  )
);
