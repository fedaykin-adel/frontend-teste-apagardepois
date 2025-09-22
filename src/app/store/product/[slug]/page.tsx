/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import { apiGetProduct } from "@/handler/handler";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 aqui muda
}) {
  const { slug } = await params; // 👈 resolve a Promise

  const res = await apiGetProduct(slug);
  if (!res.ok || !res.data) return notFound();

  const product = res.data;
  const price = (product.priceCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {product.description}
          </p>

          <div className="mt-4 text-xl font-semibold">{price}</div>

          <div className="mt-6 flex gap-3">
            <AddToCartButton product={product as any} />
            <span className="self-center text-xs text-neutral-500">
              {product.stock > 0
                ? `${product.stock} em estoque`
                : "Sem estoque"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
