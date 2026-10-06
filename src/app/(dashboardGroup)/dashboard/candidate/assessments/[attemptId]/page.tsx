// "use client";

// import { useGetAttemptQuestions } from "@/hooks";
// import { TAttemptQuestion } from "@/types/attemptQuestion";
// import { useParams } from "next/navigation";
// import { useState } from "react";

// export default function AssessmentPage() {
//   const params = useParams();

//   const attemptId = params.attemptId as string;

//   const { data, isLoading, isError } = useGetAttemptQuestions(attemptId);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <p className="text-muted-foreground">Loading questions...</p>
//       </div>
//     );
//   }

//   if (isError || !data?.data) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center p-6">
//         <p className="text-red-500">Failed to load questions.</p>
//       </div>
//     );
//   }

//   const assessment = data.data;
//   const questions = assessment.questions;

//   const question = questions[currentQuestion];

//   const totalQuestions = questions.length;

//   const handleNext = () => {
//     if (currentQuestion < totalQuestions - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setSelectedAnswer(null);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1);
//       setSelectedAnswer(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
//           <div>
//             <h1 className="text-xl font-bold sm:text-2xl">
//               JavaScript Assessment
//             </h1>

//             <p className="mt-1 text-sm text-muted-foreground">
//               Attempt #{assessment.attemptNumber}
//             </p>
//           </div>

//           {/* Timer */}
//           <div className="rounded-lg border bg-muted/50 px-4 py-2">
//             <p className="text-sm text-muted-foreground">Time Remaining</p>

//             <p className="text-lg font-bold">⏱ 29:45</p>
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="rounded-xl border bg-card shadow-sm">
//           {/* Question Header */}
//           <div className="border-b p-5 sm:p-6">
//             <div className="flex items-center justify-between gap-4">
//               <p className="text-sm font-medium text-muted-foreground">
//                 Question {currentQuestion + 1} of {totalQuestions}
//               </p>

//               <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
//                 {question.marks} Mark
//               </span>
//             </div>
//           </div>

//           {/* Question */}
//           <div className="p-5 sm:p-6">
//             <h2 className="text-xl font-semibold">{question.title}</h2>

//             <p className="mt-4 text-base leading-7 text-muted-foreground">
//               {question.description}
//             </p>

//             {/* Options */}
//             <div className="mt-6 space-y-3">
//               {question.options.map((option: { id: string; text: string }) => (
//                 <label
//                   key={option.id}
//                   className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
//                     selectedAnswer === option.id
//                       ? "border-primary bg-primary/5"
//                       : "hover:bg-muted/50"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${question.id}`}
//                     value={option.id}
//                     checked={selectedAnswer === option.id}
//                     onChange={() => setSelectedAnswer(option.id)}
//                     className="h-4 w-4"
//                   />

//                   <span className="text-sm font-medium">{option.text}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-between border-t p-5 sm:p-6">
//             <button
//               type="button"
//               onClick={handlePrevious}
//               disabled={currentQuestion === 0}
//               className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Previous
//             </button>

//             {currentQuestion === totalQuestions - 1 ? (
//               <button
//                 type="button"
//                 className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
//               >
//                 Submit Assessment
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Question Navigation */}
//         <div className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
//           <h3 className="mb-4 font-semibold">Questions</h3>

