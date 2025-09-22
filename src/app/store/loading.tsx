export default function LoadingProducts() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900"
          />
        ))}
      </div>
    </main>
  );
}
