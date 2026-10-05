"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useConfirmPayment } from "@/hooks";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  ReceiptText,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const calledRef = useRef(false);

  const {
    mutate: confirmPayment,
    isPending,
    isSuccess,
    isError,
    data,
  } = useConfirmPayment();

  useEffect(() => {
    if (sessionId && !calledRef.current) {
      calledRef.current = true;
      confirmPayment(sessionId);
    }
  }, [sessionId, confirmPayment]);

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
        <div className="w-full max-w-md p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative p-4 rounded-full bg-primary/10 text-primary">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Confirming payment...
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your transaction details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-destructive/5 to-background p-4">
        <div className="w-full max-w-md p-8 rounded-2xl border border-destructive/20 bg-card/50 backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive">
            <XCircle className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-destructive">
              Payment confirmation failed.
            </h2>
            <p className="text-sm text-muted-foreground">
              We couldn't verify your session ID or the transaction was
              cancelled.
            </p>
          </div>
          <div className="pt-2 w-full">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    console.log("Confirm Payment Response:", data);

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-emerald-500/5 to-background p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-10 rounded-3xl border border-emerald-500/20 bg-card/80 backdrop-blur-md shadow-2xl shadow-emerald-500/5 flex flex-col items-center text-center space-y-6 transition-all">
          {/* Animated Success Badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse blur-lg" />
            <div className="relative p-4 rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Payment Successful!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm mx-auto">
              Your payment has been confirmed. Thank you for your subscription!
            </p>
          </div>

          {/* Order Details / Security Card */}
          <div className="w-full p-4 rounded-2xl bg-muted/40 border space-y-3 text-left text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <ReceiptText className="w-4 h-4 text-emerald-500" /> Status
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            </div>
            {sessionId && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-foreground">Session Ref</span>
                <span className="font-mono text-foreground font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {sessionId}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 pt-2 text-muted-foreground text-[11px] sm:text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Encrypted transaction processed via Stripe securely.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border bg-background hover:bg-muted text-foreground font-medium text-sm transition-all duration-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/company/assessments"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/20"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-4">
        <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">
          Checking payment...
        </p>
      </div>
    </div>
  );
}
