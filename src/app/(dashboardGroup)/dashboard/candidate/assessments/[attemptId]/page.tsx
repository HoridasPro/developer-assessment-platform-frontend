"use client";

import {
  useGetAttemptQuestions,
  useSubmitAnswer,
  useSubmitAssessment,
} from "@/hooks";
import type { TAttemptQuestion } from "@/types/attemptQuestion";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Send,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TAnswerState = {
  selectedAnswer: string | null;
  writtenAnswer: string;
  codeAnswer: string;
};

export default function AssessmentPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  // =========================
  // Get Questions
  // =========================
  const { data, isLoading, isError } = useGetAttemptQuestions(attemptId);

  // =========================
  // Mutations
  // =========================
  const submitAnswerMutation = useSubmitAnswer();
  const submitAssessmentMutation = useSubmitAssessment();

  // =========================
  // Question State
  // =========================
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // =========================
  // Answers State
  // =========================
  const [answers, setAnswers] = useState<Record<string, TAnswerState>>({});

  // =========================
  // Timer
  // =========================
  const [timeRemaining, setTimeRemaining] = useState(0);

  // =========================
  // Timer
  // =========================
  useEffect(() => {
    if (!data?.data?.expiresAt) return;

    const calculateRemainingTime = () => {
      const expiresAt = new Date(data.data.expiresAt).getTime();

      const now = Date.now();

      setTimeRemaining(Math.max(0, Math.floor((expiresAt - now) / 1000)));
    };

    calculateRemainingTime();

    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [data?.data?.expiresAt]);

  // =========================
  // Loading
  // =========================
  if (isLoading) {
    return (
      <div className="min-h-[500px] bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-24 rounded-2xl bg-muted" />
          <div className="h-[450px] rounded-2xl bg-muted" />
          <div className="h-28 rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-foreground">
            Failed to load assessment
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We could not load the questions for this assessment. Please try
            again later.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Data
  // =========================
  const assessment = data.data;

  const questions = assessment.questions;

  const question: TAttemptQuestion = questions[currentQuestion];

  const totalQuestions = questions.length;

  // =========================
  // Current Question Answer
  // =========================
  const currentAnswer: TAnswerState = answers[question.id] ?? {
    selectedAnswer: null,
    writtenAnswer: "",
    codeAnswer: "",
  };

  const selectedAnswer = currentAnswer.selectedAnswer;

  const writtenAnswer = currentAnswer.writtenAnswer;

  const codeAnswer = currentAnswer.codeAnswer;

  // =========================
  // Timer Format
  // =========================
  const minutes = Math.floor(timeRemaining / 60);

  const seconds = timeRemaining % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

  // =========================
  // Update Answer
  // =========================
  const updateAnswer = (value: Partial<TAnswerState>) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        ...(prev[question.id] ?? {
          selectedAnswer: null,
          writtenAnswer: "",
          codeAnswer: "",
        }),
        ...value,
      },
    }));
  };

  // =========================
  // Check Answer
  // =========================
  const hasAnswer =
    question.type === "MCQ"
      ? !!selectedAnswer
      : question.type === "WRITTEN"
        ? writtenAnswer.trim().length > 0
        : question.type === "CODING"
          ? codeAnswer.trim().length > 0
          : false;

  // =========================
  // Save Answer
  // =========================
  const saveCurrentAnswer = async () => {
    if (!hasAnswer) {
      return false;
    }

    // =========================
    // MCQ
    // =========================
    if (question.type === "MCQ") {
      if (!selectedAnswer) {
        return false;
      }

      await submitAnswerMutation.mutateAsync({
        attemptId,
        payload: {
          questionId: question.id,
          type: "MCQ",
          answer: {
            optionId: selectedAnswer,
          },
        },
      });

      return true;
    }

    // =========================
    // WRITTEN
    // =========================
    if (question.type === "WRITTEN") {
      if (!writtenAnswer.trim()) {
        return false;
      }

      await submitAnswerMutation.mutateAsync({
        attemptId,
        payload: {
          questionId: question.id,
          type: "WRITTEN",
          answer: {
            text: writtenAnswer,
          },
        },
      });

      return true;
    }

    // =========================
    // CODING
    // =========================
    if (question.type === "CODING") {
      if (!codeAnswer.trim()) {
        return false;
      }

      await submitAnswerMutation.mutateAsync({
        attemptId,
        payload: {
          questionId: question.id,
          type: "CODING",
          answer: {
            code: codeAnswer,
          },
        },
      });

      return true;
    }

    return false;
  };

  // =========================
  // Next Question
  // =========================
  const handleNext = async () => {
    if (!hasAnswer) {
      return;
    }

    try {
      const saved = await saveCurrentAnswer();

      if (!saved) {
        return;
      }

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to save answer:", error);
    }
  };

  // =========================
  // Previous Question
  // =========================
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // =========================
  // Submit Assessment
  // =========================
  const handleSubmitAssessment = async () => {
    if (!hasAnswer) {
      return;
    }

    try {
      // Save last answer first
      const saved = await saveCurrentAnswer();

      if (!saved) {
        return;
      }

      // Submit entire assessment
      await submitAssessmentMutation.mutateAsync(attemptId);

      // Result page
      router.push(`/dashboard/candidate/assessments/${attemptId}`);
    } catch (error) {
      console.error("Failed to submit assessment:", error);
    }
  };

  // =========================
  // Question Navigation
  // =========================
  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="min-h-screen p-3 text-foreground sm:p-5 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div className="mb-5 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Assessment Info */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Assessment
                </p>

                <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">
                  JavaScript Assessment
                </h1>

                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Attempt #{assessment.attemptNumber}
                </p>
              </div>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 sm:min-w-[190px] ${
                timeRemaining <= 60
                  ? "border-red-500/30 bg-red-500/10"
                  : "border-border bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    timeRemaining <= 60 ? "bg-red-500/10" : "bg-primary/10"
                  }`}
                >
                  <Clock3
                    className={`h-4 w-4 ${
                      timeRemaining <= 60 ? "text-red-500" : "text-primary"
                    }`}
                  />
                </div>

                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    Time Remaining
                  </p>

                  <p
                    className={`text-lg font-bold tabular-nums ${
                      timeRemaining <= 60 ? "text-red-500" : "text-foreground"
                    }`}
                  >
                    {formattedTime}
                  </p>
                </div>
              </div>

              {timeRemaining <= 60 && (
                <span className="animate-pulse text-xs font-semibold text-red-500">
                  Hurry!
                </span>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="border-t border-border px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Assessment Progress
              </span>

              <span className="font-semibold text-foreground">
                {currentQuestion + 1} / {totalQuestions}
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Question Card */}
        {/* ================================= */}

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Question Header */}
          <div className="border-b border-border px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Question
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">
                  {currentQuestion + 1}{" "}
                  <span className="font-normal text-muted-foreground">
                    of {totalQuestions}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {question.type}
                </span>

                <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                  {question.marks} {question.marks === 1 ? "Mark" : "Marks"}
                </span>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg font-bold leading-7 text-foreground sm:text-xl sm:leading-8">
              {question.title}
            </h2>

            {question.description && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {question.description}
              </p>
            )}

            {/* ================================= */}
            {/* MCQ */}
            {/* ================================= */}

            {question.type === "MCQ" && (
              <div className="mt-6 space-y-3">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Choose one answer
                </p>

                {question.options.map(
                  (option: { id: string; text: string }, index: number) => (
                    <label
                      key={option.id}
                      className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                        selectedAnswer === option.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/40 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={selectedAnswer === option.id}
                          onChange={() =>
                            updateAnswer({
                              selectedAnswer: option.id,
                            })
                          }
                          className="h-4 w-4 accent-primary"
                        />

                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            selectedAnswer === option.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>

                      <span
                        className={`pt-1 text-sm leading-6 ${
                          selectedAnswer === option.id
                            ? "font-semibold text-foreground"
                            : "font-medium text-foreground"
                        }`}
                      >
                        {option.text}
                      </span>
                    </label>
                  ),
                )}
              </div>
            )}

            {/* ================================= */}
            {/* WRITTEN */}
            {/* ================================= */}

            {question.type === "WRITTEN" && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    Your Answer
                  </p>

                  <span className="text-xs text-muted-foreground">
                    Write your response clearly
                  </span>
                </div>

                <textarea
                  value={writtenAnswer}
                  onChange={(event) =>
                    updateAnswer({
                      writtenAnswer: event.target.value,
                    })
                  }
                  placeholder="Write your answer here..."
                  className="min-h-[220px] w-full resize-y rounded-xl border border-border bg-background p-4 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            )}

            {/* ================================= */}
            {/* CODING */}
            {/* ================================= */}

            {question.type === "CODING" && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    Your Code
                  </p>

                  <span className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground">
                    Code Editor
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-border">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                    <span className="ml-2 text-xs text-muted-foreground">
                      solution
                    </span>
                  </div>

                  <textarea
                    value={codeAnswer}
                    onChange={(event) =>
                      updateAnswer({
                        codeAnswer: event.target.value,
                      })
                    }
                    placeholder="// Write your code here..."
                    spellCheck={false}
                    className="min-h-[300px] w-full resize-y bg-background p-4 font-mono text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/10 sm:min-h-[360px]"
                  />
                </div>
              </div>
            )}

            {/* Answer Status */}
            <div className="mt-6">
              {hasAnswer ? (
                <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-medium">
                    Answer selected. You can continue.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Please answer this question before continuing.</span>
                </div>
              )}
            </div>
          </div>

          {/* ================================= */}
          {/* Navigation */}
          {/* ================================= */}

          <div className="border-t border-border p-4 sm:p-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Previous */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={
                  currentQuestion === 0 ||
                  submitAnswerMutation.isPending ||
                  submitAssessmentMutation.isPending
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[120px]"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Next / Submit */}
              {currentQuestion === totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmitAssessment}
                  disabled={
                    !hasAnswer ||
                    submitAnswerMutation.isPending ||
                    submitAssessmentMutation.isPending
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[180px]"
                >
                  {submitAssessmentMutation.isPending ? (
                    "Submitting..."
                  ) : submitAnswerMutation.isPending ? (
                    "Saving..."
                  ) : (
                    <>
                      Submit Assessment
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !hasAnswer ||
                    submitAnswerMutation.isPending ||
                    submitAssessmentMutation.isPending
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[130px]"
                >
                  {submitAnswerMutation.isPending ? (
                    "Saving..."
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Question Navigation */}
        {/* ================================= */}

        <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Questions</h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Select a question to navigate
              </p>
            </div>

            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {currentQuestion + 1}/{totalQuestions}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
            {questions.map((questionItem: TAttemptQuestion, index: number) => (
              <button
                key={questionItem.id}
                type="button"
                onClick={() => handleQuestionNavigation(index)}
                className={`flex h-10 w-full items-center justify-center rounded-xl border text-sm font-semibold transition-all sm:w-10 ${
                  currentQuestion === index
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />

          <p>
            Make sure you submit your assessment before the timer reaches zero.
          </p>
        </div>
      </div>
    </div>
  );
}
