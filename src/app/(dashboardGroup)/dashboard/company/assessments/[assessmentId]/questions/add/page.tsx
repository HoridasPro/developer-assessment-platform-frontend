"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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

  const handleAddQuestions = () => {
    if (selectedQuestionIds.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    // FIX: targetQuestion থেকে marks নিয়ে payload-এ যুক্ত করা হয়েছে
    const options = selectedQuestionIds.map((questionId, index) => {
      const targetQuestion = questionsList.find(
        (q: any) => (q.id || q._id) === questionId,
      );

      return {
        questionId,
        order: index + 1,
        // প্রশ্ন থেকে marks নেওয়া হচ্ছে, না পাওয়া গেলে fallback হিসেবে 10 বা 0 ব্যবহার করবে
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
          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/company/assessments/${assessmentId}/questions`,
              )
            }
            className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Questions
          </button>

          <h1 className="text-2xl font-bold">Add Assessment Questions</h1>

          <p className="text-sm text-muted-foreground">
            Select questions from your Problem Bank.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddQuestions}
          disabled={
            selectedQuestionIds.length === 0 || addQuestionsMutation.isPending
          }
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {addQuestionsMutation.isPending
            ? "Adding..."
            : `Add Selected (${selectedQuestionIds.length})`}
        </button>
      </div>

      {/* Question List */}
      <div className="rounded-lg border">
        {questionsList.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="font-medium">No questions found</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create questions in Problem Bank first.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {questionsList.map((question: any) => {
              const qId = question.id || question._id;
              const isSelected = selectedQuestionIds.includes(qId);

              return (
                <label
                  key={qId}
                  className="flex cursor-pointer items-center gap-4 p-4 hover:bg-muted/40"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleQuestion(qId)}
                    className="h-4 w-4"
                  />

                  {/* Question Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{question.title}</h3>

                    {question.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {question.description}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.type && (
                        <span className="rounded-md bg-muted px-2 py-1 text-xs">
                          {question.type}
                        </span>
                      )}

                      {question.category && (
                        <span className="rounded-md bg-muted px-2 py-1 text-xs">
                          {question.category}
                        </span>
                      )}

                      {question.difficulty && (
                        <span className="rounded-md bg-muted px-2 py-1 text-xs">
                          {question.difficulty}
                        </span>
                      )}

                      {/* FIX: UI render-এও nullish coalescing ব্যবহার করা হয়েছে */}
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        {question.marks ?? 0} marks
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
