import { Product } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const price = (product.priceCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="group rounded-2xl border border-neutral-200 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800">
      <Link href={`/store/product/${product.slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-base font-semibold leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2">
            {product.description}
          </p>
          <div className="pt-1 text-sm font-medium">{price}</div>
        </div>
      </Link>
    </div>
  );
}
