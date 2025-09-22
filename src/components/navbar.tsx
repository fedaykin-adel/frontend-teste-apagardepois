// components/navbar.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CartBadge } from "./bedge-cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/store", label: "Home" },
    { href: "/store/auth/login", label: "Entrar" },
    { href: "/store/cart", label: "Carrinho" },
  ];

  function close() {
    setOpen(false);
  }
  function toggle() {
    setOpen((v) => !v);
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/70 ${
        elevated ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/store" className="text-lg font-bold tracking-tight">
          mini-ecom
        </Link>

        {/* desktop */}
        <nav className="nav-desktop hidden md:block">
          <ul className="flex items-center space-x-6">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700
                    ${
                      active
                        ? "font-semibold"
                        : "text-neutral-600 dark:text-neutral-300"
                    }`}
                  >
                    {l.label}
                    {l.label === "Carrinho" ? <CartBadge /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* botão hambúrguer (mobile) */}
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={toggle}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700"
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* overlay mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* drawer mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r bg-white p-4 shadow-xl transition-transform duration-300 dark:bg-neutral-950 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-semibold">Menu</span>
          <button
            aria-label="Fechar"
            onClick={close}
            className="rounded px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700"
          >
            ✕
          </button>
        </div>

        <nav className="grid gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={`rounded px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900
              ${
                pathname === l.href
                  ? "font-semibold"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />
          <Link
            href="/store/auth/login"
            onClick={close}
            className="rounded px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Entrar
          </Link>
        </nav>
      </aside>

      {/* fallback CSS caso algo desative gap/space-x */}
      <style jsx>{`
        .nav-desktop a + a {
          margin-left: 1.5rem;
        } /* 24px = space-x-6 */
      `}</style>
    </header>
  );
}
