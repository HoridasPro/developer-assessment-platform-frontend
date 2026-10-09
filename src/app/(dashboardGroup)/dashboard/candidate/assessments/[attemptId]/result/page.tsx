"use client";

import { useGetAttemptResult } from "@/hooks";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Target,
  Trophy,
  User,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CandidateAttemptResultPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  const {
    data: resultResponse,
    isLoading,
    isError,
  } = useGetAttemptResult(attemptId);

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-muted border-t-primary" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-foreground">
            Loading result
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please wait while we prepare your assessment result.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[500px] bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50/70 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-red-700 dark:text-red-400">
            Failed to load result
          </h2>

          <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80">
            Unable to fetch your assessment result. Please try again later.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /*
   * API response normally:
   *
   * {
   *   success: true,
   *   message: "...",
   *   data: {...}
   * }
   */

  const result = resultResponse?.data?.data || resultResponse?.data;

  if (!result) {
    return (
      <div className="min-h-[500px] bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-foreground">
            Result not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No result was found for this assessment attempt.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard/candidate/assessments")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Attempts
          </button>
        </div>
      </div>
    );
  }

  const assessment = result.assessment;
  const candidate = result.candidate;

  const score = Number(result.score ?? 0);

  const passingScore = Number(assessment?.passingScore ?? 0);

  const totalMarks =
    result.answers?.reduce(
      (total: number, answer: any) =>
        total + Number(answer.question?.marks ?? 0),
      0,
    ) ?? 0;

  const passed = result.passed ?? score >= passingScore;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Trophy className="h-6 w-6 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Assessment Result
              </p>

              <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {assessment?.title ?? "Assessment Result"}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Your assessment result is ready.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard/candidate/allMyResults")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted sm:w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assessments
          </button>
        </div>

        {/* =====================================================
            HERO RESULT
        ====================================================== */}
        <div
          className={`relative overflow-hidden rounded-3xl border p-6 shadow-sm sm:p-8 ${
            passed
              ? "border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-950/20"
              : "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20"
          }`}
        >
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Result */}
            <div className="flex items-center gap-5">
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl ${
                  passed
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {passed ? (
                  <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Final Result
                </p>

                <h2
                  className={`mt-1 text-3xl font-black sm:text-4xl ${
                    passed
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passed ? "PASSED" : "FAILED"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {passed
                    ? "Congratulations! You successfully passed this assessment."
                    : "You did not reach the required passing score."}
                </p>
              </div>
            </div>

            {/* Score */}
            <div className="rounded-2xl border border-border bg-background/80 p-5 text-center backdrop-blur-sm lg:min-w-[220px]">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Score
              </p>

              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-foreground sm:text-5xl">
                  {score}
                </span>

                <span className="text-lg font-medium text-muted-foreground">
                  / {totalMarks}
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">total marks</p>
            </div>
          </div>
        </div>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Score */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Your Score
                </p>

                <p className="mt-2 text-3xl font-bold text-foreground">
                  {score}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  out of {totalMarks} marks
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Passing */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Passing Score
                </p>

                <p className="mt-2 text-3xl font-bold text-foreground">
                  {passingScore}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  minimum required
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
                <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Result Status
                </p>

                <p
                  className={`mt-2 text-2xl font-bold ${
                    passed
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passed ? "PASSED" : "FAILED"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {result.status ?? "N/A"}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  passed ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                {passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            ASSESSMENT INFORMATION
        ====================================================== */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">
                Assessment Information
              </h2>

              <p className="text-xs text-muted-foreground">
                Details about your assessment attempt
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="Assessment" value={assessment?.title ?? "N/A"} />

            <InfoItem
              label="Attempt Number"
              value={result.attemptNumber ?? "N/A"}
            />

            <InfoItem label="Status" value={result.status ?? "N/A"} />

            <InfoItem
              label="Duration"
              value={
                assessment?.duration ? `${assessment.duration} minutes` : "N/A"
              }
            />

            <InfoItem
              label="Started At"
              value={
                result.startedAt
                  ? new Date(result.startedAt).toLocaleString()
                  : "N/A"
              }
            />

            <InfoItem
              label="Submitted At"
              value={
                result.submittedAt
                  ? new Date(result.submittedAt).toLocaleString()
                  : "N/A"
              }
            />
          </div>
        </div>

        {/* =====================================================
            CANDIDATE INFORMATION
        ====================================================== */}
        {candidate && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Candidate Information
                </h2>

                <p className="text-xs text-muted-foreground">
                  Candidate details for this attempt
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />

                  <span className="text-xs font-medium">Name</span>
                </div>

                <p className="mt-2 font-semibold text-foreground">
                  {candidate.name ?? "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />

                  <span className="text-xs font-medium">Email</span>
                </div>

                <p className="mt-2 break-all font-semibold text-foreground">
                  {candidate.email ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            QUESTION-WISE RESULT
        ====================================================== */}
        {result.answers?.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Question-wise Result
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Review your answers and obtained marks
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
                {result.answers.length} Questions
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {result.answers.map((answer: any, index: number) => {
                const question = answer.question;

                const maxMarks = Number(question?.marks ?? 0);

                const obtainedMarks = Number(
                  answer.obtainedMarks ?? answer.marks ?? 0,
                );

                const questionPassed =
                  obtainedMarks >= maxMarks && maxMarks > 0;

                return (
                  <div
                    key={answer.id ?? answer.questionId ?? index}
                    className="overflow-hidden rounded-2xl border border-border bg-background"
                  >
                    {/* Question Header */}
                    <div className="flex flex-col gap-4 border-b border-border bg-muted/20 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">
                            Question {index + 1}
                          </p>

                          <h3 className="mt-1 font-semibold leading-6 text-foreground">
                            {question?.title ?? "Question"}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 ${
                          questionPassed ? "bg-green-500/10" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`text-lg font-bold ${
                            questionPassed
                              ? "text-green-600 dark:text-green-400"
                              : "text-foreground"
                          }`}
                        >
                          {obtainedMarks}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          / {maxMarks}
                        </span>
                      </div>
                    </div>

                    {/* Question Meta */}
                    <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-3 sm:p-5">
                      <div className="rounded-xl bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">Type</p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {question?.type ?? "N/A"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">
                          Maximum Marks
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {maxMarks}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">
                          Obtained Marks
                        </p>

                        <p
                          className={`mt-1 text-sm font-semibold ${
                            questionPassed
                              ? "text-green-600 dark:text-green-400"
                              : "text-foreground"
                          }`}
                        >
                          {obtainedMarks}
                        </p>
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="p-4 sm:p-5">
                      {/* MCQ */}
                      {question?.type === "MCQ" && (
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />

                            <p className="text-sm font-semibold text-foreground">
                              Your Answer
                            </p>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-foreground">
                            {answer.selectedOption?.text ?? "No answer"}
                          </p>
                        </div>
                      )}

                      {/* Written */}
                      {question?.type === "WRITTEN" && (
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />

                            <p className="text-sm font-semibold text-foreground">
                              Your Answer
                            </p>
                          </div>

                          <div className="mt-3 rounded-lg border border-border bg-background p-4">
                            <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                              {answer.writtenAnswer ?? "No answer"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Coding */}
                      {question?.type === "CODING" && (
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />

                            <p className="text-sm font-semibold text-foreground">
                              Your Code
                            </p>
                          </div>

                          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-muted/40">
                            <pre className="max-h-[500px] overflow-auto p-4 text-sm leading-6 text-foreground">
                              <code>
                                {answer.codeAnswer ?? "No code submitted"}
                              </code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================
            FINAL RESULT
        ====================================================== */}
        <div
          className={`overflow-hidden rounded-3xl border p-6 text-center shadow-sm sm:p-10 ${
            passed
              ? "border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-950/20"
              : "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20"
          }`}
        >
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
              passed
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            {passed ? (
              <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            )}
          </div>

          <p className="mt-5 text-sm font-medium text-muted-foreground">
            Final Result
          </p>

          <h2
            className={`mt-2 text-3xl font-black sm:text-4xl ${
              passed
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {passed ? "Congratulations!" : "Better Luck Next Time"}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {passed
              ? "You have successfully passed this assessment. Keep up the great work!"
              : "You did not reach the required passing score. Keep learning and try again."}
          </p>

          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-2xl border border-border bg-background px-6 py-4">
            <Target className="h-5 w-5 text-primary" />

            <span className="text-sm text-muted-foreground">Score</span>

            <strong className="text-xl text-foreground">{score}</strong>

            <span className="text-sm text-muted-foreground">
              / {totalMarks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   Reusable Info Item
====================================================== */

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-2 break-words text-sm font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}
