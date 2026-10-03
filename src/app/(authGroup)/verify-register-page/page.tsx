import React from "react";
import VerifyEmailForm from "../_components/verifyEmailForm/verifyEmailForm";

const VerifyEmailPage = () => {
  return (
    <main className="min-h-svh bg-muted/30">
      <div className="flex min-h-svh items-center justify-center px-4 py-10">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
              ✉️
            </div>
          </div>

          <VerifyEmailForm />
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
