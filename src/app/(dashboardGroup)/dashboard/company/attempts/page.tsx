"use client";

import { useGetCompanyAttempts } from "@/hooks";
import Link from "next/link";
import { ClipboardCheck, Loader2, UserRound } from "lucide-react";
import Image from "next/image";

export default function CompanyAttemptsPage() {
  const { data, isLoading, isError } = useGetCompanyAttempts();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-4 sm:p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading attempts...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          Failed to load attempts.
        </div>
      </div>
    );
  }

  const attempts = data?.data ?? [];
  console.log("get attempts", attempts);

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Company Attempts
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Candidates who submitted their assessments
        </p>
      </div>

      {/* Empty State */}
      {attempts.length === 0 ? (
        <div className="rounded-xl border bg-card p-6 text-center shadow-sm sm:p-8">
          <ClipboardCheck className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">No submitted attempts found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Submitted candidate attempts will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Table */}
          <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {/* SI No. */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      SI
                    </th>

                    {/* Image */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Image
                    </th>

                    {/* Candidate Name */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Candidate Name
                    </th>

                    {/* Assessment */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Assessment
                    </th>

                    {/* Status */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Status
                    </th>

                    {/* Score */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Score
                    </th>

                    {/* Action */}
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attempts.map((attempt, index) => (
                    <tr
                      key={attempt.id}
                      className="border-b transition-colors last:border-0 hover:bg-muted/30"
                    >
                      {/* SI No. */}
                      <td className="px-4 py-4">
                        <span className="font-medium">{index + 1}</span>
                      </td>

                      {/* Candidate Image */}
                      <td className="px-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-muted">
                          {attempt.candidate.profilePhoto ? (
                            <Image
                              src={attempt.candidate.profilePhoto}
                              alt={attempt.candidate.name || "Candidate"}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </td>

                      {/* Candidate Name */}
                      <td className="px-4 py-4">
                        <p className="font-medium">{attempt.candidate.name}</p>

                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {attempt.candidate.email}
                        </p>
                      </td>

                      {/* Assessment */}
                      <td className="px-4 py-4">
                        <span className="font-medium">
                          {attempt.assessment.title}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {attempt.status}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-4 py-4">
                        {attempt.score !== null &&
                        attempt.score !== undefined ? (
                          <span className="font-semibold">{attempt.score}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <Link
                          href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
                          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          Evaluate
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {attempts.map((attempt, index) => (
              <div
                key={attempt.id}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                {/* SI No. */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-muted px-2 text-sm font-semibold">
                    {index + 1}
                  </span>
                </div>

                {/* Candidate Profile Image + Details */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
                    {attempt.candidate.profilePhoto ? (
                      <Image
                        src={attempt.candidate.profilePhoto}
                        alt={attempt.candidate.name || "Candidate"}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold">
                      {attempt.candidate.name}
                    </p>

                    <p className="mt-1 break-all text-sm text-muted-foreground">
                      {attempt.candidate.email}
                    </p>
                  </div>
                </div>

                {/* Assessment */}
                <div className="mb-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Assessment
                  </p>

                  <p className="font-medium">{attempt.assessment.title}</p>
                </div>

                {/* Status + Score */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Status
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {attempt.status}
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Score
                    </p>

                    {attempt.score !== null && attempt.score !== undefined ? (
                      <p className="font-semibold">{attempt.score}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Pending</p>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Link
                  href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
                  className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Evaluate
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
