/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import Link from "next/link";
import { Eye, FileText, Clock, Award, RotateCcw } from "lucide-react";
import { useGetArchivedAssessments } from "@/hooks";

export default function ArchivedAssessmentsPage() {
  const { data, isLoading, isError } = useGetArchivedAssessments();

  console.log("Archived API response:", data);

  const archivedAssessments = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : [];

  console.log("Archived assessments:", archivedAssessments);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading archived assessments...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load archived assessments. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Archived Assessments
        </h1>

        <p className="text-sm text-muted-foreground">
          View assessments that have been soft deleted.
        </p>
      </div>

      {/* Empty */}
      {archivedAssessments.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No archived assessments
          </h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Soft deleted assessments will appear here.
          </p>

          <Link
            href="/dashboard/company/assessments"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
          >
            Back to Assessments
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
                {archivedAssessments.map((assessment: any) => {
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
                      <td className="p-4 align-middle whitespace-nowrap">
                        {assessment.status ? (
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            {assessment.status}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
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
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/company/assessments/${id}/questions`}
                            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Questions</span>
                          </Link>
                        </div>
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