//           <div className="flex flex-wrap gap-2">
//             {questions.map((questionItem: TAttemptQuestion, index: number) => (
//               <button
//                 key={questionItem.id}
//                 type="button"
//                 onClick={() => {
//                   setCurrentQuestion(index);
//                   setSelectedAnswer(null);
//                 }}
//                 className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium ${
//                   currentQuestion === index
//                     ? "border-primary bg-primary text-primary-foreground"
//                     : "hover:bg-muted"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  useGetAttemptQuestions,
  useSubmitAnswer,
  useSubmitAssessment,
} from "@/hooks";
import type { TAttemptQuestion } from "@/types/attemptQuestion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  // MCQ
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Written
  const [writtenAnswer, setWrittenAnswer] = useState("");

  // Coding
  const [codeAnswer, setCodeAnswer] = useState("");

  // Timer
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
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <p className="text-red-500">Failed to load questions.</p>
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
  // Timer Format
  // =========================
  const minutes = Math.floor(timeRemaining / 60);

  const seconds = timeRemaining % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

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
  // Reset Answer State
  // =========================
  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setWrittenAnswer("");
    setCodeAnswer("");
  };

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

        resetAnswerState();
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

      resetAnswerState();
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

      // Result page থাকলে এখানে route change করবে
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
    resetAnswerState();
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div className="mb-6 flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              JavaScript Assessment
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Attempt #{assessment.attemptNumber}
            </p>
          </div>

          {/* Timer */}

          <div
            className={`rounded-lg border px-4 py-2 ${
              timeRemaining <= 60
                ? "border-red-500 bg-red-500/10"
                : "bg-muted/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Time Remaining</p>

            <p
              className={`text-lg font-bold ${
                timeRemaining <= 60 ? "text-red-500" : ""
              }`}
            >
              ⏱ {formattedTime}
            </p>
          </div>
        </div>

        {/* ================================= */}
        {/* Question Card */}
        {/* ================================= */}

        <div className="rounded-xl border bg-card shadow-sm">
          {/* Question Header */}

          <div className="border-b p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {question.marks} Mark
              </span>
            </div>
          </div>

          {/* ================================= */}
          {/* Question */}
          {/* ================================= */}

          <div className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold">{question.title}</h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {question.description}
            </p>

            {/* ================================= */}
            {/* MCQ */}
            {/* ================================= */}

            {question.type === "MCQ" && (
              <div className="mt-6 space-y-3">
                {question.options.map(
                  (option: { id: string; text: string }) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                        selectedAnswer === option.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={selectedAnswer === option.id}
                        onChange={() => setSelectedAnswer(option.id)}
                        className="h-4 w-4"
                      />

                      <span className="text-sm font-medium">{option.text}</span>
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
                <p className="mb-2 block text-sm font-medium">Your Answer</p>

                <textarea
                  value={writtenAnswer}
                  onChange={(event) => setWrittenAnswer(event.target.value)}
                  placeholder="Write your answer here..."
                  className="min-h-[220px] w-full resize-y rounded-lg border bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}

            {/* ================================= */}
            {/* CODING */}
            {/* ================================= */}

            {question.type === "CODING" && (
              <div className="mt-6">
                <p className="mb-2 block text-sm font-medium">Your Code</p>

                <textarea
                  value={codeAnswer}
                  onChange={(event) => setCodeAnswer(event.target.value)}
                  placeholder="// Write your code here..."
                  spellCheck={false}
                  className="min-h-[320px] w-full resize-y rounded-lg border bg-background p-4 font-mono text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}
          </div>

          {/* ================================= */}
          {/* Navigation */}
          {/* ================================= */}

          <div className="flex items-center justify-between border-t p-5 sm:p-6">
            {/* Previous */}

            <button
              type="button"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0 ||
                submitAnswerMutation.isPending ||
                submitAssessmentMutation.isPending
              }
              className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
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
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitAssessmentMutation.isPending
                  ? "Submitting..."
                  : submitAnswerMutation.isPending
                    ? "Saving..."
                    : "Submit Assessment"}
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
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitAnswerMutation.isPending ? "Saving..." : "Next"}
              </button>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* Question Navigation */}
        {/* ================================= */}

        <div className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Questions</h3>

          <div className="flex flex-wrap gap-2">
            {questions.map((questionItem: TAttemptQuestion, index: number) => (
              <button
                key={questionItem.id}
                type="button"
                onClick={() => handleQuestionNavigation(index)}
                className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium ${
                  currentQuestion === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
