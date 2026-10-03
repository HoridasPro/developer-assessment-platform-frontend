"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useState,
  useRef,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useVerifyEmailOtp } from "@/hooks";

const OTP_SLOTS = ["0", "1", "2", "3", "4", "5"];

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate, isPending, isSuccess, isError, data, error } =
    useVerifyEmailOtp();

  const handleInputChange = (slot: string, value: string) => {
    const index = Number(slot);

  
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpDigits];

     
    newOtp[index] = value.slice(-1);

    setOtpDigits(newOtp);

 
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (slot: string, e: KeyboardEvent<HTMLInputElement>) => {
    const index = Number(slot);

   
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

 
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");

      setOtpDigits(digits);

   
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = otpDigits.join("");

    if (!email || otp.length !== 6) return;

    mutate({
      email,
      otp,
    });
  };

  
  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  if (!email) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">❌</div>

          <h1 className="text-2xl font-bold">Invalid Verification Request</h1>

          <p className="mt-3 text-muted-foreground">
            Verification email address is missing.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Back to Register
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
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
    );
  }

  return (
    <div>
      <div className="text-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mt-8 text-2xl font-bold tracking-tight">
              Verify Your Email
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter the 6-digit verification code sent to your email address.
            </p>
          </div>
        </div>
        <p className="mb-3 text-sm font-medium">Verification Code</p>

        <div className="flex justify-center gap-2 sm:gap-3">
          {OTP_SLOTS.map((slot) => {
            const index = Number(slot);

            return (
              <input
                key={`otp-slot-${slot}`}
                id={`otp-input-${slot}`}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={otpDigits[index]}
                onChange={(e) => handleInputChange(slot, e.target.value)}
                onKeyDown={(e) => handleKeyDown(slot, e)}
                onPaste={handlePaste}
                className="h-12 w-10 rounded-lg border bg-background text-center text-xl font-bold transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-12"
              />
            );
          })}
        </div>
      </div>

      {isError && (
        <p className="mt-3 text-center text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Email verification failed."}
        </p>
      )}

      <button
        type="button"
        onClick={handleVerify}
        disabled={isPending || !isOtpComplete}
        className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Verifying..." : "Verify Email"}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the OTP?
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Please check your spam folder. The OTP is valid for 5 minutes.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
