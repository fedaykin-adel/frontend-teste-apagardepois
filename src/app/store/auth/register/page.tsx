"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRegister } from "@/handler/handler";

export default function RegisterPage() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await apiRegister(name, email, password);
    setLoading(false);
    if (!res.ok) return setErr(res.error);
    r.push("/store"); // redireciona após logar
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">Criar conta</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {loading ? "Enviando..." : "Criar conta"}
        </button>
      </form>
    </main>
  );
}
