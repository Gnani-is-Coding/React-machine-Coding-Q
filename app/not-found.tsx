import Link from 'next/link'

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-24 text-center dark:bg-black">
      <p className="font-mono text-sm tracking-widest text-zinc-400 dark:text-zinc-600">
        404
      </p>
      <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        This question does not exist
      </h1>
      <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
        The page moved, or the URL is wrong.
      </p>
      <Link
        href="/"
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Back to questions
      </Link>
    </div>
  )
}
