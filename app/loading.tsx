export default function Loading(): React.ReactElement {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black"
    >
      <div className="w-full max-w-3xl animate-pulse px-16 py-32">
        <div className="h-5 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-10 h-9 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-4 h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-10 flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
