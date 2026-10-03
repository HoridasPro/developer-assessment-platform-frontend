export type QuestionType = "MCQ" | "WRITTEN" | "CODING";

export type QuestionDifficulty = "EASY" | "MEDIUM" | "HARD";

export type QuestionOption = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  category: string;
  difficulty: QuestionDifficulty;
  marks: number;
  option?: string;
  options?: QuestionOption[];
};

export type CreateQuestionPayload = {
  title: string;
  description: string;
  type: QuestionType;
  category: string;
  difficulty: QuestionDifficulty;
  marks: number;
  option?: string;
  options?: QuestionOption[];
};
