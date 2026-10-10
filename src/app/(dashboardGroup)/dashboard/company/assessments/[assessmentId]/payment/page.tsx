 
"use client";

import { useInitiatePayment } from "@/hooks";
import { useParams } from "next/navigation";

export default function PaymentPage() {
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  const { mutate, isPending, isError, error } = useInitiatePayment();

  const handlePayment = () => {
    mutate(assessmentId, {
      onSuccess: (response) => {
        console.log("Payment response:", response);

        const checkoutUrl = response?.data?.checkoutUrl;

        if (!checkoutUrl) {
          console.error("Checkout URL not found");
          return;
        }

        window.location.href = checkoutUrl;
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* ================= HEADER ================= */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Payment
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Complete the payment to publish this assessment.
          </p>
        </div>

        {/* ================= PAYMENT CARD ================= */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {/* Top Section */}
          <div className="border-b bg-muted/20 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assessment Payment
                </p>

                <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                  Publish your assessment
                </h2>
              </div>

              <span className="w-fit rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                Payment Required
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-5 p-5 sm:p-6">
            {/* Assessment ID */}
            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assessment ID
              </p>

              <p className="mt-2 break-all rounded-lg bg-muted/50 px-3 py-2.5 font-mono text-xs font-medium text-foreground sm:text-sm">
                {assessmentId}
              </p>
            </div>

            {/* Payment Information */}
            <div className="rounded-xl border bg-muted/20 p-4">
              <p className="text-sm font-semibold">What happens next?</p>

              <div className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <p>You will be redirected to the secure payment checkout.</p>

                <p>
                  After successful payment, you can publish this assessment.
                </p>
              </div>
            </div>

            {/* Error */}
            {isError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30"
              >
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {error instanceof Error ? error.message : "Payment failed"}
                </p>
              </div>
            )}

            {/* Payment Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isPending}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Processing...
                </span>
              ) : (
                "Payment & Publish"
              )}
            </button>

            {/* Small Note */}
            <p className="text-center text-xs leading-5 text-muted-foreground">
              You will be redirected to the payment checkout page after clicking
              the button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
