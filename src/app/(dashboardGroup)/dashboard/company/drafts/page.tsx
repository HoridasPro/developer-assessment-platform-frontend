/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import Link from "next/link";
import { Eye, FileText, Clock, Award } from "lucide-react";
import { useGetAssessments } from "@/hooks";

export default function DraftAssessmentsPage() {
  const { data, isLoading, isError } = useGetAssessments();

  const assessments = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : [];

  // শুধু DRAFT assessments
  const draftAssessments = assessments.filter(
    (assessment: any) =>
      String(assessment.status).toUpperCase() === "DRAFT" &&
      assessment.isDeleted !== true,
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading draft assessments...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load draft assessments. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Draft Assessments</h1>

        <p className="text-sm text-muted-foreground">
          View all assessments that are still in draft status.
        </p>
      </div>

      {/* Empty */}
      {draftAssessments.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">No draft assessments</h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Assessments with draft status will appear here.
          </p>

          <Link
            href="/dashboard/company/assessments/create"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
          >
            Create Assessment
          </Link>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="h-11 px-4 text-left align-middle font-medium">
                    Title & Description
                  </th>

                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Status
                  </th>

                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Duration
                  </th>

                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Passing Score
                  </th>

                  <th className="h-11 px-4 text-right align-middle font-medium whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {draftAssessments.map((assessment: any) => {
                  const id = assessment.id || assessment._id;

                  return (
                    <tr
                      key={id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      {/* Title */}
                      <td className="min-w-[220px] p-4 align-middle">
                        <div className="font-semibold text-foreground">
                          {assessment.title}
                        </div>

                        {assessment.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {assessment.description}
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-6 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20">
                          {assessment.status}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="p-4 align-middle whitespace-nowrap">
                        {assessment.duration ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />

                            <span className="text-foreground">
                              {assessment.duration} min
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Passing Score */}
                      <td className="p-4 align-middle whitespace-nowrap">
                        {assessment.passingScore !== undefined ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Award className="h-3.5 w-3.5" />

                            <span className="text-foreground">
                              {assessment.passingScore}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-4 align-middle text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/company/assessments/${id}/questions`}
                          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Questions</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
