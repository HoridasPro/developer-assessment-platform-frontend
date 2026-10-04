"use client";

import Link from "next/link";
import { Eye, Plus } from "lucide-react";
import { useGetAssessments } from "@/hooks";

export default function AssessmentsPage() {
  const { data, isLoading, isError } = useGetAssessments();

  console.log("get assessment", data);

  // Data টিকে Safe Array-তে কনভার্ট করা
  const assessmentsList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : [];

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading assessments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-destructive">Failed to load assessments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-sm text-muted-foreground">
            Manage your assessments and questions.
          </p>
        </div>

        <Link
          href="/dashboard/company/addAssessment"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Create Assessment
        </Link>
      </div>

      {/* Empty State */}
      {assessmentsList.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="font-medium">No assessments found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first assessment to get started.
          </p>

          <Link
            href="/dashboard/company/addAssessment"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            Create Assessment
          </Link>
        </div>
      ) : (
        /* Assessment List */
        <div className="rounded-lg border">
          <div className="divide-y">
            {assessmentsList.map((assessment: any) => (
              <div
                key={assessment.id || assessment._id}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium">{assessment.title}</h2>

                  {assessment.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {assessment.description}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    {assessment.status && (
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        {assessment.status}
                      </span>
                    )}

                    {assessment.duration && (
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        {assessment.duration} min
                      </span>
                    )}

                    {assessment.passingScore !== undefined && (
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        Passing: {assessment.passingScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Questions Button */}
                <Link
                  href={`/dashboard/company/assessments/${assessment.id || assessment._id}/questions`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Eye className="h-4 w-4" />
                  Questions
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
