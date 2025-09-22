import ProductCard from "@/components/product-cards";
import { listProducts } from "@/lib/produts";

export const revalidate = 0; // dados em memória: sem cache

export default async function ProductsList() {
  const items = await listProducts();

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
