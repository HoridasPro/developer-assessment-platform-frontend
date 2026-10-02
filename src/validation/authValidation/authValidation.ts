import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
});

// Register
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),

  email: z.string().email("Please provide a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
  profilePhoto: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Profile photo is required"),

  role: z.enum(["CANDIDATE", "COMPANY", "ADMIN"]),

  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]).default("ACTIVE"),

  isActive: z.boolean().default(true),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please provide a valid Bangladeshi phone number"),
});

