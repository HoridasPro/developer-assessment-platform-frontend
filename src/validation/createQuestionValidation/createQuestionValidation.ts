import { z } from "zod";

const questionOptionSchema = z.object({
  text: z.string().trim().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

export const createQuestionSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "Question title must be at least 5 characters")
      .max(200, "Question title must be less than 200 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(2000, "Description must be less than 2000 characters"),

    type: z.enum(["MCQ", "WRITTEN", "CODING"]),

    category: z
      .string()
      .trim()
      .min(1, "Category is required")
      .max(100, "Category must be less than 100 characters"),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

    marks: z.number().int().min(1, "Marks must be at least 1"),

    options: z.array(questionOptionSchema).optional(),
  })
  .superRefine((data, ctx) => {
    // =========================
    // MCQ VALIDATION
    // =========================
    if (data.type === "MCQ") {
      if (!data.options || data.options.length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["options"],
          message: "MCQ must have at least 2 options",
        });

        return;
      }

      if (data.options.length > 10) {
        ctx.addIssue({
          code: "custom",
          path: ["options"],
          message: "MCQ can have maximum 10 options",
        });
      }

      const correctOptions = data.options.filter((option) => option.isCorrect);

      if (correctOptions.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["options"],
          message: "Please select a correct answer",
        });
      }

      if (correctOptions.length > 1) {
        ctx.addIssue({
          code: "custom",
          path: ["options"],
          message: "MCQ can have only one correct answer",
        });
      }
    }
  });

export type CreateQuestionFormValues = z.infer<typeof createQuestionSchema>;
