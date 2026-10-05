import React, { Suspense } from "react";
import Link from "next/link";
import VerifyLoginOtpForm from "../_components/verifyLoginForm/verifyLoginForm";

const VerifyLoginOtpPage = () => {
  return (
    <main className="min-h-svh bg-muted/30">
      <div className="flex min-h-svh items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight text-primary"
            >
              DevAssess
            </Link>

            <h1 className="mt-8 text-2xl font-bold tracking-tight">
              Login Verification
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter the 6-digit OTP sent to your email.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                🔐
              </div>
            </div>

            <Suspense fallback={null}>
              <VerifyLoginOtpForm />
            </Suspense>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 DevAssess • Privacy • Terms
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyLoginOtpPage;
