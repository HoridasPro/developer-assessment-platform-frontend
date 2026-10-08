/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Check, CircleHelp, Code2, FileText } from "lucide-react";
import { useAddQuestionsToAssessment, useGetQuestions } from "@/hooks";

export default function AddAssessmentQuestionsPage() {
  const params = useParams();
  const router = useRouter();

  const assessmentId = params.assessmentId as string;

  const { data, isLoading } = useGetQuestions();

  // Safe Array Extraction
  const questionsList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : Array.isArray((data as any)?.questions)
        ? (data as any).questions
        : [];

  const addQuestionsMutation = useAddQuestionsToAssessment();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const toggleQuestion = (questionId: string) => {
    setSelectedQuestionIds((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      }

      return [...prev, questionId];
    });
  };

  const toggleAllQuestions = () => {
    if (selectedQuestionIds.length === questionsList.length) {
      setSelectedQuestionIds([]);
      return;
    }

    setSelectedQuestionIds(
      questionsList.map((question: any) => question.id || question._id),
    );
  };

  const handleAddQuestions = () => {
    if (selectedQuestionIds.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    const options = selectedQuestionIds.map((questionId, index) => {
      const targetQuestion = questionsList.find(
        (q: any) => (q.id || q._id) === questionId,
      );

      return {
        questionId,
        order: index + 1,
        marks: targetQuestion?.marks ?? 10,
      };
    });

    addQuestionsMutation.mutate(
      {
        assessmentId,
        options,
      },
      {
        onSuccess: () => {
          alert("Questions added successfully!");

          router.push(
            `/dashboard/company/assessments/${assessmentId}/questions`,
          );
        },

        onError: (error) => {
          console.error(error);
          alert("Failed to add questions.");
        },
      },
    );
  };

  // ==================================================
  // TYPE ICON
  // ==================================================

  const getTypeIcon = (type: string) => {
    const normalizedType = String(type).toUpperCase();

    if (normalizedType === "MCQ") {
      return <CircleHelp className="h-3.5 w-3.5" />;
    }

    if (normalizedType === "CODING") {
      return <Code2 className="h-3.5 w-3.5" />;
    }

    if (normalizedType === "WRITTEN") {
      return <FileText className="h-3.5 w-3.5" />;
    }

    return null;
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-5">
        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/dashboard/company/assessments/${assessmentId}/questions`,
            )
          }
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </button>

        {/* TITLE + BUTTON */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Add Assessment Questions
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Select questions from your Problem Bank.
            </p>
          </div>

          {/* ADD BUTTON */}

          <button
            type="button"
            onClick={handleAddQuestions}
            disabled={
              selectedQuestionIds.length === 0 || addQuestionsMutation.isPending
            }
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addQuestionsMutation.isPending
              ? "Adding..."
              : `Add Selected (${selectedQuestionIds.length})`}
          </button>
        </div>
      </div>

      {/* ==================================================
          QUESTION LIST
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {questionsList.length === 0 ? (
          <div className="p-10 text-center sm:p-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <CircleHelp className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-4 font-semibold text-foreground">
              No questions found
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create questions in Problem Bank first.
            </p>
          </div>
        ) : (
          <>
            {/* ==================================================
                DESKTOP / TABLET TABLE
            ================================================== */}

            <div className="hidden md:block">
              {/* TABLE HEADER */}

              <div className="grid grid-cols-[60px_60px_minmax(240px,1fr)_minmax(240px,1fr)_120px_140px_120px_90px] items-center gap-4 border-b border-border bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {/* SELECT ALL */}

                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={
                      questionsList.length > 0 &&
                      selectedQuestionIds.length === questionsList.length
                    }
                    ref={(input) => {
                      if (input) {
                        input.indeterminate =
                          selectedQuestionIds.length > 0 &&
                          selectedQuestionIds.length < questionsList.length;
                      }
                    }}
                    onChange={toggleAllQuestions}
                    className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
                    title="Select all"
                  />
                </div>

                {/* SI NO */}

                <div className="text-center">SI NO</div>

                {/* QUESTION */}

                <div>Question</div>

                {/* DESCRIPTION */}

                <div>Description</div>

                {/* TYPE */}

                <div>Type</div>

                {/* CATEGORY */}

                <div>Category</div>

                {/* DIFFICULTY */}

                <div>Difficulty</div>

                {/* MARKS */}

                <div className="text-right">Marks</div>
              </div>

              {/* TABLE ROWS */}

              <div className="divide-y divide-border">
                {questionsList.map((question: any, index: number) => {
                  const qId = question.id || question._id;

                  const isSelected = selectedQuestionIds.includes(qId);

                  return (
                    <label
                      key={qId}
                      className={`grid cursor-pointer grid-cols-[60px_60px_minmax(240px,1fr)_minmax(240px,1fr)_120px_140px_120px_90px] items-center gap-4 px-5 py-4 transition ${
                        isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                      }`}
                    >
                      {/* CHECKBOX */}

                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleQuestion(qId)}
                          className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
                        />
                      </div>

                      {/* SI NO */}

                      <div className="text-center text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </div>

                      {/* QUESTION */}

                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                          {question.title ||
                            question.questionText ||
                            question.question ||
                            "Untitled Question"}
                        </h3>
                      </div>

                      {/* DESCRIPTION */}

                      <div className="min-w-0">
                        {question.description ? (
                          <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">
                            {question.description}
                          </p>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </div>

                      {/* TYPE */}

                      <div>
                        {question.type && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
                            {getTypeIcon(question.type)}

                            {question.type}
                          </span>
                        )}
                      </div>

                      {/* CATEGORY */}

                      <div className="min-w-0">
                        {question.category ? (
                          <span className="block truncate text-sm text-muted-foreground">
                            {question.category}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </div>

                      {/* DIFFICULTY */}

                      <div>
                        {question.difficulty && (
                          <span
                            className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                              String(question.difficulty).toUpperCase() ===
                              "EASY"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : String(question.difficulty).toUpperCase() ===
                                    "MEDIUM"
                                  ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                  : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        )}
                      </div>

                      {/* MARKS */}

                      <div className="text-right">
                        <span className="text-sm font-semibold text-foreground">
                          {question.marks ?? 0}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ==================================================
                MOBILE CARD VIEW
            ================================================== */}

            <div className="divide-y divide-border md:hidden">
              {questionsList.map((question: any, index: number) => {
                const qId = question.id || question._id;

                const isSelected = selectedQuestionIds.includes(qId);

                return (
                  <label
                    key={qId}
                    className={`block cursor-pointer p-4 transition ${
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    }`}
                  >
                    {/* TOP */}

                    <div className="flex items-start gap-3">
                      {/* SI NO */}

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                        {index + 1}
                      </div>

                      {/* CHECKBOX */}

                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleQuestion(qId)}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
                      />

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-5 text-foreground">
                          {question.title ||
                            question.questionText ||
                            question.question ||
                            "Untitled Question"}
                        </h3>

                        {question.description && (
                          <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted-foreground">
                            {question.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* META */}

                    <div className="mt-4 flex flex-wrap items-center gap-2 pl-7">
                      {/* TYPE */}

                      {question.type && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
                          {getTypeIcon(question.type)}

                          {question.type}
                        </span>
                      )}

                      {/* CATEGORY */}

                      {question.category && (
                        <span className="rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                          {question.category}
                        </span>
                      )}

                      {/* DIFFICULTY */}

                      {question.difficulty && (
                        <span
                          className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                            String(question.difficulty).toUpperCase() === "EASY"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : String(question.difficulty).toUpperCase() ===
                                  "MEDIUM"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      )}

                      {/* MARKS */}

                      <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary">
                        {question.marks ?? 0}

                        <span className="font-normal">marks</span>
                      </span>
                    </div>

                    {/* SELECTED INDICATOR */}

                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1.5 pl-7 text-xs font-medium text-primary">
                        <Check className="h-3.5 w-3.5" />
                        Selected
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
