/* eslint-disable @typescript-eslint/no-explicit-any */
// app/store/orders/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/session";

// app/store/orders/[id]/page.tsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

function brl(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 resolve a Promise

  const user = await getServerUser();
  if (!user) {
    redirect(`/store/auth/login?next=/store/orders/${id}`);
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) return notFound();

  const isOwner =
    (order.userId && order.userId === user.id) ||
    (!order.userId && order.email === user.email);
  if (!isOwner) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Pedido confirmado</h1>
      <p className="mt-1 text-sm text-neutral-500">
        #{order.id} • {new Date(order.createdAt).toLocaleString("pt-BR")}
      </p>

      <section className="mt-6 rounded-2xl border p-4">
        <h2 className="mb-2 font-semibold">Itens</h2>
        <ul className="space-y-1 text-sm">
          {order.items.map((i: any) => (
            <li key={i.id} className="flex justify-between">
              <span>
                {i.product?.name ?? "Produto"} × {i.quantity}
              </span>
              <span>{brl(i.unitPriceCents * i.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
          <span>Total</span>
          <strong>{brl(order.totalCents)}</strong>
        </div>

        <div className="mt-4 text-sm text-neutral-600">
          Status: <span className="font-medium">{order.status}</span>
          <br />
          Enviaremos a confirmação para{" "}
          <span className="font-medium">{order.email}</span>.
        </div>
      </section>
    </main>
  );
}
