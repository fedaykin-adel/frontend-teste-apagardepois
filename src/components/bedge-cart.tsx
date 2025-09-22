"use client";

import { useCart } from "@/app/store/cart";

export function CartBadge() {
  const count = useCart((s) => s.getCount());
  return (
    <span className="rounded-full border px-2 py-0.5 text-xs">{count}</span>
  );
}
