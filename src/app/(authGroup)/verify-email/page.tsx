"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/hooks";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { isLoading, isSuccess, isError, data, error } = useVerifyEmail(token);

  if (!token) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">❌</div>

          <h1 className="text-2xl font-bold">Invalid Verification Link</h1>

          <p className="mt-3 text-muted-foreground">
            Verification token is missing.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">⏳</div>

          <h1 className="text-2xl font-bold">Verifying your email...</h1>

          <p className="mt-3 text-muted-foreground">
            Please wait while we verify your email address.
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">🎉</div>

          <h1 className="text-2xl font-bold">Email Verified Successfully!</h1>

          <p className="mt-3 text-muted-foreground">
            {data?.message || "Your email has been verified successfully."}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            You can now login to your DevAssess account.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">❌</div>

          <h1 className="text-2xl font-bold">Verification Failed</h1>

          <p className="mt-3 text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Email verification failed."}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md border px-6 py-3 text-sm font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
