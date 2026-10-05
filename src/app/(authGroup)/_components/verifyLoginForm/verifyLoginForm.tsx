"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useVerifyLoginOtp } from "@/hooks";

const OTP_SLOTS = ["0", "1", "2", "3", "4", "5"];

export default function VerifyLoginOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate, isPending, isSuccess, isError, data, error } =
    useVerifyLoginOtp();

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

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    setOtpDigits(pastedData.split(""));

    inputRefs.current[5]?.focus();
  };

  const handleVerify = () => {
    console.log("VERIFY BUTTON CLICKED");

    const otp = otpDigits.join("");

    console.log("OTP:", otp);
    console.log("EMAIL:", email);

    if (!email || otp.length !== 6) {
      console.log("OTP VALIDATION FAILED");
      return;
    }

    mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: (data: any) => {
          console.log("OTP LOGIN RESPONSE:", data);

          const accessToken = data?.data?.accessToken || data?.accessToken;
          const refreshToken = data?.data?.refreshToken || data?.refreshToken;

          if (!accessToken || !refreshToken) {
            console.error("Tokens missing in response structure:", data);
            return;
          }

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          console.log("ACCESS saved:", localStorage.getItem("accessToken"));
          console.log("REFRESH saved:", localStorage.getItem("refreshToken"));

          router.push("/");
        },

        onError: (error) => {
          console.error("OTP LOGIN ERROR:", error);
        },
      },
    );
  };

  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  if (!email) {
    return (
      <div className="text-center">
        <div className="mb-4 text-5xl">❌</div>

        <h1 className="text-2xl font-bold">Invalid Login Request</h1>

        <p className="mt-3 text-muted-foreground">
          Login email address is missing.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mb-4 text-5xl">🎉</div>

        <h1 className="text-2xl font-bold">Login Successful!</h1>

        <p className="mt-3 text-muted-foreground">
          {data?.message || "You have logged in successfully."}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          We have sent a 6-digit login OTP to:
        </p>

        <p className="mt-2 break-all font-medium">{email}</p>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-center text-sm font-medium">Enter Login OTP</p>

        <div className="flex justify-center gap-2 sm:gap-3">
          {OTP_SLOTS.map((slot) => {
            const index = Number(slot);

            return (
              <input
                key={`login-otp-${slot}`}
                id={`login-otp-${slot}`}
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

        {isError && (
          <p className="mt-3 text-center text-sm text-red-500">
            {error instanceof Error ? error.message : "Invalid login OTP."}
          </p>
        )}

        <button
          type="button"
          onClick={handleVerify}
          disabled={isPending || !isOtpComplete}
          className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Verify Login"}
        </button>
      </div>

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
