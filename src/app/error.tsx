"use client";

import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
        <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-amber-400" />

        <div className="px-6 py-10 text-center sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <AlertTriangle size={38} strokeWidth={1.8} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
            Something went wrong
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Oops! An unexpected error occurred.
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-400">
            We couldn't complete your request. Please try again. If the problem
            continues, return to the dashboard.
          </p>

          {error.digest && (
            <p className="mt-4 break-all rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Error reference: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <Link
              href="/dashboard/company"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Home size={16} />
              Dashboard
            </Link>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft size={15} />
              Go back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
