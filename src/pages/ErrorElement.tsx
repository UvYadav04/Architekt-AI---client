// components/ErrorFallback.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"

export default function ErrorFallback() {
  const error = useRouteError()

  let title = "Something went wrong"
  let message = "An unexpected error occurred."

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data?.message || message
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-xl text-center">

        {/* ERROR CODE / TITLE */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {title}
        </h1>

        {/* MESSAGE */}
        <p className="mt-4 text-zinc-400 text-sm md:text-base">
          {message}
        </p>

        {/* DIVIDER */}
        <div className="w-20 h-[1px] bg-zinc-700 mx-auto my-6" />

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            to="/"
            className="px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-md border border-zinc-700 hover:border-zinc-500 transition"
          >
            Retry
          </button>

        </div>

        {/* FOOTNOTE */}
        <p className="mt-8 text-xs text-zinc-600">
          If the problem persists, try refreshing or returning later.
        </p>

      </div>
    </div>
  )
}