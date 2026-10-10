
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root application error:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <AlertTriangle size={38} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              Critical Error
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Application Error
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Something went wrong while loading the application.
              Please try reloading this page.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw size={17} />
              Reload Application
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
