/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { FileText } from "lucide-react";
import { useGetInvitationAssessments } from "@/hooks/candidateHooks";

export default function InvitationAssessmentPage() {
  const { data, isLoading, isError } = useGetInvitationAssessments();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />

          <p className="text-sm text-muted-foreground">
            Loading assigned assessments...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Failed to load assigned assessments.
          </p>
        </div>
      </div>
    );
  }

  const assessments = data?.data ?? [];

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
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Assigned Assessments
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          View your assigned assessments and start your assessment.
        </p>
      </div>

      {/* Empty State */}
      {assessments.length === 0 ? (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No Assigned Assessments
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            You don't have any assessment invitations yet.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="border-b bg-muted/40">
                  {/* S/N */}
                  <th className="w-16 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    S/N
                  </th>

                  {/* Assessment */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Assessment
                  </th>

                  {/* Duration */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Duration
                  </th>

                  {/* Passing Score */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Passing Score
                  </th>

                  {/* Max Attempts */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Max Attempts
                  </th>

                  {/* Start Date */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Start Date
                  </th>

                  {/* End Date */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    End Date
                  </th>

                  {/* Status */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>

                  {/* Attempt */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Attempt
                  </th>

                  {/* Action */}
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {assessments.map((invitation: any, index: number) => {
                  const assessment = invitation.assessment;

                  return (
                    <tr
                      key={invitation.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      {/* S/N */}
                      <td className="px-5 py-5 align-top">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </td>

                      {/* Assessment */}
                      <td className="max-w-[280px] px-5 py-5 align-top">
                        <div>
                          <p className="font-semibold text-foreground">
                            {assessment?.title ?? "Unknown Assessment"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                            {assessment?.description ??
                              "No description available."}
                          </p>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="whitespace-nowrap px-5 py-5 align-top">
                        <span className="text-sm font-medium">
                          {assessment?.duration ?? "N/A"}
                        </span>

                        {assessment?.duration && (
                          <span className="ml-1 text-sm text-muted-foreground">
                            min
                          </span>
                        )}
                      </td>

                      {/* Passing Score */}
                      <td className="whitespace-nowrap px-5 py-5 align-top">
                        <span className="text-sm font-medium">
                          {assessment?.passingScore ?? "N/A"}
                        </span>

                        {assessment?.passingScore !== undefined && (
                          <span className="ml-1 text-sm text-muted-foreground">
                            %
                          </span>
                        )}
                      </td>

                      {/* Max Attempts */}
                      <td className="px-5 py-5 align-top">
                        <span className="text-sm font-medium">
                          {assessment?.maxAttempts ?? "N/A"}
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="whitespace-nowrap px-5 py-5 align-top">
                        <p className="text-sm font-medium">
                          {formatDate(assessment?.startAt)}
                        </p>
                      </td>

                      {/* End Date */}
                      <td className="whitespace-nowrap px-5 py-5 align-top">
                        <p className="text-sm font-medium">
                          {formatDate(assessment?.endAt)}
                        </p>
                      </td>

                      {/* Invitation Status */}
                      <td className="px-5 py-5 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            invitation.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : invitation.status === "ACCEPTED"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : invitation.status === "EXPIRED"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              invitation.status === "PENDING"
                                ? "bg-yellow-500"
                                : invitation.status === "ACCEPTED"
                                  ? "bg-green-500"
                                  : invitation.status === "EXPIRED"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                            }`}
                          />

                          {invitation.status}
                        </span>
                      </td>

                      {/* Attempt Status */}
                      <td className="px-5 py-5 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            invitation.attemptStatus === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : invitation.attemptStatus === "COMPLETED"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {invitation.attemptStatus ?? "NOT_STARTED"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-5 text-right align-top">
                        {/* PENDING → Accept Invitation */}
                        {invitation.status === "PENDING" ? (
                          <button
                            type="button"
                            className="inline-flex whitespace-nowrap items-center justify-center rounded-md bg-primary px-2 py-1 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Accept
                          </button>
                        ) : invitation.attemptStatus === "IN_PROGRESS" ? (
                          /* IN_PROGRESS → Continue */
                          <button
                            type="button"
                            className="inline-flex whitespace-nowrap items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Continue Assessment
                          </button>
                        ) : invitation.attemptStatus === "COMPLETED" ? (
                          /* COMPLETED → View Result */
                          <button
                            type="button"
                            className="inline-flex whitespace-nowrap items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            View Result
                          </button>
                        ) : invitation.status === "ACCEPTED" ? (
                          /* ACCEPTED + NOT_STARTED → Start */
                          <button
                            type="button"
                            className="inline-flex whitespace-nowrap items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Start Assessment
                          </button>
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

          {/* Mobile Hint */}
          <div className="border-t bg-muted/20 px-4 py-2 text-center sm:hidden">
            <p className="text-xs text-muted-foreground">
              ← Swipe horizontally to view all details →
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
