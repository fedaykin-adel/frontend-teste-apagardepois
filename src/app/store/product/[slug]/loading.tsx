export default function LoadingProduct() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
        <div className="space-y-3">
          <div className="h-7 w-2/3 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
          <div className="h-6 w-40 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
        </div>
      </div>
    </main>
  );
}
