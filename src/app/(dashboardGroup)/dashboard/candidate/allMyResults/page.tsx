"use client";

import { useGetMyAllResults } from "@/hooks";
import { Award, CheckCircle2, FileText, XCircle } from "lucide-react";
import Link from "next/link";

export default function CandidateResultsPage() {
  const { data, isLoading, isError } = useGetMyAllResults();

  if (isLoading) {
    return (
      <div className="min-h-[400px] p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-28 rounded-2xl bg-muted" />
            <div className="h-28 rounded-2xl bg-muted" />
            <div className="h-28 rounded-2xl bg-muted" />
          </div>

          <div className="h-72 rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            Failed to load results
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your assessment results.
          </p>
        </div>
      </div>
    );
  }

  const results = data?.data ?? [];

  const totalResults = results.length;

  const passedResults = results.filter((result: any) => result.passed).length;

  const failedResults = totalResults - passedResults;

  return (
    <div className="min-h-screen p-4 text-foreground sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Award className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Assessment Center
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Results
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            View your completed assessment results and performance.
          </p>
        </div>

        {/* Summary Cards */}
        {results.length > 0 && (
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Total */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Assessments
                  </p>

                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {totalResults}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Completed assessments
              </p>
            </div>

            {/* Passed */}
            <div className="rounded-2xl border border-green-500/20 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Passed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                    {passedResults}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Successfully passed
              </p>
            </div>

            {/* Failed */}
            <div className="rounded-2xl border border-red-500/20 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Failed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                    {failedResults}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Needs improvement
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-5 py-14 text-center shadow-sm sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-foreground">
              No results found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              You have not completed any assessments yet. Your results will
              appear here after an assessment is evaluated.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop / Tablet */}
            <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
              <div className="border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-foreground">
                      Assessment History
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Your completed assessment performance
                    </p>
                  </div>

                  <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {totalResults} Results
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        #
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Assessment
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Attempt
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Score
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Percentage
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Result
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {results.map((result: any, index: number) => (
                      <tr
                        key={result.attemptId}
                        className="transition-colors hover:bg-muted/40"
                      >
                        <td className="px-5 py-5 text-sm font-medium text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[230px] truncate font-semibold text-foreground">
                                {result.assessmentTitle}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                Completed assessment
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span className="inline-flex rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                            Attempt #{result.attemptNumber}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <p className="font-semibold text-foreground">
                            {result.obtainedMarks}{" "}
                            <span className="font-normal text-muted-foreground">
                              / {result.totalMarks}
                            </span>
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${
                                  result.passed ? "bg-green-500" : "bg-red-500"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    Number(result.percentage) || 0,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-semibold text-foreground">
                              {result.percentage}%
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          {result.passed ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-700 dark:text-green-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-400">
                              <XCircle className="h-3.5 w-3.5" />
                              Failed
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-5 text-right">
                          <Link
                            href={`/dashboard/candidate/assessments/${result.attemptId}/result`}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                          view Result
                            <span aria-hidden="true">→</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-4 md:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-foreground">
                    Assessment History
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {totalResults} completed assessment
                    {totalResults !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {results.map((result: any, index: number) => (
                <div
                  key={result.attemptId}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {result.assessmentTitle}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          #{String(index + 1).padStart(2, "0")} · Attempt #
                          {result.attemptNumber}
                        </p>
                      </div>
                    </div>

                    {result.passed ? (
                      <span className="shrink-0 rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-700 dark:text-green-400">
                        Passed
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:text-red-400">
                        Failed
                      </span>
                    )}
                  </div>

                  {/* Score */}
                  <div className="mt-5 rounded-xl bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Your Score
                        </p>

                        <p className="mt-1 text-xl font-bold text-foreground">
                          {result.obtainedMarks}
                          <span className="text-sm font-medium text-muted-foreground">
                            {" "}
                            / {result.totalMarks}
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-medium text-muted-foreground">
                          Percentage
                        </p>

                        <p
                          className={`mt-1 text-xl font-bold ${
                            result.passed
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {result.percentage}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
                      <div
                        className={`h-full rounded-full ${
                          result.passed ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            Number(result.percentage) || 0,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    href={`/dashboard/candidate/assessments/${result.attemptId}/result`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
                  >
                    View Full Result
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
