'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-lg text-red-600 dark:bg-red-950/40 dark:text-red-400">
          !
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Something broke
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This page hit an unexpected error. Retrying usually fixes it.
        </p>
        {error.digest && (
          <code className="mt-4 block rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500">
            ref: {error.digest}
          </code>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Try again
          </button>
          <a
            href="/"
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}
