"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useConfirmPayment } from "@/hooks";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const {
    mutate: confirmPayment,
    isPending,
    isSuccess,
    isError,
    data,
  } = useConfirmPayment();

  useEffect(() => {
    if (sessionId) {
      confirmPayment(sessionId);
    }
  }, [sessionId, confirmPayment]);

  if (isPending) {
    return <div>Confirming payment...</div>;
  }

  if (isError) {
    return <div>Payment confirmation failed.</div>;
  }

  if (isSuccess) {
    console.log("Confirm Payment Response:", data);

    return (
      <div>
        <h1>Payment Successful!</h1>
        <p>Your payment has been confirmed.</p>
      </div>
    );
  }

  return <div>Checking payment...</div>;
}
