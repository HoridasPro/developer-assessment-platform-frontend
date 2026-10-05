/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateQuestion } from "@/hooks";
import {
  CreateQuestionFormValues,
  createQuestionSchema,
} from "@/validation/createQuestionValidation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export default function CreateQuestionForm() {
  const createQuestion = useCreateQuestion();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateQuestionFormValues>({
    resolver: zodResolver(createQuestionSchema),

    shouldUnregister: true,

    defaultValues: {
      title: "",
      description: "",
      type: "MCQ",
      category: "",
      difficulty: "EASY",
      marks: 1,
      options: [
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const options = useWatch({
    control,
    name: "options",
  });

  const type = watch("type");

  const handleCorrectOption = (selectedIndex: number) => {
    fields.forEach((_, index) => {
      setValue(`options.${index}.isCorrect`, index === selectedIndex, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };

  const onSubmit = (data: CreateQuestionFormValues) => {
    const questionData = {
      title: data.title,
      description: data.description,
      type: data.type,
      category: data.category,
      difficulty: data.difficulty,
      marks: data.marks,

      ...(data.type === "MCQ" && {
        options: data.options?.map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      }),
    };

    const payload = {
      questions: [questionData],
    };

    createQuestion.mutate(payload as any, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Created Question",
          description: res?.message || "Created question successfully",
          type: "success",
        });
      },

      onError: (error: any) => {
        toast.add({
          title: "Error Creating Question",
          description:
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create question",
          type: "error",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-5xl"
    >
      <Card className="overflow-hidden border-border/60 shadow-sm">
        {/* Header */}
        <CardHeader className="border-b bg-muted/20 px-4 py-5 sm:px-6">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              Question Information
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Create a question for your problem bank.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Question Title */}
          <div className="space-y-2">
            <label htmlFor="question-title" className="text-sm font-medium">
              Question Title
            </label>

            <Input
              id="question-title"
              placeholder="Which keyword is used to declare a constant?"
              className="h-11 w-full"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

       
          <div className="space-y-2">
            <label
              htmlFor="question-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="question-description"
              placeholder="Choose the correct answer."
              className="min-h-28 w-full resize-y"
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

  
          <div className="space-y-2">
            <label htmlFor="question-type" className="text-sm font-medium">
              Question Type
            </label>

            <select
              id="question-type"
              {...register("type")}
              className="h-11 w-full rounded-md border border-input bg-white dark:bg-muted px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="MCQ">MCQ</option>
              <option value="WRITTEN">Written</option>
              <option value="CODING">Coding</option>
            </select>

            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

         
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
            <div className="space-y-2">
              <label
                htmlFor="question-category"
                className="text-sm font-medium"
              >
                Category
              </label>

              <Input
                id="question-category"
                placeholder="JavaScript"
                className="h-11 w-full"
                {...register("category")}
              />

              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label
                htmlFor="question-difficulty"
                className="text-sm font-medium"
              >
                Difficulty
              </label>

              <select
                id="question-difficulty"
                {...register("difficulty")}
                className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 dark:bg-muted"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>

              {errors.difficulty && (
                <p className="text-sm text-destructive">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            {/* Marks */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label htmlFor="question-marks" className="text-sm font-medium">
                Marks
              </label>

              <Input
                id="question-marks"
                type="number"
                min={1}
                className="h-11 w-full"
                {...register("marks", {
                  valueAsNumber: true,
                })}
              />

              {errors.marks && (
                <p className="text-sm text-destructive">
                  {errors.marks.message}
                </p>
              )}
            </div>
          </div>

          {/* MCQ */}
          {type === "MCQ" && (
            <div className="space-y-5 rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold sm:text-lg">
                  Multiple Choice Options
                </h3>

                <p className="text-sm text-muted-foreground">
                  Add options and select the correct answer.
                </p>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="group flex items-start gap-2 rounded-lg border bg-white dark:bg-muted p-2.5 sm:gap-3 sm:p-3"
                  >
                    {/* Correct Answer */}
                    <div className="flex h-11 shrink-0 items-center justify-center px-1">
                      <Input
                        type="radio"
                        name="correctOption"
                        checked={options?.[index]?.isCorrect === true}
                        onChange={() => handleCorrectOption(index)}
                        className="size-4 cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Option Input */}
                    <div className="min-w-0 flex-1">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        className="h-11 w-full"
                        {...register(`options.${index}.text`)}
                      />

                      {errors.options?.[index]?.text && (
                        <p className="mt-1 text-xs text-destructive sm:text-sm">
                          {errors.options[index]?.text?.message}
                        </p>
                      )}
                    </div>

                    {/* Remove */}
                    {fields.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mt-0.5 size-11 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Options Error */}
              {typeof errors.options?.message === "string" && (
                <p className="text-sm text-destructive">
                  {errors.options.message}
                </p>
              )}

              {/* Add Option */}
              {fields.length < 10 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      text: "",
                      isCorrect: false,
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  <Plus className="mr-2 size-4" />
                  Add Option
                </Button>
              )}
            </div>
          )}

          {/* Written */}
          {type === "WRITTEN" && (
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Written Question</p>

                <p className="text-sm leading-6 text-muted-foreground">
                  Candidate will provide a written answer.
                </p>
              </div>
            </div>
          )}

          {/* Coding */}
          {type === "CODING" && (
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Coding Question</p>

                <p className="text-sm leading-6 text-muted-foreground">
                  Candidate will solve this problem using the coding
                  environment.
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              disabled={createQuestion.isPending}
              className="w-full sm:w-auto"
            >
              {createQuestion.isPending ? (
                <>
                  <Spinner />
                  Creating...
                </>
              ) : (
                "Create Question"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
