import Navbar from "@/components/navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
