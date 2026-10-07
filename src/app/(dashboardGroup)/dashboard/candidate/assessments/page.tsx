/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { toast } from "@/components/ui/toast";
import {
  useAcceptInvitation,
  useCancelAttempt,
  useGetInvitationAssessments,
  useStartAssessment,
} from "@/hooks";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Hourglass,
  Play,
  RotateCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function InvitationAssessmentPage() {
  const { data, isLoading, isError } = useGetInvitationAssessments();

  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation();

  const { mutate: startAssessment, isPending: isStarting } =
    useStartAssessment();

  const { mutate: cancelAttempt, isPending: isCancelling } = useCancelAttempt();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-muted border-t-primary" />
          </div>

          <h2 className="text-base font-semibold text-foreground">
            Loading assessments
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Please wait while we load your assigned assessments.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50/70 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
            Failed to load assessments
          </h2>

          <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80">
            Something went wrong while loading your assigned assessments.
          </p>
        </div>
      </div>
    );
  }

  const assessments = data?.data ?? [];

  console.log("ASSIGNED ASSESSMENTS:", assessments);

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <FileText className="h-3.5 w-3.5" />
              Candidate Assessments
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Assigned Assessments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              View your assigned assessments, check the schedule, and start your
              assessment when it is available.
            </p>
          </div>

          {/* Total */}
          <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Total Assigned
              </p>
              <p className="text-xl font-bold text-foreground">
                {assessments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {assessments.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-foreground">
            No Assigned Assessments
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            You don't have any assessment invitations yet. Once a company
            assigns an assessment to you, it will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Table */}
          <div className="hidden w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1150px] border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="w-16 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      S/N
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Assessment
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Duration
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Passing Score
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Max Attempts
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Start Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      End Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Attempt
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {assessments.map((invitation: any, index: number) => {
                    const assessment = invitation.assessment;
                    const now = new Date();

                    const isExpired =
                      !!assessment?.endAt && new Date(assessment.endAt) < now;

                    return (
                      <tr
                        key={invitation.id}
                        className="group transition-colors hover:bg-muted/30"
                      >
                        {/* S/N */}
                        <td className="px-5 py-5 align-top">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </td>

                        {/* Assessment */}
                        <td className="max-w-[280px] px-5 py-5 align-top">
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-foreground">
                                {assessment?.title ?? "Unknown Assessment"}
                              </p>

                              <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                {assessment?.description ??
                                  "No description available."}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="whitespace-nowrap px-5 py-5 align-top">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-muted-foreground" />

                            <span className="text-sm font-medium text-foreground">
                              {assessment?.duration ?? "N/A"}
                            </span>

                            {assessment?.duration && (
                              <span className="text-sm text-muted-foreground">
                                min
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Passing Score */}
                        <td className="whitespace-nowrap px-5 py-5 align-top">
                          <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                            {assessment?.passingScore ?? "N/A"}
                            {assessment?.passingScore !== undefined && "%"}
                          </span>
                        </td>

                        {/* Max Attempts */}
                        <td className="px-5 py-5 align-top">
                          <span className="text-sm font-medium text-foreground">
                            {assessment?.maxAttempts ?? "N/A"}
                          </span>
                        </td>

                        {/* Start Date */}
                        <td className="whitespace-nowrap px-5 py-5 align-top">
                          <div className="flex items-start gap-2">
                            <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />

                            <p className="text-sm font-medium text-foreground">
                              {formatDate(assessment?.startAt)}
                            </p>
                          </div>
                        </td>

                        {/* End Date */}
                        <td className="whitespace-nowrap px-5 py-5 align-top">
                          <div className="flex items-start gap-2">
                            <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />

                            <p className="text-sm font-medium text-foreground">
                              {formatDate(assessment?.endAt)}
                            </p>
                          </div>
                        </td>

                        {/* Invitation Status */}
                        <td className="px-5 py-5 align-top">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              invitation.status === "PENDING"
                                ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                : invitation.status === "ACCEPTED"
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                  : invitation.status === "EXPIRED"
                                    ? "bg-red-500/10 text-red-700 dark:text-red-400"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                invitation.status === "PENDING"
                                  ? "bg-yellow-500"
                                  : invitation.status === "ACCEPTED"
                                    ? "bg-green-500"
                                    : invitation.status === "EXPIRED"
                                      ? "bg-red-500"
                                      : "bg-muted-foreground"
                              }`}
                            />

                            {invitation.status}
                          </span>
                        </td>

                        {/* Attempt Status */}
                        <td className="px-5 py-5 align-top">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              invitation.attemptStatus === "IN_PROGRESS"
                                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                                : invitation.attemptStatus === "COMPLETED"
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                  : invitation.attemptStatus === "CANCELLED"
                                    ? "bg-red-500/10 text-red-700 dark:text-red-400"
                                    : invitation.attemptStatus === "SUBMITTED"
                                      ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                      : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {invitation.attemptStatus === "IN_PROGRESS" && (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            )}

                            {invitation.attemptStatus === "COMPLETED" && (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}

                            {invitation.attemptStatus === "CANCELLED" && (
                              <XCircle className="h-3.5 w-3.5" />
                            )}

                            {invitation.attemptStatus === "SUBMITTED" && (
                              <Hourglass className="h-3.5 w-3.5" />
                            )}

                            {invitation.attemptStatus ?? "NOT_STARTED"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-5 text-right align-top">
                          {/* PENDING + Expired */}
                          {invitation.status === "PENDING" && isExpired ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-700 dark:text-red-400">
                              <XCircle className="h-4 w-4" />
                              Expired
                            </span>
                          ) : invitation.status === "PENDING" ? (
                            /* PENDING → Accept Invitation */
                            <button
                              type="button"
                              onClick={() =>
                                acceptInvitation(invitation.id, {
                                  onSuccess: () => {
                                    toast.add({
                                      title:
                                        "Invitation accepted successfully!",
                                      description:
                                        "The invitation has been accepted.",
                                      type: "success",
                                    });
                                  },
                                  onError: (error: any) => {
                                    toast.add({
                                      title: "Failed to accept invitation.",
                                      description:
                                        error?.message ||
                                        "Something went wrong. Please try again.",
                                      type: "error",
                                    });
                                  },
                                })
                              }
                              disabled={isAccepting}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isAccepting ? (
                                <>
                                  <RotateCcw className="h-4 w-4 animate-spin" />
                                  Accepting...
                                </>
                              ) : (
                                <>
                                  Accept
                                  <ChevronRight className="h-4 w-4" />
                                </>
                              )}
                            </button>
                          ) : invitation.attemptStatus === "IN_PROGRESS" ? (
                            /* IN_PROGRESS → Continue / Cancel */
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/dashboard/candidate/assessments/${invitation.attemptId}`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                              >
                                Continue
                                <ChevronRight className="h-4 w-4" />
                              </Link>

                              <button
                                type="button"
                                onClick={() => {
                                  const confirmed = window.confirm(
                                    "Are you sure you want to cancel this assessment?",
                                  );

                                  if (!confirmed) return;

                                  cancelAttempt(invitation.attemptId, {
                                    onSuccess: () => {
                                      toast.add({
                                        title: "Assessment cancelled",
                                        description:
                                          "Your assessment attempt has been cancelled successfully.",
                                        type: "success",
                                      });
                                    },

                                    onError: (error: any) => {
                                      toast.add({
                                        title: "Failed to cancel assessment",
                                        description:
                                          error?.message ||
                                          "Something went wrong. Please try again.",
                                        type: "error",
                                      });
                                    },
                                  });
                                }}
                                disabled={isCancelling}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-400"
                              >
                                <XCircle className="h-4 w-4" />
                                {isCancelling ? "Cancelling..." : "Cancel"}
                              </button>
                            </div>
                          ) : invitation.attemptStatus === "SUBMITTED" ? (
                            /* SUBMITTED → Evaluation Pending */
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-500/10 px-4 py-2.5 text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                              <Hourglass className="h-4 w-4" />
                              Evaluation Pending
                            </span>
                          ) : invitation.attemptStatus === "COMPLETED" ? (
                            /* COMPLETED → View Result */
                            <Link
                              href={`/dashboard/candidate/assessments/${invitation.attemptId}/result`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:shadow-sm"
                            >
                              Result
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          ) : invitation.status === "ACCEPTED" && !isExpired ? (
                            /* ACCEPTED → Start */
                            <button
                              type="button"
                              onClick={() => startAssessment(invitation.id)}
                              disabled={isStarting}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isStarting ? (
                                <>
                                  <RotateCcw className="h-4 w-4 animate-spin" />
                                  Starting...
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4" />
                                  Start
                                </>
                              )}
                            </button>
                          ) : isExpired ? (
                            /* Expired */
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-700 dark:text-red-400">
                              <XCircle className="h-4 w-4" />
                              Expired
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              Not Available
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Desktop Hint */}
            <div className="border-t border-border bg-muted/20 px-4 py-2.5 text-center">
              <p className="text-xs text-muted-foreground">
                Scroll horizontally if more assessment details are available.
              </p>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {assessments.map((invitation: any, index: number) => {
              const assessment = invitation.assessment;
              const now = new Date();

              const isExpired =
                !!assessment?.endAt && new Date(assessment.endAt) < now;

              return (
                <div
                  key={invitation.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="border-b border-border bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>

                        <div className="min-w-0">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Assessment #{index + 1}
                          </p>

                          <h2 className="line-clamp-2 text-base font-bold text-foreground">
                            {assessment?.title ?? "Unknown Assessment"}
                          </h2>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-5 text-muted-foreground">
                      {assessment?.description ?? "No description available."}
                    </p>
                  </div>

                  {/* Card Details */}
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-xs font-medium">Duration</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {assessment?.duration ?? "N/A"}
                        {assessment?.duration && (
                          <span className="ml-1 font-normal text-muted-foreground">
                            min
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-medium">Passing</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {assessment?.passingScore ?? "N/A"}
                        {assessment?.passingScore !== undefined && "%"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <RotateCcw className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          Max Attempts
                        </span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {assessment?.maxAttempts ?? "N/A"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hourglass className="h-4 w-4" />
                        <span className="text-xs font-medium">Attempt</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {invitation.attemptStatus ?? "NOT_STARTED"}
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mx-4 mb-4 rounded-xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        Assessment Schedule
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs text-muted-foreground">
                          Starts
                        </span>

                        <span className="text-right text-xs font-medium text-foreground">
                          {formatDate(assessment?.startAt)}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs text-muted-foreground">
                          Ends
                        </span>

                        <span className="text-right text-xs font-medium text-foreground">
                          {formatDate(assessment?.endAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        invitation.status === "PENDING"
                          ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                          : invitation.status === "ACCEPTED"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : invitation.status === "EXPIRED"
                              ? "bg-red-500/10 text-red-700 dark:text-red-400"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          invitation.status === "PENDING"
                            ? "bg-yellow-500"
                            : invitation.status === "ACCEPTED"
                              ? "bg-green-500"
                              : invitation.status === "EXPIRED"
                                ? "bg-red-500"
                                : "bg-muted-foreground"
                        }`}
                      />

                      {invitation.status}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        invitation.attemptStatus === "IN_PROGRESS"
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                          : invitation.attemptStatus === "COMPLETED"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : invitation.attemptStatus === "CANCELLED"
                              ? "bg-red-500/10 text-red-700 dark:text-red-400"
                              : invitation.attemptStatus === "SUBMITTED"
                                ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {invitation.attemptStatus ?? "NOT_STARTED"}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="border-t border-border p-4">
                    {invitation.status === "PENDING" && isExpired ? (
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-400">
                        <XCircle className="h-4 w-4" />
                        Assessment Expired
                      </div>
                    ) : invitation.status === "PENDING" ? (
                      <button
                        type="button"
                        onClick={() =>
                          acceptInvitation(invitation.id, {
                            onSuccess: () => {
                              toast.add({
                                title: "Invitation accepted successfully!",
                                description:
                                  "The invitation has been accepted.",
                                type: "success",
                              });
                            },
                            onError: (error: any) => {
                              toast.add({
                                title: "Failed to accept invitation.",
                                description:
                                  error?.message ||
                                  "Something went wrong. Please try again.",
                                type: "error",
                              });
                            },
                          })
                        }
                        disabled={isAccepting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isAccepting ? (
                          <>
                            <RotateCcw className="h-4 w-4 animate-spin" />
                            Accepting...
                          </>
                        ) : (
                          <>
                            Accept Invitation
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    ) : invitation.attemptStatus === "IN_PROGRESS" ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/dashboard/candidate/assessments/${invitation.attemptId}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                        >
                          Continue
                          <ChevronRight className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to cancel this assessment?",
                            );

                            if (!confirmed) return;

                            cancelAttempt(invitation.attemptId, {
                              onSuccess: () => {
                                toast.add({
                                  title: "Assessment cancelled",
                                  description:
                                    "Your assessment attempt has been cancelled successfully.",
                                  type: "success",
                                });
                              },

                              onError: (error: any) => {
                                toast.add({
                                  title: "Failed to cancel assessment",
                                  description:
                                    error?.message ||
                                    "Something went wrong. Please try again.",
                                  type: "error",
                                });
                              },
                            });
                          }}
                          disabled={isCancelling}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-300 px-3 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-400"
                        >
                          <XCircle className="h-4 w-4" />
                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </button>
                      </div>
                    ) : invitation.attemptStatus === "SUBMITTED" ? (
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500/10 px-4 py-3 text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                        <Hourglass className="h-4 w-4" />
                        Evaluation Pending
                      </div>
                    ) : invitation.attemptStatus === "COMPLETED" ? (
                      <Link
                        href={`/dashboard/candidate/assessments/${invitation.attemptId}/result`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        Result
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : invitation.status === "ACCEPTED" && !isExpired ? (
                      <button
                        type="button"
                        onClick={() => startAssessment(invitation.id)}
                        disabled={isStarting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isStarting ? (
                          <>
                            <RotateCcw className="h-4 w-4 animate-spin" />
                            Starting...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Start
                          </>
                        )}
                      </button>
                    ) : isExpired ? (
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-400">
                        <XCircle className="h-4 w-4" />
                        Assessment Expired
                      </div>
                    ) : (
                      <div className="py-2 text-center text-sm text-muted-foreground">
                        Not Available
                      </div>
                    )}
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
