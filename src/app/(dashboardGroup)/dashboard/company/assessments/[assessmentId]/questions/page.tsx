 
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, CheckCircle2, Eye } from "lucide-react";
import { useGetAssessmentQuestions } from "@/hooks";

export default function AssessmentQuestionsPage() {
  const params = useParams();
  const assessmentId = params.assessmentId as string;

  const { data, isLoading } = useGetAssessmentQuestions(assessmentId);

  console.log("get data", data);

  // Safe Array Extraction
  const questionsList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : Array.isArray((data as any)?.questions)
        ? (data as any).questions
        : [];

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

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

        <div className="flex items-center gap-3">
          {/* Add Questions */}
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Questions
          </Link>
        </div>
      </div>

      {/* Questions List */}
      <div className="rounded-lg border bg-card">
        {questionsList.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="font-medium">No questions added yet</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add questions from your Problem Bank.
            </p>

            <Link
              href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
              className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Add Question
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {questionsList.map((item: any, index: number) => {
              const question = item.question || item;

              const qId = item.id || question.id || question._id;

              const options =
                item.questionOptions ||
                item.options ||
                question.questionOptions ||
                question.options ||
                [];

              const isMCQ = String(question.type || "").toUpperCase() === "MCQ";

              return (
                <div
                  key={qId}
                  className="flex items-start justify-between gap-4 p-4 transition-colors hover:bg-muted/40"
                >
                  {/* Question Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-muted-foreground">
                        #{item.order ?? index + 1}
                      </span>

                      <h3 className="text-base font-medium">
                        {question.title}
                      </h3>
                    </div>

                    {question.description && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {question.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                      {question.type && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                          {question.type}
                        </span>
                      )}

                      {question.difficulty && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                          {question.difficulty}
                        </span>
                      )}

                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.marks ?? question.marks ?? 0} marks
                      </span>
                    </div>

                    {/* MCQ Options */}
                    {isMCQ && (
                      <div className="mt-3 pt-2">
                        {options.length > 0 ? (
                          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            {options.map((opt: any, optIdx: number) => (
                              <div
                                key={opt.id || optIdx}
                                className={`flex items-center justify-between rounded-md border p-2.5 text-sm ${
                                  opt.isCorrect
                                    ? "border-green-500/50 bg-green-500/10 font-medium text-green-700 dark:text-green-400"
                                    : "bg-background"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold opacity-70">
                                    {String.fromCharCode(65 + optIdx)}.
                                  </span>

                                  <span>{opt.text || opt.optionText}</span>
                                </div>

                                {opt.isCorrect && (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs italic text-amber-600">
                            No options available for this MCQ.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Question Details Button (Right Side) */}
                  <div className="flex shrink-0 items-center self-center pl-2">
                    <Link
                      href={`/dashboard/company/assessments/${assessmentId}/questions/${qId}`}
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
