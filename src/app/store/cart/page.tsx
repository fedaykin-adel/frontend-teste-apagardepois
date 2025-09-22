"use client";
import Image from "next/image";
import Link from "next/link";
import { isLoggedIn, useCart } from "../cart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, setQty, removeItem, clear, getTotalCents } = useCart();
  const total = (getTotalCents() / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const router = useRouter();

  async function handleCheckout() {
    if (!(await isLoggedIn())) {
      router.push("/store/auth/login?next=/store/checkout");
      return;
    }
    router.push("/checkout");
  }

  if (!items.length) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-2 text-2xl font-bold">Seu carrinho</h1>
        <p className="text-neutral-500">Seu carrinho está vazio.</p>
        <Link
          href="/store"
          className="mt-6 inline-block rounded-xl border px-4 py-2 text-sm"
        >
          Ir aos produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Seu carrinho</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <section className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const price = (item.priceCents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            const lineTotal = (
              (item.priceCents * item.quantity) /
              100
            ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            return (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-2xl border p-3"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/store/product/${item.slug}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <div className="text-sm text-neutral-500">{price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="rounded border px-2"
                      onClick={() => setQty(item.productId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        setQty(item.productId, Number(e.target.value) || 0)
                      }
                      className="w-14 rounded border px-2 py-1 text-center"
                      min={0}
                    />
                    <button
                      className="rounded border px-2"
                      onClick={() => setQty(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-3 text-xs text-red-600 hover:underline"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
                <div className="min-w-24 text-right font-medium">
                  {lineTotal}
                </div>
              </div>
            );
          })}
        </section>

        <aside className="rounded-2xl border p-4">
          <h2 className="mb-2 text-lg font-semibold">Resumo</h2>
          <div className="flex items-center justify-between text-sm">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 block w-full rounded-xl border px-4 py-2 text-center text-sm font-medium"
          >
            Finalizar compra
          </button>
          <button
            className="mt-2 w-full text-xs text-neutral-500 hover:underline"
            onClick={clear}
          >
            Limpar carrinho
          </button>
        </aside>
      </div>
    </main>
  );
}
