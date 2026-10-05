"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="mt-5 text-2xl font-bold">Payment Cancelled</h1>

        <p className="mt-3 text-muted-foreground">
          Your payment was cancelled. No payment was completed.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/payment`}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try Payment Again
          </Link>

          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions`}
            className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-muted"
          >
            Back to Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
