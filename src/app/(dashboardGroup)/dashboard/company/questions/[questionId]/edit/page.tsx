"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useGetQuestions, useUpdateQuestion } from "@/hooks";

type QuestionType = "MCQ" | "CODING" | "WRITTEN";
type Difficulty = "EASY" | "MEDIUM" | "HARD";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

const EditQuestionPage = () => {
  const params = useParams();
  const router = useRouter();

  const questionId = params.questionId as string;

  const { data, isLoading, isError } = useGetQuestions();

  const { mutate: updateQuestionMutation, isPending: isUpdating } =
    useUpdateQuestion();

  const questions = Array.isArray(data?.data) ? data.data : [];

  const question = questions.find((item: any) => item.id === questionId);

  // ================= STATE =================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState<QuestionType>("MCQ");

  const [category, setCategory] = useState("");

  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");

  const [marks, setMarks] = useState<number>(1);

  const [options, setOptions] = useState<Option[]>([
    {
      id: crypto.randomUUID(),
      text: "",
      isCorrect: false,
    },
    {
      id: crypto.randomUUID(),
      text: "",
      isCorrect: false,
    },
  ]);

  // ================= LOAD QUESTION =================

  useEffect(() => {
    if (!question) return;

    setTitle(
      question.title || question.questionText || question.question || "",
    );

    setDescription(question.description || "");

    setType(String(question.type || "MCQ").toUpperCase() as QuestionType);

    setCategory(question.category || "");

    setDifficulty(
      String(question.difficulty || "EASY").toUpperCase() as Difficulty,
    );

    setMarks(Number(question.marks ?? 1));

    if (Array.isArray(question.options) && question.options.length > 0) {
      setOptions(
        question.options.map((option: any) => ({
          id: option.id || crypto.randomUUID(),
          text: option.text || "",
          isCorrect: Boolean(option.isCorrect),
        })),
      );
    }
  }, [question]);

  // ================= OPTION CHANGE =================

  const handleOptionChange = (index: number, value: string) => {
    setOptions((previous) =>
      previous.map((option, optionIndex) =>
        optionIndex === index
          ? {
              ...option,
              text: value,
            }
          : option,
      ),
    );
  };

  // ================= CORRECT OPTION =================

  const handleCorrectOption = (index: number) => {
    setOptions((previous) =>
      previous.map((option, optionIndex) => ({
        ...option,
        isCorrect: optionIndex === index,
      })),
    );
  };

  // ================= ADD OPTION =================

  const handleAddOption = () => {
    setOptions((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        text: "",
        isCorrect: false,
      },
    ]);
  };

  // ================= REMOVE OPTION =================

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) {
      return;
    }

    setOptions((previous) =>
      previous.filter((_, optionIndex) => optionIndex !== index),
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!question) {
      return;
    }

    // Question validation
    if (!title.trim()) {
      alert("Question title is required.");
      return;
    }

    // Category validation
    if (!category.trim()) {
      alert("Category is required.");
      return;
    }

    // Marks validation
    if (marks <= 0) {
      alert("Marks must be greater than 0.");
      return;
    }

    // MCQ validation
    if (type === "MCQ") {
      const validOptions = options.filter((option) => option.text.trim());

      if (validOptions.length < 2) {
        alert("MCQ must have at least 2 options.");
        return;
      }

      const hasCorrectOption = validOptions.some((option) => option.isCorrect);

      if (!hasCorrectOption) {
        alert("Please select one correct option.");
        return;
      }
    }

    // ================= OPTION TEXT =================

    const optionText =
      type === "MCQ"
        ? options
            .filter((option) => option.text.trim())
            .map(
              (option, index) =>
                `${String.fromCharCode(65 + index)}. ${option.text.trim()}`,
            )
            .join("\n")
        : undefined;

    // ================= UPDATE API =================

    updateQuestionMutation(
      {
        id: question.id,
        title: title.trim(),
        description: description.trim(),
        type,
        category: category.trim(),
        difficulty,
        marks: Number(marks),

        option: optionText,

        options:
          type === "MCQ"
            ? options
                .filter((option) => option.text.trim())
                .map((option) => ({
                  text: option.text.trim(),
                  isCorrect: option.isCorrect,
                }))
            : undefined,
      },
      {
        onSuccess: () => {
          alert("Question updated successfully.");

          router.push("/dashboard/company/allQuestions");
        },

        onError: (error: any) => {
          console.error("Update question error:", error);

          alert(
            error?.message || "Failed to update question. Please try again.",
          );
        },
      },
    );
  };

  // ================= LOADING =================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading question...
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Failed to load question.
          </p>
        </div>
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!question) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard/company/questions")}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </button>

        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-medium text-foreground">Question not found.</p>
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/company/questions")}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Edit Question
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your question details and save the changes.
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
      >
        <div className="space-y-6">
          {/* ================= QUESTION ================= */}

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Title
            </label>

            <textarea
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              rows={4}
              placeholder="Enter your question"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Enter question description"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* ================= TYPE + CATEGORY ================= */}

          <div className="grid gap-4 md:grid-cols-2">
            {/* TYPE */}

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-foreground"
              >
                Question Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as QuestionType)
                }
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="MCQ">MCQ</option>
                <option value="CODING">Coding</option>
                <option value="WRITTEN">Written</option>
              </select>
            </div>

            {/* CATEGORY */}

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-foreground"
              >
                Category
              </label>

              <input
                id="category"
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="JavaScript"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* ================= DIFFICULTY + MARKS ================= */}

          <div className="grid gap-4 md:grid-cols-2">
            {/* DIFFICULTY */}

            <div className="space-y-2">
              <label
                htmlFor="difficulty"
                className="text-sm font-medium text-foreground"
              >
                Difficulty
              </label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value as Difficulty)
                }
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            {/* MARKS */}

            <div className="space-y-2">
              <label
                htmlFor="marks"
                className="text-sm font-medium text-foreground"
              >
                Marks
              </label>

              <input
                id="marks"
                type="number"
                min={1}
                value={marks}
                onChange={(event) => setMarks(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* ================= MCQ OPTIONS ================= */}

          {type === "MCQ" && (
            <div className="space-y-4 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    MCQ Options
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Select one correct answer.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                  Add Option
                </button>
              </div>

              {/* OPTIONS */}

              <div className="space-y-3">
                {options.map((option: Option, index: number) => (
                  <div key={option.id} className="flex items-center gap-2">
                    {/* CORRECT OPTION BUTTON */}

                    <button
                      type="button"
                      onClick={() => handleCorrectOption(index)}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition ${
                        option.isCorrect
                          ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                      title={
                        option.isCorrect ? "Correct answer" : "Mark as correct"
                      }
                    >
                      {String.fromCharCode(65 + index)}
                    </button>

                    {/* OPTION INPUT */}

                    <input
                      type="text"
                      value={option.text}
                      onChange={(event) =>
                        handleOptionChange(index, event.target.value)
                      }
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />

                    {/* DELETE OPTION */}

                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      disabled={options.length <= 2}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Remove option"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= ACTIONS ================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            {/* CANCEL */}

            <button
              type="button"
              onClick={() => router.push("/dashboard/company/questions")}
              disabled={isUpdating}
              className="h-11 rounded-xl border border-border bg-background px-5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            {/* UPDATE */}

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Question"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditQuestionPage;
