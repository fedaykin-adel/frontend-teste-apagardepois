"use client";
import { useCart } from "@/app/store/cart";
import { Product } from "@/generated/prisma";

export default function AddToCartButton({
  product,
  qty = 1,
}: {
  product: Product;
  qty?: number;
}) {
  const addItem = useCart((s) => s.addItem);

  /** Ao clicar, adiciona o produto ao carrinho */
  function handleClick() {
    addItem(product, qty);
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-medium shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
      disabled={product.stock <= 0}
    >
      {product.stock > 0 ? "Adicionar ao carrinho" : "Indisponível"}
    </button>
  );
}
