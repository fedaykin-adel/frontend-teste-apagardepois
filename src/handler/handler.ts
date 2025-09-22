/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
const base = process.env.NEXT_PUBLIC_API_URL ?? "";
async function getJSON<T>(path: string): Promise<ApiResult<T>> {
  const res = await fetch(path, { cache: "no-store" });

  // tenta JSON, senão usa texto cru
  let body: any = null;
  let text = "";
  try {
    body = await res.json();
  } catch {
    try {
      text = await res.text();
    } catch {}
  }

  if (!res.ok) {
    const msg =
      (body && (body.error || body.message)) ||
      (text && text.slice(0, 300)) ||
      res.statusText ||
      "Erro desconhecido";
    return { ok: false, error: msg };
  }

  const data = body && "data" in body ? body.data : body;
  return { ok: true, data: data as T };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function postJSON<T>(path: string, payload: any): Promise<ApiResult<T>> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok) return { ok: false, error: body?.error ?? "Erro desconhecido" };
  // algumas rotas (checkout) não retornam {data:...}, então padronizamos:
  return { ok: true, data: (body.data ?? body) as T };
}

// -------- endpoints específicos --------
export type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  category: string;
  stock: number;
};

export async function apiListProducts() {
  return getJSON<ProductDTO[]>(`${base}/products`);
}

export async function apiGetProduct(slug: string) {
  return getJSON<ProductDTO>(`${base}/products/${slug}`);
}

export type CheckoutItem = { productId: string; quantity: number };
export async function apiCheckout(items: CheckoutItem[]) {
  return postJSON<{ ok: boolean; orderId: string; total: string }>(
    `${base}/checkout`,
    { items }
  );
}

export type OrderDTO = {
  id: string;
  createdAt: string;
  email: string;
  userId?: string;
  totalCents: number;
  status: "PENDING" | "CONFIRMED";
  items: {
    productId: string;
    name: string;
    priceCents: number;
    quantity: number;
    imageUrl: string;
  }[];
};

export async function apiGetOrder(id: string) {
  const res = await getJSON<any>(`${base}/orders/${id}`);
  if (!res.ok) return res;

  const o = res.data;
  const items = (o.items ?? []).map((it: any) => ({
    id: it.id,
    productId: it.productId ?? it.product?.id,
    name: it.product?.name ?? it.name ?? "Produto",
    imageUrl: it.product?.imageUrl ?? it.imageUrl,
    quantity: Number(it.quantity ?? 0),
    unitPriceCents: Number(it.unitPriceCents ?? it.product?.priceCents ?? 0),
  }));

  const dto: OrderDTO = {
    id: o.id,
    createdAt:
      typeof o.createdAt === "string"
        ? o.createdAt
        : new Date(o.createdAt).toISOString(),
    email: o.email,
    userId: o.userId,
    totalCents: Number(o.totalCents ?? 0),
    status: o.status,
    items,
  };

  return { ok: true, data: dto } as const;
}

async function j<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    // include cookies para SSR/cliente quando necessário
    credentials: "include",
    cache: "no-store",
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, error: body?.error ?? "Erro" };
  return { ok: true, data: (body?.data ?? body) as T };
}

export async function apiRegister(
  name: string,
  email: string,
  password: string
) {
  return j<{ ok: boolean; user: { id: string; name: string; email: string } }>(
    "/register",
    { method: "POST", body: JSON.stringify({ name, email, password }) }
  );
}
export async function apiLogin(email: string, password: string) {
  return j<{ ok: boolean; user: { id: string; name: string; email: string } }>(
    "/login",
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
}
export async function apiLogout() {
  return j<{ ok: boolean }>("/logout", { method: "POST" });
}
export async function apiMe() {
  return j<{ user: { id: string; name: string; email: string } | null }>("/me");
}
