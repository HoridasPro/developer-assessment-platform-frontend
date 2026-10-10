                                 
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Plus,
  CheckCircle2,
  Eye,
  UserPlus,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
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
      <div className="flex min-h-[300px] items-center justify-center p-4 sm:p-6">
        <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <span className="text-sm font-medium text-muted-foreground">
            Loading questions...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/40">
              <HelpCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                Assessment Questions
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage questions added to this assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          {/* Add Questions */}
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Questions
          </Link>

          {/* Assign Candidate */}
          {questionsList.length > 0 && (
            <Link
              href={`/dashboard/company/assessments/${assessmentId}/assignCandidate`}
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-muted hover:text-accent-foreground sm:w-auto"
            >
              <UserPlus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Assign Candidate
            </Link>
          )}
        </div>
      </div>

      {/* ================= QUESTIONS ================= */}
      {questionsList.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center shadow-sm sm:p-8">
          {/* Empty Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/40">
            <HelpCircle className="h-7 w-7 text-violet-600 dark:text-violet-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">No questions added yet</h2>

          <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
            Add questions from your Problem Bank to evaluate your candidates.
          </p>
        </div>
      ) : (
        <>
          {/* ================================================= */}
          {/* DESKTOP / TABLET */}
          {/* ================================================= */}
          <div className="hidden overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm md:block">
            <div className="relative w-full overflow-x-auto">
              <table className="w-full min-w-[950px] caption-bottom text-sm">
                {/* Table Header */}
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="h-12 min-w-[380px] px-5 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Question & Details
                    </th>

                    <th className="h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Type
                    </th>

                    <th className="h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Difficulty
                    </th>

                    <th className="h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Marks
                    </th>

                    <th className="h-12 px-5 text-right align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y">
                  {questionsList.map((item: any, index: number) => {
                    const question = item.question || item;

                    const qId = item.id || question.id || question._id;

                    const options =
                      item.questionOptions ||
                      item.options ||
                      question.questionOptions ||
                      question.options ||
                      [];

                    const isMCQ =
                      String(question.type || "").toUpperCase() === "MCQ";

                    return (
                      <tr
                        key={qId}
                        className="transition-colors hover:bg-muted/30"
                      >
                        {/* Question */}
                        <td className="p-5 align-top">
                          <div className="max-w-[600px] space-y-3">
                            {/* Question Number + Title */}
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                                {item.order ?? index + 1}
                              </div>

                              <h3 className="pt-1 text-sm font-semibold leading-6 text-foreground">
                                {question.title}
                              </h3>
                            </div>

                            {/* Description */}
                            {question.description && (
                              <p className="ml-11 text-xs leading-5 text-muted-foreground">
                                {question.description}
                              </p>
                            )}

                            {/* ================= MCQ OPTIONS ================= */}
                            {isMCQ && (
                              <div className="ml-11 mt-4">
                                {options.length > 0 ? (
                                  <div className="space-y-2">
                                    {options.map((opt: any, optIdx: number) => (
                                      <div
                                        key={
                                          opt.id || `${qId}-option-${optIdx}`
                                        }
                                        className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${
                                          opt.isCorrect
                                            ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20"
                                            : "border-border bg-background hover:border-violet-200 hover:bg-violet-50/40 dark:hover:border-violet-900 dark:hover:bg-violet-950/20"
                                        }`}
                                      >
                                        {/* Option Letter */}
                                        <span
                                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                            opt.isCorrect
                                              ? "bg-emerald-500 text-white"
                                              : "bg-muted text-muted-foreground group-hover:bg-violet-100 group-hover:text-violet-700 dark:group-hover:bg-violet-950/40 dark:group-hover:text-violet-400"
                                          }`}
                                        >
                                          {String.fromCharCode(65 + optIdx)}
                                        </span>

                                        {/* Option Text */}
                                        <span
                                          className={`min-w-0 flex-1 text-xs leading-5 ${
                                            opt.isCorrect
                                              ? "font-semibold text-emerald-700 dark:text-emerald-400"
                                              : "text-foreground"
                                          }`}
                                        >
                                          {opt.text || opt.optionText}
                                        </span>

                                        {/* Correct Label */}
                                        {opt.isCorrect && (
                                          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Correct
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />

                                    <span>
                                      No options available for this MCQ.
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Type */}
                        <td className="p-4 align-top">
                          {question.type ? (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                              {question.type}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>

                        {/* Difficulty */}
                        <td className="p-4 align-top">
                          {question.difficulty ? (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                                String(question.difficulty).toUpperCase() ===
                                "EASY"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : String(
                                        question.difficulty,
                                      ).toUpperCase() === "MEDIUM"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                    : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                              }`}
                            >
                              {question.difficulty}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>

                        {/* Marks */}
                        <td className="p-4 align-top">
                          <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                            {item.marks ?? question.marks ?? 0} marks
                          </span>
                        </td>

                        {/* Action */}
                        <td className="p-4 align-top text-right">
                          <Link
                            href={`/dashboard/company/assessments/${assessmentId}/questions/${qId}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                          >
                            <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                            <span>View Details</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================================================= */}
          {/* MOBILE */}
          {/* ================================================= */}
          <div className="space-y-4 md:hidden">
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
                  className="overflow-hidden rounded-xl border bg-card shadow-sm"
                >
                  {/* Card Header */}
                  <div className="border-b bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                        {item.order ?? index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {question.type && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                              {question.type}
                            </span>
                          )}

                          {question.difficulty && (
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold capitalize ${
                                String(question.difficulty).toUpperCase() ===
                                "EASY"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : String(
                                        question.difficulty,
                                      ).toUpperCase() === "MEDIUM"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                    : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                              }`}
                            >
                              {question.difficulty}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold leading-6">
                          {question.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-4 p-4">
                    {/* Description */}
                    {question.description && (
                      <div>
                        <p className="mb-1.5 text-xs font-semibold text-muted-foreground">
                          Description
                        </p>

                        <p className="text-sm leading-6 text-muted-foreground">
                          {question.description}
                        </p>
                      </div>
                    )}

                    {/* Marks */}
                    <div className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Marks
                      </span>

                      <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                        {item.marks ?? question.marks ?? 0} marks
                      </span>
                    </div>

                    {/* ================= MCQ OPTIONS ================= */}
                    {isMCQ && (
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-semibold text-muted-foreground">
                            Answer Options
                          </p>

                          {options.length > 0 && (
                            <span className="text-[10px] text-muted-foreground">
                              {options.length} options
                            </span>
                          )}
                        </div>

                        {options.length > 0 ? (
                          <div className="space-y-2">
                            {options.map((opt: any, optIdx: number) => (
                              <div
                                key={opt.id || `${qId}-mobile-option-${optIdx}`}
                                className={`flex items-center gap-3 rounded-xl border p-3 ${
                                  opt.isCorrect
                                    ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20"
                                    : "bg-background"
                                }`}
                              >
                                {/* Letter */}
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                    opt.isCorrect
                                      ? "bg-emerald-500 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>

                                {/* Text */}
                                <span
                                  className={`min-w-0 flex-1 break-words text-xs leading-5 ${
                                    opt.isCorrect
                                      ? "font-semibold text-emerald-700 dark:text-emerald-400"
                                      : "text-foreground"
                                  }`}
                                >
                                  {opt.text || opt.optionText}
                                </span>

                                {/* Correct */}
                                {opt.isCorrect && (
                                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
                            <AlertTriangle className="h-4 w-4 shrink-0" />

                            <span>No options available for this MCQ.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* View Details */}
                    <div className="border-t pt-4">
                      <Link
                        href={`/dashboard/company/assessments/${assessmentId}/questions/${qId}`}
                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                      >
                        <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
