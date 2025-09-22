"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCheckout } from "@/handler/handler"; // mantém seu caminho
import { useCart } from "../cart";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!cart.items.length) return;

    setLoading(true);
    const items = cart.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));
    const res = await apiCheckout(items);
    setLoading(false);

    if (!res.ok) {
      setErr(res.error);
      return;
    }
    cart.clear();
    router.push(`/store/orders/${res.data.orderId}`);
  }

  const total = cart.items.reduce(
    (acc, i) => acc + i.priceCents * i.quantity,
    0
  );
  const totalBRL = (total / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Finalizar compra</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-2xl border p-4">
          <h2 className="mb-2 font-semibold">Resumo</h2>
          <ul className="space-y-1 text-sm">
            {cart.items.map((i) => (
              <li key={i.productId} className="flex justify-between">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>
                  {((i.priceCents * i.quantity) / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
            <span>Total</span>
            <strong>{totalBRL}</strong>
          </div>
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          type="submit"
          className="w-full rounded-xl border px-4 py-2 font-medium"
          disabled={loading || !cart.items.length}
        >
          {loading ? "Processando..." : "Confirmar pedido"}
        </button>
      </form>
    </main>
  );
}
