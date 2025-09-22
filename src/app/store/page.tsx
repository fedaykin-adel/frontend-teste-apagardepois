import { CartBadge } from "@/components/bedge-cart";
import ProductCard from "@/components/product-cards";
import { apiListProducts } from "@/handler/handler";

export const revalidate = 0; // sem cache para refletir mudanças em memória

export default async function ProductsPage() {
  const res = await apiListProducts();
  if (!res.ok) {
    // fallback simples
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <p className="mt-2 text-sm text-red-600">{res.error}</p>
      </main>
    );
  }

  const items = res.data;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-neutral-500">Catálogo (via API)</p>
        </div>
      </header>
      <a href="/store/cart">
        <CartBadge></CartBadge>
      </a>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <ProductCard key={p.id} product={p as any} />
        ))}
      </section>
    </main>
  );
}
