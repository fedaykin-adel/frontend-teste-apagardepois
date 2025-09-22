"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiLogin } from "@/handler/handler";

export default function LoginPage() {
  const sp = useSearchParams();
  const next = sp.get("next") || "/";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await apiLogin(email, password);
    setLoading(false);
    if (!res.ok) return setErr(res.error);
    router.push(next);
  }
  return (
    <main className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">Entrar</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button
          disabled={loading}
          className="w-full rounded-xl border px-4 py-2 font-medium"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>

      {/* utilidades rápidas para testar */}
      <div className="mt-6 space-x-2 text-sm">
        <a href="/store/auth/register">Cadastre-se</a>
      </div>
    </main>
  );
}
