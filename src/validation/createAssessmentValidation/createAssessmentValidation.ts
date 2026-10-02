import { z } from "zod";

// create assessment validation
export const createAssessmentSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),

    duration: z.coerce
      .number()
      .min(1, "Duration must be at least 1 minute")
      .max(300, "Duration cannot exceed 300 minutes"),

    passingScore: z.coerce
      .number()
      .min(0, "Passing score cannot be negative")
      .max(100, "Passing score cannot exceed 100"),

    maxAttempts: z.coerce
      .number()
      .min(1, "At least 1 attempt is required")
      .max(10, "Maximum 10 attempts allowed"),

    price: z.coerce.number().min(0, "Price cannot be negative"),

    startAt: z.string().min(1, "Start date and time is required"),

    endAt: z.string().min(1, "End date and time is required"),
  })
  .refine(
    (data) => {
      if (!data.startAt || !data.endAt) return true;
      return new Date(data.endAt) > new Date(data.startAt);
    },
    {
      message: "End date must be after start date",
      path: ["endAt"],
    },
  );

export type TCreateAssessmentPayload = z.infer<typeof createAssessmentSchema>;
