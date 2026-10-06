"use client";

import { useEvaluateAnswers, useGetAttemptDetails } from "@/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EvaluateAttemptPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  const { data, isLoading, isError } = useGetAttemptDetails(attemptId);

  const evaluateMutation = useEvaluateAnswers();

  const [marks, setMarks] = useState<Record<string, string>>({});

  if (isLoading) {
    return <div className="p-6">Loading attempt...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load attempt.</div>;
  }

  const attempt = data?.data;

  if (!attempt) {
    return <div className="p-6">Attempt not found.</div>;
  }

  const handleMarksChange = (questionId: string, value: string) => {
    setMarks((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitEvaluation = () => {
    const answers = attempt.answers
      .filter(
        (answer) =>
          answer.question.type === "WRITTEN" ||
          answer.question.type === "CODING",
      )
      .map((answer) => ({
        questionId: answer.questionId,
        marks: Number(marks[answer.questionId] ?? 0),
        type: answer.question.type as "WRITTEN" | "CODING",
      }));

    // Check marks
    const invalidMarks = answers.find((answer) => {
      const question = attempt.answers.find(
        (item) => item.questionId === answer.questionId,
      )?.question;

      if (!question) return true;

      return answer.marks < 0 || answer.marks > question.marks;
    });

    if (invalidMarks) {
      alert("Marks cannot be greater than the question's maximum marks.");
      return;
    }

    evaluateMutation.mutate(
      {
        attemptId,
        payload: {
          answers,
        },
      },
      {
        onSuccess: () => {
          alert("Evaluation submitted successfully!");

          router.push(`/dashboard/company/attempts/${attemptId}`);
        },

        onError: (error) => {
          alert(error instanceof Error ? error.message : "Evaluation failed");
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* ========================= */}
      {/* Candidate Information */}
      {/* ========================= */}

      <div className="rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Evaluate Assessment</h1>

        <div className="mt-4 space-y-1">
          <p>
            Candidate: <strong>{attempt.candidate.name}</strong>
          </p>

          <p>Email: {attempt.candidate.email}</p>

          <p>
            Assessment: <strong>{attempt.assessment.title}</strong>
          </p>

          <p>
            Attempt: <strong>{attempt.attemptNumber}</strong>
          </p>

          <p>
            Status: <strong>{attempt.status}</strong>
          </p>
        </div>
      </div>

      {/* ========================= */}
      {/* Questions */}
      {/* ========================= */}

      <div className="space-y-5">
        {attempt.answers.map((answer, index) => {
          const question = answer.question;

          return (
            <div key={answer.id} className="rounded-lg border p-6">
              {/* Question */}

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Question {index + 1}
                </p>

                <h2 className="text-lg font-semibold">{question.title}</h2>

                {question.description && (
                  <p className="text-sm text-muted-foreground">
                    {question.description}
                  </p>
                )}

                <div className="flex gap-4 text-sm">
                  <span>
                    Type: <strong>{question.type}</strong>
                  </span>

                  <span>
                    Maximum Marks: <strong>{question.marks}</strong>
                  </span>
                </div>
              </div>

              {/* ========================= */}
              {/* MCQ */}
              {/* ========================= */}

              {question.type === "MCQ" && (
                <div className="mt-5 rounded-md bg-muted p-4">
                  <p className="font-medium">Candidate Answer</p>

                  <p className="mt-2">
                    {answer.selectedOption?.text ?? "No answer"}
                  </p>

                  <p className="mt-3 text-sm text-green-600">
                    MCQ is automatically evaluated.
                  </p>
                </div>
              )}

              {/* ========================= */}
              {/* WRITTEN */}
              {/* ========================= */}

              {question.type === "WRITTEN" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-medium">Candidate Answer</p>

                    <div className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-4">
                      {answer.writtenAnswer ?? "No answer submitted"}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`marks-${answer.questionId}`}
                      className="text-sm font-medium"
                    >
                      Give Marks
                    </label>

                    <input
                      id={`marks-${answer.questionId}`}
                      type="number"
                      min={0}
                      max={question.marks}
                      value={marks[answer.questionId] ?? ""}
                      onChange={(event) =>
                        handleMarksChange(answer.questionId, event.target.value)
                      }
                      placeholder={`0 - ${question.marks}`}
                      className="mt-2 w-full rounded-md border px-3 py-2"
                    />
                  </div>
                </div>
              )}

              {/* ========================= */}
              {/* CODING */}
              {/* ========================= */}

              {question.type === "CODING" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-medium">Candidate Code</p>

                    <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4">
                      <code>{answer.codeAnswer ?? "No code submitted"}</code>
                    </pre>
                  </div>

                  <div>
                    <label
                      htmlFor={`marks-${answer.questionId}`}
                      className="text-sm font-medium"
                    >
                      Give Marks
                    </label>

                    <input
                      id={`marks-${answer.questionId}`}
                      type="number"
                      min={0}
                      max={question.marks}
                      value={marks[answer.questionId] ?? ""}
                      onChange={(event) =>
                        handleMarksChange(answer.questionId, event.target.value)
                      }
                      placeholder={`0 - ${question.marks}`}
                      className="mt-2 w-full rounded-md border px-3 py-2"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================= */}
      {/* Submit Evaluation */}
      {/* ========================= */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmitEvaluation}
          disabled={evaluateMutation.isPending}
          className="rounded-md bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {evaluateMutation.isPending ? "Submitting..." : "Submit Evaluation"}
        </button>
      </div>
    </div>
  );
}
