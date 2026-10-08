"use client";

import { useGetQuestions, useDeleteQuestion } from "@/hooks";
import {
  CircleHelp,
  Code2,
  FileText,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";

const AllQuestionsPage = () => {
  const { data, isLoading, isError, refetch } = useGetQuestions();

  const { mutate: deleteQuestionMutation, isPending: isDeleting } =
    useDeleteQuestion();

  const questions = Array.isArray(data?.data) ? data.data : [];

  const getTypeIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "MCQ":
        return <CircleHelp className="h-4 w-4" />;

      case "CODING":
        return <Code2 className="h-4 w-4" />;

      case "WRITTEN":
        return <FileText className="h-4 w-4" />;

      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type?.toUpperCase()) {
      case "MCQ":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

      case "CODING":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";

      case "WRITTEN":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "bg-green-500/10 text-green-600 dark:text-green-400";

      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

      case "HARD":
        return "bg-red-500/10 text-red-600 dark:text-red-400";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // ================= DELETE QUESTION =================
  const handleDelete = (questionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmed) {
      return;
    }

    deleteQuestionMutation(questionId, {
      onSuccess: () => {
        alert("Question deleted successfully.");
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete question error:", error);

        alert(error?.message || "Failed to delete question. Please try again.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading questions...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Failed to load questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All Questions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage all questions from your problem bank.
          </p>
        </div>

        {/* Total Questions */}
        <div className="w-fit rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Questions</p>

          <p className="text-xl font-bold text-foreground">
            {questions.length}
          </p>
        </div>
      </div>

      {/* ================= DESKTOP / TABLET ================= */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="w-16 px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SI
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Title
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Difficulty
                </th>

                <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Marks
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {questions.length > 0 ? (
                questions.map((question: any, index: number) => (
                  <tr
                    key={question.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* SI No */}
                    <td className="px-4 py-4 text-center align-top">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                    </td>

                    {/* Question */}
                    <td className="max-w-[280px] px-5 py-4 align-top">
                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
                        {question.questionText ||
                          question.title ||
                          question.question ||
                          "Untitled Question"}
                      </p>
                    </td>

                    {/* Description */}
                    <td className="max-w-[300px] px-4 py-4 align-top">
                      <p className="line-clamp-3 text-sm leading-5 text-muted-foreground">
                        {question.description || "No description"}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getTypeStyle(
                          question.type,
                        )}`}
                      >
                        {getTypeIcon(question.type)}
                        {question.type || "N/A"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 align-top">
                      <span className="text-sm text-foreground">
                        {question.category || "—"}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getDifficultyStyle(
                          question.difficulty,
                        )}`}
                      >
                        {question.difficulty || "N/A"}
                      </span>
                    </td>

                    {/* Marks */}
                    <td className="px-4 py-4 text-center align-top">
                      <span className="font-semibold text-foreground">
                        {question.marks ?? 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 align-top">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}
                        <Link
                          type="button"
                          href={`/dashboard/company/questions/${question.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="Edit question"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(question.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete question"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="space-y-4 md:hidden">
        {questions.length > 0 ? (
          questions.map((question: any, index: number) => (
            <div
              key={question.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              {/* SI No */}
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  SI No. {index + 1}
                </span>
              </div>

              {/* Question + Description */}
              <div className="mb-4">
                <p className="text-sm font-semibold leading-6 text-foreground">
                  {question.questionText ||
                    question.title ||
                    question.question ||
                    "Untitled Question"}
                </p>

                <p className="mt-2 line-clamp-3 text-sm leading-5 text-muted-foreground">
                  {question.description || "No description"}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getTypeStyle(
                    question.type,
                  )}`}
                >
                  {getTypeIcon(question.type)}
                  {question.type || "N/A"}
                </span>

                <span
                  className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getDifficultyStyle(
                    question.difficulty,
                  )}`}
                >
                  {question.difficulty || "N/A"}
                </span>

                <span className="inline-flex rounded-lg bg-muted px-2.5 py-1.5 text-xs font-semibold text-muted-foreground">
                  {question.marks ?? 0} Marks
                </span>
              </div>

              {/* Category */}
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Category</p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {question.category || "—"}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                {/* Edit */}
                <Link
                  href={`/dashboard/company/questions/${question.id}/edit`}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition hover:bg-muted cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(question.id)}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No questions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllQuestionsPage;
