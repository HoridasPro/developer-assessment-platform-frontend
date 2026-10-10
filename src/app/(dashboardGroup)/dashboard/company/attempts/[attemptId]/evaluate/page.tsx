/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import {
  useEvaluateAnswers,
  useGetAttemptDetails,
  useSubmitEvaluate,
} from "@/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EvaluateAttemptPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  const {
    data: attemptResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAttemptDetails(attemptId);

  const evaluateMutation = useEvaluateAnswers();

  const submitEvaluateMutation = useSubmitEvaluate();

  const [marks, setMarks] = useState<Record<string, string>>({});

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 size-9 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm font-medium text-foreground">
            Loading attempt...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please wait while the attempt details are loading.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <p className="font-semibold text-red-600 dark:text-red-400">
            Failed to load attempt.
          </p>

          <p className="mt-2 text-sm text-red-500/80 dark:text-red-400/80">
            Please try again or go back to the attempts page.
          </p>
        </div>
      </div>
    );
  }

  const attempt = attemptResponse?.data || attemptResponse?.data;

  if (!attempt) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <p className="font-semibold">Attempt not found.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The requested assessment attempt could not be found.
          </p>
        </div>
      </div>
    );
  }

  const handleMarksChange = (questionId: string, value: string) => {
    setMarks((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitEvaluation = () => {
    const answersPayload = attempt.answers
      .filter(
        (answer: any) =>
          answer.question?.type === "WRITTEN" ||
          answer.question?.type === "CODING",
      )
      .map((answer: any) => ({
        questionId: answer.questionId,

        marks: Number(marks[answer.questionId] ?? 0),

        type: answer.question.type as "WRITTEN" | "CODING",
      }));

    const invalidMarks = answersPayload.find((answer: any) => {
      const question = attempt.answers.find(
        (item: any) => item.questionId === answer.questionId,
      )?.question;

      if (!question) {
        return true;
      }

      return answer.marks < 0 || answer.marks > question.marks;
    });

    if (invalidMarks) {
      alert("Marks cannot be negative or greater than the maximum marks.");

      return;
    }

    evaluateMutation.mutate(
      {
        attemptId,

        payload: {
          answers: answersPayload,
        },
      },

      {
        onSuccess: (evaluationResponse) => {
          submitEvaluateMutation.mutate(
            {
              attemptId,

              payload: {
                answers: answersPayload,
              },
            },

            {
              onSuccess: async () => {
                const refreshed = await refetch();

                console.log("Refetched Data:", refreshed.data);

                console.log("Refetched Status:", refreshed.data?.data?.status);

                alert("Evaluation submitted successfully!");

                router.push("/dashboard/company/attempts");

                router.refresh();
              },

              onError: (error) => {
                console.error(error);

                alert(
                  error instanceof Error
                    ? error.message
                    : "Final evaluation failed.",
                );
              },
            },
          );
        },

        onError: (error) => {
          console.error(error);

          alert(error instanceof Error ? error.message : "Evaluation failed.");
        },
      },
    );
  };

  // =========================================
  // UI
  // =========================================
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">
      {/* =====================================
          Candidate Information
      ====================================== */}
      <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="border-b bg-muted/20 px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                Evaluate Assessment
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Review the candidate&apos;s answers and assign marks.
              </p>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                attempt.status?.toUpperCase() === "COMPLETED"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : attempt.status?.toUpperCase() === "CANCELLED"
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                    : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400"
              }`}
            >
              {attempt.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Candidate
            </p>
            <p className="mt-1 truncate text-sm font-semibold sm:text-base">
              {attempt.candidate?.name ?? "N/A"}
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </p>
            <p className="mt-1 break-all text-sm font-medium sm:text-base">
              {attempt.candidate?.email ?? "N/A"}
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Assessment
            </p>
            <p className="mt-1 text-sm font-semibold sm:text-base">
              {attempt.assessment?.title ?? "N/A"}
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Attempt
            </p>
            <p className="mt-1 text-sm font-semibold sm:text-base">
              #{attempt.attemptNumber}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          Questions
      ====================================== */}
      <div className="space-y-5">
        {attempt.answers?.map((answer: any, index: number) => {
          const question = answer.question;

          if (!question) {
            return null;
          }

          return (
            <section
              key={answer.id ?? index}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
            >
              {/* Question Header */}
              <div className="border-b border-border/60 bg-muted/10 p-4 sm:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        Question {index + 1}
                      </span>

                      <h2 className="mt-3 text-base font-semibold leading-6 sm:text-lg">
                        {question.title}
                      </h2>

                      {question.description && (
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {question.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-center dark:border-violet-900/40 dark:bg-violet-950/20">
                      <p className="text-xs text-violet-600 dark:text-violet-400">
                        Maximum
                      </p>
                      <p className="text-lg font-bold text-violet-700 dark:text-violet-300">
                        {question.marks}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-400">
                      {question.type}
                    </span>

                    <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900/40 dark:bg-violet-950/30 dark:text-violet-400">
                      {question.category}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        question.difficulty === "EASY"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : question.difficulty === "MEDIUM"
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-400"
                            : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* =================================
                      MCQ
                  ================================== */}
                {question.type === "MCQ" && (
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">Candidate Answer</p>

                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        Auto Evaluated
                      </span>
                    </div>

                    <div className="mt-3 rounded-xl border border-border/60 bg-background p-4">
                      <p className="text-sm leading-6">
                        {answer.selectedOption?.text ?? "No answer submitted"}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        Correct Answer
                      </p>

                      <p className="mt-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        {question.options?.find(
                          (option: any) => option.isCorrect,
                        )?.text ?? "Not available"}
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      ✓ MCQ is automatically evaluated.
                    </p>
                  </div>
                )}

                {/* =================================
                      WRITTEN
                  ================================== */}
                {question.type === "WRITTEN" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold">Candidate Answer</p>

                      <div className="mt-2 min-h-32 whitespace-pre-wrap rounded-xl border border-border/60 bg-muted/20 p-4 text-sm leading-6 sm:p-5">
                        {answer.writtenAnswer ?? "No answer submitted"}
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 sm:p-5">
                      <label
                        htmlFor={`marks-${answer.questionId}`}
                        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
                      >
                        Give Marks
                      </label>

                      <div className="mt-2">
                        <input
                          id={`marks-${answer.questionId}`}
                          type="number"
                          min={0}
                          max={question.marks}
                          value={marks[answer.questionId] ?? ""}
                          onChange={(event) =>
                            handleMarksChange(
                              answer.questionId,
                              event.target.value,
                            )
                          }
                          placeholder={`0 - ${question.marks}`}
                          className="h-11 w-full rounded-xl border border-blue-200 bg-background px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-blue-900/50"
                        />
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Maximum: {question.marks} marks
                      </p>
                    </div>
                  </div>
                )}

                {/* =================================
                      CODING
                  ================================== */}
                {question.type === "CODING" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold">Candidate Code</p>

                      <pre className="mt-2 max-h-[500px] overflow-auto rounded-xl border border-border/60 bg-slate-950 p-4 text-sm leading-6 text-slate-100 sm:p-5">
                        <code>{answer.codeAnswer ?? "No code submitted"}</code>
                      </pre>
                    </div>

                    <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900/40 dark:bg-violet-950/20 sm:p-5">
                      <label
                        htmlFor={`marks-${answer.questionId}`}
                        className="text-sm font-semibold text-violet-800 dark:text-violet-300"
                      >
                        Give Marks
                      </label>

                      <div className="mt-2">
                        <input
                          id={`marks-${answer.questionId}`}
                          type="number"
                          min={0}
                          max={question.marks}
                          value={marks[answer.questionId] ?? ""}
                          onChange={(event) =>
                            handleMarksChange(
                              answer.questionId,
                              event.target.value,
                            )
                          }
                          placeholder={`0 - ${question.marks}`}
                          className="h-11 w-full rounded-xl border border-violet-200 bg-background px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-violet-900/50"
                        />
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Maximum: {question.marks} marks
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* =====================================
          Submit Evaluation
      ====================================== */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-border/60 bg-background/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSubmitEvaluation}
            disabled={
              evaluateMutation.isPending ||
              submitEvaluateMutation.isPending ||
              attempt.status?.toUpperCase() === "COMPLETED" ||
              attempt.status?.toUpperCase() === "CANCELLED"
            }
            className="h-11 w-full rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {evaluateMutation.isPending || submitEvaluateMutation.isPending
              ? "Submitting..."
              : attempt.status?.toUpperCase() === "COMPLETED"
                ? "Already Evaluated"
                : attempt.status?.toUpperCase() === "CANCELLED"
                  ? "Attempt Cancelled"
                  : "Submit Evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}
