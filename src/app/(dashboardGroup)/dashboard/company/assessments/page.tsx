"use client";

import Link from "next/link";
import {
  Eye,
  Plus,
  Clock,
  Award,
  FileText,
  Trash2,
  Loader2,
} from "lucide-react";
import { useGetAssessments, useSoftDeleteAssessment } from "@/hooks";

export default function AssessmentsPage() {
  const { data, isLoading, isError, refetch } = useGetAssessments();

  const { mutate: softDeleteAssessmentMutation, isPending: isDeleting } =
    useSoftDeleteAssessment();

  console.log("get assessment", data);

  // Data টিকে Safe Array-তে কনভার্ট করা
  const assessmentsList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : [];

  const handleSoftDelete = (assessmentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to archive this assessment?",
    );

    if (!confirmed) return;

    softDeleteAssessmentMutation(assessmentId, {
      onSuccess: () => {
        alert("Assessment archived successfully.");
        refetch();
      },
      onError: (error: any) => {
        console.error("Soft delete assessment error:", error);

        alert(
          error?.message || "Failed to archive assessment. Please try again.",
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading assessments...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load assessments. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
          <p className="text-sm text-muted-foreground">
            Manage your assessments and questions.
          </p>
        </div>

        <Link
          href="/dashboard/company/addAssessment"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Plus className="h-4 w-4" />
          Create Assessment
        </Link>
      </div>

      {/* Empty State */}
      {assessmentsList.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">No assessments found</h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first assessment to get started and manage your
            questions.
          </p>

          <Link
            href="/dashboard/company/addAssessment"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Create Assessment
          </Link>
        </div>
      ) : (
        /* Responsive Table Container */
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

                  <th className="h-11 px-4 text-left align-middle font-middle font-medium whitespace-nowrap">
                    Passing Score
                  </th>

                  <th className="h-11 px-4 text-right align-middle font-medium whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {assessmentsList.map((assessment: any) => {
                  const id = assessment.id || assessment._id;

                  return (
                    <tr
                      key={id}
                      className="transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted"
                    >
                      {/* Title & Description */}
                      <td className="p-4 align-middle min-w-[220px]">
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
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                              String(assessment.status).toUpperCase() ===
                              "DRAFT"
                                ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20"
                                : String(assessment.status).toUpperCase() ===
                                    "PUBLISHED"
                                  ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                                  : String(assessment.status).toUpperCase() ===
                                      "ARCHIVED"
                                    ? "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20"
                                    : String(
                                          assessment.status,
                                        ).toUpperCase() === "COMPLETED"
                                      ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20"
                                      : String(
                                            assessment.status,
                                          ).toUpperCase() === "IN_PROGRESS"
                                        ? "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20"
                                        : String(
                                              assessment.status,
                                            ).toUpperCase() === "CANCELLED"
                                          ? "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
                                          : "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20"
                            }`}
                          >
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
                          {/* Questions */}
                          <Link
                            href={`/dashboard/company/assessments/${id}/questions`}
                            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Questions</span>
                          </Link>

                          {/* Soft Delete */}
                          <button
                            type="button"
                            onClick={() => handleSoftDelete(id)}
                            disabled={isDeleting}
                            title="Archive assessment"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-500/20 text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
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
