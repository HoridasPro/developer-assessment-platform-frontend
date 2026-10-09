 
"use client";

import {
  CalendarDays,
  CreditCard,
  FileText,
  Loader2,
  Receipt,
} from "lucide-react";
import Image from "next/image";
import { useGetPaymentHistory } from "@/hooks";

export default function PaymentHistoryPage() {
  const { data, isLoading, isError, refetch } = useGetPaymentHistory();

  console.log("Payment History:", data);

  const payments = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

  // ==============================
  // Status Classes
  // ==============================
  const statusClasses: Record<string, string> = {
    PAID: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",

    SUCCESS:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",

    COMPLETED:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",

    PENDING:
      "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20",

    FAILED:
      "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",

    CANCELLED:
      "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",

    REFUNDED:
      "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20",
  };

  const getStatusClass = (status?: string) =>
    statusClasses[String(status || "").toUpperCase()] ||
    "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20";

  // ==============================
  // Format Date
  // ==============================
  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ==============================
  // Format Amount
  // ==============================
  const formatAmount = (amount: number | string, currency?: string) => {
    const value = Number(amount);

    if (Number.isNaN(value)) {
      return "—";
    }

    return `${value.toFixed(2)} ${currency?.toUpperCase() || "USD"}`;
  };

  // ==============================
  // Assessment Title
  // ==============================
  const getAssessmentTitle = (payment: any) => {
    return (
      payment.assessment?.title ||
      payment.assessmentTitle ||
      payment.assessment?.name ||
      payment.title ||
      "Assessment"
    );
  };

  // ==============================
  // Profile Image
  // ==============================
  const getProfileImage = (payment: any) => {
    return payment.company?.user?.profilePhoto || null;
  };

  // ==============================
  // User Name
  // ==============================
  const getUserName = (payment: any) => {
    return payment.company?.user?.name || "—";
  };

  // ==============================
  // User Role
  // ==============================
  const getUserRole = (payment: any) => {
    return payment.company?.user?.role || "—";
  };

  // ==============================
  // User Initial
  // ==============================
  const getUserInitial = (payment: any) => {
    const name = getUserName(payment);

    if (!name || name === "—") {
      return "?";
    }

    return name.charAt(0).toUpperCase();
  };

  // ==============================
  // Payment ID
  // ==============================
  const getPaymentId = (payment: any) => {
    return payment.id || payment.paymentId || payment._id || "—";
  };

  // ==============================
  // Payment Statistics
  // ==============================
  const successfulPayments = payments.filter((payment: any) =>
    ["PAID", "SUCCESS", "COMPLETED"].includes(
      String(payment.status).toUpperCase(),
    ),
  ).length;

  const pendingPayments = payments.filter(
    (payment: any) => String(payment.status).toUpperCase() === "PENDING",
  ).length;

  // ==============================
  // Loading
  // ==============================
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span>Loading payment history...</span>
        </div>
      </div>
    );
  }

  // ==============================
  // Error
  // ==============================
  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">
            Failed to load payment history.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* ==============================
          Header
      ============================== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Payment History
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all your assessment payments.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card shadow-sm sm:h-11 sm:w-11">
          <CreditCard className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* ==============================
          Summary Cards
      ============================== */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Payments
              </p>

              <p className="mt-1 text-2xl font-bold">{payments.length}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Receipt className="h-5 w-5 text-violet-500" />
            </div>
          </div>
        </div>

        {/* Successful */}
        <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Successful</p>

              <p className="mt-1 text-2xl font-bold">
                {successfulPayments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>

              <p className="mt-1 text-2xl font-bold">
                {pendingPayments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ==============================
          Empty State
      ============================== */}
      {payments.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-slate-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No payment history
          </h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            You haven&apos;t made any payments yet.
          </p>
        </div>
      ) : (
        <>
          {/* =====================================================
              DESKTOP TABLE
          ===================================================== */}
          <div className="hidden overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm md:block">
            <div className="relative w-full overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    {/* SI No */}
                    <th className="h-12 w-16 px-4 text-center align-middle font-medium">
                      SI
                    </th>

                    {/* User */}
                    <th className="h-12 min-w-[150px] px-4 text-center align-middle font-medium">
                      Image
                    </th>

                    {/* Name */}
                    <th className="h-12 min-w-[160px] px-4 text-left align-middle font-medium">
                      Name
                    </th>

                    {/* Role */}
                    <th className="h-12 min-w-[120px] px-4 text-left align-middle font-medium">
                      Role
                    </th>

                    {/* Assessment */}
                    <th className="h-12 min-w-[220px] px-4 text-left align-middle font-medium">
                      Assessment
                    </th>

                    {/* Amount */}
                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle font-medium">
                      Amount
                    </th>

                    {/* Status */}
                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle font-medium">
                      Status
                    </th>

                    {/* Payment ID */}
                    <th className="h-12 min-w-[180px] px-4 text-left align-middle font-medium">
                      Payment ID
                    </th>

                    {/* Date */}
                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle font-medium">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {payments.map((payment: any, paymentIndex: number) => {
                    const id = getPaymentId(payment);
                    const image = getProfileImage(payment);
                    const userName = getUserName(payment);
                    const role = getUserRole(payment);
                    const title = getAssessmentTitle(payment);

                    return (
                      <tr
                        key={String(id)}
                        className="transition-colors hover:bg-muted/40"
                      >
                        {/* SI No */}
                        <td className="p-4 text-center align-middle">
                          <span className="text-sm font-medium text-muted-foreground">
                            {paymentIndex + 1}
                          </span>
                        </td>

                        {/* User - Image */}
                        <td className="p-4 text-center align-middle">
                          <div className="flex justify-center">
                            {image ? (
                              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-muted">
                                <Image
                                  src={image}
                                  alt={userName}
                                  fill
                                  sizes="44px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold text-muted-foreground">
                                {getUserInitial(payment)}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Name */}
                        <td className="p-4 align-middle">
                          <p className="truncate font-semibold text-foreground">
                            {userName}
                          </p>
                        </td>

                        {/* Role */}
                        <td className="p-4 align-middle">
                          <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium uppercase text-muted-foreground">
                            {role}
                          </span>
                        </td>

                        {/* Assessment */}
                        <td className="p-4 align-middle">
                          <div className="font-semibold text-foreground">
                            {title}
                          </div>

                          {payment.assessment?.description && (
                            <p className="mt-1 line-clamp-1 max-w-[320px] text-xs text-muted-foreground">
                              {payment.assessment.description}
                            </p>
                          )}
                        </td>

                        {/* Amount */}
                        <td className="whitespace-nowrap p-4 align-middle">
                          <span className="font-medium">
                            {formatAmount(
                              payment.amount,
                              payment.currency,
                            )}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusClass(
                              payment.status,
                            )}`}
                          >
                            {payment.status || "UNKNOWN"}
                          </span>
                        </td>

                        {/* Payment ID */}
                        <td className="max-w-[220px] p-4 align-middle">
                          <span
                            title={String(id)}
                            className="block truncate font-mono text-xs text-muted-foreground"
                          >
                            {id}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap p-4 align-middle text-muted-foreground">
                          {formatDate(
                            payment.createdAt ||
                              payment.created_at ||
                              payment.paidAt,
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* =====================================================
              MOBILE CARDS
          ===================================================== */}
          <div className="space-y-3 md:hidden">
            {payments.map((payment: any, paymentIndex: number) => {
              const id = getPaymentId(payment);
              const image = getProfileImage(payment);
              const userName = getUserName(payment);
              const role = getUserRole(payment);
              const title = getAssessmentTitle(payment);

              return (
                <div
                  key={String(id)}
                  className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm"
                >
                  {/* Top Section */}
                  <div className="flex items-start gap-3">
                    {/* SI No */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                      {paymentIndex + 1}
                    </div>

                    {/* User */}
                    <div className="flex min-w-0 flex-1 flex-col items-center">
                      {/* Profile Image */}
                      {image ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border bg-muted">
                          <Image
                            src={image}
                            alt={userName}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-muted text-lg font-semibold text-muted-foreground">
                          {getUserInitial(payment)}
                        </div>
                      )}

                      {/* Name */}
                      <h3 className="mt-2 max-w-full truncate text-center font-semibold">
                        {userName}
                      </h3>

                      {/* Role */}
                      <span className="mt-1 inline-flex rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                        {role}
                      </span>
                    </div>
                  </div>

                  {/* Assessment */}
                  <div className="mt-4 border-t pt-4">
                    <p className="text-xs text-muted-foreground">
                      Assessment
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold">
                      {title}
                    </p>

                    {payment.assessment?.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {payment.assessment.description}
                      </p>
                    )}
                  </div>

                  {/* Payment ID */}
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      Payment ID
                    </p>

                    <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
                      {id}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <span className="text-xs text-muted-foreground">
                      Payment Status
                    </span>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusClass(
                        payment.status,
                      )}`}
                    >
                      {payment.status || "UNKNOWN"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {/* Amount */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Amount
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatAmount(
                          payment.amount,
                          payment.currency,
                        )}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatDate(
                          payment.createdAt ||
                            payment.created_at ||
                            payment.paidAt,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}