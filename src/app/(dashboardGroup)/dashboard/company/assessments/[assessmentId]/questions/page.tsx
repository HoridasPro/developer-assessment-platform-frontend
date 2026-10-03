"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";

export default function AssessmentQuestionsPage() {
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessment Questions</h1>

          <p className="text-sm text-muted-foreground">
            Manage questions added to this assessment.
          </p>
        </div>

        <Link
          href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Questions
        </Link>
      </div>

      {/* Empty state for now */}
      <div className="rounded-lg border">
        <div className="p-10 text-center">
          <h2 className="font-medium">No questions added yet</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add questions from your Problem Bank.
          </p>

          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
            className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Add Questionsdfgdfgf
          </Link>
        </div>
      </div>
    </div>
  );
}
